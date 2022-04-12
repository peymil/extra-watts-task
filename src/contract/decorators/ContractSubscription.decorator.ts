import { SetMetadata } from '@nestjs/common';
import { CONTRACT_SUBSCRIPTION_KEY } from './ContractSubscription.constant';

export const Contract = (contractAdress: string): MethodDecorator => {
  return SetMetadata(CONTRACT_SUBSCRIPTION_KEY, { contractAdress });
};
