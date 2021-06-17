import { Question } from "../../models/Question";
import { dbConnection } from "../../tests/config/databaseConnection";
import { QuestionResolver } from ".";

dbConnection();

const questionResolver = new QuestionResolver();

test("Get all questions", async () => {
  expect((await questionResolver.getQuestions()).length).toEqual(10);
});

test("Get question", async () => {
  const questions = await questionResolver.getQuestions();
  const firstQuestion = questions[0];
  expect(await questionResolver.getQuestion(firstQuestion.id)).toBeInstanceOf(
    Question
  );
});

test("Get error if question does not exist", async () => {
  expect(async () => {
    await questionResolver.getQuestion(10000);
  }).rejects.toThrowError();
});

test("Create question", async () => {
  expect((await questionResolver.getQuestions()).length).toEqual(10);
  const questionCreated = await questionResolver.createQuestion({
    sentence: "El ___ estuvo en el agua durante un largo periodo de tiempo",
    active: true,
    referenceId: 1
  });
  expect(await questionResolver.getQuestion(questionCreated.id)).toBeInstanceOf(
    Question
  );
  expect((await questionResolver.getQuestions()).length).toEqual(11);
});

test("Get error if tries to create a question with incorrect name length", async () => {
  expect(async () => {
    await questionResolver.createQuestion({
      sentence:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a odio at metus egestas commodo. Quisque vel imperdiet tellus. Morbi eu ante efficitur, congue justo maximus, sollicitudin velit. Fusce at pharetra lectus. Fusce neque urna, rutrum in quam vitae, condimentum mattis turpis. Praesent accumsan lobortis sollicitudin. Vestibulum urna libero, gravida in lorem sit amet, ultricies volutpat diam. Mauris cursus eros elit, vestibulum vehicula libero ultrices at. Curabitur sed lectus nec lectus iaculis varius iaculis sed augue. Ut ut diam eget nibh gravida varius id in risus. Curabitur vel ultrices quam. Quisque viverra in erat ut molestie. Vestibulum rhoncus sapien sit amet iaculis fermentum. Fusce sagittis blandit nisi ut consectetur.\n\
        Sed eget ultrices ante, sit amet luctus justo. Donec elit enim, venenatis eu magna at, faucibus scelerisque mauris. In ut tempor urna. Duis posuere ligula odio. Morbi a condimentum felis. Cras auctor, tortor eget condimentum dignissim, eros enim laoreet lectus, ut hendrerit leo nulla eu est. Sed vitae luctus dui, sit amet blandit ante. Vestibulum bibendum massa odio.\n\
        Nulla sit amet arcu sit amet neque condimentum iaculis. Donec elementum risus in congue gravida. Donec auctor lacus eget libero rutrum, ultricies vestibulum dolor lobortis. Nam egestas id lacus ornare vehicula. Aenean hendrerit massa quam, sit amet tristique nibh sodales a. Vivamus efficitur metus velit, et pulvinar nunc fermentum ut. Mauris porta massa eu elit sollicitudin vulputate. Etiam finibus tincidunt sagittis. Nam tortor neque, fringilla et est sed, semper tempor odio. Proin sit amet nibh quis turpis porta dictum at rutrum tellus. Aliquam sed tempus leo.\n\
        Nulla tincidunt a est volutpat ornare. In hac habitasse platea dictumst. Nunc vel tristique augue. Vestibulum bibendum lorem non odio mollis rutrum. Nulla sagittis egestas bibendum. Nulla mauris metus, tristique sit amet turpis a, vehicula tincidunt lorem. Mauris feugiat tortor in sem tempus tempus. Curabitur velit lorem, bibendum a congue vitae, ultricies nec nulla.",
      active: true,
      referenceId: 1
    });
  }).rejects.toThrowError();
});

test("Update question", async () => {
  const questionUpdated = await questionResolver.updateQuestion(1, {
    sentence: "El ___ estuvo en el agua por mucho tiempo",
    active: false,
    referenceId: 1
  });
  expect(await questionResolver.getQuestion(questionUpdated.id)).toBeInstanceOf(
    Question
  );
  expect((await questionResolver.getQuestion(questionUpdated.id)).active).toBeFalsy();
  expect((await questionResolver.getQuestion(questionUpdated.id)).sentence).toBe("El ___ estuvo en el agua por mucho tiempo");
});

test("Delete question", async () => {
  expect((await questionResolver.getQuestions()).length).toEqual(11);
  const questions = await questionResolver.getQuestions();
  const lastQuestion = questions[questions.length - 1];
  const questionDeleted = await questionResolver.deleteQuestion(
    lastQuestion.id
  );
  expect(questionDeleted).toEqual(true);
  expect((await questionResolver.getQuestions()).length).toEqual(10);
});

test("Get error if tries to delete a question inexistent", async () => {
  expect(async () => {
    await questionResolver.deleteQuestion(10000);
  }).rejects.toThrowError();
});
