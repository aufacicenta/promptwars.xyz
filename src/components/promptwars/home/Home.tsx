import clsx from 'clsx';
import { HomeProps } from './Home.types';

export const Home: React.FC<HomeProps> = ({ className }) => {
  return (
    <div className={clsx(className)}>
      Test
    </div>
  );
};
