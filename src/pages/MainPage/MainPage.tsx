import React, {useEffect, useState} from 'react';
import styles from "./styles/index.module.scss"
import {Card} from "../../components/Card/Card";
import axios from "axios";


interface GetResponse<T> {
    data: T[]
}

interface ProductArray {
    category: string;
    description: string;
    ip: number;
    image: string;
    price: number;
    rating: {
        count: number;
        rate: number;
    }
    title: string
}

export const MainPage = () => {
    const [products, setProducts] = useState<GetResponse<ProductArray>>();

    useEffect(() => {
        const apiUrl = 'https://fakestoreapi.com/products';
        axios.get(apiUrl).then((resp:GetResponse<ProductArray>) => {
            console.log(resp)
            setProducts(resp);
        });
    }, [setProducts]);

    return (
        <div className={styles.mainContainer}>
            <h1>Главная</h1>
            <div className={styles.cardsContainer}>
                {products?.data.map((value) => <Card image={value.image} title={value.title} description={value.description}/>)}
            </div>
        </div>
    );
};
