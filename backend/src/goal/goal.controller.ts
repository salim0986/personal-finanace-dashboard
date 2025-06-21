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
import { GoalService } from './goal.service';
import {
  CreateGoalDto,
  FilteredGoalDto,
  FilteredGoalResponseDto,
  UpdateGoalDto,
} from './goal.dto';
import { Goal } from './goal.entity';
import { RequestUserDTO } from 'src/utils/user-dto';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get('all')
  getAllGoals(
    @Query() query: FilteredGoalDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<FilteredGoalResponseDto> {
    return this.goalService.getAllGoals({ ...query, userId: request.user.id });
  }
  @Get('update-status')
  updateGoalStatus(
    @Request() request: Request & RequestUserDTO,
  ): Promise<void> {
    return this.goalService.updateAllGoalStatus(request.user.id);
  }
  @Get(':id')
  getGoalById(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<Goal> {
    return this.goalService.getGoalById(id, request.user.id);
  }

  @Post('create')
  createGoal(
    @Body()
    body: CreateGoalDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.goalService.createGoal(
      body.title,
      body.targetAmount,
      body.deadline,
      request.user.id,
    );
  }
  @Put('update/:id')
  updateGoal(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
    @Body()
    body: UpdateGoalDto,
  ): Promise<string> {
    return this.goalService.updateGoal(
      id,
      request.user.id,
      body.title,
      body.targetAmount,
      body.sum,
      body.deadline,
      body.status,
    );
  }
  @Delete('delete/:id')
  deleteGoal(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.goalService.deleteGoal(id, request.user.id);
  }
}
