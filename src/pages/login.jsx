import {
  Email,
  Email2,
  Facebook,
  Password,
  SvgHeaderSignIn,
  Twitter,
} from "@/components/icon/SvgPage";
import { useState } from "react";
import { useUser } from "@/state/user";
import { useRouter } from "next/router";
import apiServices from "@/services/apiServices";
import toast from "react-hot-toast";
import { PROFILE_STORAGE_KEY } from "@/constant/constant";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, onSetUser } = useUser();
  const router = useRouter();

  const handleEmailInput = (e) => {
    setInputEmail(e.target.value);
    console.log(inputEmail);
  };

  const handlePasswordInput = (e) => {
    setInputPassword(e.target.value);
    console.log(inputPassword);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const loginData = await apiServices.login({
        email: inputEmail,
        password: inputPassword,
      });
      console.log(loginData);
      localStorage.setItem(PROFILE_STORAGE_KEY, loginData.data.accessToken);
      const userData = await apiServices.getProfile();
      onSetUser(userData?.data);
      await router.push("/");
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    toast.promise(handleLogin(), {
      success: () => {
        return "Logging in successfully";
      },
      loading: "Logging in ...",
      error: (err) => `Login failed: ${err.message}`,
    });
  };

  return (
    <div id="SignIn">
      <div className="header_SignIn">
        <SvgHeaderSignIn />
      </div>
      <div className="main_SignIn">
        <div className="content_SignIn">
          <h1
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "22px",
              color: "#01221D",
            }}
          >
            Sign in
          </h1>
          <div style={{ margin: "0px 150px" }}>
            <div
              className="position-relative"
              style={{ padding: "30px 0px 0px" }}
            >
              <input
                className="input_SignIn input_elm"
                type="text"
                placeholder="Email"
                onChange={handleEmailInput}
              />
              <div className="icon_Ip_SignIn">
                <Email />
              </div>
            </div>
            <div
              className="position-relative"
              style={{ padding: "30px 0px 0px" }}
            >
              <input
                className="input_SignIn input_elm"
                type="password"
                placeholder="Password"
                onChange={handlePasswordInput}
              />
              <div className="icon_Ip_SignIn">
                <Password />
              </div>
            </div>
            <div
              style={{
                textAlign: "end",
                marginTop: "20px",
                color: "#01221D",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              Forgot password?
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "45px" }}>
            <button
              className="btn_SignIn btn_elm"
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
      <div className="footer_SignIn">
        <div
          style={{
            fontSize: "12px",
            fontWeight: "400",
            color: "#F4F5F6",
            textAlign: "center",
            margin: "50px 0px",
          }}
        >
          Or sign in with
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="social_icon"
        >
          <div className="box_social_icon">
            <Facebook />
          </div>
          <div className="box_social_icon">
            <Email2 />
          </div>
          <div className="box_social_icon">
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
