import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '../../src/wallet/wallet.service';
import { Repository } from 'typeorm';
import { Wallet } from '../../src/wallet/entities/wallet.entity';
import { ConfigService } from '@nestjs/config';
import { TransactionService } from '../../src/transaction/transaction.service';
import { UserService } from '../../src/user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  WalletNotFoundException,
  InternalErrorException,
  InsufficientTokensException,
} from '../../src/exceptions';
import { FundWalletByCardDto } from '../../src/wallet/dto/fund-wallet-card.dto';

const mockWalletRepository = {
  findOne: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'FLW_PUBLIC_KEY') return 'test_public_key';
    if (key === 'FLW_SECRET_KEY') return 'test_secret_key';
    if (key === 'FLW_ENCRYPTION_KEY') return 'test_encryption_key';
    if (key === 'WEBHOOK_URL') return 'http://test.webhook.url';
    return null;
  }),
};

const mockTransactionService = {
  createTransaction: jest.fn(),
};

const mockUserService = {
  isVerifiedUser: jest.fn(),
  validateTransactionPin: jest.fn(),
};

const mockEventEmitter = {
  emit: jest.fn(),
};

// Mock Flutterwave for testing
jest.mock('flutterwave-node-v3', () => {
  return jest.fn().mockImplementation(() => ({
    Charge: {
      card: jest.fn(),
      ng: jest.fn(),
    },
    Transfer: {
      initiate: jest.fn(),
    },
  }));
});

describe('WalletService', () => {
  let service: WalletService;
  let walletRepository: Repository<Wallet>;
  let configService: ConfigService;
  let transactionService: TransactionService;
  let userService: UserService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: getRepositoryToken(Wallet), useValue: mockWalletRepository },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: UserService, useValue: mockUserService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    walletRepository = module.get<Repository<Wallet>>(
      getRepositoryToken(Wallet),
    );
    configService = module.get<ConfigService>(ConfigService);
    transactionService = module.get<TransactionService>(TransactionService);
    userService = module.get<UserService>(UserService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fundWalletWithCard', () => {
    it('should fund the wallet with a card and return success message', async () => {
      const user = { userId: 1 };
      const data = {
        card: '1234567890123456',
        cardCvv: '123',
        cardExpiration: '12/24',
        amount: 1000,
      } as FundWalletByCardDto;

      const mockWallet = {
        user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      };
      const mockFlutterwaveResponse = {
        status: 'success',
        message: 'Transaction successful',
        meta: { authorization: {} },
      };

      // Mocking the repository and external services
      mockWalletRepository.findOne.mockResolvedValue(mockWallet);
      mockUserService.isVerifiedUser.mockResolvedValue(true);
      const flutterwaveMock = require('flutterwave-node-v3');
      flutterwaveMock.mockImplementationOnce(() => ({
        Charge: { card: jest.fn().mockResolvedValue(mockFlutterwaveResponse) },
      }));

      const result = await service.fundWalletWithCard(user, data);

      expect(result).toEqual({
        status: 'success',
        message:
          ' 1000 tokens is on the way to your wallet, you can check your wallet to see the balance',
      });
      expect(transactionService.createTransaction).toHaveBeenCalled();
    });

    it('should throw WalletNotFoundException if wallet is not found', async () => {
      const user = { userId: 1 };
      const data = {
        card: '1234567890123456',
        cardCvv: '123',
        cardExpiration: '12/24',
        amount: 1000,
      } as FundWalletByCardDto;

      // Mocking wallet not found
      mockWalletRepository.findOne.mockResolvedValue(null);

      await expect(service.fundWalletWithCard(user, data)).rejects.toThrow(
        WalletNotFoundException,
      );
    });

    it('should handle flutterwave API errors and throw InternalErrorException', async () => {
      const user = { userId: 1 };
      const data = {
        card: '1234567890123456',
        cardCvv: '123',
        cardExpiration: '12/24',
        amount: 1000,
      } as FundWalletByCardDto;

      const mockWallet = {
        user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      };

      // Mocking the repository and external services
      mockWalletRepository.findOne.mockResolvedValue(mockWallet);
      mockUserService.isVerifiedUser.mockResolvedValue(true);

      // Mock flutterwave API to throw an error
      const flutterwaveMock = require('flutterwave-node-v3');
      flutterwaveMock.mockImplementationOnce(() => ({
        Charge: { card: jest.fn().mockRejectedValue(new Error('API error')) },
      }));

      await expect(service.fundWalletWithCard(user, data)).rejects.toThrow(
        InternalErrorException,
      );
    });
  });
});
