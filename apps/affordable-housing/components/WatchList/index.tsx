/**
 *
 * WatchList
 *
 */
import React from 'react';

import styles from './WatchList.module.css'

interface Props {
    title: string;
    name: string;
    items: { label: string, id: string | number }[]
}

const WatchList = ({title, name, items}: Props) => {
    return (
        <div className={styles.container}>
            <form>
                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>{title}</legend>
                    {items.map(item => (
                        <div key={`${item.id}`} className={styles.radioItem}>
                            <input type="radio" className={styles.radioButton} id={`${item.id}`} name={name}/>
                            <label className={styles.radioLabel} htmlFor={`${item.id}`}>{item.label}</label>
                        </div>))}
                </fieldset>
            </form>
            <button className={styles.downloadLink}>Download All Data for {title}</button>
        </div>
    )
}


export default WatchList