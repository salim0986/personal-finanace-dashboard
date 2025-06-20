import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Journal } from './journal.entity';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { FilteredJournalDto, FilteredJournalResponseDto } from './journal.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal) private repo: Repository<Journal>,
    private userService: UserService,
  ) {}

  async getAllJournals({
    search,
    sort = 'createdAt_desc',
    page = 1,
    limit = 10,
    startDate,
    endDate,
    userId,
  }: FilteredJournalDto): Promise<FilteredJournalResponseDto> {
    const [sortField, sortOrder] = sort.split('_');
    const filters: any = { userId };

    if (search) {
      filters.title = ILike(`%${search}%`);
    }

    if (startDate) {
      filters.createdAt = MoreThanOrEqual(new Date(startDate));
    }
    if (endDate) {
      filters.createdAt = LessThanOrEqual(new Date(endDate));
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
  async getJournalById(id: number): Promise<Journal> {
    const journal = await this.repo.findOneBy({ id });
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    return journal;
  }
  async createJournal(title: string, content: string): Promise<string> {
    if (!title || !content) {
      throw new Error('Title and content are required');
    }
    const user = await this.userService.getOne(1);
    const journal = this.repo.create({
      title,
      content,
      user,
      userId: user.id,
    });
    user.journals = [...(user.journals || []), journal];
    await this.repo.save(journal);
    return 'Goal created successfully';
  }
  async updateJournal(
    id: number,
    title?: string,
    content?: string,
  ): Promise<string> {
    const journal = await this.getJournalById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    if (title) journal.title = title;
    if (content) journal.content = content;

    await this.repo.save(journal);
    return 'Journal updated successfully';
  }
  async deleteJournal(id: number): Promise<string> {
    const journal = await this.getJournalById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    await this.repo.remove(journal);
    return 'Journal deleted successfully';
  }
}
