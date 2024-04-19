import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const List = (props: Props) => {
  const { children } = props;

  return <ul className={styles.list}>{children}</ul>;
};

export default List;
