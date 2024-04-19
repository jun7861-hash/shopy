'use client';

import { AppProvider } from '@/ducks/context';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Providers = (props: Props) => {
  const { children } = props;

  return <AppProvider>{children}</AppProvider>;
};

export default Providers;
