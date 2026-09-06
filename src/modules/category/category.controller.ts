import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";

@Controller("/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("/create")
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get("/all")
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Get("/slug/:slug")
  async getCategoryBySlug(@Param("slug") slug: string) {
    const category = await this.categoryService.findBySlug({ slug });
    return category;
  }

  @Get(":id")
  async getCategoryById(@Param("id") id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @Patch(":id")
  async updateCategory(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
