import {
  Factory,
  Seeder,
  tearDownDatabase,
  useRefreshDatabase,
} from 'typeorm-seeding';
import { FAKER_ELEMENTS_NUMBER_L } from '../../config/constants';
import { Category } from '../../models/Category';
import { Etymology } from '../../models/Etymology';
import { Option } from '../../models/Option';
import { Pattern } from '../../models/Pattern';
import { Question } from '../../models/Question';
import { Reference } from '../../models/Reference';
import { Test } from '../../models/Test';
import { User } from '../../models/User';
import { Version } from '../../models/Version';
import { Word } from '../../models/Word';

export default class Testing implements Seeder {
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
