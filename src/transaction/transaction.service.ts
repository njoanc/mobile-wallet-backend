import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Transactions } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';


@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transactions)
        private TransactionsRepository: Repository<Transactions>,
        @Inject(forwardRef(() => WalletService))
        private walletService: WalletService,
    ) {}
    
    
}
