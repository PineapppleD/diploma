import { Formik, Form, Field, ErrorMessage } from "formik";
import { Category } from "../../models";

const initialValues = {
  title: "",
  description: "",
  imageUrl: "",
  price: "",
  category: "",
  level: "",
};

const ClassInfoForm = () => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      // Handle form submission
      console.log(values);
      setSubmitting(false);
    }}
    validate={(values) => {
      const errors: Partial<typeof values> = {};
      // Title validation (required, minimum length)
      if (!values.title || values.title.length < 3) {
        errors.title = 'Please enter a title with at least 3 characters.';
      }
    
      // Description validation (required, minimum length)
      if (!values.description || values.description.length < 10) {
        errors.description = 'Please enter a description with at least 10 characters.';
      }
    
    
      // Category validation (required)
      if (!values.category) {
        errors.category = 'Please select a category.';
      }
    
      // Level validation (required)
      if (!values.level) {
        errors.level = 'Please select a level.';
      }
    
      return errors;
    }}
    
  >
    {({ isSubmitting }) => (
      <Form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium">
            Title:
          </label>
          <Field
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-xs"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium">
            Description:
          </label>
          <Field
            as="textarea"
            id="description"
            name="description"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 resize-none"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-xs"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-sm font-medium">
            Image URL:
          </label>
          <Field
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <ErrorMessage
            name="imageUrl"
            component="div"
            className="text-red-500 text-xs"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium">
            Price:
          </label>
          <Field
            type="number"
            id="price"
            name="price"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <ErrorMessage
            name="price"
            component="div"
            className="text-red-500 text-xs"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium">
            Category:
          </label>
          <Field
            as="select"
            id="category"
            name="category"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {Object.values(Category).map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className="text-red-500 text-xs"
          />
        </div>

        <div className="flex items-center">
          <label className="text-sm font-medium mr-2">Level:</label>
          <Field
            type="radio"
            name="level"
            value="BEGINNER"
            className="mr-2 focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="beginner" className="text-sm">
            Beginner
          </label>
          <Field
            type="radio"
            name="level"
            value="INTERMEDIATE"
            className="mr-2 focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="intermediate" className="text-sm">
            Intermediate
          </label>
          <Field
            type="radio"
            name="level"
            value="ADVANCED"
            className="mr-2 focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="advanced" className="text-sm">
            Advanced
          </label>
          <ErrorMessage
            name="level"
            component="div"
            className="text-red-500 text-xs"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default ClassInfoForm;
