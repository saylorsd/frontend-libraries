import { PropsWithChildren } from 'react';
import styles from './BlankLayout.module.css';

export default function Index({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
