import { PropsWithChildren } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

import styles from './Layout.module.css';

export default function Index({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
