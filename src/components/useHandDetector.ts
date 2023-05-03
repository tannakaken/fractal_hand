import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

let net: handPoseDetection.HandDetector | undefined = undefined;

const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
    runtime: 'tfjs',
    modelType: 'lite'
} as const;

export const useHandDetector = () => {
    if (net === undefined) {
        throw new Promise<void>((resolve) => {
            handPoseDetection.createDetector(model, detectorConfig).then((result) => {
                net = result;
                resolve();
            });
        })
    }
    return net;
}