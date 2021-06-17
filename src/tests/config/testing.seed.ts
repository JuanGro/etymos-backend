import { Connection } from "typeorm";
import {
  Factory,
  Seeder,
  tearDownDatabase,
  useRefreshDatabase,
} from "typeorm-seeding";
import { Category } from "../../models/Category";
import { Etymology } from "../../models/Etymology";
import { Option } from "../../models/Option";
import { Pattern } from "../../models/Pattern";
import { Question } from "../../models/Question";
import { Reference } from "../../models/Reference";
import { Test } from "../../models/Test";
import { User } from "../../models/User";
import { Version } from "../../models/Version";
import { Word } from "../../models/Word";

export default class Testing implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await useRefreshDatabase();
    await factory(Category)().createMany(10);
    await factory(Etymology)().createMany(10);
    await factory(Option)().createMany(10);
    await factory(Pattern)().createMany(10);
    await factory(Question)().createMany(10);
    await factory(Reference)().createMany(10);
    await factory(Test)().createMany(10);
    await factory(User)().createMany(10);
    await factory(Version)().createMany(10);
    await factory(Word)().createMany(10);
    await tearDownDatabase();
  }
}
