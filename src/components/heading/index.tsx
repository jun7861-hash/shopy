import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  variant?: 'h1' | 'h2';
};

const Heading = (props: Props) => {
  const { children, variant } = props;

  if (variant === 'h1') return <h1 className={styles.heading1}>{children}</h1>;
  if (variant === 'h2') return <h2 className={styles.heading2}>{children}</h2>;

  return <h1 className={styles.heading1}>{children}</h1>;
};

export default Heading;
