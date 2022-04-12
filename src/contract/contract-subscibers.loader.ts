import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ContractMetadataAccessor } from './contract-metadata.accessor';
import { Contract } from 'ethers';
import { removeAllListeners } from 'process';

@Injectable()
export class ContractSubscriberLoader
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    private readonly discoveryService: DiscoveryService,
    @Inject('CONTRACTS_PROVIDER')
    private readonly contractsProvider: {
      [k: string]: Contract;
    },
    private readonly metadataAccessor: ContractMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    this.loadEventListeners();
  }

  onApplicationShutdown() {
    Object.values(this.contractsProvider).forEach((contract) =>
      contract.removeAllListeners(),
    );
  }

  loadEventListeners() {
    const providers = this.discoveryService.getProviders();
    const controllers = this.discoveryService.getControllers();
    [...providers, ...controllers]
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter((wrapper) => wrapper.instance)
      .forEach((wrapper: InstanceWrapper) => {
        const { instance } = wrapper;

        const prototype = Object.getPrototypeOf(instance);
        this.metadataScanner.scanFromPrototype(
          instance,
          prototype,
          (methodKey: string) => {
            return this.subscribeToEventIfListener(instance, methodKey);
          },
        );
      });
  }

  private subscribeToEventIfListener(
    instance: Record<string, any>,
    methodKey: string,
  ) {
    const eventListenerMetadata = this.metadataAccessor.getEventHandlerMetadata(
      instance[methodKey],
    );
    if (!eventListenerMetadata) {
      return;
    }
    const { event } = eventListenerMetadata;
    const contract = this.contractsProvider[''];
    if (!contract) return;
    contract.on(event, (...args: unknown[]) => instance[methodKey](...args));
  }
}
