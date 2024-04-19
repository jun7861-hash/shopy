import React, { ReactNode } from 'react';
import * as NextLink from 'next/link';

import styles from './styles.module.scss';

type Props = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

const Link = (props: Props) => {
  const { children, href, onClick } = props;

  return (
    <NextLink.default legacyBehavior href={href}>
      <a className={styles.link} onClick={onClick}>
        {children}
      </a>
    </NextLink.default>
  );
};

export default Link;
