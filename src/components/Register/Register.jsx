
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
import signup from "../../assets/signup-g-Dtp6-wtD.svg";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";


export default function Register() {
  let { setToken } = useContext(userContext);
  let navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  

  async function submitData(values) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message === "success") {
        setIsLoading(true)
      
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success('Welcome you can log in now');

        navigate("/login");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("Something went wrong, please try again.");
      toast.error("You don`t have an account");
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(10, "Name must be at most 10 characters long")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[1250][0-9]{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Za-z]/, "Password must contain letters")
      .matches(/[0-9]/, "Password must contain numbers")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  let formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitData,
  });

  return loading? (<LoadingScreen/>): (
   

<main className="container px-4 py-3 mx-auto  ">
<Helmet><title>Sing Up</title></Helmet>
<section className="md:my-20 my-8">
  <div className="container px-4 mx-auto">
    <div className="justify-evenly md:flex-row flex flex-col items-center">
      <div className="lg:order-1 order-2 px-4">
        <img src={signup} alt="signin-img" />
      </div>
      <div className="lg:order-2 md:mb-0 order-1 px-4 mb-10">
        <div className="lg:mb-7 mb-6">
          <h1 className="mb-1 text-3xl font-bold text-gray-700">
          Get Start Shopping
          </h1>
          <p>Welcome to FreshCart! Enter your email to get started.</p>
        </div>
        <form className="select-none" onSubmit={formikRegister.handleSubmit}>
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="email">
                Name
              </label>
            </div>
            <input
               type="text"
               id="name"
               name="name"
               onChange={formikRegister.handleChange}
               value={formikRegister.values.name}
               className="h-[45px] w-[400px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
               placeholder="Enter your name"
            />
            {formikRegister.errors.name && formikRegister.touched.name && (
            <div className="text-red-600">{formikRegister.errors.name}</div>
          )}
          </div>

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
              <label className="text-sm font-medium" htmlFor=" Phone ">
              Phone :
              </label>
            </div>
            <input
             type="tel"
             id="phone"
             name="phone"
             onChange={formikRegister.handleChange}
             value={formikRegister.values.phone}
              className="h-[45px] w-[400px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
             placeholder="Enter your phone number"
            />
            {formikRegister.errors.phone && formikRegister.touched.phone && (
            <div className="text-red-600">{formikRegister.errors.phone}</div>
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
                placeholder="Enter your password"
                className="h-[45px] w-[400px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                aria-label="Password"
              />
              {/* Password visibility toggle could be added here */}
            </div>
            {formikRegister.errors.password &&
            formikRegister.touched.password && (
              <div className="text-red-600">
                {formikRegister.errors.password}
              </div>
            )}
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="password">
              rePassword
              </label>
            </div>
            <div className="flex">
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                onChange={formikRegister.handleChange}
                value={formikRegister.values.rePassword}
                placeholder="******"
                className="h-[45px] w-[400px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                aria-label="Password"
              />
              {/* Password visibility toggle could be added here */}
            </div>
            {formikRegister.errors.rePassword &&
            formikRegister.touched.rePassword && (
              <div className="text-red-600">
                {formikRegister.errors.rePassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formikRegister.isSubmitting}
          
            className="hover:bg-[#088A08] focus:ring-[#6cce6c] disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer"
          >
            {formikRegister.isSubmitting ? "Submitting..." : "Sign up"}
          </button>

          <p className="mt-5 text-base font-medium">
            You don’t have an account?{" "}
            <Link className="text-[#0AAD0A]" to="/login">
              Sign In
            </Link>
          </p>
         
        </form>
      </div>
    </div>
  </div>
</section>
</main> 


  );
}

