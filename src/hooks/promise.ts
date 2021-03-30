import { useState, useEffect } from 'react';

export const usePromise = <T extends any>(promise: Promise<T>) => {
  const [ { isLoading, isError, data }, setStatus ] = useState({
    isLoading: true, isError: false as any, data: undefined as T
  });
  useEffect(() => {
    Promise.resolve(promise).then(
      data => {
        setStatus({ isLoading: false, isError: false, data });
      },
      isError => {
        setStatus({ isLoading: false, isError, data: undefined });
      }
    );
  }, []);

  return { isLoading, isError, data };
};

export const useReplaceablePromise = <T extends any>() => {
  const [ promise, replace ] = useState(Promise.resolve(undefined as T));
  const [ { isLoading, isError, data }, setStatus ] = useState({
    isLoading: true, isError: false as any,
    data: undefined as T
  });
  useEffect(() => {
    setStatus({ isLoading: true, isError: false, data: undefined as T });
    Promise.resolve(promise).then(
      data => {
        setStatus({ isLoading: false, isError: false, data });
      },
      isError => {
        setStatus({ isLoading: false, isError, data: undefined });
      }
    );
  }, [ promise ]);

  return { isLoading, isError, data, replace };
};
