import { screen, render } from 'tests';

import { AccountDropdownMenu } from './AccountDropdownMenu';

describe('AccountDropdownMenu', () => {
  it('renders children correctly', () => {
    render(
      <AccountDropdownMenu>AccountDropdownMenu</AccountDropdownMenu>,
    );

    const element = screen.getByText('AccountDropdownMenu');

    expect(element).toBeInTheDocument();
  });
});
