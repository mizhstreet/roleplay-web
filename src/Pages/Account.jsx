import ActiveLastBreadcrumb from "../components/common/components/Link";
import { Link } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import OrderHistory from "../components/OrderHistory";

import { useState, useEffect } from "react";
import i18n from "../components/common/components/LangConfig";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col mx-4 md:ml-36 mt-48 gap-20 justify-center md:justify-between ">
      <div className="flex justify-between   flex-col gap-4 md:flex-row ">
        <ActiveLastBreadcrumb
          path={`${i18n.t("accountPage.home")}/ ${i18n.t(
            "accountPage.myAccount"
          )}`}
        />
        <h1 className="text-sm md:mr-44">
          {i18n.t("accountPage.welcome")}{" "}
          <span className="text-red-600">
            {firstName} {lastName}
          </span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-28">
        <OrderHistory />
      </div>
      {/* Snackbar for displaying success or error messages */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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

export default Account;
