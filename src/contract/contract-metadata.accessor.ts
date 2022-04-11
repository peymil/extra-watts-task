import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ON_DECORATOR_METADATA_KEY } from './decorators/on.constant';

@Injectable()
export class ContractMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getEventHandlerMetadata(target: Type<unknown>) {
    return this.reflector.get(ON_DECORATOR_METADATA_KEY, target);
  }
}
