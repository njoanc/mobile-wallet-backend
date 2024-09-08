import { Body, Controller, Post, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UseGuards, Get } from '@nestjs/common';
import { UserAuthGuard } from '../auth/guards';
import { UserDecorator } from '../user/decorators/user.decorator';
import { Transactions } from './entities/transaction.entity';
import { VerifyWebhookDto } from './dto/verify-webhook.dto';
import configuration from '../config/configuration';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService(configuration);

@Controller('transactions')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}
    
}
