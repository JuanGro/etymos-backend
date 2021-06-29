import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateQuestionInput } from '../../inputs/question/create';
import { UpdateQuestionInput } from '../../inputs/question/update';
import { Question } from '../../models/question';
import {
  ID_PARAM,
  DATA_PARAM,
  QUESTION_NOT_FOUND,
} from '../../config/constants';

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
    }
    return question;
  }

  @Mutation(() => Question)
  async createQuestion(
    @Arg(DATA_PARAM) data: CreateQuestionInput,
  ): Promise<Question> {
    const question = Question.create(data);
    return question.save();
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Arg(ID_PARAM) id: number,
      @Arg(DATA_PARAM) data: UpdateQuestionInput,
  ): Promise<Question> {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new ApolloError(QUESTION_NOT_FOUND);
    }
    Object.assign(question, data);
    return question.save();
  }

  @Mutation(() => Question)
  async deleteQuestion(@Arg(ID_PARAM) id: number): Promise<Question> {
    const question = await Question.findOne({ where: { id } });
    if (!question) {
      throw new ApolloError(QUESTION_NOT_FOUND);
    }
    return question.remove();
  }
}
