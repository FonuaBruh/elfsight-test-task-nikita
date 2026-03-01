import styled from 'styled-components';

export function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
