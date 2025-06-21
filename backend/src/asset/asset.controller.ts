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
import { AssetService } from './asset.service';
import {
  CreateAssetDto,
  FilteredAssetDto,
  FilteredAssetResponseDto,
  UpdateAssetDto,
} from './asset.dto';
import { Asset } from './asset.entity';
import { RequestUserDTO } from 'src/utils/user-dto';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('all')
  getAllAssets(
    @Query() query: FilteredAssetDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<FilteredAssetResponseDto> {
    return this.assetService.getAllAssets({
      ...query,
      userId: request.user.id,
    });
  }
  @Get(':id')
  getAssetById(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<Asset> {
    return this.assetService.getAssetById(id, request.user.id);
  }
  @Post('create')
  createAsset(
    @Body()
    body: CreateAssetDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.assetService.createAsset(
      body.type,
      body.category,
      body.description,
      body.amount,
      request.user.id,
    );
  }
  @Put('update/:id')
  updateAsset(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
    @Body()
    body: UpdateAssetDto,
  ): Promise<string> {
    return this.assetService.updateAsset(
      id,
      request.user.id,
      body.type,
      body.amount,
      body.category,
      body.description,
    );
  }
  @Delete('delete/:id')
  deleteAsset(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.assetService.deleteAsset(id, request.user.id);
  }
}
