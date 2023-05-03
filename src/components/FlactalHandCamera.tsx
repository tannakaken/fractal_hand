import { Canvas } from "@react-three/fiber";
import { Hand } from "@tensorflow-models/hand-pose-detection";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FractalHand from "./FractalHand";
import { useHandDetector } from "./useHandDetector";
import { useVideo } from "./useVideo";

type Props = {
  width: number;
  height: number;
};

export const FractalHandCamera = ({ width, height }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const net = useHandDetector();
  const video = useVideo(width, height);
  const [hand, setHand] = useState<Hand | undefined>(undefined);
  const handDetection = useCallback(async () => {
    requestAnimationFrame(handDetection);
    if (canvasRef.current === null) {
      return;
    }
    const canvas = canvasRef.current;
    const hands = await net.estimateHands(video);
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      console.error("NO 2D CANVAS");
      return;
    }
    ctx.drawImage(video, 0, 0, width, height);
    if (hands.length > 0) {
      const hand = hands[0];
      setHand(hand);
      // hand.keypoints.forEach((keypoint) => {
      //   ctx.fillStyle = "red";
      //   ctx.beginPath();
      //   if (keypoint.name?.endsWith("tip")) {
      //     ctx.arc(keypoint.x, keypoint.y, 3, 0, Math.PI * 2);
      //   }
      //   ctx.fill();
      // });
    } else {
      setHand(undefined);
    }
  }, [net, video, width, height]);

  useEffect(() => {
    handDetection();
  }, [handDetection]);
  return (
    <div>
      <Canvas
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 120,
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {hand !== undefined && <FractalHand hand={hand} depth={3} scale={20} />}
      </Canvas>
      <canvas
        style={{ position: "absolute", left: 0, top: 0, zIndex: 100 }}
        ref={canvasRef}
        width={width}
        height={height}
      >
        NO CANVAS
      </canvas>
    </div>
  );
};
