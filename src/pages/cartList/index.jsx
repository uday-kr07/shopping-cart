import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartTile from "../../components/cartTile";


function CartListPage() {
    const {CartItems} = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen max-w-5xl mx-auto max-md:max-w-xl py-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
                My Cart Page
                </h1>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="text-black text-2xl mt-8 font-semibold relative left-10 top-5 md:col-span-2 space-y-4">
                        {
                        CartItems?.length ? (
                            CartItems.map((singleCartItem) => (
                                <CartTile 
                                    key={singleCartItem.id} 
                                    singleCartItem={singleCartItem} 
                                    />
                            ))
                        ) : (
                                <h1>No items available in cart! Please add some items</h1>
                            )
                        }
                    </div>
                    <div className="bg-gray-100 rounded-sm p-4 h-max">
                        <h3 className="text-xl font-extrabold text-gray-950 border-b border-gray-300 pb-2">
                            Order Summary
                            </h3>
                            <ul className="text-gray-700 mt-4 space-y-2">
                                <p className="flex flex-wrap gap-4 text-sm font-bold text-black">
                                    Total <span>
                                        $ {CartItems.reduce((acc, curr) => acc + curr.totalPrice , 0).toFixed(2)}
                                    </span>
                                </p>
                            </ul>
                            <div className="mt-5 flex gap-2 ">
                                <button 
                                disabled={CartItems.length === 0}
                                className="disabled:opacity-60 text-sm px-4 py-3 bg-black text-white font-bold">
                                    CheckOut
                                </button>
                                <button onClick={() => navigate("/product")}
                                className="text-sm px-4 py-3 bg-black text-white font-bold">
                                    Continue Shopping
                                </button>
                            </div>
                    </div>
                </div>
        </div>
    );

}

export default CartListPage;