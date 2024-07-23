import { screen, render } from 'tests';

import { Credits } from './Credits';

describe('Credits', () => {
  it('renders children correctly', () => {
    render(
      <Credits>Credits</Credits>,
    );

    const element = screen.getByText('Credits');

    expect(element).toBeInTheDocument();
  });
});
