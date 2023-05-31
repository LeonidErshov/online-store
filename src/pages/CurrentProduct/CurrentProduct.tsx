import React, {useEffect, useState} from 'react';
import styles from "./styles/index.module.scss"
import axios from "axios";
import {GetResponse} from "../../types/GetResponse";
// import {ProductArray} from "../../types/ProductsArray";
import {useParams} from "react-router-dom";
// @ts-ignore
import StarRatings from "react-star-ratings";

interface CurrentProduct {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
        count: number;
        rate: number;
    }
    title: string;
}

export const CurrentProduct = () => {
    const {id} = useParams()

    const [currentProduct, setCurrentProduct] = useState<CurrentProduct>()

    useEffect(() => {
        const apiUrl = `https://fakestoreapi.com/products/${id}`;
        axios.get(apiUrl).then((resp: GetResponse<CurrentProduct>) => {
            // @ts-ignore
            setCurrentProduct(resp.data);
        });
    }, [id])

    const [addToCart, setAddToCart] = useState(false)
    const [currentCard, setCurrentCard] = useState()

    const handleAddInShoppingCart = (value: any) => {
        setAddToCart(true)
        setCurrentCard(value.id)
        setCurrentProduct(value)
    }

    const [currentProductCount, setCurrentProductCount] = useState(0)

    return (
        <div className={styles.mainContainer} >
            <h1>{currentProduct && currentProduct?.title}</h1>
            <div className={styles.contentContainer}>
                <div className={styles.photoAndText}>
                    <img className={styles.image} src={currentProduct?.image} alt={""}/>
                    <div className={styles.textContainer}>
                        <StarRatings
                            rating={currentProduct?.rating.rate}
                            starRatedColor="blue"
                            numberOfStars={5}
                            name='rating'
                        />
                        <p>{`Цена: ${currentProduct?.price} $`}</p>
                        <p>{`Количество: ${currentProduct?.rating.count}`}</p>
                        {/*<p>{`Количество: ${JSON.parse(`${localStorage.getItem(`countProduct${currentProduct?.id}`)}`)}`}</p>*/}
                        <button className={styles.button} onClick={() => handleAddInShoppingCart(currentProduct && currentProduct)}>Добавить в корзину</button>
                        <button className={styles.button} onClick={() => localStorage.setItem(`favouriteProduct${currentProduct?.id}`, JSON.stringify(currentProduct && currentProduct))}>Добавить в избранное</button>
                    </div>
                </div>
                <div className={styles.description}>
                    <h2>Описание товара</h2>
                    <p>{currentProduct?.description}</p>
                </div>
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
            </div>
        </div>
    );
};