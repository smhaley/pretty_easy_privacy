
import React from "react";
import Introduction from "./components/main/Introduction";
import GetStarted from "./components/main/GetStarted";
import Resources from "./components/main/Resources";

const Encrypt = React.lazy(() => import("./components/encrypt/Encrypt"));
const Decrypt = React.lazy(() => import("./components/decrypt/Decrypt"));
const KeyGen = React.lazy(() => import("./components/key_gen/KeyGen"));

export const standardRoutes = [
    { path: "/", component: Introduction },
    { path: "/get_started", component: GetStarted },
    { path: "/resources", component: Resources },
  ];
export const suspenseRoutes = [
    { path: "/encrypt", component: <Encrypt /> },
    { path: "/decrypt", component: <Decrypt /> },
    { path: "/keygen", component: <KeyGen /> },
  ];
  