import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateCategoryInput } from "../../inputs/CreateCategoryInput";
import { UpdateCategoryInput } from "../../inputs/UpdateCategoryInput";
import { Category } from "../../models/Category";
import {
  ID_PARAM,
  DATA_PARAM,
  CATEGORY_NOT_FOUND,
} from "../../config/messages";

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
    } else {
      return category;
    }
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg(DATA_PARAM) data: CreateCategoryInput
  ): Promise<Category> {
    const category = Category.create(data);
    await category.save();
    return category;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateCategoryInput
  ): Promise<Category> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new ApolloError(CATEGORY_NOT_FOUND);
    } else {
      Object.assign(category, data);
      await category.save();
      return category;
    }
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new ApolloError(CATEGORY_NOT_FOUND);
    } else {
      await category.remove();
      return true;
    }
  }
}
