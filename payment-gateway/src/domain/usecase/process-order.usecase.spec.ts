import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../../application/service/orders.service';
import { ProcessOrderUseCase } from './process-order.usecase';
import { Order } from '../model/order.model';

describe('ProcessOrderUseCase', () => {
  let processOrderUseCase: ProcessOrderUseCase;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessOrderUseCase,
        {
          provide: OrdersService,
          useValue: {
            publishOrderStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    processOrderUseCase = module.get<ProcessOrderUseCase>(ProcessOrderUseCase);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should update status to CANCELADO if amount is less than 100', async () => {
    const order: Order = { id: 1, amount: 50, status: 'PENDING' };
    await processOrderUseCase.execute(order);
    expect(ordersService.publishOrderStatus).toHaveBeenCalledWith({
      ...order,
      status: 'CANCELADO',
    });
  });

  it('should update status to CONFIRMADO if amount is 100 or more', async () => {
    const order: Order = { id: 1, amount: 150, status: 'PENDING' };
    await processOrderUseCase.execute(order);
    expect(ordersService.publishOrderStatus).toHaveBeenCalledWith({
      ...order,
      status: 'CONFIRMADO',
    });
  });
});
