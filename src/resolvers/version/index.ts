import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateVersionInput } from "../../inputs/CreateVersionInput";
import { UpdateVersionInput } from "../../inputs/UpdateVersionInput";
import { Version } from "../../models/Version";
import { ID_PARAM, DATA_PARAM, VERSION_NOT_FOUND } from "../../config/messages";

@Resolver()
export class VersionResolver {
  @Query(() => [Version])
  async getVersions(): Promise<Version[]> {
    return Version.find();
  }

  @Query(() => Version)
  async getVersion(@Arg(ID_PARAM) id: number): Promise<Version> {
    const version = await Version.findOne({ where: { id } });
    if (!version) {
      throw new ApolloError(VERSION_NOT_FOUND);
    } else {
      return version;
    }
  }

  @Mutation(() => Version)
  async createVersion(
    @Arg(DATA_PARAM) data: CreateVersionInput
  ): Promise<Version> {
    const version = Version.create(data);
    await version.save();
    return version;
  }

  @Mutation(() => Version)
  async updateVersion(
    @Arg(ID_PARAM) id: number,
    @Arg(DATA_PARAM) data: UpdateVersionInput
  ): Promise<Version> {
    const version = await Version.findOne({ where: { id } });
    if (!version) {
      throw new ApolloError(VERSION_NOT_FOUND);
    } else {
      Object.assign(version, data);
      await version.save();
      return version;
    }
  }

  @Mutation(() => Boolean)
  async deleteVersion(@Arg(ID_PARAM) id: number): Promise<boolean> {
    const version = await Version.findOne({ where: { id } });
    if (!version) {
      throw new ApolloError(VERSION_NOT_FOUND);
    } else {
      await version.remove();
      return true;
    }
  }
}
