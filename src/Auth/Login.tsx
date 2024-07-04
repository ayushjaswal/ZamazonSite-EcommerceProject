import { GoogleLogin } from "@react-oauth/google";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncAuthSlice, asyncSessionSlice } from "../store/features/Auth";
import { AppDispatch, RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUser = useSelector((state: RootState) => state.authUser.email);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function checkLogin() {
      dispatch(asyncSessionSlice());
      if (loggedInUser) {
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo);
      }
    }

    checkLogin();
  }, [dispatch, navigate, loggedInUser]);

  async function login(token: string) {
    try {
      dispatch(asyncAuthSlice(token));
      if (loggedInUser) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-black grad">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          login(credentialResponse.credential!);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;
