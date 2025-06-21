import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import {
  CreateTransactionDto,
  FilteredTransactionDto,
  FilteredTransactionResponseDto,
  UpdateTransactionDto,
} from './transaction.dto';
import { RequestUserDTO } from 'src/utils/user-dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('all')
  getAllTransactions(
    @Query() query: FilteredTransactionDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<FilteredTransactionResponseDto> {
    return this.transactionService.getAllTransactions({
      ...query,
      userId: request.user.id,
    });
  }
  @Get(':id')
  getTransactionById(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<Transaction> {
    return this.transactionService.getTransactionById(id, request.user.id);
  }

  @Post('create')
  createTransaction(
    @Body()
    body: CreateTransactionDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.transactionService.createTransaction(
      body.type,
      body.amount,
      body.date,
      body.category,
      body.description,
      request.user.id,
    );
  }
  @Put('update/:id')
  updateTransaction(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
    @Body()
    body: UpdateTransactionDto,
  ): Promise<string> {
    return this.transactionService.updateTransaction(
      id,
      request.user.id,
      body.type,
      body.amount,
      body.date,
      body.category,
      body.description,
    );
  }
  @Delete('delete/:id')
  deleteTransaction(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.transactionService.deleteTransaction(id, request.user.id);
  }
}
