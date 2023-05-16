import React from 'react';
import styles from "./styles/index.module.scss"
import {Link} from "react-router-dom";

export const Navigation = () => {
    return (
        <nav className={styles.mainContainer}>
            <span>
                <Link className={styles.link} to={"./"}>Главная страница</Link>
                <Link className={styles.link} to={"./shoppingCart"}>Корзина</Link>
            </span>
        </nav>
    );
};
