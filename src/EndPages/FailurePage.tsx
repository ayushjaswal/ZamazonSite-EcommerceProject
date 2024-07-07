import { Link } from "react-router-dom";
import { X } from "react-feather";

const FailurePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-full text-center">
      <div className="flex w-full items-center flex-col">
        <div className="border border-red-400 p-2 rounded-full">
          <X />
        </div>
        <h1> Failed to make a Purchase!</h1>
        <p>
          There has been some issue while placing your order. Please try again
          later!
        </p>
        <p>
          If money is deducted it will be return to your bank account in 3-5
          business days.
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

export default FailurePage;
