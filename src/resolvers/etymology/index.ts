import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateEtymologyInput } from '../../inputs/etymology/create';
import { UpdateEtymologyInput } from '../../inputs/etymology/update';
import { Etymology } from '../../models/etymology';
import {
  ID_PARAM,
  DATA_PARAM,
  ETYMOLOGY_NOT_FOUND,
} from '../../config/constants';

@Resolver()
export class EtymologyResolver {
  @Query(() => [Etymology])
  async getEtymologies(): Promise<Etymology[]> {
    return Etymology.find();
  }

  @Query(() => Etymology)
  async getEtymology(@Arg(ID_PARAM) id: number): Promise<Etymology> {
    const etymology = await Etymology.findOne({ where: { id } });
    if (!etymology) {
      throw new ApolloError(ETYMOLOGY_NOT_FOUND);
    }
    return etymology;
  }

  @Mutation(() => Etymology)
  async createEtymology(
    @Arg(DATA_PARAM) data: CreateEtymologyInput,
  ): Promise<Etymology> {
    const etymology = Etymology.create(data);
    return etymology.save();
  }

  @Mutation(() => Etymology)
  async updateEtymology(
    @Arg(ID_PARAM) id: number,
      @Arg(DATA_PARAM) data: UpdateEtymologyInput,
  ): Promise<Etymology> {
    const etymology = await Etymology.findOne({ where: { id } });
    if (!etymology) {
      throw new ApolloError(ETYMOLOGY_NOT_FOUND);
    }
    Object.assign(etymology, data);
    return etymology.save();
  }

  @Mutation(() => Etymology)
  async deleteEtymology(@Arg(ID_PARAM) id: number): Promise<Etymology> {
    const etymology = await Etymology.findOne({ where: { id } });
    if (!etymology) {
      throw new ApolloError(ETYMOLOGY_NOT_FOUND);
    }
    return etymology.remove();
  }
}
