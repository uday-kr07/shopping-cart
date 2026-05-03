import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductDetailsPage() {
    const { id }= useParams();
    const {
        ProductDetails, 
        setProductDetails, 
        loading, 
        setLoading, 
        handleAddToCart,  
        CartItems
    } = useContext(ShoppingCartContext);
    
    async function fetchProductDetails(){
        const apiResponse = await fetch(`https://dummyjson.com/products/${id}`)
        const result = await apiResponse.json();

        
        if(result) {
            setProductDetails(result);
            setLoading(false);
        }
    }

    useEffect (() =>{

        fetchProductDetails();
    }, [id]);

    console.log(ProductDetails);


    if(loading) return <h1>Product details loading! Please wait</h1>

    return (
        <div>
            <div className="p-6 bg-white lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 rounded-xl shadow-lg relative">
                            <img
                            className="w-4/5 rounded object-cover"
                            src={ProductDetails?.thumbnail}
                            alt={ProductDetails?.title}
                            />
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                            {
                                ProductDetails?.images?.length ?
                                    ProductDetails?.images.map(imageItem=>
                                    <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                                        <img
                                            src={imageItem}
                                            className="w-24 cursor-pointer"
                                            alt='Product secondary image'
                                        />
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-[#333333]">{ProductDetails?.title}
                        </h2>
                        <div className="flex text-black flex-wrap gap-4 mt-4">
                            <p className="text-xl font-bold">${ProductDetails?.price}</p>
                        </div>
                        <div>
                            <button 
                            disabled={
                                ProductDetails ?
                                CartItems.findIndex(item => item.id === ProductDetails?.id) !== -1 : false }
                                onClick={()=>handleAddToCart(ProductDetails)}
                                className="disabled:opacity-60 mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-lg font-bold text-black rounded">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProductDetailsPage;
