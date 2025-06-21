import { Transaction } from './transaction.entity';

export class FilteredTransactionDto {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  type?: string;
  amount?: number;
  startDate?: Date;
  endDate?: Date;
  category?: string;
  userId: number;
}

export class FilteredTransactionResponseDto {
  items: Transaction[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export class CreateTransactionDto {
  type: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
}
export class UpdateTransactionDto {
  type?: string;
  amount?: number;
  date?: Date;
  category?: string;
  description?: string;
}
