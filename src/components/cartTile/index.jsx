import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";


function CartTile({singleCartItem}) {

    const {handleRemoveFromCart, handleAddToCart } = useContext(ShoppingCartContext);

    return ( 
        <Fragment>
            <div className="grid grid-cols-2 items-start gap-5 px-4">
            <div className="cols-span-2 flex items-start gap-4">
                <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
                    <img
                    src={singleCartItem?.thumbnail}
                    alt={singleCartItem?.title}
                    className="w-full h-full object-contain"
                    />
                </div>
                <div>
                    <h3 className="text-base font-bold text-gray-900">
                        {singleCartItem?.title}
                    </h3>
                    <button 
                    onClick={()=>handleRemoveFromCart(singleCartItem, true)} 
                    className="text-sm px-4 py-3 bg-black text-white font-bold">
                        REMOVE
                    </button>
                </div>
            </div>
            <div className="ml-auto">
                <h3 className="text-lg font-bold text-gray-900">
                    ${singleCartItem?.totalPrice.toFixed(2)}
                    </h3>
                        <p className="mt-2 mb-3 font-bolf text-[16px]">
                            Quantity: {singleCartItem?.quantity}
                        </p>
                    <div className="mt-3">
                        <button
                            onClick={()=> handleRemoveFromCart(singleCartItem, false)}
                            className="disabled:opacity-55 border border-[#000] bg-gray-200 text-black px-5 py-2 rounded-lg"
                            disabled={singleCartItem?.quantity === 1}
                            >
                        -
                        </button> 
                        <button 
                            onClick={() => handleAddToCart(singleCartItem)}
                            className="border border-[#000] bg-gray-200 text-black px-4 py-2 rounded-lg"
                            >
                        +
                        </button>
                    </div>
            </div> 
        </div>
        <hr className="border-gray-500"/>

        </Fragment>
    );
}

export default CartTile;
