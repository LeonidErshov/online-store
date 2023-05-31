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
            setProducts(localStorage.getItem('allProducts') ? JSON.parse(`${localStorage.getItem('allProducts')}`) : resp);
            localStorage.setItem(`allProducts`, JSON.stringify(resp));

        });
    }, [setProducts]);

    const [addToCart, setAddToCart] = useState(false)
    const [currentCard, setCurrentCard] = useState()
    const [currentProduct, setCurrentProduct] = useState<GetResponse<ProductArray>>();

    const handleAddInShoppingCart = (value: any) => {
        setAddToCart(true)
        setCurrentCard(value.id)
        setCurrentProduct(value)
    }

    const [currentProductCount, setCurrentProductCount] = useState(1)

    return (
        <div className={styles.mainContainer} >
            <h1>Главная</h1>
            <div className={styles.cardsContainer}>
                {products?.data.map((value) =>
                    <Card needButton={true}
                          image={value.image}
                          title={value.title}
                          description={value.description}
                          price={value.price}
                          rating={value.rating.rate}
                          count={value.rating.count}
                          onAddProductClick={() => {
                              handleAddInShoppingCart(value)
                          }}
                          id = {value.id}
                          favouritesButton={true}
                          onFavouritesAdd={() => localStorage.setItem(`favouriteProduct${value.id}`, JSON.stringify(value))}
                    />)}
                {addToCart &&
                    <>
                        <div className={styles.countModal}>
                            <p>Выберите нужное количество:</p>
                            <div className={styles.countBlock}>
                                <button className={styles.countButton} onClick={() => currentProductCount !== 1 && setCurrentProductCount(currentProductCount - 1)}>-</button>
                                <p>{currentProductCount}</p>
                                <button className={styles.countButton} onClick={() => setCurrentProductCount(currentProductCount + 1)}>+</button>
                            </div>
                            <button className={styles.addInCartButton} onClick={() => {
                                localStorage.setItem(`product${currentCard}`, JSON.stringify(currentProduct));
                                localStorage.setItem(`countProduct${currentCard}`, JSON.stringify(currentProductCount));
                                setAddToCart(false);
                            }}>Добавить в корзину</button>
                            <button className={styles.closeButton} onClick={() => {
                                setAddToCart(false);
                                setCurrentProductCount(1)
                            }}>✕</button>
                        </div>
                    </>

                }
            </div>
        </div>
    );
};
