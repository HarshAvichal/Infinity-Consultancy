import { useEffect, useRef } from "react";
import Typed from "typed.js";

const useTyped = (options) => {
  const typedRef = useRef(null); // To store the Typed.js instance
  const elRef = useRef(null); // To store the DOM element

  useEffect(() => {
    if (elRef.current) {
      typedRef.current = new Typed(elRef.current, options); // Initialize Typed.js
    }

    // Clean up the instance on component unmount
    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [options]);

  return elRef; // Return the ref to be attached to the DOM element
};

export default useTyped;
