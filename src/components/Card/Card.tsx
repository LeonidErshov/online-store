import React from 'react';
import styles from "./styles/index.module.scss"
// @ts-ignore
import StarRatings from "react-star-ratings"


interface CardProps {
    image: string;
    title: string;
    description: string
    price: number
    rating: number
    count: number
}

export const Card: React.FC<CardProps> = ({image, title, description, price, rating, count}) => {

    return (
        <div className={styles.card}>
            <img className={styles.image} src={image} alt={""}/>
            <h2>{title.split(' ').slice(0, 4).join(' ')}</h2>
            <p>{`${description.split(' ').slice(0, 10).join(' ')}...`}</p>
            <div className={styles.content}>
                <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    numberOfStars={5}
                    name='rating'
                />
                <p>{`Price: ${price} $`}</p>
                <p>{`Count: ${count}`}</p>
                <button className={styles.button}>Добавить в корзину</button>
            </div>
        </div>
    );
};
