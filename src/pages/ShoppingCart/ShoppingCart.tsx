import React from 'react';
import styles from "./styles/index.module.scss"
import {Card} from "../../components/Card/Card";
import {ProductArray} from "../../types/ProductsArray";
import {GetResponse} from "../../types/GetResponse";

export const ShoppingCart = () => {
    const productsCart: Array<GetResponse<ProductArray>> = []

    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key?.startsWith('product')) {
            productsCart.push(JSON.parse(`${localStorage.getItem(`${key}`)}`))
        }
    }

    const handleDeleteFromShoppingCart = (value: any) => {
        localStorage.removeItem(`product${value.id}`)
        window.location.reload();
    }

    return (
        <div className={styles.mainContainer}>
            <h1>Корзина</h1>
            {productsCart.length > 0 ?
                <div className={styles.cardsContainer}>
                    {productsCart?.map((value: any) => <Card needButton={false}
                                                             image={value.image}
                                                             title={value.title}
                                                             description={value.description}
                                                             price={value.price}
                                                             rating={value.rating.rate}
                                                             count={value.rating.count}
                                                             onDeleteProductClick={() => handleDeleteFromShoppingCart(value)}
                    />)}
                </div>
                :
                <div className={styles.emptyList}>
                    <p>
                        В вашей корзине нет товаров. Перейдите на <a className={styles.link} href={"./"}>«Главную страницу»</a>, чтобы добавить их.
                    </p>
                </div>}
        </div>
    );
};
