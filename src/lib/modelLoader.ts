/**
 * TensorFlow.js Model Loader
 * Handles loading and managing the local inference model
 */

import * as tf from "@tensorflow/tfjs";

let cachedModel: tf.LayersModel | null = null;

/**
 * Load the TensorFlow.js model from /model/model.json
 * Uses caching to avoid reloading
 */
export async function loadModel(): Promise<tf.LayersModel> {
  if (cachedModel) {
    return cachedModel;
  }

  try {
    console.log("Loading TensorFlow.js model...");
    const model = await tf.loadLayersModel("/model/model.json");
    console.log("✅ Model loaded successfully!");
    console.log("Model input shape:", model.inputs[0].shape);
    console.log("Model output shape:", model.outputs[0].shape);
    
    cachedModel = model;
    return model;
  } catch (error) {
    console.error("❌ Failed to load model:", error);
    throw new Error("Failed to load TensorFlow.js model from /model/model.json");
  }
}

/**
 * Preprocess video frame for model inference
 * Converts video frame to tensor with correct shape and normalization
 */
export function preprocessFrame(videoElement: HTMLVideoElement): tf.Tensor4D {
  return tf.tidy(() => {
    // 1️⃣ Capture image from webcam video element
    let img = tf.browser.fromPixels(videoElement);  // shape (height, width, 3)
    
    // 2️⃣ Convert to grayscale (average over color channels)
    img = img.mean(2) as tf.Tensor2D; // shape (height, width)
    
    // 3️⃣ Add channel dimension
    img = img.expandDims(-1) as tf.Tensor3D; // shape (height, width, 1)
    
    // 4️⃣ Resize to 24x24 (same as training)
    img = tf.image.resizeBilinear(img, [24, 24]) as tf.Tensor3D; // shape (24, 24, 1)
    
    // 5️⃣ Normalize to 0–1
    img = img.div(255.0) as tf.Tensor3D;
    
    // 6️⃣ Add batch dimension for prediction
    const batched = img.expandDims(0) as tf.Tensor4D; // shape (1, 24, 24, 1)
    
    // Debug: Log shape (only first time to avoid spam)
    if (typeof window !== 'undefined' && !(window as any).__shapeLogged) {
      console.log('✅ Preprocessed tensor shape:', batched.shape);
      (window as any).__shapeLogged = true;
    }
    
    return batched;
  });
}

/**
 * Make prediction using the loaded model
 * Returns eye state and probability
 */
export async function predictEyeState(
  model: tf.LayersModel,
  tensor: tf.Tensor4D
): Promise<{ state: string; probability: number; rawOutput: number[] }> {
  try {
    // Make prediction
    const prediction = model.predict(tensor) as tf.Tensor;
    const data = await prediction.data();
    
    // Model output: [p_closed, p_open]
    // Index 0 → "Closed", Index 1 → "Open"
    const closedProb = data[0];
    const openProb = data[1];
    
    // Calculate stats on input tensor for debugging
    const tensorStats = tf.tidy(() => {
      const squeezed = tensor.squeeze() as tf.Tensor3D;
      const min = squeezed.min().dataSync()[0];
      const max = squeezed.max().dataSync()[0];
      const mean = squeezed.mean().dataSync()[0];
      return { min, max, mean };
    });
    
    // Get predicted class (0=Closed, 1=Open)
    const predictedClass = openProb > closedProb ? 1 : 0;
    const state = predictedClass === 0 ? "Closed" : "Open";
    const probability = Math.max(closedProb, openProb);
    
    // Debug logging with tensor stats
    console.log(
      `📊 Prediction: [Closed=${closedProb.toFixed(3)}, Open=${openProb.toFixed(3)}] → ${state} | ` +
      `Input stats: min=${tensorStats.min.toFixed(3)}, max=${tensorStats.max.toFixed(3)}, mean=${tensorStats.mean.toFixed(3)}`
    );
    
    // Cleanup
    prediction.dispose();
    
    return { state, probability, rawOutput: [closedProb, openProb] };
  } catch (error) {
    console.error("Prediction error:", error);
    throw error;
  }
}

/**
 * Dispose of the cached model (cleanup)
 */
export function disposeModel(): void {
  if (cachedModel) {
    cachedModel.dispose();
    cachedModel = null;
  }
}

