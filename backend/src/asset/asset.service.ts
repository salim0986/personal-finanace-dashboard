import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { FilteredAssetDto, FilteredAssetResponseDto } from './asset.dto';
import { tryCatch } from 'src/utils/try-catch';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset) private repo: Repository<Asset>,
    private userService: UserService,
  ) {}

  async getAllAssets({
    search,
    sort = 'createdAt_desc',
    page = 1,
    limit = 10,
    type,
    amount,
    category,
    startDate,
    endDate,
    userId,
  }: FilteredAssetDto): Promise<FilteredAssetResponseDto> {
    return tryCatch(async () => {
      const [sortField, sortOrder] = sort.split('_');
      const filters: any = { userId };

      if (search) {
        filters.description = ILike(`%${search}%`);
      }
      if (amount) {
        filters.amount = LessThanOrEqual(amount);
      }
      if (category) {
        filters.category = category;
      }
      if (type) {
        filters.type = type;
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
    }, 'Error fetching assets');
  }
  async getAssetById(id: number): Promise<Asset> {
    return tryCatch(async () => {
      const asset = await this.repo.findOneBy({ id });
      if (!asset) {
        throw new Error('Asset not found');
      }
      return asset;
    }, 'Error fetching asset by ID');
  }
  async createAsset(
    type: string,
    category: string,
    description: string,
    amount: number,
  ): Promise<string> {
    return tryCatch(async () => {
      if (!type) {
        throw new Error('Type is required');
      }
      if (!category) {
        throw new Error('Category is required');
      }
      if (!amount) {
        throw new Error('Amount is required');
      }
      const user = await this.userService.getOne(1);
      const asset = this.repo.create({
        type,
        amount,
        category,
        description,
        user,
        userId: user.id,
      });
      user.assets = [...(user.assets || []), asset];
      await this.repo.save(asset);
      return 'Asset created successfully';
    }, 'Error creating asset');
  }
  async updateAsset(
    id: number,
    type?: string,
    amount?: number,
    category?: string,
    description?: string,
  ): Promise<string> {
    return tryCatch(async () => {
      const asset = await this.getAssetById(id);

      if (type) asset.type = type;
      if (amount) asset.amount = amount;
      if (category) {
        asset.category = category;
      }
      if (description) asset.description = description;

      await this.repo.save(asset);
      return 'Asset updated successfully';
    }, 'Error updating asset');
  }
  async deleteAsset(id: number): Promise<string> {
    return tryCatch(async () => {
      const asset = await this.getAssetById(id);
      await this.repo.remove(asset);
      return 'Asset deleted successfully';
    }, 'Error deleting asset');
  }
}
