import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";

let faceDetector: blazeface.BlazeFaceModel | null = null;

/**
 * Initialize BlazeFace model for face detection
 */
export async function initFaceDetector(): Promise<blazeface.BlazeFaceModel> {
  if (faceDetector) return faceDetector;

  console.log("Loading BlazeFace model...");
  faceDetector = await blazeface.load();
  console.log("✅ BlazeFace loaded!");

  return faceDetector;
}

/**
 * Extract eye region from video frame
 * Detects face, crops to eye region, and preprocesses for model
 */
export async function extractEyeRegion(
  videoElement: HTMLVideoElement
): Promise<{ tensor: tf.Tensor4D; detected: boolean }> {
  if (!faceDetector) {
    throw new Error("Face detector not initialized");
  }

  // Detect faces in frame
  const predictions = await faceDetector.estimateFaces(videoElement, false);

  // If no face detected, use center crop as fallback
  if (predictions.length === 0) {
    console.warn("⚠️ No face detected, using center crop");
    const tensor = cropCenterEyeRegion(videoElement);
    return { tensor, detected: false };
  }

  // Get the first face
  const face = predictions[0];

  // BlazeFace provides these landmarks:
  // [right_eye, left_eye, nose, mouth, right_ear, left_ear]
  const rightEye = face.landmarks[0] as [number, number];
  const leftEye = face.landmarks[1] as [number, number];

  // Calculate eye region bounding box
  const eyeRegion = calculateEyeRegion(rightEye, leftEye, videoElement);

  // Extract and preprocess the eye region
  const tensor = await cropAndPreprocessEye(videoElement, eyeRegion);

  return { tensor, detected: true };
}

/**
 * Calculate bounding box around both eyes
 */
function calculateEyeRegion(
  rightEye: [number, number],
  leftEye: [number, number],
  video: HTMLVideoElement
): { x: number; y: number; width: number; height: number } {
  // Calculate center point between eyes
  const centerX = (rightEye[0] + leftEye[0]) / 2;
  const centerY = (rightEye[1] + leftEye[1]) / 2;

  // Calculate eye distance
  const eyeDistance = Math.sqrt(
    Math.pow(leftEye[0] - rightEye[0], 2) +
    Math.pow(leftEye[1] - rightEye[1], 2)
  );

  // Create a box around eyes (1.5x eye distance for width, 0.8x for height)
  const boxWidth = eyeDistance * 1.8;
  const boxHeight = eyeDistance * 0.9;

  return {
    x: Math.max(0, centerX - boxWidth / 2),
    y: Math.max(0, centerY - boxHeight / 2),
    width: Math.min(boxWidth, video.videoWidth - (centerX - boxWidth / 2)),
    height: Math.min(boxHeight, video.videoHeight - (centerY - boxHeight / 2)),
  };
}

/**
 * Crop eye region and preprocess for model input
 */
async function cropAndPreprocessEye(
  videoElement: HTMLVideoElement,
  region: { x: number; y: number; width: number; height: number }
): Promise<tf.Tensor4D> {
  return tf.tidy(() => {
    // 1️⃣ Capture full frame
    const fullFrame = tf.browser.fromPixels(videoElement);
    const [videoHeight, videoWidth] = fullFrame.shape;

    // 2️⃣ Normalize crop coordinates to [0, 1]
    const y1 = region.y / videoHeight;
    const x1 = region.x / videoWidth;
    const y2 = (region.y + region.height) / videoHeight;
    const x2 = (region.x + region.width) / videoWidth;

    // 3️⃣ Crop and resize to 24x24
    const cropped = tf.image.cropAndResize(
      fullFrame.expandDims(0),
      [[y1, x1, y2, x2]],
      [0],
      [24, 24]
    );

    // 4️⃣ Convert to grayscale (average across color channels)
    const grayscale = cropped.mean(3, true);

    // 5️⃣ Normalize to [0, 1]
    const normalized = grayscale.div(255.0);

    return normalized as tf.Tensor4D;
  });
}

/**
 * Fallback: crop center region when no face is detected
 */
function cropCenterEyeRegion(videoElement: HTMLVideoElement): tf.Tensor4D {
  return tf.tidy(() => {
    // 1️⃣ Capture frame
    const img = tf.browser.fromPixels(videoElement);
    const [height, width] = img.shape;

    // 2️⃣ Crop center 30% of frame (where eyes usually are)
    const cropSize = Math.min(width, height) * 0.3;
    const startY = height * 0.35; // Slightly above center (where eyes typically are)
    const startX = (width - cropSize) / 2;

    const y1 = startY / height;
    const x1 = startX / width;
    const y2 = (startY + cropSize) / height;
    const x2 = (startX + cropSize) / width;

    // 3️⃣ Crop and resize to 24x24
    const cropped = tf.image.cropAndResize(
      img.expandDims(0),
      [[y1, x1, y2, x2]],
      [0],
      [24, 24]
    );

    // 4️⃣ Convert to grayscale
    const grayscale = cropped.mean(3, true);

    // 5️⃣ Normalize to [0, 1]
    const normalized = grayscale.div(255.0);

    return normalized as tf.Tensor4D;
  });
}

/**
 * Dispose of the face detector (cleanup)
 */
export function disposeFaceDetector(): void {
  if (faceDetector) {
    faceDetector = null;
  }
}
