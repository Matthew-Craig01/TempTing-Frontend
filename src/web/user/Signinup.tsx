import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";
import { Spinner } from "@/components/ui/spinner";
import React, { FC, useEffect } from "react";
import UserForm, { FormType } from "./UserForm";

export const SignUp = () => {
  return <Signinup ft="Sign Up" />;
};

export const SignIn = () => {
  return <Signinup ft="Sign In" />;
};

const Signinup: FC<{ ft: FormType }> = ({ ft }) => {
  const navigate = useNavigate();
  const { user, sessionKey } = useUser();
  const signedIn = user !== null && sessionKey() !== undefined;

  useEffect(() => {
    if (signedIn) {
      navigate("/");
    }
  }, [signedIn]);

  if (signedIn) {
    return (
      <div className="flex flex-grow flex-col justify-center">
        <div className="flex justify-center text-lg font-semibold">
          <div className="flex flex-col gap-5">
            <div>Signed In. Redirecting....</div>
            <Spinner></Spinner>
          </div>
        </div>
      </div>
    );
  }
  return <UserCard ft={ft} />;
};

export const Signup = () => {};

const UserCard: FC<{ ft: FormType }> = ({ ft }) => {
  return (
    <div className="h-full pt-5 sm:pt-20">
      <div className="sm:flex sm:justify-center">
        <div className="flex flex-col gap-4">
          <Card className="sm:w-[30em]">
            <CardHeader>
              <CardTitle>{ft}</CardTitle>
              {ft === "Sign Up" ? (
                <CardDescription>
                  One-click signup. No email authentication required.
                </CardDescription>
              ) : null}
            </CardHeader>
            <UserForm ft={ft} />
          </Card>
          <div className="sm:w-[30em]">
            <div className="text-xs text-muted-foreground">
              {ft === "Sign In" ? "Don't" : "Already"} have an account?
            </div>
            <a href={ft === "Sign In" ? "signup" : "signin"}>
              <Button variant="outline">
                {ft === "Sign In" ? "Sign Up" : "Sign In"}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
