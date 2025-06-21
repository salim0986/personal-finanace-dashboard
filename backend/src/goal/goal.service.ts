import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { FilteredGoalDto, FilteredGoalResponseDto } from './goal.dto';
import { tryCatch } from 'src/utils/try-catch';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal) private repo: Repository<Goal>,
    private userService: UserService,
  ) {}

  async getAllGoals({
    search,
    sort = 'createdAt_desc',
    page = 1,
    limit = 10,
    targetAmount,
    status,
    startDate,
    endDate,
    deadline,
    userId,
  }: FilteredGoalDto): Promise<FilteredGoalResponseDto> {
    return tryCatch(async () => {
      const [sortField, sortOrder] = sort.split('_');
      const filters: any = { userId };

      if (search) {
        filters.title = ILike(`%${search}%`);
      }
      if (targetAmount) {
        filters.targetAmount = LessThanOrEqual(targetAmount);
      }
      if (status) {
        filters.status = status;
      }
      if (startDate) {
        filters.createdAt = MoreThanOrEqual(new Date(startDate));
      }
      if (endDate) {
        filters.createdAt = LessThanOrEqual(new Date(endDate));
      }
      if (deadline) {
        filters.deadline = LessThanOrEqual(new Date(deadline));
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
    }, 'Error fetching goals');
  }
  async getGoalById(id: number, userId: number): Promise<Goal> {
    return tryCatch(async () => {
      const goal = await this.repo.findOneBy({ id });
      if (goal.userId != userId) {
        throw new ForbiddenException(
          'You are not allowed to read or write this request!',
        );
      }
      if (!goal) {
        throw new NotFoundException('Goal not found');
      }
      return goal;
    }, 'Error fetching goal by ID');
  }
  async createGoal(
    title: string,
    targetAmount: number,
    deadline: Date,
    userId: number,
  ): Promise<string> {
    return tryCatch(async () => {
      if (!title) {
        throw new Error('Title is required');
      }
      if (!targetAmount) {
        throw new Error('Target Amount is required');
      }
      if (!deadline) {
        throw new Error('Deadline is required');
      }
      const user = await this.userService.getOne(userId);
      const goal = this.repo.create({
        title,
        targetAmount,
        deadline: new Date(deadline),
        user,
        userId: user.id,
      });
      user.goals = [...(user.goals || []), goal];
      await this.repo.save(goal);
      return 'Goal created successfully';
    }, 'Error creating goal');
  }
  async updateGoal(
    id: number,
    userId: number,
    title?: string,
    targetAmount?: number,
    sum?: number,
    deadline?: Date,
    status?: string,
  ): Promise<string> {
    return tryCatch(async () => {
      const goal = await this.getGoalById(id, userId);
      if (goal.userId != userId) {
        throw new ForbiddenException(
          'You are not allowed to read or write this request!',
        );
      }
      if (title) goal.title = title;
      if (targetAmount) goal.targetAmount = targetAmount;
      if (sum) {
        goal.currentAmount = +goal.currentAmount + sum;
        goal.history.push({ date: new Date(), amount: sum });
        if (goal.currentAmount >= goal.targetAmount) {
          goal.status = 'completed';
        }
      }
      if (deadline) goal.deadline = new Date(deadline);
      if (status) goal.status = status;

      await this.repo.save(goal);
      return 'Goal updated successfully';
    }, 'Error updating goal');
  }
  async updateAllGoalStatus(userId: number): Promise<void> {
    return tryCatch(async () => {
      const goals = await this.repo.findBy({ userId });
      const now = new Date();
      for (const goal of goals) {
        if (goal.currentAmount >= goal.targetAmount) {
          goal.status = 'completed';
        } else if (new Date(goal.deadline) < now) {
          goal.status = 'failed';
        } else {
          goal.status = 'active';
        }
        await this.repo.save(goal);
      }
    }, 'Error updating all goal statuses');
  }
  async deleteGoal(id: number, userId: number): Promise<string> {
    return tryCatch(async () => {
      const goal = await this.getGoalById(id, userId);
      if (goal.userId != userId) {
        throw new ForbiddenException(
          'You are not allowed to read or write this request!',
        );
      }
      await this.repo.remove(goal);
      return 'Goal deleted successfully';
    }, 'Error deleting goal');
  }
}
