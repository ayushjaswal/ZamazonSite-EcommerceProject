import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { path } from "../variable";
import { Address, CartProduct, config } from "../types";
import commaNumber from "comma-number";
import { Delete } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { asyncAddtoCart, asyncRemoveFromCart } from "../store/features/Auth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authUser);
  const [cart, setCart] = useState<CartProduct[]>();
  const [address, setAddress] = useState<Address>();
  useEffect(() => {
    async function getCart() {
      const res = await axios.get(`${path}/get-cart`, config);
      if (res.data) {
        setCart(res.data.cart);
      }
    }
    getCart();
  }, [dispatch, user]);
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  // function removeFromCart(id: string) {

  //   setCart((prev) => prev?.filter((val) => val.product._id !== id));
  // }
  const subtotal = cart?.reduce(
    (sum, product) => sum + product.product.price * product.quantity,
    0
  );

  return (
    <div className="flex gap-2 md:text-[1rem] text-[12px] ">
      <Navbar />
      {!cart?.length ? (
        <div className="mt-24 h-[100vh] w-full flex items-center justify-center text-center border rounded-lg m-4">
          {" "}
          Cart Empty
        </div>
      ) : (
        <div className="md:flex gap-2">
          <div className="mt-24 w-full ">
            {cart?.map((cartValue) => (
              <div className="flex flex-col gap-2 border p-2 m-4 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                <div
                  className="flex justify-between "
                  key={cartValue.product._id}
                >
                  <div
                    onClick={() =>
                      navigate(`/product/${cartValue.product._id}`)
                    }
                    className="md:flex items-center cursor-pointer "
                  >
                    <img
                      className="w-28 h-28 object-contain"
                      src={cartValue.product.images[0].imageUrl}
                    />
                    <div>
                      <div className="text-xl font-semibold">
                        {cartValue.product.productName}
                      </div>
                      <div className="break-words ">
                        {cartValue.product.productDescription.slice(0, 100)}...
                      </div>

                      <div className="font-bold">
                        ₹ {commaNumber(cartValue.product.price)}
                      </div>
                    </div>
                  </div>

                  <button
                    className=" "
                    onClick={() => {
                      dispatch(
                        asyncRemoveFromCart({
                          email: user.email,
                          product: cartValue.product._id!,
                        })
                      );
                    }}
                  >
                    <Delete className="hover:text-red-500 transition duration-200 ease-in-out" />
                  </button>
                </div>
                <div className="flex gap-2 ">
                  <button
                    onClick={() =>
                      dispatch(
                        asyncAddtoCart({
                          email: user.email,
                          product: cartValue.product._id!,
                        })
                      )
                    }
                    className="bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                  >
                    +
                  </button>
                  <div className=" text-center flex items-center rounded-md">
                    {cartValue.quantity}
                  </div>
                  <button
                    onClick={() =>
                      dispatch(
                        asyncRemoveFromCart({
                          email: user.email,
                          product: cartValue.product._id!,
                        })
                      )
                    }
                    className="bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-2 md:mt-24 px-4 md:pt-2 md:mx-4">
            <div className=" bg-blue-200  p-2 rounded-md shadow-md border text-xl md:text-[2rem]">
              Total Amount:{" "}
              <span className="font-bold">{commaNumber(subtotal)}</span>
            </div>
            <h1 style={{ margin: 0 }}>Add Address:</h1>

            <input
              type="text"
              placeholder="Street Address"
              value={address?.streetAddress}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev!,
                  streetAddress: e.target.value,
                }))
              }
              className="input"
            />
            <input
              type="text"
              placeholder="City"
              value={address?.city}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev!, city: e.target.value }))
              }
              className="input"
            />
            <input
              type="text"
              placeholder="Country"
              value={address?.country}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev!, country: e.target.value }))
              }
              className="input"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={address?.postalcode}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev!, postalcode: e.target.value }))
              }
              className="input"
            />
            <div className="m-4 flex gap-2">
              <button
                disabled={
                  cart?.length === 0 ||
                  address?.city === "" ||
                  address?.country === "" ||
                  address?.postalcode === "" ||
                  address?.streetAddress === ""
                }
                onClick={() =>
                  navigate("/confirmCheckout", { state: { address } })
                }
                className="border w-full px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Checkout
              </button>
              <button
                onClick={() => navigate("/")}
                className="border w-full px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                Shop More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
