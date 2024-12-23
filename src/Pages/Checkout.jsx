import i18n from "../components/common/components/LangConfig";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CheckoutCartItem from "../components/Checkout/CheckoutCartItem";
import RedButton from "../components/common/components/RedButton";
import ActiveLastBreadcrumb from "../components/common/components/Link";
// import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { useCreateOrder } from "../hooks/useCreateOrder";

const Checkout = () => {
  const { cartItems, destroyCart } = useCart();
  const [firstName, setFirstName] = useState("a");
  const [email, setEmail] = useState("a");
  const [address, setAddress] = useState("a");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data, mutate, isPending, isError } = useCreateOrder();

  useEffect(() => {
    if (isError) {
      setError("注文できませんした。ログインしてください。");
      setOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setMessage("注文が完了しました。");
      setOpen(true);
      destroyCart();
      setTimeout(() => {
        navigate("/account");
      }, 2000);
      // navigate("/allProducts");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cartItems);
    try {
      // Update user account data in Firestore

      const orderItems = cartItems.map((item) => {
        return {
          quantity: item.quantity,
          price: item.price,
          productId: item.id,
        };
      });

      mutate({ orderItems });

      // setMessage("Account details updated successfully!");
      // setOpen(true);
    } catch (error) {
      console.error("Error updating user data:", error);
      // setError(error.message);
      // setOpen(true);
    }
  };

  // Calculate subtotal of all cart items
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal; // You can calculate total including shipping, taxes, etc.

  return (
    <div className="max-w-screen-lg mx-auto mt-36 md:mt-48 flex flex-col md:gap-10">
      <ActiveLastBreadcrumb
        path={`${i18n.t("home")}/${i18n.t("redButtons.applyCoupon")}`}
      />

      <form onSubmit={handleSubmit}>
        <div className="flex items-center mt-4 md:flex-row flex-col gap-10 md:gap-20">
          <div className="flex items-center justify-between  mt-4">
            <div className="flex flex-col gap-4 md:gap-12">
              <span className="text-2xl md:text-4xl font-medium">
                {i18n.t("checkOut.billingDetails")}
              </span>

              <div className="flex flex-col gap-4 md:gap-8 w-[300px] md:w-[470px]">
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-400">
                    {i18n.t("checkOut.firstName")} *
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className=" rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm md:text-base text-gray-400">
                    {i18n.t("checkOut.address")} *
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className=" rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm md:text-base text-gray-400">
                    {i18n.t("checkOut.apartment")}
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    className=" rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm md:text-base text-gray-400">
                    {i18n.t("checkOut.city")}*
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    className=" rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm md:text-base text-gray-400">
                    {i18n.t("checkOut.phone")} *
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    className=" rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm md:text-base text-gray-400">
                    {i18n.t("checkOut.email")} *
                  </span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    className=" rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-col gap-4 md:gap-8  px-4 w-full md:w-[425px]">
            {cartItems.map((item, index) => (
              <CheckoutCartItem
                key={item.title}
                item={item}
                index={index}
                stars={item.stars}
                rates={item.rates}
              />
            ))}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between  border-b">
                <p className="text-base">{i18n.t("cart.subtotal")}:</p>
                <p className="text-base">${subtotal}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between  border-b">
                <p className="text-base">{i18n.t("cart.shipping")}:</p>
                <p className="text-base">{i18n.t("cart.free")}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between  border-b">
                <p className="text-base">{i18n.t("cart.total")}:</p>
                <p className="text-base">${total}</p>
              </div>
            </div>
            {/* Payment methods */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-base">{i18n.t("checkOut.methods")}:</p>
              </div>
              <div className="flex justify-between">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                  />
                  {i18n.t("checkOut.cash")}
                </label>
              </div>
            </div>

            <div className="mr-auto">
              <RedButton
                disabled={isPending}
                name={i18n.t("redButtons.placeOrder")}
              />
            </div>
          </div>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? error : message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
