import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateQuestionInput } from "../../inputs/CreateQuestionInput";
import { UpdateQuestionInput } from "../../inputs/UpdateQuestionInput";
import { Question } from "../../models/Question";
import {
  ID_PARAM,
  DATA_PARAM,
  QUESTION_NOT_FOUND,
} from "../../config/constants";

@Resolver()
export class QuestionResolver {
  @Query(() => [Question])
  async getQuestions(): Promise<Question[]> {
    return Question.find();
  }

  @Query(() => Question)
  async getQuestion(@Arg(ID_PARAM) id: number): Promise<Question> {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new ApolloError(QUESTION_NOT_FOUND);
    } else {
      return question;
    }
  }

  @Mutation(() => Question)
  async createQuestion(
    @Arg(DATA_PARAM) data: CreateQuestionInput
  ): Promise<Question> {
    const question = Question.create(data);
    await question.save();
    return question;
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateQuestionInput
  ): Promise<Question> {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new ApolloError(QUESTION_NOT_FOUND);
    } else {
      Object.assign(question, data);
      await question.save();
      return question;
    }
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new ApolloError(QUESTION_NOT_FOUND);
    } else {
      await question.remove();
      return true;
    }
  }
}
