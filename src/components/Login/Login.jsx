import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
import signin from "../../assets/signin-DlR7P608.png";
import toast from "react-hot-toast"
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";


export default function Login() {
  let { setToken } = useContext(userContext);
  const [loading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  async function handleLogin(values) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message === "success") {
        setIsLoading(true)
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success('Welcome To Fresh Cart');
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      toast.error("You don`t have an account");
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Za-z]/, "Password must contain letters")
      .matches(/[0-9]/, "Password must contain numbers")
      .required("Password is required"),
  });

  let formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return loading? (<LoadingScreen/>) :(
   
    <main className="container px-4 mx-auto overflow-hidden">
      <Helmet><title>Login</title></Helmet>
<section className="md:my-20 my-8">
  <div className="container px-4 mx-auto">
    <div className="justify-evenly md:flex-row flex flex-col items-center">
      <div className="lg:order-1 order-2 px-4">
        <img src={signin} alt="signin-img" />
      </div>
      <div className="lg:order-2 md:mb-0 order-1 px-4 mb-10">
        <div className="lg:mb-10 mb-6">
          <h1 className="mb-1 text-3xl font-bold text-gray-700">
            Sign in to FreshCart
          </h1>
        </div>
        <form className="select-none" onSubmit={formikRegister.handleSubmit}>
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
            </div>
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              onChange={formikRegister.handleChange}
              value={formikRegister.values.email}
              className="h-[45px] w-[400px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              aria-label="Email"
            />
            {formikRegister.errors.email && formikRegister.touched.email && (
              <div className="text-red-500 text-xs">{formikRegister.errors.email}</div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
            </div>
            <div className="flex">
              <input
                type="password"
                id="password"
                name="password"
                onChange={formikRegister.handleChange}
                value={formikRegister.values.password}
                placeholder="******"
                className="h-[45px] w-[400px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                aria-label="Password"
              />
              {/* Password visibility toggle could be added here */}
            </div>
            {formikRegister.errors.password && formikRegister.touched.password && (
              <div className="text-red-500 text-xs">{formikRegister.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={formikRegister.isSubmitting}
            className="hover:bg-[#088A08] focus:ring-[#6cce6c] disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer"
          >
            {formikRegister.isSubmitting ? "Submitting..." : "Sign In"}
          </button>

          <p className="mt-5 text-base font-medium">
            You don’t have an account?{" "}
            <Link className="text-[#0AAD0A]" to="/register">
              Sign Up
            </Link>
          </p>
          <Link
            className="block mt-2 text-base font-medium text-[#0AAD0A]"
            to="/forget"
          >
            Forgot your password?
          </Link>
        </form>
      </div>
    </div>
  </div>
</section>
</main> 





 
 
  );
};



