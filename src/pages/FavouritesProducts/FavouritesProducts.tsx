import React, {useEffect, useState} from 'react';
import styles from "./styles/index.module.scss";
import {Card} from "../../components/Card/Card";
import {GetResponse} from "../../types/GetResponse";
import {ProductArray} from "../../types/ProductsArray";

export const FavouritesProducts = () => {
    const [favouritesProducts, setFavouritesProducts] = useState([])


    useEffect(() => {
        const localStorageArray = [];

        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key?.startsWith('favouriteProduct')) {
                localStorageArray.push(JSON.parse(`${localStorage.getItem(`${key}`)}`))
            }
        }
        // @ts-ignore
        setFavouritesProducts(localStorageArray)
    }, [])

    const [addToCart, setAddToCart] = useState(false)
    const [currentCard, setCurrentCard] = useState()
    const [currentProduct, setCurrentProduct] = useState<GetResponse<ProductArray>>();

    const handleAddInShoppingCart = (value: any) => {
        setAddToCart(true)
        setCurrentCard(value.id)
        setCurrentProduct(value)
    }

    const [currentProductCount, setCurrentProductCount] = useState(0)

    return (
        <div className={styles.mainContainer}>
            <h1>Избранное</h1>
            {favouritesProducts.length > 0 ?
                <div className={styles.cardsContainer}>
                    {favouritesProducts?.map((value: any) =>
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
                              deleteFavouritesButton = {true}
                              onFavouritesDelete={() => {
                                  localStorage.removeItem(`favouriteProduct${value.id}`)
                                  window.location.reload()
                              }}
                        />)}
                    {addToCart &&
                        <>
                            <div className={styles.countModal}>
                                <p>Выберите нужное количество:</p>
                                <div className={styles.countBlock}>
                                    <button className={styles.countButton} onClick={() => currentProductCount !== 0 && setCurrentProductCount(currentProductCount - 1)}>-</button>
                                    <p>{currentProductCount}</p>
                                    <button className={styles.countButton} onClick={() => setCurrentProductCount(currentProductCount + 1)}>+</button>
                                </div>
                                <button className={styles.addInCartButton} onClick={() => {
                                    localStorage.setItem(`product${currentCard}`, JSON.stringify(currentProduct));
                                    setAddToCart(false);
                                }}>Добавить в корзину</button>
                                <button className={styles.closeButton} onClick={() => {
                                    setAddToCart(false);
                                    setCurrentProductCount(0)
                                }}>✕</button>
                            </div>
                        </>

                    }
                </div> :
                <div className={styles.emptyList}>
                    <p>
                        У Вас в избранном нет товаров. Перейдите на <a className={styles.link} href={"./"}>«Главную страницу»</a>, чтобы добавить их.
                    </p>
                </div>}

        </div>
    );
};
