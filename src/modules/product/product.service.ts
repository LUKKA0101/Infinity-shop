import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "../category/category.entity";
import { CreateProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;
    const category = categoryId
      ? await this.categoryRepository.findOneBy({ id: categoryId })
      : undefined;

    if (categoryId && !category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const product = this.productRepository.create({
      ...productData,
      category: category ?? undefined,
    });

    return await this.productRepository.save(product);
  }

  async getAllProducts() {
    return await this.productRepository.find({
      relations: { category: true },
    });
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const { categoryId, ...productData } = updateProductDto;
    this.productRepository.merge(product, productData);

    if (categoryId !== undefined) {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }

      product.category = category;
    }

    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return await this.productRepository.remove(product);
  }
}
