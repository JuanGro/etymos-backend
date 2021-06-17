import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateTestInput } from "../../inputs/CreateTestInput";
import { UpdateTestInput } from "../../inputs/UpdateTestInput";
import { Test } from "../../models/Test";
import { ID_PARAM, DATA_PARAM, TEST_NOT_FOUND } from "../../config/messages";

@Resolver()
export class TestResolver {
  @Query(() => [Test])
  async getTests(): Promise<Test[]> {
    return Test.find();
  }

  @Query(() => Test)
  async getTest(@Arg(ID_PARAM) id: number) {
    const test = await Test.findOne({ where: { id } });
    if (!test) {
      throw new ApolloError(TEST_NOT_FOUND);
    } else {
      return test;
    }
  }

  @Mutation(() => Test)
  async createTest(@Arg(DATA_PARAM) data: CreateTestInput) {
    const test = Test.create(data);
    await test.save();
    return test;
  }

  @Mutation(() => Test)
  async updateTest(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateTestInput
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
  async deleteTest(@Arg(ID_PARAM) id: number) {
    const test = await Test.findOne({ where: { id } });
    if (!test) {
      throw new ApolloError(TEST_NOT_FOUND);
    } else {
      await test.remove();
      return true;
    }
  }
}
