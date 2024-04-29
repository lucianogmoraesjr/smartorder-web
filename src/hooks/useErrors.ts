import { useCallback, useState } from 'react';

interface AppError {
  field: string;
  message: string;
}

export function useErrors() {
  const [errors, setErrors] = useState<AppError[]>([]);

  const setError = useCallback(
    ({ field, message }: AppError) => {
      const errorAlreadyExists = errors.find(error => error.field === field);

      if (errorAlreadyExists) {
        return;
      }

      setErrors(prevState => [...prevState, { field, message }]);
    },
    [errors],
  );

  const removeError = useCallback((fieldName: string) => {
    setErrors(prevState =>
      prevState.filter(error => error.field !== fieldName),
    );
  }, []);

  const getErrorMessageByFieldName = useCallback(
    (fieldName: string) => {
      return errors.find(error => error.field === fieldName)?.message;
    },
    [errors],
  );

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
