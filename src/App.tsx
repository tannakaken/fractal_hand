import React, { Suspense, useEffect, useState } from "react";
import { FractalHandCamera } from "./components/FlactalHandCamera";
import * as tf from "@tensorflow/tfjs";
tf.setBackend("webgl");

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  });
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FractalHandCamera width={width} height={height} />
    </Suspense>
  );
}

export default App;
