import { Question } from "../../models/Question";
import { QuestionResolver } from ".";

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = new QuestionResolver();

test("Get all questions", async () => {
  await expect(getQuestions()).resolves.toHaveLength(10);
});

test("Get question", async () => {
  const questions = await getQuestions();
  const firstQuestion = questions[0];
  await expect(getQuestion(firstQuestion.id)).resolves.toBeInstanceOf(Question);
});

test("Get error if question does not exist", async () => {
  await expect(getQuestion(10000)).rejects.toThrowError();
});

test("Create question", async () => {
  await expect(getQuestions()).resolves.toHaveLength(10);
  const questionCreated = await createQuestion({
    sentence: "El ___ estuvo en el agua durante un largo periodo de tiempo",
    active: true,
    referenceId: 1,
  });
  await expect(getQuestion(questionCreated.id)).resolves.toBeInstanceOf(Question);
  await expect(getQuestions()).resolves.toHaveLength(11);
});

test("Get error if tries to create a question with incorrect sentence length", async () => {
  await expect(
    createQuestion({
      sentence:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a odio at metus egestas commodo. Quisque vel imperdiet tellus. Morbi eu ante efficitur, congue justo maximus, sollicitudin velit. Fusce at pharetra lectus. Fusce neque urna, rutrum in quam vitae, condimentum mattis turpis. Praesent accumsan lobortis sollicitudin. Vestibulum urna libero, gravida in lorem sit amet, ultricies volutpat diam. Mauris cursus eros elit, vestibulum vehicula libero ultrices at. Curabitur sed lectus nec lectus iaculis varius iaculis sed augue. Ut ut diam eget nibh gravida varius id in risus. Curabitur vel ultrices quam. Quisque viverra in erat ut molestie. Vestibulum rhoncus sapien sit amet iaculis fermentum. Fusce sagittis blandit nisi ut consectetur. Sed eget ultrices ante, sit amet luctus justo. Donec elit enim, venenatis eu magna at, faucibus scelerisque mauris. In ut tempor urna. Duis posuere ligula odio. Morbi a condimentum felis. Cras auctor, tortor eget condimentum dignissim, eros enim laoreet lectus, ut hendrerit leo nulla eu est. Sed vitae luctus dui, sit amet blandit ante. Vestibulum bibendum massa odio. Nulla sit amet arcu sit amet neque condimentum iaculis. Donec elementum risus in congue gravida. Donec auctor lacus eget libero rutrum, ultricies vestibulum dolor lobortis. Nam egestas id lacus ornare vehicula. Aenean hendrerit massa quam, sit amet tristique nibh sodales a. Vivamus efficitur metus velit, et pulvinar nunc fermentum ut. Mauris porta massa eu elit sollicitudin vulputate. Etiam finibus tincidunt sagittis. Nam tortor neque, fringilla et est sed, semper tempor odio. Proin sit amet nibh quis turpis porta dictum at rutrum tellus. Aliquam sed tempus leo. Nulla tincidunt a est volutpat ornare. In hac habitasse platea dictumst. Nunc vel tristique augue. Vestibulum bibendum lorem non odio mollis rutrum. Nulla sagittis egestas bibendum. Nulla mauris metus, tristique sit amet turpis a, vehicula tincidunt lorem. Mauris feugiat tortor in sem tempus tempus. Curabitur velit lorem, bibendum a congue vitae, ultricies nec nulla.",
      active: true,
      referenceId: 1,
    })
  ).rejects.toThrowError("value too long for type character varying(2048)");
});

test("Get error if tries to create a question with duplicate sentence", async () => {
  await expect(
    createQuestion({
      sentence: "El ___ estuvo en el agua durante un largo periodo de tiempo",
      active: true,
      referenceId: 1,
    })
  ).rejects.toThrowError("duplicate key value violates unique constraint");
});

test("Update question", async () => {
  const questionUpdated = await updateQuestion(1, {
    sentence: "El ___ estuvo en el agua por mucho tiempo",
    active: false,
    referenceId: 1,
  });
  await expect(getQuestion(questionUpdated.id)).resolves.toBeInstanceOf(Question);
  await expect(getQuestion(questionUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getQuestion(questionUpdated.id)).resolves.toHaveProperty(
    "sentence",
    "El ___ estuvo en el agua por mucho tiempo"
  );
});

test("Delete question", async () => {
  await expect(getQuestions()).resolves.toHaveLength(11);
  const questions = await getQuestions();
  const lastQuestion = questions[questions.length - 1];
  await expect(deleteQuestion(lastQuestion.id)).resolves.toEqual(true);
  await expect(getQuestions()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a question inexistent", async () => {
  await expect(deleteQuestion(10000)).rejects.toThrowError();
});
