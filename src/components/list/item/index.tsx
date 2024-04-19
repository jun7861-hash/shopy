import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const ListItem = (props: Props) => {
  const { children } = props;

  return <li className={styles.list_item}>{children}</li>;
};

export default ListItem;
