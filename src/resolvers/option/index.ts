import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateOptionInput } from '../../inputs/CreateOptionInput';
import { UpdateOptionInput } from '../../inputs/UpdateOptionInput';
import { Option } from '../../models/option';
import { ID_PARAM, DATA_PARAM, OPTION_NOT_FOUND } from '../../config/constants';

@Resolver()
export class OptionResolver {
  @Query(() => [Option])
  async getOptions(): Promise<Option[]> {
    return Option.find();
  }

  @Query(() => Option)
  async getOption(@Arg(ID_PARAM) id: number): Promise<Option> {
    const option = await Option.findOne({ where: { id } });
    if (!option) {
      throw new ApolloError(OPTION_NOT_FOUND);
    } else {
      return option;
    }
  }

  @Mutation(() => Option)
  async createOption(
    @Arg(DATA_PARAM) data: CreateOptionInput,
  ): Promise<Option> {
    const option = Option.create(data);
    await option.save();
    return option;
  }

  @Mutation(() => Option)
  async updateOption(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateOptionInput,
  ): Promise<Option> {
    const option = await Option.findOne({ where: { id } });
    if (!option) {
      throw new ApolloError(OPTION_NOT_FOUND);
    } else {
      Object.assign(option, data);
      await option.save();
      return option;
    }
  }

  @Mutation(() => Boolean)
  async deleteOption(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const option = await Option.findOne({ where: { id } });
    if (!option) {
      throw new ApolloError(OPTION_NOT_FOUND);
    } else {
      await option.remove();
      return true;
    }
  }
}
