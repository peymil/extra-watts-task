import { Controller } from '@nestjs/common';
import { BigNumber, Event } from 'ethers';
import { on } from 'src/contract/decorators';
import { Repository } from 'typeorm';
import { Approval, Transaction } from './entities';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('usdt-logger')
export class UsdtLoggerController {
  constructor(
    @InjectRepository(Approval)
    private approvalRepository: Repository<Approval>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  @on('Transfer')
  logTransactions(
    from: string,
    to: string,
    value: BigNumber,
    eventData: Event,
  ) {
    console.log('eventData', eventData);

    const transaction = new Transaction();
    transaction.contract = eventData.address;
    transaction.from = from;
    transaction.to = to;
    transaction.value = value._hex;
    this.transactionRepository.insert(transaction);
  }
  @on('Approval')
  logApproval(
    owner: string,
    spender: string,
    value: BigNumber,
    eventData: Event,
  ) {
    const approval = new Approval();
    approval.contract = eventData.address;
    approval.owner = owner;
    approval.spender = spender;
    approval.value = value._hex;
    this.approvalRepository.insert(approval);
  }
}
