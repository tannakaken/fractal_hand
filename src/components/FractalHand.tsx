import React from "react";
import { Hand } from "@tensorflow-models/hand-pose-detection";
import { Cylinder, Sphere } from "@react-three/drei";

const pairs = [
  // 親指
  ["wrist", "thumb_cmc"],
  ["thumb_cmc", "thumb_mcp"],
  ["thumb_mcp", "thumb_ip"],
  ["thumb_ip", "thumb_tip"],
  // 人差し指
  ["wrist", "index_finger_mpp"],
  ["index_finger_mcp", "index_finger_pip"],
  ["index_finger_pip", "index_finger_dip"],
  ["index_finger_dip", "index_finger_tip"],
  //　中指
  ["wrist", "middle_finger_mpp"],
  ["middle_finger_mcp", "middle_finger_pip"],
  ["middle_finger_pip", "middle_finger_dip"],
  ["middle_finger_dip", "middle_finger_tip"],
  // 薬指
  ["wrist", "ring_finger_mpp"],
  ["ring_finger_mcp", "ring_finger_pip"],
  ["ring_finger_pip", "ring_finger_dip"],
  ["ring_finger_dip", "ring_finger_tip"],
  // 小指
  ["wrist", "pinky_mpp"],
  ["pinky_mcp", "pinky_pip"],
  ["pinky_pip", "pinky_dip"],
  ["pinky_dip", "pinky_tip"],
] as const;

type HandProps = {
  hand: Hand;
  depth: number;
  scale: number;
  x?: number;
  y?: number;
  z?: number;
};

const FractalHand = ({
  hand,
  depth,
  scale,
  x = 0,
  y = 0,
  z = 0,
}: HandProps) => {
  if (hand.keypoints3D === undefined) {
    return <></>;
  }
  return (
    <>
      {hand.keypoints3D.map((keypoint3D, index) => {
        const atTip = keypoint3D.name?.endsWith("tip");
        const u = x - keypoint3D.x * scale;
        const v = y - keypoint3D.y * scale;
        const w = z + (keypoint3D.z || 0) * scale;
        return (
          <group key={`tip-${depth}-${index}`}>
            <Sphere
              key={`tip-${index}`}
              scale={scale / 100.0}
              position={[u, v, w]}
            >
              <meshStandardMaterial color="blue" />
            </Sphere>
            {atTip && depth > 0 && (
              <FractalHand
                hand={hand}
                depth={depth - 1}
                scale={scale * 0.4}
                x={u}
                y={v}
                z={w}
              />
            )}
          </group>
        );
      })}
      {/* {pairs.map(([first, second]) => {
        const firstKeypoint = hand.keypoints3D?.find(
          (keypoint3D) => keypoint3D.name === first
        );
        const secondKeypoint = hand.keypoints3D?.find(
          (keypoint3D) => keypoint3D.name === second
        );
        if (firstKeypoint === undefined || secondKeypoint === undefined) {
          return <></>;
        }

        const firstU = x - firstKeypoint.x * scale;
        const firstV = y - firstKeypoint.y * scale;
        const firstW = z - (firstKeypoint.z || 0) * scale;
        const secondU = x - secondKeypoint.x * scale;
        const secondV = y - secondKeypoint.y * scale;
        const secondW = z - (secondKeypoint.z || 0) * scale;
        return (
          <Cylinder
            position={[
              (firstU + secondU) / 2,
              (firstV + secondV) / 2,
              (firstW + secondW) / 2,
            ]}
            
          />
        );
      })} */}
    </>
  );
};

export default FractalHand;
