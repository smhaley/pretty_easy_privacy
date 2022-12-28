import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [value, setValue] = useState(
    localStorage.getItem("colorMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("colorMode", value);
  }, [value]);

  return [value, setValue];
};
