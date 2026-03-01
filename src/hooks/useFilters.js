import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useFilters() {
  const [params, setParams] = useSearchParams();

  const status = params.get('status');
  const gender = params.get('gender');
  const species = params.get('species');
  const name = params.get('name');
  const type = params.get('type');

  const filters = {
    status,
    gender,
    species,
    name,
    type
  };

  const setFilters = useCallback(
    (status, gender, species, name, type) => {
      setParams((prevParams) => {
        const params = new URLSearchParams(prevParams);

        if (status) params.set('status', status);
        else params.delete('status');
        if (gender) params.set('gender', gender);
        else params.delete('gender');
        if (species) params.set('species', species);
        else params.delete('species');
        if (name) params.set('name', name);
        else params.delete('name');
        if (type) params.set('type', type);
        else params.delete('type');

        return params;
      });
    },
    [setParams]
  );

  return { filters, setFilters };
}
