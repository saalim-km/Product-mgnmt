import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  async getTopProducts(limit = 5) {
    const orders = await this.orderRepo.find({ relations: ['product'] });
    const totalsMap = {};

    for (const order of orders) {
      const productId = order.product.id;
      if (!totalsMap[productId]) {
        totalsMap[productId] = {
          productId,
          name: order.product.name,
          totalSold: 0,
        };
      }
      totalsMap[productId].totalSold += order.quantity;
    }

    const totalsArray = Object.values(totalsMap).sort(
      (a: any, b: any) => b.totalSold - a.totalSold,
    );

    return totalsArray.slice(0, limit);
  }
}
