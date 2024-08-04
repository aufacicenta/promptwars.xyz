import { screen, render } from 'tests';

import { AiModelSelector } from './AiModelSelector';

describe('AiModelSelector', () => {
  it('renders children correctly', () => {
    render(
      <AiModelSelector>AiModelSelector</AiModelSelector>,
    );

    const element = screen.getByText('AiModelSelector');

    expect(element).toBeInTheDocument();
  });
});
