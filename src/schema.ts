import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { OptionResolver } from './resolvers/option';
import { EtymologyResolver } from './resolvers/etymology';
import { VersionResolver } from './resolvers/version';
import { PatternResolver } from './resolvers/pattern';
import { QuestionResolver } from './resolvers/question';
import { ReferenceResolver } from './resolvers/reference';
import { TestResolver } from './resolvers/test';
import { UserResolver } from './resolvers/user';
import { WordResolver } from './resolvers/word';
import { CategoryResolver } from './resolvers/category';

async function Schema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [
      CategoryResolver,
      EtymologyResolver,
      OptionResolver,
      PatternResolver,
      QuestionResolver,
      ReferenceResolver,
      TestResolver,
      UserResolver,
      VersionResolver,
      WordResolver,
    ],
  });
}

export default Schema;
