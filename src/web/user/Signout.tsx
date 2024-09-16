import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";
import React, { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

const SignOut = () => {
  const { signout } = useUser();
  const navigate = useNavigate();
  signout();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div className="flex flex-grow flex-col justify-center">
      <div className="flex justify-center text-lg font-semibold">
        <div className="flex flex-col gap-5">
          <div>Already Signed In. Redirecting....</div>
          <Spinner></Spinner>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
