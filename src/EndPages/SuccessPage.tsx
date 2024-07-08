import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { path } from "../variable";
import { config } from "../types";
import { Check } from "react-feather";

const SuccessPage = () => {
  const { orderId } = useParams();
  useEffect(() => {
    async function clearCart() {
      const res = await axios.get(`${path}/clear-cart/${orderId}`, config);
    }
    clearCart();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-full text-center">
      <div className="flex w-full items-center flex-col">
        <div className="border border-green-400 p-2 rounded-full">
          <Check />
        </div>
        <h1>Thank You for Your Purchase!</h1>
        <p>
          Your order has been successfully placed. We appreciate your business!
        </p>
      </div>

      <div className="home-button">
        <Link to="/">
          <button className="bg-yellow-200 p-2 rounded-md hover:bg-yellow-300 transition ease-in-out duration-200">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
