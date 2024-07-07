import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductData, ProductImage, Review, config } from "../types";
import Navbar from "../Navbar/Navbar";
import { path } from "../variable";
import commaNumer from "comma-number";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { asyncAddtoCart, asyncRemoveFromCart } from "../store/features/Auth";
import StarRatings from "react-star-ratings";
import { Delete, Upload, X } from "react-feather";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";
import ReactStars from "react-rating-stars-component";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authUser);
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<ProductData>();
  const [showImage, setShowImage] = useState("");
  const [review, setReview] = useState<Review>({
    comment: "",
    product: id!,
    stars: 0,
    images: [],
    user: user,
  });
  const [imageUpload, setImageUpload] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    async function getProduct() {
      const res = await axios.get(`${path}/product/get-product/${id}`, config);
      if (res.data) {
        setProduct(res.data);
      }
    }
    getProduct();
  }, [id]);
  useEffect(() => {
    setShowImage(product?.images[0]!.imageUrl || "");
  }, [product]);

  useEffect(() => {
    const calculateStarsVal = () => {
      const starsVal =
        (product?.reviewValue || 0) / (product?.review?.length || 1);
      console.log(starsVal);
      setRating(starsVal);
    };

    calculateStarsVal();
  }, [product]);

  async function handleImageDelete(imageUrl: ProductImage) {
    const storageRef = ref(storage, `reviewImages/${imageUrl.imageName}`);

    setReview((prev) => ({
      ...prev,
      images: review.images!.filter(
        (image) => image.imageName !== imageUrl.imageName
      ),
    }));
    await deleteObject(storageRef)
      .then(() => {
        toast.success("Image deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete image!");
      });
  }

  async function uploadImage(ev: React.ChangeEvent<HTMLInputElement>) {
    setIsUploading(true);
    const file = ev.target.files![0];
    const fileName = Date.now() + "." + file.name.split(".").pop();
    const imageRef = ref(storage, `reviewImages/${fileName}`);
    try {
      await uploadBytesResumable(imageRef, file);
      const url = await getDownloadURL(imageRef);

      const newImages: ProductImage[] = [];
      if (review && review.images) {
        for (let i = 0; i < review!.images!.length || 0; i++) {
          newImages.push(review!.images![i]);
        }
      }
      newImages.push({ imageName: fileName, imageUrl: url });
      setReview((prev) => ({ ...prev!, images: newImages }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload image!");
    }
    setIsUploading(false);
  }

  async function deleteReview(id: string) {
    try {
      let images: ProductImage[];
      for (let index = 0; index < product!.review!.length || 0; index++) {
        if (product?.review![index]._id == id) {
          images = product!.review![index].images!;
        }
      }
      const newReview = product?.review?.filter((rev) => rev._id !== id);
      if (images!.length > 0) {
        for (let index = 0; index < images!.length; index++) {
          const storageRef = ref(
            storage,
            `reviewImages/${images![index].imageName}`
          );
          await deleteObject(storageRef);
        }
      }
      const res = await axios.delete(`${path}/review/delete/${id}`);
      if (res.data) {
        setProduct((prev) => ({ ...prev!, review: newReview }));
        toast.success("Review deleted successfully");
      } else {
        toast.error("Fail to delete review");
      }
    } catch (err) {
      toast.error("Fail to delete review");
      console.log(err);
    }
  }

  async function handleReviewSubmit() {
    try {
      const res = await axios.post(`${path}/review/new-review`, review, config);
      if (res.data) {
        console.log(res.data);
        setProduct((prev) => ({
          ...prev!,
          review: [...product!.review!, res.data],
        }));
        const starsVal =
          (product?.reviewValue || 0 + review.stars) /
          (product?.review?.length || 1);
        console.log(starsVal);
        setRating(starsVal);
        setReview({
          comment: "",
          product: id!,
          stars: 0,
          images: [],
          user: user,
        });
        toast.success("Review successfully submitted");
      } else {
        toast.error("Fail to submit review");
      }
    } catch (err) {
      toast.error("Fail to submit review");
      console.log(err);
    }
  }

  return (
    <div className="flex sm:flex sm:flex-col gap-2 flex-col">
      <Navbar />
      <Toaster richColors position="bottom-center" />
      <div className="mt-24 px-12">
        <div className="flex gap-2 ">
          <div className="flex flex-col gap-2 ">
            {product?.images.map((image) => (
              <div
                onClick={() => setShowImage(image.imageUrl)}
                className={
                  "border rounded-md w-12 cursor-pointer " +
                  (showImage === image.imageUrl ? "ring-2" : "")
                }
              >
                <img src={image.imageUrl} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center md:w-full border rounded-md">
            <img
              className="w-[34rem] h-[30rem] object-contain "
              src={showImage}
            />
          </div>
          <div className="md:w-full m-4">
            <h1 style={{ margin: 0 }} className="">
              {product?.productName}
            </h1>
            <div className="text-4xl  font-extrabold ">
              ₹ {commaNumer(product?.price)}
            </div>
            <div className="flex">
              <StarRatings
                rating={rating}
                starRatedColor="blue"
                starDimension="20px"
              />

              <div className="mx-4">{product?.review?.length || 0} Reviews</div>
            </div>
            <div className="border w-full h-[1px] mb-4" />
            <div>
              <div className="font-semibold">About this item</div>
              <ul className="list-disc list-inside">
                {product?.productDescription.split(";").map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 m-2">
              {!user.cart ||
              !user.cart.some((val) => val.product._id === product?._id) ? (
                <button
                  onClick={() =>
                    dispatch(
                      asyncAddtoCart({ product: id!, email: user.email })
                    )
                  }
                  className="w-full border p-3 px-5 cursor-pointer border-blue-600 hover:bg-gray-100 rounded-lg text-black transition duration-200 ease-in-out"
                >
                  Add to cart
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      asyncRemoveFromCart({ product: id!, email: user.email })
                    )
                  }
                  className="w-full border p-3 px-5 cursor-pointer bg-black rounded-lg text-white transition duration-200 ease-in-out"
                >
                  Remove from cart
                </button>
              )}
              <button
                onClick={() => navigate("/cart")}
                className="w-full border p-3 px-5 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-200 ease-in-out"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="m-4">
            <h1>Rate this product</h1>
            <ReactStars
              count={5}
              onChange={(e: number) =>
                setReview((prev) => ({ ...prev, stars: e }))
              }
              size={24}
              value={review.stars}
              activeColor="#ffd700"
            />
            <div>
              {isUploading && (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-400 rounded-md ">
                  <ClipLoader color="#d3f7c3" speedMultiplier={1} />
                </div>
              )}
              {review?.images?.map((image) => (
                <div className="relative">
                  <img
                    key={image.id}
                    className="w-24 h-24 rounded-lg my-2"
                    src={image.imageUrl}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleImageDelete(image);
                    }}
                    className="absolute top-[-10px] left-[5rem]  rounded-full bg-red-500 text-white text-center hover:bg-red-600 transition ease-in-out duration-200  "
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <label className="bg-gray-100 p-2 rounded-md border shadow-sm hover:bg-gray-200transition duration-200 ease-in-out cursor-pointer">
                <Upload />
                <input
                  value={imageUpload}
                  onChange={uploadImage}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                />
              </label>
              <input
                value={review.comment}
                onChange={(e) =>
                  setReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                className="input"
                placeholder="Write your review here"
              />
              <button
                disabled={!review.comment}
                onClick={handleReviewSubmit}
                className="w-1/5 border  cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-200 ease-in-out"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="m-4 flex flex-col gap-2">
            <h1>Reviews</h1>
            {product &&
              product.review &&
              product!.review?.map((review) => (
                <div
                  className="relative border p-2 rounded-md "
                  key={review._id}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          className="rounded-full w-10 h-10 object-contain"
                          src={review.user.profile}
                        />
                      </div>
                      <div>{review.user.name}</div>
                    </div>
                    <div className="mt-2">{review.comment}</div>
                    <div className="flex gap-2 ">
                      {review.images?.map((image) => (
                        <img
                          className="w-10 h-10 border rounded-md object-contain"
                          src={image.imageUrl}
                        />
                      ))}
                    </div>
                    <div>
                      <StarRatings
                        rating={review.stars}
                        starRatedColor="#FACC15"
                        starDimension="15px"
                      />
                    </div>
                  </div>
                  {review.user.email === user.email && (
                    <button
                      onClick={() => deleteReview(review._id!)}
                      className="absolute top-0 right-0 p-3"
                    >
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
