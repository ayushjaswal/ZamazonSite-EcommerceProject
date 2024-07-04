import { Check, ShoppingBag, ShoppingCart } from "react-feather";
import { ProductData } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../store/features/Auth";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import commaNumber from "comma-number";

const Card = ({
  productName,
  productDescription,
  images,
  _id,
  category,
  price,
}: ProductData) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authUser);
  return (
    <div
      className="relative w-[80%] hover:shadow-lg text-center rounded-2xl 
     border transition duration-200 ease-in-out py-1 px-2"
    >
      <div
        className="cursor-pointer"
        onClick={() => navigate(`product/${_id}`)}
      >
        {images[0]?.imageUrl && (
          <img
            className="object-contain rounded-lg w-[100%] h-[15rem]"
            src={images[0].imageUrl!}
          />
        )}
      </div>
      <div
        onClick={() => navigate(`product/${_id}`)}
        className=" cursor-pointer hover:underline"
      >
        {productName}
      </div>
      <button className="absolute top-0 right-0 p-2 m-2 bg-purple-400 rounded-full text-white size-8 flex items-center hover:bg-purple-500 transition duration-200 ease-in-out">
        {!user.cart?.includes(_id!) ? (
          <ShoppingCart onClick={() => dispatch(addtoCart(_id))} size={16} />
        ) : (
          <Check />
        )}
      </button>
      <div className="text-xl font-bold">₹ {commaNumber(price)}</div>
    </div>
  );
};

export default Card;
