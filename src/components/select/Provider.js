import { useCallback, useState } from 'react';
import { Context } from './Context';

export function Provider({
  children,
  selectedItem = null,
  items = [],
  renderItem = () => {},
  onSelect = () => {},
  placeholder
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = useCallback(() => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const close = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const handleSelect = useCallback(
    (item) => {
      close();
      onSelect(item);
    },
    [onSelect, close]
  );

  const ctxValue = {
    isExpanded,
    selectedItem,
    items,
    renderItem,
    toggle,
    close,
    onSelect: handleSelect,
    placeholder
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
