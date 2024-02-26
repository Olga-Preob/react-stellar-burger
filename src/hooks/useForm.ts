import { useState, type FormEvent } from 'react';


export const useForm = (inputValues: { [key: string]: string }) => {
  const [values, setValues] = useState<typeof inputValues>(inputValues);

  const handleChange = (evt: FormEvent) => {
    const { value, name } = evt.target as HTMLInputElement;

    setValues({ ...values, [name]: value });
  }

  return { values, setValues, handleChange }
}
