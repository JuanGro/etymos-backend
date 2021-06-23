import {
  Factory,
  Seeder,
  tearDownDatabase,
  useRefreshDatabase,
} from 'typeorm-seeding';
import { FAKER_ELEMENTS_NUMBER_L } from '../constants';
import { Category } from '../../models/category';
import { Etymology } from '../../models/etymology';
import { Option } from '../../models/option';
import { Pattern } from '../../models/pattern';
import { Question } from '../../models/question';
import { Reference } from '../../models/reference';
import { Test } from '../../models/test';
import { User } from '../../models/user';
import { Version } from '../../models/version';
import { Word } from '../../models/word';

export class Testing implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await useRefreshDatabase();
    await factory(Category)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Etymology)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Option)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Pattern)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Question)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Reference)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Test)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(User)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Version)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await factory(Word)().createMany(FAKER_ELEMENTS_NUMBER_L);
    await tearDownDatabase();
  }
}
