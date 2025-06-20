import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import {
  CreateTransactionDto,
  FilteredTransactionDto,
  FilteredTransactionResponseDto,
  UpdateTransactionDto,
} from './transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('all')
  getAllTransactions(
    @Query() query: FilteredTransactionDto,
  ): Promise<FilteredTransactionResponseDto> {
    return this.transactionService.getAllTransactions(query);
  }
  @Get(':id')
  getTransactionById(@Param('id') id: number): Promise<Transaction> {
    return this.transactionService.getTransactionById(id);
  }

  @Post('create')
  createTransaction(
    @Body()
    body: CreateTransactionDto,
  ): Promise<string> {
    return this.transactionService.createTransaction(
      body.type,
      body.amount,
      body.date,
      body.category,
      body.description,
    );
  }
  @Put('update/:id')
  updateTransaction(
    @Param('id') id: number,
    @Body()
    body: UpdateTransactionDto,
  ): Promise<string> {
    return this.transactionService.updateTransaction(
      id,
      body.type,
      body.amount,
      body.date,
      body.category,
      body.description,
    );
  }
  @Delete('delete/:id')
  deleteTransaction(@Param('id') id: number): Promise<string> {
    return this.transactionService.deleteTransaction(id);
  }
}
