import * as styles from './Layout.module.scss';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className={styles.container}>{children}</div>;
}

export default Layout;
