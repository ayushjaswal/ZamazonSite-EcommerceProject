import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductData, config } from "../types";
import Navbar from "../Navbar/Navbar";
import { path } from "../variable";
import commaNumer from "comma-number";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData>();
  const [showImage, setShowImage] = useState("");
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
  return (
    <div className="flex sm:flex sm:flex-col gap-2 flex-col">
      <Navbar />
      <div className="mt-24 px-12">
        <div className="flex gap-2 ">
          <div className="flex flex-col gap-2 ">
            {product?.images.map((image) => (
              <div
                onClick={() => setShowImage(image.imageUrl)}
                className="border rounded-md w-12 cursor-pointer"
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
          <div className="md:w-full">
            <h1 className="">{product?.productName}</h1>
            <div className="text-4xl  font-extrabold m-4">
              ₹ {commaNumer(product?.price)}
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
              <button className="w-full border p-3 px-5 cursor-pointer border-blue-600 hover:bg-gray-100 rounded-lg text-black transition duration-200 ease-in-out">
                Add to cart
              </button>
              <button className="w-full border p-3 px-5 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-200 ease-in-out">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
