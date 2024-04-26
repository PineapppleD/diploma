import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../Button';

const GoalForm = () => {

  const handleSubmit = () => {
    
  }

  return (
    <div className="mt-2 p-4 bg-gray-100 rounded">
      <Formik
        initialValues={{
          goal: '',
          deadline: ''
        }}
        validationSchema={Yup.object({
          goal: Yup.string().required('Goal is required'),
          deadline: Yup.date().required('Deadline is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          onsubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="goal">Goal:</label>
            <Field className="w-full px-3 py-2 border rounded" type="text" id="goal" name="goal" placeholder="Enter your goal" />
            <ErrorMessage name="goal" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="deadline">Deadline:</label>
            <Field className="w-full px-3 py-2 border rounded" type="date" id="deadline" name="deadline" />
            <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <Button onClick={handleSubmit}>Set Goal</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default GoalForm;
