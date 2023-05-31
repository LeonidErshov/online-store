import React, {useEffect, useState} from 'react';
import styles from "./styles/index.module.scss"
import {Card} from "../../components/Card/Card";
import axios from "axios";
import {ProductArray} from "../../types/ProductsArray";
import {GetResponse} from "../../types/GetResponse";



export const MainPage = () => {
    const [products, setProducts] = useState<GetResponse<ProductArray>>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [favourites, setFavourites] = useState('')

    useEffect(() => {
        const apiUrl = 'https://fakestoreapi.com/products';
        axios.get(apiUrl)
            .then((resp:GetResponse<ProductArray>) => {
                let data = resp.data;
                if (favourites) {
                    data = data.filter((item) => item.category === selectedCategory);
                }
                if (selectedCategory) {
                    data = data.filter((item) => item.category === selectedCategory);
                }
                if (selectedSort === 'alphabetical') {
                    data = data.sort((a, b) => a.title.localeCompare(b.title));
                } else if (selectedSort === 'priceLowToHigh') {
                    data = data.sort((a, b) => a.price - b.price);
                } else if (selectedSort === 'priceHighToLow') {
                    data = data.sort((a, b) => b.price - a.price);
                }
                setProducts({...resp, data});
                localStorage.setItem('allProducts', JSON.stringify({...resp, data}));
            });
    }, [selectedCategory, selectedSort]);

    const [addToCart, setAddToCart] = useState(false)
    const [currentCard, setCurrentCard] = useState()
    const [currentProduct, setCurrentProduct] = useState<GetResponse<ProductArray>>();

    const handleAddInShoppingCart = (value: any) => {
        setAddToCart(true)
        setCurrentCard(value.id)
        setCurrentProduct(value)
    }

    const [currentProductCount, setCurrentProductCount] = useState(1)

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className={styles.mainContainer} >
            <h1>Главная</h1>
            <div className={styles.search}>
                <p>Найти нужный товар: </p>
                <input type="text" value={searchTerm} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)} />
            </div>

            <div className={styles.sorts}>
                <label htmlFor="categories-select">Категория:</label>
                <select name="categories" id="categories-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    <option value="men's clothing">Мужская одежда</option>
                    <option value="women's clothing">Женская одежда</option>
                    <option value="jewelery">Ювелирные изделия</option>
                    <option value="electronics">Электроника</option>
                </select>
            </div>

            <div className={styles.sorts}>
                <label htmlFor="sort-select">Сортировка:</label>
                <select name="sort" id="sort-select" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
                    <option value="">Выберите метод сортировки</option>
                    <option value="alphabetical">По алфавиту</option>
                    <option value="priceLowToHigh">По возрастанию цены</option>
                    <option value="priceHighToLow">По убыванию цены</option>
                </select>
            </div>


            <div className={styles.cardsContainer}>
                {products?.data.filter((value) => value.title.toLowerCase().includes(searchTerm.toLowerCase())).map((value) =>
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
