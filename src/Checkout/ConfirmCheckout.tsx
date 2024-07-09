import { useEffect, useState } from "react";
import axios from "axios";
import { path } from "../variable";
import { Address, CartProduct, OrderProp, config } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import commaNumber from "comma-number";

const ConfirmCheckout = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { city, country, postalcode, streetAddress } = useLocation().state
    ?.address as Address;
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authUser);
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    async function getCart() {
      try {
        const res = await axios.get(`${path}/get-cart`, config);
        if (res.data) {
          setCart(res.data.cart);
        }
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    }
    getCart();
  }, []);

  const subtotal = cart.reduce(
    (sum, product) => sum + product.product.price * product.quantity,
    0
  );
  const gst = (subtotal * 0.01).toFixed(2);
  const deliveryCharges = 100;
  const total = (subtotal * 1.01 + deliveryCharges).toFixed(0);

  async function handleOrder() {
    let data: OrderProp = {
      cart,
      city,
      country,
      streetAddress,
      postalcode,
      user: user,
    };
    const res = await axios.post(`${path}/order/order-payment`, data);
    window.location.href = res.data;
    console.log(data!);
  }

  return (
    <div className="flex gap-2 flex-col">
      <div
        onClick={() => navigate("/cart")}
        className="w-[2rem] hover:text-red-400 cursor-pointer p-4"
      >
        Back
      </div>
      <div className=" flex justify-center">
        <div className=" px-2 py-2  m-2 md:m-0 md:text-[1rem] text-[10px] md:px-24 md:py-12 mb-12 border border-gray-300 shadow-lg rounded-lg bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Checkout Invoice
          </h1>
          <ol className="list-decimal list-inside ">
            {cart.map((product, index) => (
              <li key={index} className="mb-4 flex items-center">
                <img
                  src={product.product.images[0].imageUrl}
                  alt={product.product.productName}
                  className="w-20 h-20 object-cover mr-4 rounded"
                />
                <div className="flex-grow mx-4">
                  <span className="font-semibold">
                    {product.product.productName}
                  </span>
                  <div className="font-bold text-blue-700">
                    ₹{commaNumber(product.product.price)} x {product.quantity}
                  </div>
                </div>
                <div className="font-semibold text-yellow-700">
                  ₹{commaNumber(product.product.price * product.quantity)}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex justify-end">
            <div className="text-right">
              <div className="font-semibold text-gray-700">
                Subtotal: ₹{commaNumber(subtotal)}
              </div>
              <div className="font-semibold text-gray-700">
                Handling Charge (1%): ₹{commaNumber(gst)}
              </div>
              <div className="font-semibold text-gray-700">
                Delivery Charges:{" "}
                {subtotal > 500 ? (
                  <>
                    <span className="line-through text-red-500">₹100</span>
                    <span className="text-green-500 ml-2">₹0 (Free)</span>
                  </>
                ) : (
                  <>₹{commaNumber(deliveryCharges)}</>
                )}
              </div>
              <div className="font-bold text-xl mt-2">
                Total: ₹{commaNumber(total)}
              </div>
            </div>
          </div>
          <div>
            TO: {user.name}, {streetAddress}, {city}, {country}, {postalcode}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleOrder()}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCheckout;
