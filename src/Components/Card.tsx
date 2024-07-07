import { Check, ShoppingCart } from "react-feather";
import { CardProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddtoCart } from "../store/features/Auth";
import { AppDispatch, RootState } from "../store/store";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import commaNumber from "comma-number";

const Card = ({
  productName,
  images,
  _id,
  price,
  review,
  reviewValue,
}: CardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authUser);
  const val = reviewValue / (review?.length || 1);
  return (
    <div
      className="relative w-[80%] hover:shadow-lg text-center rounded-2xl 
     border transition duration-200 ease-in-out py-1 px-2"
    >
      <div
        className="cursor-pointer flex flex-col gap-2"
        onClick={() => navigate(`product/${_id}`)}
      >
        <StarRatings
          rating={val || 0}
          starRatedColor="blue"
          starDimension="20px"
        />
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
        {!user.cart || !user.cart.some((val) => val.product._id === _id) ? (
          <ShoppingCart
            onClick={() => {
              dispatch(asyncAddtoCart({ email: user!.email, product: _id! }));
            }}
            size={16}
          />
        ) : (
          <Check />
        )}
      </button>
      <div className="text-xl font-bold">₹ {commaNumber(price)}</div>
    </div>
  );
};

export default Card;
