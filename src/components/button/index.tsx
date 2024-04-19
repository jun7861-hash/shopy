import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button = (props: Props) => {
  const { children, type = 'button', onClick } = props;

  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
