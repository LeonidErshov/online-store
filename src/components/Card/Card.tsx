import React, {useState} from 'react';
import styles from "./styles/index.module.scss"
// @ts-ignore
import StarRatings from "react-star-ratings"
import axios from "axios";
import {GetResponse} from "../../types/GetResponse";
import {ProductArray} from "../../types/ProductsArray";
import {Link} from "react-router-dom";


interface CardProps {
    image: string;
    title: string;
    description: string
    price: number
    rating: number
    count: number
    onAddProductClick?: () => void
    onDeleteProductClick?: () => void
    needButton: boolean
    id: number
    favouritesButton?: boolean
    onFavouritesAdd?: () => void
    deleteFavouritesButton?: boolean
    onFavouritesDelete?: () => void
    shoppingCart?: boolean
}

export const Card: React.FC<CardProps> = ({image, title, description, price, rating, count, onAddProductClick, onDeleteProductClick, needButton, id, favouritesButton = false, onFavouritesAdd, deleteFavouritesButton = false, onFavouritesDelete, shoppingCart = false}) => {

    const [currentProduct, setCurrentProduct] = useState<GetResponse<ProductArray>>()
    const handleCardClick = (id: number) => {
        const apiUrl = `https://fakestoreapi.com/products/${id}`;
        axios.get(apiUrl).then((resp:GetResponse<ProductArray>) => {
            setCurrentProduct(resp);
        });
    }
    const [currentProductCount, setCurrentProductCount] = useState(count)

    // useEffect(() => {
    //     localStorage.setItem(`countProduct${id}`, JSON.stringify(currentProductCount));
    // }, [currentProductCount])

    return (
        <>
            <div className={styles.card} onClick={() => handleCardClick(id)}>
                <Link className={styles.link} to={`../product/${id}`}></Link>
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
                    <p>{`Цена: ${price} $`}</p>
                    {shoppingCart ?
                        <div className={styles.countBlock}>
                            <p>Количество:</p>
                            <button className={styles.countButton}
                                    onClick={() => {
                                        currentProductCount !== 1 && setCurrentProductCount(currentProductCount - 1)
                                        localStorage.setItem(`countProduct${id}`, JSON.stringify(currentProductCount));
                                    }}>-
                            </button>
                            <p>{currentProductCount}</p>
                            <button className={styles.countButton}
                                    onClick={() => {
                                        setCurrentProductCount(currentProductCount + 1)
                                        localStorage.setItem(`countProduct${id}`, JSON.stringify(currentProductCount));
                                    }}>+
                            </button>
                        </div>
                        :
                        <p>{`Количество: ${count}`}</p>
                    }
                    {needButton ?
                        <button className={styles.button} onClick={onAddProductClick}>Добавить в корзину</button>
                        :
                        <button className={styles.button} onClick={onDeleteProductClick}>Удалить из корзины</button>
                    }
                    {favouritesButton && <button className={styles.button} onClick={onFavouritesAdd}>Добавить в избранное</button> }
                    {deleteFavouritesButton && <button className={styles.button} onClick={onFavouritesDelete}>Удалить из избранного</button> }
                </div>
            </div>
        </>

    );
};
