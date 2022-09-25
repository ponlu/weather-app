import { useState } from "react";

export const useForm = <T>(callback?: any, initialState = {} as T) => {
  const [values, setValues] = useState<T>(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback(values);
  };

  const setFormValues = async (newValues = {} as T) => {
    setValues(newValues);
  };

  return {
    onChange,
    onSelect,
    onSubmit,
    setFormValues,
    values,
  };
};
