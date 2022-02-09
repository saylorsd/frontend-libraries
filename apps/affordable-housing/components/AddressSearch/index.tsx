/**
 *
 * AddressSearch
 *
 */
import * as React from 'react';
import Image from 'next/image'
import SearchIcon from './search-icon.svg';
import styles from  './AddressSearch.module.css'
interface Props {
}

// todo: use aria-live region for results section

export function AddressSearch(props: Props) {
    return (
        <div className={styles.wrapper}>
            <input className={styles.input} type="search" placeholder="Search Address"/>
            <Image className={styles.icon} src={SearchIcon} alt="search"/>
        </div>
    );
}
