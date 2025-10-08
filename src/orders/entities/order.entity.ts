// order.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  quantity: number;

  @ManyToOne(() => Product, { eager: true }) 
  @JoinColumn({ name: 'productId' }) 
  product: Product;
}