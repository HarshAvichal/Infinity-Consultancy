import React, { useEffect, useState } from "react";

// Loads react-lottie and the animation JSON on demand so they stay out of the main bundle.
const LazyLottie = ({ loader, options }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([import("react-lottie"), loader()]).then(([lib, data]) => {
      if (active) setState({ Lottie: lib.default, data: data.default });
    });
    return () => {
      active = false;
    };
  }, []);

  if (!state) return null;
  const { Lottie, data } = state;
  return <Lottie options={{ ...options, animationData: data }} />;
};

export default LazyLottie;
