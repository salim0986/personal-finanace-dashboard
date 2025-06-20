import { Asset } from './asset.entity';

export class FilteredAssetDto {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  amount?: number;
  type?: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  userId?: number;
}

export class FilteredAssetResponseDto {
  items: Asset[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export class CreateAssetDto {
  type: string;
  amount: number;
  category: string;
  description?: string;
}

export class UpdateAssetDto {
  type?: string;
  amount?: number;
  category?: string;
  description?: string;
}
