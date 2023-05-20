import React, {useEffect, useState} from 'react';
import styles from "./styles/index.module.scss"
import {Card} from "../../components/Card/Card";
import axios from "axios";
import {ProductArray} from "../../types/ProductsArray";
import {GetResponse} from "../../types/GetResponse";



export const MainPage = () => {
    const [products, setProducts] = useState<GetResponse<ProductArray>>();

    useEffect(() => {
        const apiUrl = 'https://fakestoreapi.com/products';
        axios.get(apiUrl).then((resp:GetResponse<ProductArray>) => {
            console.log(resp)
            setProducts(resp);
        });
    }, [setProducts]);

    const handleAddInShoppingCart = (value: any) => {
        localStorage.setItem(`product${value.id}`, JSON.stringify(value))
    }

    return (
        <div className={styles.mainContainer}>
            <h1>Главная</h1>
            <div className={styles.cardsContainer}>
                {products?.data.map((value) => <Card needButton={true}
                                                                        image={value.image}
                                                                        title={value.title}
                                                                        description={value.description}
                                                                        price={value.price}
                                                                        rating={value.rating.rate}
                                                                        count={value.rating.count}
                                                                        onAddProductClick={() => handleAddInShoppingCart(value)}
                />)}
            </div>
        </div>
    );
};
