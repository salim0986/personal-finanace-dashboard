import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import {
  FilteredTransactionDto,
  FilteredTransactionResponseDto,
} from './transaction.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
    private userService: UserService,
  ) {}

  async createTransaction(
    type: string,
    amount: number,
    date: Date,
    category: string,
    description: string,
  ): Promise<string> {
    if (!type || !amount || !date || !category) {
      throw new Error('All fields are required');
    }

    // In a real application, you would get the userId from the authenticated user context
    const user = await this.userService.getOne(1);
    const transaction = this.repo.create({
      type,
      amount,
      date,
      category,
      description,
      user,
      userId: user.id,
    });
    user.transactions = [...(user.transactions || []), transaction];
    await this.repo.save(transaction);
    return 'Transaction created successfully';
  }

  async getAllTransactions({
    search,
    sort = 'createdAt_desc',
    page = 1,
    limit = 10,
    type,
    amount,
    startDate,
    endDate,
    category,
    userId,
  }: FilteredTransactionDto): Promise<FilteredTransactionResponseDto> {
    const [sortField, sortOrder] = sort.split('_');

    if (!userId) {
      throw new ForbiddenException('User is not authenticated');
    }
    const filters: any = { userId }; // Default to userId 1 for demonstration

    if (search) {
      filters.description = ILike(`%${search}%`);
    }

    if (category) {
      filters.category = category;
    }

    if (type) {
      filters.type = type;
    }

    if (amount) {
      filters.amount = LessThanOrEqual(amount);
    }
    if (startDate) {
      filters.date = MoreThanOrEqual(new Date(startDate));
    }
    if (endDate) {
      filters.date = LessThanOrEqual(new Date(endDate));
    }
    const [items, total] = await this.repo.findAndCount({
      where: filters,
      order: {
        [sortField]: sortOrder.toUpperCase(), // 'ASC' or 'DESC'
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
      page,
      limit,
      hasMore: page * limit < total,
    };
  }
  async getTransactionById(id: number): Promise<Transaction> {
    const transaction = await this.repo.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }
  async updateTransaction(
    id: number,
    type: string,
    amount: number,
    date: Date,
    category: string,
    description: string,
  ): Promise<string> {
    const transaction = await this.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (type) transaction.type = type;
    if (amount) transaction.amount = amount;
    if (date) transaction.date = date;
    if (category) transaction.category = category;
    if (description) transaction.description = description;

    await this.repo.save(transaction);
    return 'Transaction updated successfully';
  }
  async deleteTransaction(id: number): Promise<string> {
    const transaction = await this.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    await this.repo.remove(transaction);
    return 'Transaction deleted successfully';
  }
}
