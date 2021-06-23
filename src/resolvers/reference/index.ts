import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { CreateReferenceInput } from '../../inputs/CreateReferenceInput';
import { UpdateReferenceInput } from '../../inputs/UpdateReferenceInput';
import { Reference } from '../../models/Reference';
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
    } else {
      return reference;
    }
  }

  @Mutation(() => Reference)
  async createReference(
    @Arg(DATA_PARAM) data: CreateReferenceInput,
  ): Promise<Reference> {
    const reference = Reference.create(data);
    await reference.save();
    return reference;
  }

  @Mutation(() => Reference)
  async updateReference(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateReferenceInput,
  ): Promise<Reference> {
    const reference = await Reference.findOne({ where: { id } });
    if (!reference) {
      throw new ApolloError(REFERENCE_NOT_FOUND);
    } else {
      Object.assign(reference, data);
      await reference.save();
      return reference;
    }
  }

  @Mutation(() => Boolean)
  async deleteReference(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const reference = await Reference.findOne({ where: { id } });
    if (!reference) {
      throw new ApolloError(REFERENCE_NOT_FOUND);
    } else {
      await reference.remove();
      return true;
    }
  }
}
