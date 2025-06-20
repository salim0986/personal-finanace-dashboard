import { Journal } from './journal.entity';

export class FilteredJournalDto {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
  userId?: number;
}

export class FilteredJournalResponseDto {
  items: Journal[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export class CreateJournalDto {
  title: string;
  content: string;
}

export class UpdateJournalDto {
  title?: string;
  content?: string;
}
