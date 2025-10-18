"use client";

import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadModel, predictEyeState } from "@/lib/modelLoader";
import { initFaceDetector, extractEyeRegion } from "@/lib/eyeDetection";
import { initAudio, startAlarm, stopAlarm, isAlarmPlaying } from "@/lib/audioAlarm";
import { Eye, EyeOff, AlertTriangle, Volume2, Scan } from "lucide-react";

export default function WebcamDrowsiness() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const debugCanvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [status, setStatus] = useState<string>("Initializing...");
  const [probability, setProbability] = useState<number | null>(null);
  const [closedCount, setClosedCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [modelReady, setModelReady] = useState<boolean>(false);
  const [faceDetectorReady, setFaceDetectorReady] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Drowsiness detection threshold (number of consecutive closed frames)
  // At 500ms per frame: 6 frames = 3 seconds of closed eyes
  // Increase this number to reduce false positives from blinking
  // Decrease to make detection more sensitive (not recommended)
  const DROWSINESS_THRESHOLD = 6;

  // Load TensorFlow.js model and face detector
  useEffect(() => {
    async function initModels() {
      try {
        setStatus("Loading AI models...");
        await tf.ready();
        console.log("TensorFlow.js backend:", tf.getBackend());
        
        // Load drowsiness detection model
        const loadedModel = await loadModel();
        setModel(loadedModel);
        setModelReady(true);
        
        // Load face detector for eye region extraction
        setStatus("Loading face detector...");
        await initFaceDetector();
        setFaceDetectorReady(true);
        
        setStatus("Models loaded. Waiting for camera...");
      } catch (err) {
        console.error("Model loading error:", err);
        setError("Failed to load models. Please refresh the page.");
        setStatus("Model loading failed");
      }
    }

    initModels();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Setup webcam
  useEffect(() => {
    const video = videoRef.current;
    
    async function setupCamera() {
      try {
        setStatus("Requesting camera access...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
        });

        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            setCameraReady(true);
            if (modelReady) {
              setStatus("Ready. Click Start to begin detection.");
            } else {
              setStatus("Camera ready. Loading model...");
            }
            setError(null);
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Failed to access camera. Please grant camera permissions.");
        setStatus("Camera access denied");
      }
    }

    if (modelReady) {
      setupCamera();
    }

    // Cleanup camera
    return () => {
      if (video?.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [modelReady]);

  // Control alarm based on drowsiness state
  useEffect(() => {
    const isDrowsy = closedCount >= DROWSINESS_THRESHOLD;

    if (isDrowsy && isActive) {
      // Start alarm if drowsy and detection is active
      if (!isAlarmPlaying()) {
        startAlarm();
      }
    } else {
      // Stop alarm if not drowsy or detection stopped
      if (isAlarmPlaying()) {
        stopAlarm();
      }
    }
  }, [closedCount, isActive, DROWSINESS_THRESHOLD]);

  // Local inference function
  async function runInference() {
    if (!videoRef.current || !model || !cameraReady || !faceDetectorReady) return;

    try {
      const startTime = performance.now();

      // Extract eye region using face detection
      const { tensor, detected } = await extractEyeRegion(videoRef.current);

      // Debug: Draw preprocessed eye region to canvas (for visualization)
      if (debugCanvasRef.current) {
        // toPixels expects [0,1] for float32, will scale to [0,255] automatically
        const debugTensor = tensor.squeeze() as tf.Tensor2D;
        await tf.browser.toPixels(debugTensor, debugCanvasRef.current);
        debugTensor.dispose();
      }

      // Make prediction on cropped eye region
      const result = await predictEyeState(model, tensor);

      // Cleanup tensor
      tensor.dispose();
      
      // Show warning if face not detected
      if (!detected) {
        console.warn("Face not detected - using fallback crop");
      }

      const endTime = performance.now();
      setFps(Math.round(endTime - startTime));

      // Update state
      setStatus(result.state);
      setProbability(result.probability);

      // Track consecutive closed eyes
      if (result.state.toLowerCase() === "closed") {
        setClosedCount((c) => c + 1);
      } else {
        setClosedCount(0);
      }

      setError(null);
    } catch (err) {
      console.error("Inference error:", err);
      setError(err instanceof Error ? err.message : "Prediction failed");
    }
  }

  // Start detection
  function startDetection() {
    if (!cameraReady || !modelReady || !faceDetectorReady) {
      setError("Camera or models not ready yet");
      return;
    }

    // Initialize audio on first user interaction (required by browsers)
    initAudio();

    setIsActive(true);
    setStatus("Detecting...");
    setClosedCount(0);

    // Run inference every 500ms (2 FPS) - matches GPT suggestion
    intervalRef.current = setInterval(runInference, 500);

    // Run first inference immediately
    runInference();
  }

  // Stop detection
  function stopDetection() {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Stop alarm when detection stops
    if (isAlarmPlaying()) {
      stopAlarm();
    }
    
    setStatus("Stopped");
    setClosedCount(0);
  }

  const isDrowsy = closedCount >= DROWSINESS_THRESHOLD;
  const isOpen = status.toLowerCase().includes("open");
  const isClosed = status.toLowerCase().includes("closed");

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-2xl max-w-4xl mx-auto">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-6">
        📷 Live Camera Detection
      </h2>

      {/* Loading indicator */}
      {(!modelReady || !faceDetectorReady) && !error && (
        <div className="mb-4 bg-blue-900 bg-opacity-50 border border-blue-500 text-blue-200 px-4 py-3 rounded-lg w-full">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-400" />
            <p className="text-sm">
              {!modelReady && "Loading drowsiness detection model..."}
              {modelReady && !faceDetectorReady && "Loading face detector..."}
            </p>
          </div>
        </div>
      )}

      {/* Video Feed */}
      <div className="mb-6 flex gap-4">
        <div className="relative">
          <video
            ref={videoRef}
            width="640"
            height="480"
            autoPlay
            playsInline
            muted
            className={`rounded-lg shadow-lg ${
              isDrowsy ? "ring-4 ring-red-500 animate-pulse" : ""
            }`}
          />
          
          {/* Overlay Status */}
          {isActive && (
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div
              className={`px-4 py-2 rounded-lg font-bold text-lg shadow-lg flex items-center gap-2 ${
                isOpen
                  ? "bg-green-500 text-white"
                  : isClosed
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {isOpen ? (
                <>
                  <Eye className="w-5 h-5" />
                  Open
                </>
              ) : isClosed ? (
                <>
                  <EyeOff className="w-5 h-5" />
                  Closed
                </>
              ) : (
                status
              )}
            </div>

            {probability !== null && (
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                {(probability * 100).toFixed(1)}%
              </div>
            )}
          </div>
        )}

        {/* Drowsiness Alert Overlay */}
        {isDrowsy && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-lg">
            <div className="text-center animate-bounce">
              <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-4" />
              <p className="text-red-500 text-3xl font-bold">You seem drowsy!</p>
              <p className="text-white text-xl mt-2">Please take a break</p>
              <p className="text-yellow-400 text-sm mt-3 flex items-center justify-center gap-2">
                <Volume2 className="w-4 h-4 animate-pulse" />
                Alarm active
              </p>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {!cameraReady && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4" />
              <p className="text-white text-lg">Loading camera...</p>
            </div>
          </div>
        )}
        </div>
        
        {/* Debug: Show what model sees (cropped eye region 24x24) */}
        <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center gap-1 mb-2">
            <Eye className="w-3 h-3 text-gray-400" />
            <p className="text-xs text-gray-400">Eye Region (24x24)</p>
          </div>
          <canvas 
            ref={debugCanvasRef} 
            width="24" 
            height="24"
            className="border-2 border-green-500 rounded"
            style={{ width: '120px', height: '120px', imageRendering: 'pixelated' }}
          />
          <p className="text-xs text-gray-500 mt-2">Cropped & Scaled 5x</p>
          <div className="flex items-center gap-1 mt-1">
            <Scan className="w-3 h-3 text-yellow-400" />
            <p className="text-xs text-yellow-400">Face detection active</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full mb-4 bg-red-900 bg-opacity-50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        {!isActive ? (
          <button
            onClick={startDetection}
            disabled={!cameraReady || !modelReady || !faceDetectorReady || !!error}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            ▶️ Start Detection
          </button>
        ) : (
          <button
            onClick={stopDetection}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            ⏹️ Stop Detection
          </button>
        )}
      </div>

      {/* Stats Panel */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900 rounded-lg p-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Status</p>
          <p
            className={`font-bold ${
              isOpen
                ? "text-green-400"
                : isClosed
                ? "text-red-400"
                : "text-gray-300"
            }`}
          >
            {status}
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Confidence</p>
          <p className="font-bold text-blue-400">
            {probability !== null ? `${(probability * 100).toFixed(1)}%` : "-"}
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Closed Count</p>
          <p
            className={`font-bold ${
              closedCount >= DROWSINESS_THRESHOLD ? "text-red-400" : "text-gray-300"
            }`}
          >
            {closedCount}/{DROWSINESS_THRESHOLD}
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Inference Time</p>
          <p className="font-bold text-gray-300">
            {isActive ? `${fps}ms` : "-"}
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="w-full mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">
          💡 How it works:
        </h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>
            • <strong className="text-blue-400">Local AI inference</strong> - No
            backend required, runs in your browser
          </li>
          <li>• TensorFlow.js model analyzes each frame for eye state</li>
          <li>• Predictions run every 1 second (~1 FPS)</li>
          <li>• If eyes closed for 3+ consecutive frames → drowsiness alert</li>
          <li>
            • <strong className="text-green-400">Privacy-first</strong> - All
            processing happens locally
          </li>
        </ul>
      </div>
    </div>
  );
}
