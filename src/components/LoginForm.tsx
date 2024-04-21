// LoginPage.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setErrorMessage(null);
      navigate('/Profile'); // Redirect to dashboard after successful login
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Field type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Field type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
          {errorMessage && <div className="text-red-600 text-sm mt-2">{errorMessage}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
