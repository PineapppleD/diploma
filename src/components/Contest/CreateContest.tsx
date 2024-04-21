import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Timestamp } from "firebase/firestore";
import FieldsList from "./FieldsList";
import { Categories, ContestTypes } from "../../models";
import { useNavigate } from "react-router-dom";

export interface ContestFormValues {
  name: string;
  description: string;
  start: Timestamp;
  end: Timestamp;
  max_participants: number;
  category: Categories;
  contestType: ContestTypes; // Add contestType field
}

const CreateContest: React.FC = () => {
  const initialValues: ContestFormValues = {
    name: "",
    description: "",
    start: Timestamp.now(),
    end: Timestamp.now(),
    max_participants: 0,
    category: Categories.FOREIGN_LANGUAGES,
    contestType: ContestTypes.Quiz, // Initial value for contestType
  };

  const navigate = useNavigate();

  const validationSchema: Yup.Schema = Yup.object().shape({
    name: Yup.string()
    .required("Name is required")
    .test('unique-name', 'you already have this contest, name must be unique', function(value) {
      const existingIncompletedContests = localStorage.getItem('incompletedContests');
      const incompletedContests: ContestFormValues[] = existingIncompletedContests ? JSON.parse(existingIncompletedContests) : [];
      const existingNames = incompletedContests.map(contest => contest.name);
      return !existingNames.includes(value);
    }),
    description: Yup.string().required("Description is required"),
    start: Yup.date().required("Start Date is required"),
    end: Yup.date()
      .min(Yup.ref("start"), "End Date must be after Start Date")
      .required("End Date is required"),
    max_participants: Yup.number()
      .required("Max Participants is required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
    category: Yup.string()
      .oneOf(Object.values(Categories))
      .required("Category is required"),
    contestType: Yup.string()
      .oneOf(Object.values(ContestTypes))
      .required("Contest Type is required"), // Add validation for contestType
  });

  const handleSubmit = (
    values: ContestFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // Stop the form submission process
    setSubmitting(false);
    
    // Retrieve existing incompleted contests array from localStorage
    const existingIncompletedContests = localStorage.getItem('incompletedContests');
    
    // Parse existing array or initialize to an empty array
    const incompletedContests: ContestFormValues[] = existingIncompletedContests ? JSON.parse(existingIncompletedContests) : [];
    
    // Add the new contest values to the array
    incompletedContests.push(values);
    
    // Store the updated array back into localStorage
    localStorage.setItem('incompletedContests', JSON.stringify(incompletedContests));

    navigate(`/createcontestdetails?name=${values.name}`)
  };
  

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Create Contest</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FieldsList />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateContest;
