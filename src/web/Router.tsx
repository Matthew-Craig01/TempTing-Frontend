import Editor from "@web/editor/Editor";
import { SignIn, SignUp } from "@web/user/Signinup";
import SignOut from "@web/user/Signout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import CreateTemplate from "@web/templateCreator/CreateTemplate";
import TemplateBrowser from "./templateBrowser/TemplateBrowser";
import ErrorPage from "./ErrorPage";

const Router = () => {
  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signout",
    element: <SignOut />,
  },
  {
    path: "/create/:publishedId/:versionId/",
    element: <CreateTemplate />,
  },
  {
    path: "/create/:publishedId/",
    element: <CreateTemplate />,
  },
  {
    path: "/create/",
    element: <CreateTemplate />,
  },
  {
    path: "/browse/",
    element: <TemplateBrowser />,
  },
  {
    path: "/browse/variants/:publishedId",
    element: <TemplateBrowser />,
  },
  {
    path: "/browse/mine",
    element: <TemplateBrowser mine />,
  },
  {
    path: "/browse/search/:search/lang/:language/:page",
    element: <TemplateBrowser />,
  },
  {
    path: "/browse/search//lang/:language/:page",
    element: <TemplateBrowser />,
  },
  {
    path: "/",
    element: <Navigate to="/browse/" replace />,
    errorElement: <ErrorPage title="404" description="Page not found :(" />,
  },
]);

export default Router;
