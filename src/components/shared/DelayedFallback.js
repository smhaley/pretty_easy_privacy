import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Container } from "@material-ui/core";

const DelayedFallback = () => {
  const [show, setShow] = useState(false);
  let fallback = (
    <Container mt={2}>
      <LinearProgress />
    </Container>
  );
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <>{show && fallback}</>;
};

export default DelayedFallback;
