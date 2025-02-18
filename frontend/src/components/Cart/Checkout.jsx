import {useNavigate} from "react-router-dom";
import {useState} from "react";

const cart = {
    products: [
        {
            name: "Stylish Jacket",
            size: "M",
            color: "Black",
            price: 120,
            image: "https://picsum.photos/150?random=1"
        },
        {
            name: "Casual Sneakers",
            size: "42",
            color: "White",
            price: 75,
            image: "https://picsum.photos/1507?random=2"
        }

    ],
    totalPrice: 195

};
const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postCode: "",
        country: "",
        phone: ""
    });
    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(112);
    };
    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl py-10 px-6 tracking-tighter"}>
            {/*     Left Section         */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl uppercase mb-6">
                    Checkout
                </h2>
                <form onSubmit={handleCreateCheckout}>
                    {/*     Email       */}
                    <p className="text-lg mb-4">Contact Detail</p>
                    <div className="mb-4">
                        <label className="block text-gray-700"> Email </label>
                        <input
                            type="email"
                            value={"Example@gmail.com"}
                            className={"w-full p-2 border rounded"}
                            disabled/>
                    </div>

                    {/*     Delivery        */}
                    <p className="text-lg mb-4">Delivery</p>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="">
                            <label className="block text-gray-700"> First Name </label>
                            <input
                                type="text"
                                className={"w-full p-2 border rounded"}
                                required={true}
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                            />
                        </div>

                        <div className="">
                            <label className="block text-gray-700"> Last Name </label>
                            <input
                                type="text"
                                className={"w-full p-2 border rounded"}
                                required={true}
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                            />
                        </div>
                    </div>
                    {/*     Address       */}
                    <div className="mb-4">
                        <label className="block text-gray-700"> Address </label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                            className={"w-full p-2 border rounded"}
                            required={true}
                        />
                    </div>
                    {/*         City - Post Code        */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="">
                            <label className="block text-gray-700"> City </label>
                            <input
                                type="text"
                                className={"w-full p-2 border rounded"}
                                required={true}
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                            />
                        </div>

                        <div className="">
                            <label className="block text-gray-700"> Post Code </label>
                            <input
                                type="text"
                                className={"w-full p-2 border rounded"}
                                required={true}
                                value={shippingAddress.postCode}
                                onChange={(e) => setShippingAddress({...shippingAddress, postCode: e.target.value})}
                            />
                        </div>
                    </div>
                    {/*     Country       */}
                    <div className="mb-4">
                        <label className="block text-gray-700"> Country </label>
                        <input
                            type="text"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                            className={"w-full p-2 border rounded"}
                            required={true}
                        />
                    </div>

                    {/*     Phone       */}
                    <div className="mb-4">
                        <label className="block text-gray-700"> Phone </label>
                        <input
                            type="phone"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                            className={"w-full p-2 border rounded"}
                            required={true}
                        />
                    </div>
                    <div className="mt-6">
                        {
                            !checkoutId
                                ?
                                (<button type={"submit"} className={"w-full bg-black text-white py-3 rounded"}>
                                    Continue to Payment
                                </button>) : (
                                    <div>
                                        <h3 className="text-lg mb-4">Pay with PayPal</h3>
                                        {/*    PayPal Button*/}
                                    </div>
                                )
                        }
                    </div>

                </form>
            </div>
            {/*    Right section        */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-4"> Order Summary </h3>
                <div className="border-t py-4 mb-4">
                    {cart.products.map((product, index) => (
                        <div
                            key={index}
                            className={"flex items-start justify-between py-2 border-b"}>
                            <div className="flex items-start">
                                <img
                                    src={product.image}
                                    alt={product.image}
                                    className={"w-20 h-24 object-cover mr-4 rounded"}
                                />
                                <div className="">
                                    <h3 className="text-sm">{product.name}</h3>
                                    <p className="text-gray-500">Size:{product.size}</p>
                                    <p className="text-gray-500">Color:{product.color}</p>
                                </div>
                            </div>
                            <p className="text-xl">${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString() || 0}</p>
                </div>
                <div className="flex justify-between items-center text-lg">
                    <p>Shipping</p>
                    <p>Free </p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString() || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;