import { Field, ErrorMessage } from 'formik';
import { ReactNode } from 'react';

type Props = {
    label: string;
    type: string;
    id: string;
    name: string;
    children?: ReactNode;
};

const FormField = ({ label, type, id, name, children }: Props) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    {type === 'select' ? (
      <Field
        as={type} 
        id={id}
        name={name}
        className="mt-1 p-2 w-full border rounded-md"
      >
        {children}
      </Field>
    ) : (
      <Field
        type={type}
        id={id}
        name={name}
        className="mt-1 p-2 w-full border rounded-md"
      />
    )}
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-600 text-sm mt-1"
    />
  </div>
);

export default FormField;
