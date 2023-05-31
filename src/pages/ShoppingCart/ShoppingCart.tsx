import React, {useEffect, useState} from 'react';
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

    const handleBuy = () => {
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key?.startsWith('product')) {
                localStorage.removeItem(key)
            }
        }
        window.location.reload();
    }

    const [amount, setAmount] = useState(0)

    useEffect(() => {
        productsCart?.map((value: any) => {
            setAmount(amount + value.price * Number(JSON.parse(`${localStorage.getItem(`countProduct${value?.id}`)}`)))
        })
    }, [])

    return (
        <div className={styles.mainContainer}>
            <h1>Корзина</h1>
            {productsCart.length > 0 &&
                <div className={styles.order}>
                    <p>{`${productsCart.length} товара на итоговую стоимость ${amount}$`}</p>
                    <button className={styles.buyButton} onClick={() => handleBuy()}>Заказать</button>
                </div>

            }
            {productsCart.length > 0 ?
                <div className={styles.cardsContainer}>
                    {productsCart?.map((value: any) => <Card needButton={false}
                                                             image={value.image}
                                                             title={value.title}
                                                             description={value.description}
                                                             price={value.price}
                                                             rating={value.rating.rate}
                                                             count={JSON.parse(`${localStorage.getItem(`countProduct${value?.id}`)}`)}
                                                             onDeleteProductClick={() => handleDeleteFromShoppingCart(value)}
                                                             id={value.id}
                                                             shoppingCart={true}
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
