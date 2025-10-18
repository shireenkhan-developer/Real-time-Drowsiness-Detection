"use client";

import { useRouter } from "next/navigation";
import WebcamDrowsiness from "@/components/WebcamDrowsiness";
import { ArrowLeft, Camera, Eye, Brain, Bell, Shield, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function DrowsinessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Driver Drowsiness Detection
            </h1>
            <p className="text-gray-400 text-lg">
              AI monitoring system to keep you alert and safe while driving
            </p>
            <div className="mt-2 inline-flex items-center gap-2 bg-green-900 bg-opacity-50 border border-green-500 text-green-200 px-3 py-1 rounded-lg text-sm">
              <Shield className="w-4 h-4" />
              Your Privacy Protected - Nothing Recorded or Shared
            </div>
          </div>
        </header>

        {/* Main Content - Webcam Detection */}
        <div className="mb-8">
          <WebcamDrowsiness />
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl max-w-4xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Camera Access</h4>
              <p className="text-gray-400 text-sm">
                Your webcam captures video of your face
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Eye Detection</h4>
              <p className="text-gray-400 text-sm">
                AI identifies your eyes and tracks their state
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Smart Analysis</h4>
              <p className="text-gray-400 text-sm">
                Checks if your eyes stay closed for too long
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Wake-Up Alert</h4>
              <p className="text-gray-400 text-sm">
                Beeping alarm and visual warning appear
              </p>
            </div>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Safety Features */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">
                  Safety Features
                </h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Continuous eye monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Instant audio alarm when drowsy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Visual warning on screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Ignores normal blinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Real-time confidence display</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Easy start/stop controls</span>
                </li>
              </ul>
            </div>

            {/* Privacy & Security */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">
                  Privacy & Security
                </h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>No videos recorded</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>No images saved</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Nothing uploaded to internet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Works completely offline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>All processing in your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>100% private and secure</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">
                Quick Instructions
              </h3>
            </div>
            <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
              <li>Allow camera access when prompted</li>
              <li>Position yourself so your face is visible</li>
              <li>Click the Start Detection button</li>
              <li>If you get drowsy, an alarm will sound - take a break!</li>
              <li>Click Stop Detection when done</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Driver Drowsiness Detection System</p>
          <p className="mt-2 text-xs text-gray-600">
            AI-powered • Privacy protected • Works in your browser
          </p>
        </footer>
      </div>
    </div>
  );
}
