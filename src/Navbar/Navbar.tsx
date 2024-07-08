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
  const [openSearch, setOpenSearch] = useState(false);

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
    <div className="fixed w-full py-4 shadow-sm z-[100] bg-white text-xs md:text-[1rem]">
      <nav className="flex gap-2 items-center justify-between ">
        <button
          onClick={() => navigate("/")}
          className=" w-full md:w-1/4 md:text-2xl px-3 py-2 font-semibold text-center bg-blue-500 rounded-full text-white"
        >
          Zamazon
        </button>
        <div>IN</div>
        <div className="flex-grow flex justify-center items-center w-full">
          <Search
            onClick={() => setOpenSearch(!openSearch)}
            className="cursor-pointer md:hidden"
          />
          {openSearch && (
            <div className="md:flex items-center relative">
              <input
                value={search}
                onChange={(ev) => setSearch(ev.target.value)}
                className="navinput md:flex-grow md:mx-2"
                placeholder="Search"
              />
              {searchRes.length > 0 && (
                <div className="absolute bg-white w-full border p-2 rounded-md max-h-[8rem] overflow-y-scroll z-10">
                  {searchRes.map((value) => (
                    <div
                      key={value._id}
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
          )}
          <div className="hidden md:flex items-center relative w-full">
            <input
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
              className="navinput w-full"
              placeholder="Search"
            />
            {searchRes.length > 0 && (
              <div className="absolute bg-white w-full border p-2 rounded-md max-h-[8rem] overflow-y-scroll z-10">
                {searchRes.map((value) => (
                  <div
                    key={value._id}
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
        </div>
        <div className="flex items-center gap-2 md:gap-6 bg-blue-500 rounded-full p-2 w-full md:w-1/4">
          <img
            className="rounded-full w-6 md:w-12 h-6 md:h-12"
            src={user.profile}
            alt="User"
          />
          <button
            onClick={() => navigate("/cart")}
            className="relative text-white"
          >
            <ShoppingCart className="size-6 md:size-8" size={24} />
            <div className="absolute top-0 right-0 text-center md:text-xs bg-purple-700 rounded-full  w-4 h-4 flex items-center justify-center">
              {user.cart?.length}
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
