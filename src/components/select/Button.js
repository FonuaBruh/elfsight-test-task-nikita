import styled from 'styled-components';
import { useSelectContext } from './Context';
import { useCallback } from 'react';

function ArrowButton({ isExpanded = false }) {
  return (
    <ArrowSvg
      _isExpanded={isExpanded}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ArrowSvg>
  );
}

function CrossButton({ onClick }) {
  return (
    <CrossSvg
      onClick={onClick}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12L8 8L12 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L8 8L12 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </CrossSvg>
  );
}

function Text({ children }) {
  const { placeholder } = useSelectContext();

  return (
    <StyledSpan _isPlaceholder={!children}>
      {children ? children : placeholder}
    </StyledSpan>
  );
}

export function Button() {
  const {
    isExpanded,
    toggle,
    renderItem,
    selectedItem,
    onSelect
  } = useSelectContext();

  const isSelected = selectedItem !== null;

  const crossClick = useCallback(
    (e) => {
      e.stopPropagation();

      onSelect(null);
    },
    [onSelect]
  );

  return (
    <StyledButton _isExpanded={isExpanded} onClick={toggle}>
      <Text>{isSelected ? renderItem(selectedItem) : undefined}</Text>
      {isSelected ? (
        <CrossButton onClick={crossClick} />
      ) : (
        <ArrowButton isExpanded={isExpanded} />
      )}
    </StyledButton>
  );
}

const ArrowSvg = styled.svg`
  color: ${({ _isExpanded }) => (_isExpanded ? '#FFFFFF' : '#B2B2B2')};
  transform: ${({ _isExpanded }) => (_isExpanded ? 'rotate(180deg)' : 'none')};
`;

const CrossSvg = styled.svg`
  color: #f5f5f5;

  @media only screen and (hover: hover) and (pointer: fine) {
    &:hover {
      color: #83bf46;
    }
  }
`;

const StyledSpan = styled.span`
  color: ${({ _isPlaceholder }) => (_isPlaceholder ? '#B3B3B3' : '#f5f5f5')};
  font-size: 16px;
`;

const StyledButton = styled.button`
  background: ${({ _isExpanded }) => (_isExpanded ? '#334466' : '#263750')};
  border: 1px solid #83bf46;
  padding: 12px 16px;
  border-radius: 8px;
  color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @media only screen and (hover: hover) and (pointer: fine) {
    &:hover {
      background: #334466;
    }
  }
`;
