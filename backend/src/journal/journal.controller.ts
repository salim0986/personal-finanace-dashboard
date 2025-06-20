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
import { JournalService } from './journal.service';
import {
  CreateJournalDto,
  FilteredJournalDto,
  FilteredJournalResponseDto,
  UpdateJournalDto,
} from './journal.dto';
import { Journal } from './journal.entity';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get('all')
  getAllJournals(
    @Query() query: FilteredJournalDto,
  ): Promise<FilteredJournalResponseDto> {
    return this.journalService.getAllJournals(query);
  }
  @Get(':id')
  getJournalById(@Param('id') id: number): Promise<Journal> {
    return this.journalService.getJournalById(id);
  }

  @Post('create')
  createJournal(
    @Body()
    body: CreateJournalDto,
  ): Promise<string> {
    return this.journalService.createJournal(body.title, body.content);
  }
  @Put('update/:id')
  updateJournal(
    @Param('id') id: number,
    @Body()
    body: UpdateJournalDto,
  ): Promise<string> {
    return this.journalService.updateJournal(id, body.title, body.content);
  }
  @Delete('delete/:id')
  deleteJournal(@Param('id') id: number): Promise<string> {
    return this.journalService.deleteJournal(id);
  }
}
