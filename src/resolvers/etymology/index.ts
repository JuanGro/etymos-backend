import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateEtymologyInput } from '../../inputs/CreateEtymologyInput';
import { UpdateEtymologyInput } from '../../inputs/UpdateEtymologyInput';
import { Etymology } from '../../models/Etymology';
import {
  ID_PARAM,
  DATA_PARAM,
  ETYMOLOGY_NOT_FOUND,
} from '../../config/constants';

@Resolver()
export default class EtymologyResolver {
  @Query(() => [Etymology])
  async getEtymologies(): Promise<Etymology[]> {
    return Etymology.find();
  }

  @Query(() => Etymology)
  async getEtymology(@Arg(ID_PARAM) id: number): Promise<Etymology> {
    const etymology = await Etymology.findOne({ where: { id } });
    if (!etymology) {
      throw new ApolloError(ETYMOLOGY_NOT_FOUND);
    } else {
      return etymology;
    }
  }

  @Mutation(() => Etymology)
  async createEtymology(
    @Arg(DATA_PARAM) data: CreateEtymologyInput,
  ): Promise<Etymology> {
    const etymology = Etymology.create(data);
    await etymology.save();
    return etymology;
  }

  @Mutation(() => Etymology)
  async updateEtymology(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateEtymologyInput,
  ): Promise<Etymology> {
    const etymology = await Etymology.findOne({ where: { id } });
    if (!etymology) {
      throw new ApolloError(ETYMOLOGY_NOT_FOUND);
    } else {
      Object.assign(etymology, data);
      await etymology.save();
      return etymology;
    }
  }

  @Mutation(() => Boolean)
  async deleteEtymology(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const etymology = await Etymology.findOne({ where: { id } });
    if (!etymology) {
      throw new ApolloError(ETYMOLOGY_NOT_FOUND);
    } else {
      await etymology.remove();
      return true;
    }
  }
}
