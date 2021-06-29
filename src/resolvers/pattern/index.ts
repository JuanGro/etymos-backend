import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreatePatternInput } from '../../inputs/pattern/create';
import { UpdatePatternInput } from '../../inputs/pattern/update';
import { Pattern } from '../../models/pattern';
import {
  ID_PARAM,
  DATA_PARAM,
  PATTERN_NOT_FOUND,
} from '../../config/constants';

@Resolver()
export class PatternResolver {
  @Query(() => [Pattern])
  async getPatterns(): Promise<Pattern[]> {
    return Pattern.find();
  }

  @Query(() => Pattern)
  async getPattern(@Arg(ID_PARAM) id: number): Promise<Pattern> {
    const pattern = await Pattern.findOne({ where: { id } });
    if (!pattern) {
      throw new ApolloError(PATTERN_NOT_FOUND);
    }
    return pattern;
  }

  @Mutation(() => Pattern)
  async createPattern(
    @Arg(DATA_PARAM) data: CreatePatternInput,
  ): Promise<Pattern> {
    const pattern = Pattern.create(data);
    return pattern.save();
  }

  @Mutation(() => Pattern)
  async updatePattern(
    @Arg(ID_PARAM) id: number,
      @Arg(DATA_PARAM) data: UpdatePatternInput,
  ): Promise<Pattern> {
    const pattern = await Pattern.findOne({ where: { id } });
    if (!pattern) {
      throw new ApolloError(PATTERN_NOT_FOUND);
    }
    Object.assign(pattern, data);
    return pattern.save();
  }

  @Mutation(() => Pattern)
  async deletePattern(@Arg(ID_PARAM) id: number): Promise<Pattern> {
    const pattern = await Pattern.findOne({ where: { id } });
    if (!pattern) {
      throw new ApolloError(PATTERN_NOT_FOUND);
    }
    return pattern.remove();
  }
}
