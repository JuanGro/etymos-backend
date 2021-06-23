import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { CreateWordInput } from '../../inputs/CreateWordInput';
import { UpdateWordInput } from '../../inputs/UpdateWordInput';
import { Word } from '../../models/Word';
import { ID_PARAM, DATA_PARAM, WORD_NOT_FOUND } from '../../config/constants';

@Resolver()
export default class WordResolver {
  @Query(() => [Word])
  async getWords(): Promise<Word[]> {
    return Word.find({ relations: ['users'] });
  }

  @Query(() => Word)
  async getWord(@Arg(ID_PARAM) id: number): Promise<Word> {
    const word = await getConnection()
      .createQueryBuilder()
      .select('word')
      .from(Word, 'word')
      .leftJoinAndSelect('word.users', 'user')
      .where('word.id = :id', { id })
      .getOne();

    if (!word) {
      throw new ApolloError(WORD_NOT_FOUND);
    } else {
      return word;
    }
  }

  @Mutation(() => Word)
  async createWord(@Arg(DATA_PARAM) data: CreateWordInput): Promise<Word> {
    const word = Word.create(data);
    await word.save();
    return word;
  }

  @Mutation(() => Word)
  async updateWord(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateWordInput,
  ): Promise<Word> {
    const word = await Word.findOne({ where: { id } });
    if (!word) {
      throw new ApolloError(WORD_NOT_FOUND);
    } else {
      Object.assign(word, data);
      await word.save();
      return word;
    }
  }

  @Mutation(() => Boolean)
  async deleteWord(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const word = await Word.findOne({ where: { id } });
    if (!word) {
      throw new ApolloError(WORD_NOT_FOUND);
    } else {
      await word.remove();
      return true;
    }
  }
}
