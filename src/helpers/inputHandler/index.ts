import { SetStateAction } from 'react';

export const inputHandler = <T extends Record<string, unknown>>(
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<SetStateAction<T>>
) => {
  const { name, value } = event.target;
  setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
