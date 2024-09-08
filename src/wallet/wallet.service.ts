// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { ConfigService } from '@nestjs/config';
import { TransactionService } from '../transaction/transaction.service';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
        private configService: ConfigService,
        private transactionService: TransactionService,
        private userService: UserService,
        private eventEmitter: EventEmitter2,
    ) {}

    
}
