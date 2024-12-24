// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useContext, useState } from "react";
// import { CartContextProvider } from "../../Context/CartContext";
// import { useNavigate } from "react-router-dom";

// let token = localStorage.getItem("token");

// export default function Payment() {
//   let { cartId } = useContext(CartContextProvider);
//   let [cash, setCash] = useState(false);
//   let navigate = useNavigate();

//   function handleCashPayment(apiObj) {
//     axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
//         { apiObj },
//         { headers: { token } }
//       )
//       .then((res) => {
//         console.log(res.data);
//         navigate("/cart");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function handleOnlinePayment(apiObj) {
//     axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
//         { apiObj },
//         { headers: { token }, params: { url: "http://localhost:5173" } }
//       )
//       .then((res) => {
//         console.log(res.data);
//         window.open(res.data.session.url, "_self");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function handelPayment(values) {
//     let apiObj = { shippingAddress: values };
//     if (cash) {
//       handleCashPayment(apiObj);
//     } else {
//       handleOnlinePayment(apiObj);
//     }
//   }

//   const validationSchema = Yup.object({
//     phone: Yup.string()
//       .required("Phone number is required")
//       .matches(
//         /^[0-9]{11}$/,
//         "Phone number must be exactly 11 digits"
//       ),
//     city: Yup.string()
//       .required("City is required")
//       .min(3, "City must be at least 3 characters")
//       .max(50, "City must be less than 50 characters"),
//     details: Yup.string()
//       .required("Address details are required")
//       .max(200, "Address must be less than 200 characters"),
//   });

//   let formikPayment = useFormik({
//     initialValues: { details: "", phone: "", city: "" },
//     validationSchema,
//     onSubmit: handelPayment,
//   });

//   return (
//     <main className="container px-4 mx-auto overflow-hidden">
//       <section className="lg:mx-24 lg:px-8 px-2 py-12">
//         <h2 className="mb-8 text-3xl font-semibold text-[#0AAD0A]">Checkout</h2>
//         <form className="select-none" onSubmit={formikPayment.handleSubmit}>
//           <div className="mb-6">
//             <div className="flex justify-between mb-3">
//               <label className="text-sm font-medium" htmlFor="phone">
//                 Phone
//               </label>
//             </div>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               onChange={formikPayment.handleChange}
//               value={formikPayment.values.phone}
//               placeholder="Phone Number..."
//               className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
//             />
//             {formikPayment.errors.phone && formikPayment.touched.phone && (
//               <div className="text-red-500 text-sm">{formikPayment.errors.phone}</div>
//             )}
//           </div>

//           <div className="mb-6">
//             <div className="flex justify-between mb-3">
//               <label className="text-sm font-medium" htmlFor="city">
//                 City
//               </label>
//             </div>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               onChange={formikPayment.handleChange}
//               value={formikPayment.values.city}
//               placeholder="Write Your City..."
//               className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
//             />
//             {formikPayment.errors.city && formikPayment.touched.city && (
//               <div className="text-red-500 text-sm">{formikPayment.errors.city}</div>
//             )}
//           </div>

//           <div className="mb-6">
//             <div className="flex justify-between mb-3">
//               <label className="text-sm font-medium" htmlFor="details">
//                 Details
//               </label>
//             </div>
//             <textarea
//               id="details"
//               name="details"
//               onChange={formikPayment.handleChange}
//               value={formikPayment.values.details}
//               placeholder="Write Your Address Here..."
//               cols={30}
//               rows={3}
//               maxLength={200}
//               className="focus:shadow-input-focus focus:outline-none w-full px-4 py-2 font-medium border border-gray-300 border-solid rounded-lg"
//             />
//             {formikPayment.errors.details && formikPayment.touched.details && (
//               <div className="text-red-500 text-sm">{formikPayment.errors.details}</div>
//             )}
//           </div>

//           <div className="flex gap-6">
//             <button
//               onClick={() => {
//                 setCash(true);
//               }}
//               type="submit"
//               className="text-white mt-3 bg-[#0AAD0A] hover:bg-[#088A08] focus:ring-[#6cce6c] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//               disabled={formikPayment.isSubmitting}
//             >
//               Cash Payment
//             </button>
//             <button
//               onClick={() => {
//                 setCash(false);
//               }}
//               type="submit"
//               className="text-white mt-3 bg-[#0AAD0A] hover:bg-[#088A08] focus:ring-[#6cce6c] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//               disabled={formikPayment.isSubmitting}
//             >
//               Online Payment
//             </button>
//           </div>
//         </form>
//       </section>
//     </main>
//   );
// }

import { useContext, useState } from "react";
import { CartContextProvider } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { userContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";
export default function Payment() {
  let { cartId } = useContext(CartContextProvider);
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  let { setUserId } = useContext(userContext);
  function handleCashPayment(apiObj) {
    setLoading(true);
    axios
      .post(
        ` https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { apiObj },
        { headers: { token } }
      )
      .then((res) => {
        setUserId(res?.data?.data?.user);
        localStorage.setItem("Userid", res?.data.data.user);

        setLoading(false); // Set loading to false when request is complete
        toast.success("Order placed successfully!");
        navigate("/allorders");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false on error
        toast.error("Payment failed, try again..");
      });
  }

  function handleOnlinePayment(apiObj) {
    setLoading(true);
    axios
      .post(
        `  https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { apiObj },
        { headers: { token }, params: { url: "http://localhost:5173" } }
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
        setLoading(false); // Set loading to false when request is complete
        toast.success("Order placed successfully!");
        navigate("/allorders");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false when request is complete
        toast.error("Payment failed, try again.");
      });
  }

  function handelPayment(values) {
    let apiObj = { shippingAddress: values };
    if (formikPayment.values.payment === "cash") {
      handleCashPayment(apiObj);
    } else {
      handleOnlinePayment(apiObj);
    }
  }

  let validationSchema = Yup.object().shape({
    city: Yup.string()
      .min(3, "Minimum 3 letters")
      .max(13, "Maximum 13 letter")
      .required("City is required"),
    phone: Yup.string()
      .matches(/^01[1250][0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
    details: Yup.string()
      .min(10, "Minimum 10 letters")
      .max(40, "Maximum 40 letter")
      .required("Details is required"),
    payment: Yup.string().required("Payment method is required"),
  });

  let formikPayment = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
      payment: "",
    },
    onSubmit: (values) => {
      handelPayment(values);
    },
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      {loading && <LoadingScreen />}
      <div className="bg-center flex-1 mt-16">
        <main className="container px-4 mx-auto overflow-hidden">
          <section className="lg:mx-24 lg:px-8 px-2 py-12">
            <h2 className="mb-8 text-3xl font-semibold text-gray-500">
              Checkout
            </h2>
            <form onSubmit={formikPayment.handleSubmit} className="select-none">
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="phone">
                    Phone
                  </label>
                  {formikPayment.errors.phone && formikPayment.touched.phone ? (
                    <p className="text-sm text-red-600">
                      {formikPayment.errors.phone}
                    </p>
                  ) : null}
                </div>
                <input
                  onBlur={formikPayment.handleBlur}
                  onChange={formikPayment.handleChange}
                  value={formikPayment.values.phone}
                  type="tel"
                  id="phone"
                  placeholder="Phone Number..."
                  className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="city">
                    City
                  </label>
                  {formikPayment.errors.city && formikPayment.touched.city ? (
                    <p className="text-sm text-red-600">
                      {formikPayment.errors.city}
                    </p>
                  ) : null}
                </div>
                <div className="flex">
                  <input
                    onBlur={formikPayment.handleBlur}
                    onChange={formikPayment.handleChange}
                    value={formikPayment.values.city}
                    type="text"
                    id="city"
                    placeholder="Write Your City..."
                    className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="address">
                    Details
                  </label>
                  {formikPayment.errors.details &&
                  formikPayment.touched.details ? (
                    <p className="text-sm text-red-600">
                      {formikPayment.errors.details}
                    </p>
                  ) : null}
                </div>
                <div className="flex">
                  <textarea
                    onBlur={formikPayment.handleBlur}
                    onChange={formikPayment.handleChange}
                    value={formikPayment.values.details}
                    id="details"
                    placeholder="Write Your Address Here..."
                    cols={30}
                    rows={3}
                    maxLength={200}
                    className="focus:shadow-input-focus focus:outline-none w-full px-4 py-2 font-medium border border-gray-300 border-solid rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center mb-4">
                  <input
                    id="cash"
                    type="radio"
                    name="payment"
                    checked={formikPayment.values.payment === "cash"}
                    onChange={formikPayment.handleChange}
                    className="w-5 h-5"
                    value="cash"
                  />
                  <label
                    htmlFor="cash"
                    className="ms-2 text-lg font-bold text-[#088A08]"
                  >
                    Cash Payment
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="online"
                    type="radio"
                    name="payment"
                    checked={formikPayment.values.payment === "online"}
                    onChange={formikPayment.handleChange}
                    className="w-5 h-5"
                    value="online"
                  />
                  <label
                    htmlFor="online"
                    className="ms-2 text-lg font-bold text-[#088A08]"
                  >
                    Online Payment
                  </label>
                </div>

                <button
                  disabled={!formikPayment.isValid || !formikPayment.dirty}
                  type="submit"
                  className="hover:bg-[#088A08] focus:ring-[#6cce6c] disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer"
                >
                  {formikPayment.values.payment === "cash"
                    ? "Continue with Cash Payment"
                    : formikPayment.values.payment === "online"
                    ? "Continue with Online Payment"
                    : "Select a Payment Method"}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
