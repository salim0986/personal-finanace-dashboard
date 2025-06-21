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
import { JournalService } from './journal.service';
import {
  CreateJournalDto,
  FilteredJournalDto,
  FilteredJournalResponseDto,
  UpdateJournalDto,
} from './journal.dto';
import { Journal } from './journal.entity';
import { RequestUserDTO } from 'src/utils/user-dto';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get('all')
  getAllJournals(
    @Query() query: FilteredJournalDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<FilteredJournalResponseDto> {
    return this.journalService.getAllJournals({
      ...query,
      userId: request.user.id,
    });
  }
  @Get(':id')
  getJournalById(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<Journal> {
    return this.journalService.getJournalById(id, request.user.id);
  }

  @Post('create')
  createJournal(
    @Body()
    body: CreateJournalDto,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.journalService.createJournal(
      body.title,
      body.content,
      request.user.id,
    );
  }
  @Put('update/:id')
  updateJournal(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
    @Body()
    body: UpdateJournalDto,
  ): Promise<string> {
    return this.journalService.updateJournal(
      id,
      request.user.id,
      body.title,
      body.content,
    );
  }
  @Delete('delete/:id')
  deleteJournal(
    @Param('id') id: number,
    @Request() request: Request & RequestUserDTO,
  ): Promise<string> {
    return this.journalService.deleteJournal(id, request.user.id);
  }
}
