import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category-schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  getCategories() {
    return this.categoryModel.find();
  }

  getCategory(CategoryName: string) {
    return this.categoryModel.findOne({ title: CategoryName });
  }

  async createCategory(body: CreateCategoryDto): Promise<CategoryDocument> {
    const check = await this.categoryModel.findOne({
      title: body.title,
    });
    if (check) {
      throw new BadRequestException(`category ${body.title} already exists !`);
    }
    const category = new this.categoryModel(body);

    await category.save();

    return category;
  }
}
