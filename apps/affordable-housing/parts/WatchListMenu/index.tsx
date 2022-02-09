import * as React from 'react'
import styles from './WatchListMenu.module.css'

interface Props {

}

export function WatchListMenu(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.menuSection}>
                <h2 className={styles.sectionHeading}>Owner Watch list</h2>
            </div>
            <div className={styles.menuSection}>
                <h2 className={styles.sectionHeading}>Property WatchList</h2>
            </div>
        </div>
    )
}