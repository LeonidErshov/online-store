import React, {useEffect, useState} from 'react';
import styles from "./styles/index.module.scss"
import axios from "axios/index";

interface CardProps {
    image: string;
    title: string;
    description: string
}

export const Card: React.FC<CardProps> = ({image, title, description}) => {

    return (
        <div className={styles.card}>
            <img className={styles.image} src={image} alt={""}/>
            <h2>{title.split(' ').slice(0, 4).join(' ')}</h2>
            <p>{`${description.split(' ').slice(0, 10).join(' ')}...`}</p>

        </div>
    );
};
