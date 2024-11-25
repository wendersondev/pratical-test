import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from '../../domain/model/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('RESULT_SERVICE') private readonly resultClient: ClientProxy,
  ) {}

  async publishOrderStatus(order: Order): Promise<void> {
    this.resultClient.emit('order-status-updated', order); 
  }
}
