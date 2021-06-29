import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateReferenceInput } from '../../inputs/reference/create';
import { UpdateReferenceInput } from '../../inputs/reference/update';
import { Reference } from '../../models/reference';
import {
  ID_PARAM,
  DATA_PARAM,
  REFERENCE_NOT_FOUND,
} from '../../config/constants';

@Resolver()
export class ReferenceResolver {
  @Query(() => [Reference])
  async getReferences(): Promise<Reference[]> {
    return Reference.find();
  }

  @Query(() => Reference)
  async getReference(@Arg(ID_PARAM) id: number): Promise<Reference> {
    const reference = await Reference.findOne({ where: { id } });
    if (!reference) {
      throw new ApolloError(REFERENCE_NOT_FOUND);
    }
    return reference;
  }

  @Mutation(() => Reference)
  async createReference(
    @Arg(DATA_PARAM) data: CreateReferenceInput,
  ): Promise<Reference> {
    const reference = Reference.create(data);
    return reference.save();
  }

  @Mutation(() => Reference)
  async updateReference(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateReferenceInput,
  ): Promise<Reference> {
    const reference = await Reference.findOne({ where: { id } });
    if (!reference) {
      throw new ApolloError(REFERENCE_NOT_FOUND);
    }
    Object.assign(reference, data);
    return reference.save();
  }

  @Mutation(() => Reference)
  async deleteReference(@Arg(ID_PARAM) id: number): Promise<Reference> {
    const reference = await Reference.findOne({ where: { id } });
    if (!reference) {
      throw new ApolloError(REFERENCE_NOT_FOUND);
    }
    return reference.remove();
  }
}
