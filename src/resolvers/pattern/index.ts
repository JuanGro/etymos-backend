import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreatePatternInput } from "../../inputs/CreatePatternInput";
import { UpdatePatternInput } from "../../inputs/UpdatePatternInput";
import { Pattern } from "../../models/Pattern";
import { ID_PARAM, DATA_PARAM, PATTERN_NOT_FOUND } from "../../config/messages";

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
    } else {
      return pattern;
    }
  }

  @Mutation(() => Pattern)
  async createPattern(
    @Arg(DATA_PARAM) data: CreatePatternInput
  ): Promise<Pattern> {
    const pattern = Pattern.create(data);
    await pattern.save();
    return pattern;
  }

  @Mutation(() => Pattern)
  async updatePattern(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdatePatternInput
  ): Promise<Pattern> {
    const pattern = await Pattern.findOne({ where: { id } });
    if (!pattern) {
      throw new ApolloError(PATTERN_NOT_FOUND);
    } else {
      Object.assign(pattern, data);
      await pattern.save();
      return pattern;
    }
  }

  @Mutation(() => Boolean)
  async deletePattern(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const pattern = await Pattern.findOne({ where: { id } });
    if (!pattern) {
      throw new ApolloError(PATTERN_NOT_FOUND);
    } else {
      await pattern.remove();
      return true;
    }
  }
}
