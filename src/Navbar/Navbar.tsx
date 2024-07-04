import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Search, Settings, ShoppingCart } from "react-feather";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { path } from "../variable";
import { ProductData, config } from "../types";
const Navbar = () => {
  const user = useSelector((state: RootState) => state.authUser);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState<ProductData[]>([]);
  useEffect(() => {
    async function getSearchRes() {
      if (search) {
        const res = await axios.get(`${path}/product/search/${search}`, config);
        if (res.data) {
          setSearchRes(res.data);
        }
      }
    }
    getSearchRes();
    if (search === "") {
      setSearchRes([]);
    }
  }, [search]);

  return (
    <div className="fixed w-full py-4 shadow-sm z-[100] bg-white">
      <nav className=" flex gap-2 items-center justify-end  ">
        <button
          onClick={() => navigate("/")}
          className="w-1/4 text-2xl px-4 py-2 font-semibold text-center  bg-blue-500 rounded-r-full text-white"
        >
          Zamazon
        </button>
        <div>IN</div>
        <div className="relative w-full">
          <input
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            className="navinput "
            placeholder="Search"
          />
          {searchRes.length > 0 && (
            <div className="absolute bg-white w-full border p-2 rounded-md max-h-[8rem] overflow-y-scroll z-10">
              {searchRes.map((value) => (
                <div
                  className="hover:bg-gray-200 p-1 px-2 rounded-md cursor-pointer border my-1"
                  onClick={() => {
                    setSearch("");
                    navigate(`/product/${value._id}`);
                  }}
                >
                  {value.productName}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-4 py-2 flex w-1/4 justify-end items-center gap-6 bg-blue-500 rounded-l-full">
          <div className="font-semibold text-white">EN</div>
          <div className="flex flex-col h-full items-center">
            <img className="rounded-full w-[50%] h-[50%]" src={user.profile} />
            <div className="h-full items-center"></div>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="relative text-white  p-2 "
          >
            <ShoppingCart size={24} />
            <div className="absolute top-0 right-0 text-center text-xs bg-purple-700 rounded-full w-4 flex items-center justify-center">
              {user.cart?.length}
            </div>
          </button>
          <button onClick={() => navigate("/settings")}>
            <Settings color="white" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
