import styled from 'styled-components';
import { useSelectContext } from './Context';
import { useCallback, useEffect } from 'react';

export function Options() {
  const { isExpanded } = useSelectContext();

  if (!isExpanded) return;

  return <Content />;
}

function Content() {
  const { items, renderItem, onSelect, close } = useSelectContext();
  const containerRef = useClickOutside(close);

  const getSelectHandler = useCallback((item) => onSelect.bind(null, item), [
    onSelect
  ]);

  return (
    <StyledContainer ref={containerRef}>
      {items.map((item) => (
        <StyledButton key={item} onClick={getSelectHandler(item)}>
          {renderItem(item)}
        </StyledButton>
      ))}
    </StyledContainer>
  );
}

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const StyledContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  left: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 4px 0 #0c0c0d0d, 0 1px 4px 0 #0c0c0d1a;
  z-index: 100;
  max-height: 150px;
  overflow-y: auto;
`;

const StyledButton = styled.button`
  width: 100%;
  background: none;
  outline: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  height: 30px;
  padding: 0 7px;

  @media only screen and (hover: hover) and (pointer: fine) {
    &:hover {
      background: #83bf4633;
    }
  }
`;
