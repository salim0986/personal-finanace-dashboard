import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './journal.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Journal]), UserModule],
  providers: [JournalService],
  controllers: [JournalController],
})
export class JournalModule {}
