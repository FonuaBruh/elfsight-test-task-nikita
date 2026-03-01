import styled from 'styled-components';

export function Button({ children, color, width, ...props }) {
  return (
    <StyledButton _width={width} _color={color} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  font-size: 16px;
  color: ${({ _color }) => _color};
  padding: 12px;
  width: ${({ _width }) => _width};
  border-radius: 8px;
  border: 1px solid ${({ _color }) => _color};
  background: none;
  cursor: pointer;

  @media only screen and (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ _color }) => _color};
      color: #fff;
    }
  }
`;
