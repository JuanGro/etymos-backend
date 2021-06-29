import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateCategoryInput } from '../../inputs/category/create';
import { UpdateCategoryInput } from '../../inputs/category/update';
import { Category } from '../../models/category';
import {
  ID_PARAM,
  DATA_PARAM,
  CATEGORY_NOT_FOUND,
} from '../../config/constants';

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return Category.find();
  }

  @Query(() => Category)
  async getCategory(@Arg(ID_PARAM) id: number): Promise<Category> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new ApolloError(CATEGORY_NOT_FOUND);
    }
    return category;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg(DATA_PARAM) data: CreateCategoryInput,
  ): Promise<Category> {
    const category = Category.create(data);
    return category.save();
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new ApolloError(CATEGORY_NOT_FOUND);
    }
    Object.assign(category, data);
    return category.save();
  }

  @Mutation(() => Category)
  async deleteCategory(@Arg(ID_PARAM) id: number): Promise<Category> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new ApolloError(CATEGORY_NOT_FOUND);
    }
      return category.remove();
  }
}
