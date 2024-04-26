// Import useState and useEffect hooks from React
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { addUser } from "../firebase/userOperations";
import { useNavigate } from "react-router-dom";
import FormField from "./Fields";


export function RegistrationForm() {
  const auth = getAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Create a valid username").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    role: Yup.string().oneOf(["teacher", "student"], "Invalid role").required("Required"), // Add validation for role
  });

  const handleSubmit = async (
    values: { email: string; password: string; name: string; role: string, }, // Include role in values
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      setErrorMessage(null);
      resetForm();
      if (values.role.toLowerCase() === 'teacher') {
        addUser(user.uid, {
          ...values,
          contests: [],
          incompletedContests: [],
          notificaitons: [],
        });
      } else {
        addUser(user.uid, {
          ...values,
          contests: [],
          notificaitons: []
        })
      }
      navigate('/profile')
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      if (error instanceof FirebaseError) {
        // Handle specific Firebase errors here
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("Email address is already in use.");
            break;
          case "auth/weak-password":
            setErrorMessage(
              "Password is too weak. Please choose a stronger password."
            );
            break;
          default:
            setErrorMessage(
              "An error occurred while signing up. Please try again later."
            );
        }
      } else {
        // Handle generic errors
        setErrorMessage(
          "An error occurred while signing up. Please try again later."
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-svh">
      <div className="w-1/3 mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl mb-4">Registration Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
          <FormField label="Role" type="select" id="role" name="role">
        <option value="" disabled>Select Role</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </FormField>
      
      <FormField label="Username" type="text" id="name" name="name" />
      
      <FormField label="Email" type="email" id="email" name="email" />
      
      <FormField label="Password" type="password" id="password" name="password" />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            {errorMessage && (
              <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default RegistrationForm;
