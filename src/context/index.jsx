

//create the context
//provide the state to context
//wrap context in root component
//consume the context using use Context

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);


function ShoppingCartProvider({children}){

    const [loading, setLoading] = useState(true);
    const [listOfProducts, setListOfProducts] = useState([]);
    const [ProductDetails, setProductDetails] = useState(null);
    const [CartItems, setCartItem] = useState([]);
    const navigate = useNavigate();


    async function fetchListOfProducts(){
        const apiResponse = await fetch ("https://dummyjson.com/products");
        const result = await apiResponse.json();


        if(result && result?.products) {
            setListOfProducts(result?.products)
            setLoading(false);
        }
    }

    function handleAddToCart(getProductDetails){
        console.log(getProductDetails);

        let cpyExistingCartItems = [...CartItems];
        const findIndexOfCurrentItem = cpyExistingCartItems.findIndex
        (cartItems => cartItems.id === getProductDetails.id
        );

        console.log(findIndexOfCurrentItem);

        if(findIndexOfCurrentItem === -1){
            cpyExistingCartItems.push({
                ...getProductDetails,
                quantity : 1,
                totalPrice : getProductDetails?.price
            })
        } else {
            console.log('Item already in cart, increase the quantity');
            cpyExistingCartItems[findIndexOfCurrentItem] = {
                ...cpyExistingCartItems[findIndexOfCurrentItem],
                quantity : cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
                totalPrice : (cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1) * cpyExistingCartItems[findIndexOfCurrentItem].price
            }
        }

        console.log(cpyExistingCartItems , 'cpyExistingCartItems');
        setCartItem(cpyExistingCartItems);
        localStorage.setItem('cartItems', JSON.stringify(cpyExistingCartItems));
        navigate('/cart');
    }

    function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart){
        let cpyExistingCartItems = [...CartItems];
        const findIndexOfCurrentCartItem = cpyExistingCartItems.findIndex(item => item.id === getProductDetails.id);

        if(isFullyRemoveFromCart) {
            cpyExistingCartItems.splice(findIndexOfCurrentCartItem, 1);
        } else {
            cpyExistingCartItems[findIndexOfCurrentCartItem] = {
                ...cpyExistingCartItems[findIndexOfCurrentCartItem],
                quantity : cpyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1,
                totalPrice : (cpyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1) * cpyExistingCartItems[findIndexOfCurrentCartItem].price
            };
        }

        localStorage.setItem('cartItems', JSON.stringify(cpyExistingCartItems));
        setCartItem(cpyExistingCartItems);
    }

    useEffect(() => {
        fetchListOfProducts()
        setCartItem(JSON.parse(localStorage.getItem('cartItems')) || []);
    },[]);

    console.log(CartItems);

    return (
    <ShoppingCartContext.Provider 
        value={{ 
            listOfProducts, 
            loading, 
            setLoading, 
            ProductDetails, 
            setProductDetails, 
            handleAddToCart,
            CartItems,
            handleRemoveFromCart,
            }}
        >
        {children}
    </ShoppingCartContext.Provider>
    );
}


export default ShoppingCartProvider;
