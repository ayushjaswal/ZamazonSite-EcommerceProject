import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { ProductData, config } from "../types";
import { path } from "../variable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();
  const [featuredProduct, setFeaturedProduct] = useState<ProductData>();
  const [products, setProdcuts] = useState<ProductData[]>([]);
  useEffect(() => {
    async function fetchFeaturedProduct() {
      const res = await axios.get(`${path}/product/feature-product`, config);
      if (res.data) {
        setFeaturedProduct(res.data);
      }
    }
    fetchFeaturedProduct();
  }, []);
  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(`${path}/product`, config);
      if (res.data) {
        setProdcuts(res.data);
      }
    }
    getProducts();
  }, []);

  return (
    <div className=" ">
      <div className="flex">
        <Navbar />
      </div>
      <div className="mt-24 ">
        <div className=" grad2 p-12 md:p-12 md:h-[30rem] md:flex">
          <div className="text-white md:text-4xl font-extrabold text-center h-full flex flex-col items-center justify-center">
            Dive into the soul of power
            <div className="md:text-[14px] font-thin mt-4">
              {featuredProduct?.productDescription.split(".")[0]}
            </div>
          </div>
          <button
            onClick={() => navigate(`product/${featuredProduct?._id}`)}
            className="md:ml-10 w-full md:flex-row flex-col items-center justify-center flex"
          >
            <img
              style={{
                mixBlendMode: "multiply",
              }}
              className="rounded-2xl lg:w-[30rem] md:w-[20rem] sm:w-[15rem] flex md:block justify-center md:justify-normal w-full"
              src={featuredProduct?.images[0].imageUrl}
              alt={featuredProduct?.productName}
            />
            <div className="text-white text-center md:text-[2rem] font-semibold">
              {featuredProduct?.productName}
            </div>
          </button>

          <div className="h-full text-white flex justify-end items-end text-[0.5rem] absolute">
            *All rights to company
          </div>
        </div>
        <div className="md:p-2 flex flex-col w-full items-center ">
          <h1>New Arrivals</h1>
          <div className=" flex flex-col w-full items-center md:grid md:grid-cols-3 gap-2">
            {products.map((product) => (
              <Card
                productName={product?.productName || ""}
                images={product?.images || []}
                price={product?.price || 0}
                _id={product._id!}
                review={product!.review || []}
                reviewValue={product.reviewValue || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
