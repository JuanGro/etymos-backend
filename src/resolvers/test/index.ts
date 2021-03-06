import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateTestInput } from '../../inputs/test/create';
import { UpdateTestInput } from '../../inputs/test/update';
import { Test } from '../../models/test';
import { ID_PARAM, DATA_PARAM, TEST_NOT_FOUND } from '../../config/constants';

@Resolver()
export class TestResolver {
  @Query(() => [Test])
  async getTests(): Promise<Test[]> {
    return Test.find();
  }

  @Query(() => Test)
  async getTest(@Arg(ID_PARAM) id: number): Promise<Test> {
    const test = await Test.findOne({ where: { id } });
    if (!test) {
      throw new ApolloError(TEST_NOT_FOUND);
    } else {
      return test;
    }
  }

  @Mutation(() => Test)
  async createTest(@Arg(DATA_PARAM) data: CreateTestInput): Promise<Test> {
    const test = Test.create(data);
    await test.save();
    return test;
  }

  @Mutation(() => Test)
  async updateTest(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateTestInput,
  ): Promise<Test> {
    const test = await Test.findOne({ where: { id } });
    if (!test) {
      throw new ApolloError(TEST_NOT_FOUND);
    } else {
      Object.assign(test, data);
      await test.save();
      return test;
    }
  }

  @Mutation(() => Boolean)
  async deleteTest(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const test = await Test.findOne({ where: { id } });
    if (!test) {
      throw new ApolloError(TEST_NOT_FOUND);
    } else {
      await test.remove();
      return true;
    }
  }
}
