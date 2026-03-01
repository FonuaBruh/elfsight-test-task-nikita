import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Select } from '../../select';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { GENDER, SPECIES, STATUS } from './consts';
import { useFilters } from '../../../hooks/useFilters';
import { useData } from '../../providers';

export function Filters() {
  const { filters, setFilters } = useFilters();
  const { setFilters: setDataFilters } = useData();

  const [status, setStatus] = useState(null);
  const [gender, setGender] = useState(null);
  const [species, setSpecies] = useState(null);
  const nameRef = useRef();
  const typeRef = useRef();

  const handleApply = useCallback(() => {
    const name = nameRef.current.value;
    const type = typeRef.current.value;

    setFilters(
      status,
      gender,
      species,
      name.length ? name : null,
      type.length ? type : null
    );
  }, [gender, setFilters, species, status]);

  const handleReset = useCallback(() => {
    setStatus(null);
    setGender(null);
    setSpecies(null);
    nameRef.current.value = '';
    typeRef.current.value = '';

    setFilters(null, null, null, null, null);
  }, [setFilters]);

  useEffect(() => {
    setStatus(filters.status ?? null);
    setGender(filters.gender ?? null);
    setSpecies(filters.species ?? null);
    nameRef.current.value = filters.name ?? '';
    typeRef.current.value = filters.type ?? '';

    setDataFilters(
      filters.status,
      filters.gender,
      filters.species,
      filters.name,
      filters.type
    );
  }, [
    filters.gender,
    filters.name,
    filters.species,
    filters.status,
    filters.type,
    setDataFilters
  ]);

  return (
    <StyledContainer>
      <Select
        onSelect={setStatus}
        selectedItem={status}
        items={STATUS}
        placeholder="Status"
      />
      <Select
        onSelect={setGender}
        selectedItem={gender}
        items={GENDER}
        placeholder="Gender"
      />
      <Select
        onSelect={setSpecies}
        selectedItem={species}
        items={SPECIES}
        placeholder="Species"
      />
      <Input ref={nameRef} placeholder="Name" />
      <Input ref={typeRef} placeholder="Type" />
      <StyledControls>
        <Button onClick={handleApply} width="100%" color="#83BF46">
          Apply
        </Button>
        <Button onClick={handleReset} width="100%" color="#FF5152">
          Reset
        </Button>
      </StyledControls>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledControls = styled.div`
  display: flex;
  gap: 10px;
`;
