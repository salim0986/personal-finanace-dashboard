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
import { GoalService } from './goal.service';
import {
  CreateGoalDto,
  FilteredGoalDto,
  FilteredGoalResponseDto,
  UpdateGoalDto,
} from './goal.dto';
import { Goal } from './goal.entity';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get('all')
  getAllGoals(
    @Query() query: FilteredGoalDto,
  ): Promise<FilteredGoalResponseDto> {
    return this.goalService.getAllGoals(query);
  }
  @Get('update-status')
  updateGoalStatus(): Promise<void> {
    return this.goalService.updateAllGoalStatus();
  }
  @Get(':id')
  getGoalById(@Param('id') id: number): Promise<Goal> {
    return this.goalService.getGoalById(id);
  }

  @Post('create')
  createGoal(
    @Body()
    body: CreateGoalDto,
  ): Promise<string> {
    return this.goalService.createGoal(
      body.title,
      body.targetAmount,
      body.deadline,
    );
  }
  @Put('update/:id')
  updateGoal(
    @Param('id') id: number,
    @Body()
    body: UpdateGoalDto,
  ): Promise<string> {
    return this.goalService.updateGoal(
      id,
      body.title,
      body.targetAmount,
      body.sum,
      body.deadline,
      body.status,
    );
  }
  @Delete('delete/:id')
  deleteGoal(@Param('id') id: number): Promise<string> {
    return this.goalService.deleteGoal(id);
  }
}
