import { Goal } from './goal.entity';

export class FilteredGoalDto {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  targetAmount?: number;
  status?: string;
  startDate?: Date;
  deadline?: Date;
  endDate?: Date;
  userId?: number;
}

export class FilteredGoalResponseDto {
  items: Goal[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export class CreateGoalDto {
  title: string;
  targetAmount: number;
  deadline: Date;
}

export class UpdateGoalDto {
  title?: string;
  targetAmount?: number;
  sum?: number;
  deadline?: Date;
  status?: string;
}
