import { ApolloError } from 'apollo-server';
import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { CreateUserInput } from '../../inputs/user/create';
import { UpdateUserInput } from '../../inputs/user/update';
import { User } from '../../models/user';
import { ID_PARAM, DATA_PARAM, USER_NOT_FOUND } from '../../config/constants';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  async getUser(@Arg(ID_PARAM) id: number): Promise<User> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .leftJoinAndSelect('user.tests', 'test')
      .leftJoinAndSelect('user.words', 'word')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) {
      throw new ApolloError(USER_NOT_FOUND);
    } else {
      return user;
    }
  }

  @Mutation(() => User)
  async createUser(@Arg(DATA_PARAM) data: CreateUserInput): Promise<User> {
    const user = User.create(data);
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateUserInput,
  ): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new ApolloError(USER_NOT_FOUND);
    } else {
      Object.assign(user, data);
      await user.save();
      return user;
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new ApolloError(USER_NOT_FOUND);
    } else {
      await user.remove();
      return true;
    }
  }
}
