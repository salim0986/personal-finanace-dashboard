import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { AssetModule } from './asset/asset.module';
import { GoalModule } from './goal/goal.module';
import { JournalModule } from './journal/journal.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entitiy';
import { Transaction } from './transaction/transaction.entity';
import { Goal } from './goal/goal.entity';
import { Journal } from './journal/journal.entity';
import { Asset } from './asset/asset.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Transaction, Goal, Journal, Asset],
      synchronize: process.env.ENVIRONMENT === 'development', // set false in production!
    }),
    UserModule,
    AssetModule,
    TransactionModule,
    GoalModule,
    JournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
