import { createContext, useContext } from 'react';

export const Context = createContext({
  isExpanded: false,
  selectedItem: null,
  items: [],
  renderItem: () => {},
  toggle: () => {},
  close: () => {},
  onSelect: () => {},
  placeholder: 'Select'
});

export function useSelectContext() {
  const context = useContext(Context);

  return context;
}
