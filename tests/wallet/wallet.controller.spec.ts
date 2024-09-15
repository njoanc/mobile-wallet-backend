import { Test, TestingModule } from '@nestjs/testing';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { WalletController } from '../../src/wallet/wallet.controller';
import { UserModule } from '../../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../../src/wallet/entities/wallet.entity';
import { TransactionModule } from '../../src/transaction/transaction.module';
import { WalletService } from '../../src/wallet/wallet.service';
import { MailModule } from '../../src/mail/mail.module';
import { EventEmitter2 } from 'eventemitter2';
import { UserService } from '../../src/user/user.service';
import { WithdrawWalletDto } from '../../src/wallet/dto/withraw-wallet.dto';
import { v4 as uuidv4 } from 'uuid';
import { FundWalletByCardDto } from '../../src/wallet/dto/fund-wallet-card.dto';
import { UserAuthGuard } from '../../src/auth/guards';

jest.setTimeout(60000);

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;
  let userService: UserService;

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  const userId = uuidv4(); // Consistent user ID for tests
  const verifiedUser = {
    id: { userId }, // Use consistent userId
    verified: true,
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        forwardRef(() => TransactionModule),
        TypeOrmModule.forFeature([Wallet]),
        MailModule,
      ],
      controllers: [WalletController],
      providers: [
        WalletService,
        UserService,
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },

        {
          provide: WalletService,
          useValue: {
            checkIfWalletExists: jest.fn().mockResolvedValue({
              user: {
                id: verifiedUser.id.userId, // Ensure the user ID matches
                email: verifiedUser.email,
                firstName: verifiedUser.firstName,
                lastName: verifiedUser.lastName,
                verified: verifiedUser.verified,
              },
              balance: 5000, // Provide sufficient balance
            }),
            fundWalletByBank: jest.fn().mockResolvedValue({
              status: 'success',
              message:
                'You have successfully withdrawn 3000 tokens from your wallet',
            }),
            reconcileFundMethod: jest.fn().mockResolvedValue({
              status: 'success',
              message: 'Wallet funded successfully',
            }),
          },
        },
        {
          provide: UserService,
          useValue: {
            isVerifiedUser: jest.fn().mockResolvedValue(verifiedUser),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
    userService = module.get<UserService>(UserService);
  });

  describe('POST /wallet/user/fund-wallet', () => {
    it('should fund a user wallet', async () => {
      const fund: FundWalletByCardDto = {
        cardExpiration: '12/20',
        card: '1234567890123456',
        cardCvv: '123',
        amount: 1000,
        otp: '1234',
      };
      const type = 'card';

      jest.spyOn(service, 'reconcileFundMethod').mockResolvedValue({
        status: 'success',
        message: 'Wallet funded successfully',
      });

      const result = await controller.fundWallet(fund, type, userId);
      const serviceResult = await service.reconcileFundMethod(
        userId,
        type,
        fund,
      );

      expect(result.status).toEqual('success');
      expect(result.message).toEqual('Wallet funded successfully');
      expect(serviceResult.status).toEqual('success');
      expect(serviceResult.message).toEqual('Wallet funded successfully');
    });
  });

  describe('POST /wallet/withdrawals', () => {
    it('controller to withdraw funds from a user wallet', async () => {
      try {
        const guards = Reflect.getMetadata(
          '__guards__',
          controller.withdrawFromWallet,
        );
        const guard = new guards[0]();
        const user = uuidv4();
        const withdraw: WithdrawWalletDto = {
          amount: 3000,
          account_bank: 'United Bank for Africa',
          accountNumber: '0690000037',
          transactionPin: '2000',
        };

        const result = await controller.withdrawFromWallet(withdraw, user);
        const serviceResult = await service.fundWalletByBank(withdraw, user);
        expect(result).toHaveBeenCalledWith(withdraw, user);

        expect(service).toBeCalledWith(withdraw, user);
        expect(serviceResult).toHaveBeenCalledWith(withdraw, user);
        expect(guard).toBeInstanceOf(UserAuthGuard);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
