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
import { AssetService } from './asset.service';
import {
  CreateAssetDto,
  FilteredAssetDto,
  FilteredAssetResponseDto,
  UpdateAssetDto,
} from './asset.dto';
import { Asset } from './asset.entity';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('all')
  getAllAssets(
    @Query() query: FilteredAssetDto,
  ): Promise<FilteredAssetResponseDto> {
    return this.assetService.getAllAssets(query);
  }
  @Get(':id')
  getAssetById(@Param('id') id: number): Promise<Asset> {
    return this.assetService.getAssetById(id);
  }
  @Post('create')
  createAsset(
    @Body()
    body: CreateAssetDto,
  ): Promise<string> {
    return this.assetService.createAsset(
      body.type,
      body.category,
      body.description,
      body.amount,
    );
  }
  @Put('update/:id')
  updateAsset(
    @Param('id') id: number,
    @Body()
    body: UpdateAssetDto,
  ): Promise<string> {
    return this.assetService.updateAsset(
      id,
      body.type,
      body.amount,
      body.category,
      body.description,
    );
  }
  @Delete('delete/:id')
  deleteAsset(@Param('id') id: number): Promise<string> {
    return this.assetService.deleteAsset(id);
  }
}
