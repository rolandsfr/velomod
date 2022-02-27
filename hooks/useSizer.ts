import { useEffect, useState } from "react";

const useSizer = (): { w: number; h: number } => {
  const [size, setSize] = useState({
    w: 0,
    h: 0,
  });

  const updateSize = () => {
    setSize({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return size;
};

export { useSizer };
