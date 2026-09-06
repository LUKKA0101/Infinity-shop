import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { Repository } from "typeorm";

import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/category.dto";
import { UpdateCategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      slug: slugify(createCategoryDto.name, { lower: true, strict: true }),
    });
    return await this.categoryRepository.save(category);
  }

  async getAllCategories() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findBySlug({ slug }: { slug: string }) {
    const category = await this.categoryRepository.findOneBy({ slug });
    if (!category) {
      throw new Error(`Category with slug ${slug} not found`);
    }
    return category;
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return category;
  }

  async updateCategory(id: string, UpdateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    this.categoryRepository.merge(category, UpdateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return await this.categoryRepository.remove(category);
  }
}
