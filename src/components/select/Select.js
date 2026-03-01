import { Provider } from './Provider';
import { Container } from './Container';
import { Button } from './Button';
import { Options } from './Options';

export function Select({
  items,
  selectedItem = null,
  renderItem = (item) => item,
  onSelect = () => {},
  placeholder = 'Select'
}) {
  return (
    <Provider
      renderItem={renderItem}
      onSelect={onSelect}
      selectedItem={selectedItem}
      items={items}
      placeholder={placeholder}
    >
      <Container>
        <Button />
        <Options />
      </Container>
    </Provider>
  );
}
