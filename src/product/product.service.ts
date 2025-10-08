import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { name, price } = createProductDto;

    const isProductExists = await this.productRepo.findOne({ where: { name } });

    if (isProductExists) {
      throw new Error('Product already exists');
    }

    const product = this.productRepo.create({ name, price });
    return await this.productRepo.save(product);
  }

  async findAll() {
    return await this.productRepo.find();
  }
}
