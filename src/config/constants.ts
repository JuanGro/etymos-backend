import { Types } from './../interfaces/types';

const {
  NOT_FOUND,
  CATEGORY,
  ETYMOLOGY,
  OPTION,
  PATTERN,
  QUESTION,
  REFERENCE,
  TEST,
  USER,
  VERSION,
  WORD,
} = {
  NOT_FOUND: " not found!",
  CATEGORY: "Category",
  ETYMOLOGY: "Etymology",
  OPTION: "Option",
  PATTERN: "Pattern",
  QUESTION: "Question",
  REFERENCE: "Reference",
  TEST: "Test",
  USER: "User",
  VERSION: "Version",
  WORD: "Word",
};

const PARAMS = {
  ID_PARAM: "id",
  DATA_PARAM: "data",
}

const {
  VARCHAR_TYPE,
  BOOLEAN_TYPE,
  TIMESTAMP_TYPE,
}: Types = {
  VARCHAR_TYPE: { type: "varchar" },
  BOOLEAN_TYPE: { type: "boolean" },
  TIMESTAMP_TYPE: { type: "timestamp" },
}

const {
  XXS,
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  XXXXL,
} = {
  XXS: 4,
  XS: 8,
  S: 16,
  M: 32,
  L: 64,
  XL: 128,
  XXL: 256,
  XXXXL: 1024,
}

const DATABASE_CONFIG = {
  BOOLEAN_DEFAULT_TRUE: { ...BOOLEAN_TYPE, default: true },
  BOOLEAN_DEFAULT_FALSE: { ...BOOLEAN_TYPE, default: false },
  VARCHAR_XXS: { ...VARCHAR_TYPE, length: XXS },
  VARCHAR_XS: { ...VARCHAR_TYPE, length: XS },
  VARCHAR_S: { ...VARCHAR_TYPE, length: S },
  VARCHAR_M: { ...VARCHAR_TYPE, length: M },
  VARCHAR_L: { ...VARCHAR_TYPE, length: L },
  VARCHAR_XL: { ...VARCHAR_TYPE, length: XL },
  VARCHAR_XXL: { ...VARCHAR_TYPE, length: XXL },
  VARCHAR_XXXXL: { ...VARCHAR_TYPE, length: XXXXL },
  VARCHAR_S_UNIQUE: { ...VARCHAR_TYPE, length: S, unique: true },
  VARCHAR_L_UNIQUE: { ...VARCHAR_TYPE, length: L, unique: true },
  VARCHAR_XXL_UNIQUE: { ...VARCHAR_TYPE, length: XXL, unique: true },
  VARCHAR_XXXXL_UNIQUE: { ...VARCHAR_TYPE, length: XXXXL, unique: true },
  TIMESTAMP: TIMESTAMP_TYPE,
  NULLABLE: { nullable: true }
}

const TESTS_NUMBERS = {
  FAKER_ELEMENTS: 10,
  INEXISTENT_INDEX: 1452902144,
  FIRST_INDEX: 0
}

const TESTS_TEXT = {
  DUMMY_TEXT_XS: 'Lorem',
  DUMMY_TEXT2_XS: 'Lorems',
  DUMMY_TEXT_S: 'Lorem ipsum dolor sit amet',
  DUMMY_TEXT_M: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  DUMMY_TEXT_L: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a odio at metus egestas commodo. Quisque vel imperdiet tellus. Morbi eu ante efficitur, congue justo maximus, sollicitudin velit. Fusce at pharetra lectus. Fusce neque urna, rutrum in quam vitae, condimentum mattis turpis. Praesent accumsan lobortis sollicitudin.',
  DUMMY_TEXT_XL: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a odio at metus egestas commodo. Quisque vel imperdiet tellus. Morbi eu ante efficitur, congue justo maximus, sollicitudin velit. Fusce at pharetra lectus. Fusce neque urna, rutrum in quam vitae, condimentum mattis turpis. Praesent accumsan lobortis sollicitudin. Vestibulum urna libero, gravida in lorem sit amet, ultricies volutpat diam. Mauris cursus eros elit, vestibulum vehicula libero ultrices at. Curabitur sed lectus nec lectus iaculis varius iaculis sed augue. Ut ut diam eget nibh gravida varius id in risus. Curabitur vel ultrices quam. Quisque viverra in erat ut molestie. Vestibulum rhoncus sapien sit amet iaculis fermentum. Fusce sagittis blandit nisi ut consectetur. Sed eget ultrices ante, sit amet luctus justo. Donec elit enim, venenatis eu magna at, faucibus scelerisque mauris. In ut tempor urna. Duis posuere ligula odio. Morbi a condimentum felis. Cras auctor, tortor eget condimentum dignissim, eros enim laoreet lectus, ut hendrerit leo nulla eu est. Sed vitae luctus dui, sit amet blandit ante. Vestibulum bibendum massa odio. Nulla sit amet arcu sit amet neque condimentum iaculis. Donec elementum risus in congue gravida. Donec auctor lacus eget libero rutrum, ultricies vestibulum dolor lobortis. Nam egestas id lacus ornare vehicula. Aenean hendrerit massa quam, sit amet tristique nibh sodales a. Vivamus efficitur metus velit, et pulvinar nunc fermentum ut. Mauris porta massa eu elit sollicitudin vulputate. Etiam finibus tincidunt sagittis. Nam tortor neque, fringilla et est sed, semper tempor odio. Proin sit amet nibh quis turpis porta dictum at rutrum tellus. Aliquam sed tempus leo. Nulla tincidunt a est volutpat ornare. In hac habitasse platea dictumst. Nunc vel tristique augue. Vestibulum bibendum lorem non odio mollis rutrum. Nulla sagittis egestas bibendum. Nulla mauris metus, tristique sit amet turpis a, vehicula tincidunt lorem. Mauris feugiat tortor in sem tempus tempus. Curabitur velit lorem, bibendum a congue vitae, ultricies nec nulla.",
  DUMMY_IMAGE_URL: "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
  DUMMY_EMAIL: 'test@mail.com',
  DUMMY_EMAIL2: 'test2@mail.com',
  DUMMY_YEAR_STRING: '1999',
  DUMMY_VERSION: '1.1.9',
  DUMMY_VERSION2: '2.3.7',
}

const MESSAGES = {
  CATEGORY_NOT_FOUND: `${CATEGORY}${NOT_FOUND}`,
  ETYMOLOGY_NOT_FOUND: `${ETYMOLOGY}${NOT_FOUND}`,
  OPTION_NOT_FOUND: `${OPTION}${NOT_FOUND}`,
  PATTERN_NOT_FOUND: `${PATTERN}${NOT_FOUND}`,
  QUESTION_NOT_FOUND: `${QUESTION}${NOT_FOUND}`,
  REFERENCE_NOT_FOUND: `${REFERENCE}${NOT_FOUND}`,
  TEST_NOT_FOUND: `${TEST}${NOT_FOUND}`,
  USER_NOT_FOUND: `${USER}${NOT_FOUND}`,
  VERSION_NOT_FOUND: `${VERSION}${NOT_FOUND}`,
  WORD_NOT_FOUND: `${WORD}${NOT_FOUND}`,
  ERROR_MAX_LENGTH: 'value too long for type character varying',
  ERROR_DUPLICATE_KEY: 'duplicate key value violates unique constraint',
}

const CONSTANTS = {
  ...PARAMS,
  ...DATABASE_CONFIG,
  ...TESTS_NUMBERS,
  ...TESTS_TEXT,
  ...MESSAGES,
};

export const {
  ID_PARAM,
  DATA_PARAM,
  BOOLEAN_DEFAULT_TRUE,
  BOOLEAN_DEFAULT_FALSE,
  VARCHAR_XXS,
  VARCHAR_XS,
  VARCHAR_S,
  VARCHAR_M,
  VARCHAR_L,
  VARCHAR_XL,
  VARCHAR_XXL,
  VARCHAR_XXXXL,
  VARCHAR_S_UNIQUE,
  VARCHAR_L_UNIQUE,
  VARCHAR_XXL_UNIQUE,
  VARCHAR_XXXXL_UNIQUE,
  TIMESTAMP,
  NULLABLE,
  FAKER_ELEMENTS,
  INEXISTENT_INDEX,
  FIRST_INDEX,
  DUMMY_TEXT_XS,
  DUMMY_TEXT2_XS,
  DUMMY_TEXT_S,
  DUMMY_TEXT_M,
  DUMMY_TEXT_L,
  DUMMY_TEXT_XL,
  DUMMY_IMAGE_URL,
  DUMMY_EMAIL,
  DUMMY_EMAIL2,
  DUMMY_YEAR_STRING,
  DUMMY_VERSION,
  DUMMY_VERSION2,
  CATEGORY_NOT_FOUND,
  ETYMOLOGY_NOT_FOUND,
  OPTION_NOT_FOUND,
  PATTERN_NOT_FOUND,
  QUESTION_NOT_FOUND,
  REFERENCE_NOT_FOUND,
  TEST_NOT_FOUND,
  USER_NOT_FOUND,
  VERSION_NOT_FOUND,
  WORD_NOT_FOUND,
  ERROR_MAX_LENGTH,
  ERROR_DUPLICATE_KEY,
} = CONSTANTS;
