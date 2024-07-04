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
  });

  return (
    <div className="flex gap-2 flex-col ">
      <Navbar />
      <div className="mt-[2rem]">
        <div className="relative grad2 h-[24rem] w-full sm:px-[3rem] md:px-24 flex items-center">
          <div className="font-extrabold text-white w-full lg:w-[20rem] lg:text-5xl md:w-[15rem] md:text-2xl sm:w-[10rem] sm:text-xl">
            Dive into the soul of power
            <div className="text-xs font-thin mt-4">
              {/* {featuredProduct?.properties?.map((prop, index) => (
              <div key={index} className="flex gap-2">
              {Object.entries(prop).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <div>{key}:</div>
                    <div>{Array.isArray(value) ? value.join(", ") : value}</div>
                  </div>
                  ))}
              </div>
            ))} */}
              {featuredProduct?.productDescription.split(".")[0]}
            </div>
          </div>
          <button
            onClick={() => navigate(`product/${featuredProduct?._id}`)}
            className="ml-10 w-full flex overflow-hidden items-center justify-center h-full"
          >
            <img
              style={{
                mixBlendMode: "multiply",
              }}
              className="rounded-2xl lg:w-[30rem] md:w-[20rem] sm:w-[15rem] w-[10rem]"
              src={featuredProduct?.images[0].imageUrl}
              alt={featuredProduct?.productName}
            />
            <div className="font-extrabold hover:underline text-white lg:text-2xl md:text-xl sm:text-lg text-sm mt-2">
              {featuredProduct?.productName}
            </div>
          </button>

          <div className="h-full text-white flex justify-end items-end text-[0.5rem] absolute">
            *All rights to company
          </div>
        </div>
        <div className="p-2 px-24 ">
          <h1>New Arrivals</h1>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                productName={product?.productName || ""}
                images={product?.images || []}
                price={product?.price || 0}
                category={product?.category || ""}
                productDescription={product?.productDescription || ""}
                _id={product._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
