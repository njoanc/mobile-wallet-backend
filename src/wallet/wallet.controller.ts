import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';


@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    
}