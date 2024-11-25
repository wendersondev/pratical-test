import { Injectable } from '@nestjs/common';
import { OrdersService } from '../../application/service/orders.service';
import { Order } from '../model/order.model';

@Injectable()
export class ProcessOrderUseCase {
  constructor(private readonly ordersService: OrdersService) {}

  async execute(order: Order): Promise<void> {
    if (order.amount < 100) {
      order.status = 'CANCELADO';
    } else {
      order.status = 'CONFIRMADO';
    }
    await this.ordersService.publishOrderStatus(order);
  }
}
