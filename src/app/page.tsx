"use client";

import Link from "next/link";
import { Camera, Bell, Shield, Eye, Zap, ChevronRight, AlertTriangle, Lock, Brain, Clock } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900 bg-opacity-50 border border-blue-500 text-blue-200 px-4 py-2 rounded-lg text-sm mb-4">
            <Shield className="w-4 h-4" />
            Stay Alert, Stay Safe
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Driver Drowsiness Detection
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            AI-powered system that monitors your eyes and alerts you when you are getting drowsy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/drowsiness"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              Start Detection
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200"
            >
              Learn More
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-colors">
            <Eye className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Eye Monitoring
            </h3>
            <p className="text-gray-400">
              Continuously watches your eyes through your webcam to detect if they are open or closed.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 hover:border-green-500 transition-colors">
            <Bell className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Audio Alarm
            </h3>
            <p className="text-gray-400">
              Plays a beeping sound when drowsiness is detected to wake you up and keep you alert.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 hover:border-purple-500 transition-colors">
            <Zap className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Instant Alerts</h3>
            <p className="text-gray-400">
              Visual warning appears on screen when your eyes stay closed for too long (3+ seconds).
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 hover:border-yellow-500 transition-colors">
            <Lock className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Privacy First
            </h3>
            <p className="text-gray-400">
              Everything happens in your browser. No videos or images are saved, uploaded, or shared.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 hover:border-red-500 transition-colors">
            <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Smart Detection
            </h3>
            <p className="text-gray-400">
              Ignores normal blinking. Only alerts when eyes are closed continuously for dangerous periods.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 hover:border-cyan-500 transition-colors">
            <Clock className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Easy to Use
            </h3>
            <p className="text-gray-400">
              No setup required. Just click start, allow camera access, and you are protected.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div
          id="how-it-works"
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 shadow-xl mb-16 border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Camera Access</h4>
              <p className="text-gray-400 text-sm">
                Grant permission to use your webcam for monitoring
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Eye Detection</h4>
              <p className="text-gray-400 text-sm">
                AI identifies your eyes and tracks if they are open or closed
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Smart Analysis</h4>
              <p className="text-gray-400 text-sm">
                System checks if eyes are closed for 3+ seconds
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Wake-Up Alert</h4>
              <p className="text-gray-400 text-sm">
                Alarm beeps and visual warning appears to wake you
              </p>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl mb-16 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            How to Use
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-4 bg-gray-700 rounded-lg p-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-white">
                1
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Click Start Detection</h4>
                <p className="text-gray-400 text-sm">
                  Press the blue button above to open the detection page
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-700 rounded-lg p-4">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-white">
                2
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Allow Camera Access</h4>
                <p className="text-gray-400 text-sm">
                  When prompted, click Allow to let the app use your webcam
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-700 rounded-lg p-4">
              <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-white">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Position Yourself</h4>
                <p className="text-gray-400 text-sm">
                  Sit in front of the camera with good lighting so your face is clearly visible
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-700 rounded-lg p-4">
              <div className="bg-yellow-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-white">
                4
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Start Monitoring</h4>
                <p className="text-gray-400 text-sm">
                  Press Start Detection and the system will begin watching your eyes
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-700 rounded-lg p-4">
              <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-white">
                5
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Stay Alert</h4>
                <p className="text-gray-400 text-sm">
                  If you get drowsy, you will hear beeping and see a warning - take a break!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Powered by AI
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-6">
            This system uses artificial intelligence to analyze your eye movements in real-time. 
            The AI model has been trained on thousands of images to recognize when eyes are open or closed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full text-white">
              <Brain className="w-4 h-4" />
              AI-Powered
            </span>
            <span className="inline-flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full text-white">
              <Lock className="w-4 h-4" />
              Privacy Protected
            </span>
            <span className="inline-flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full text-white">
              <Zap className="w-4 h-4" />
              Real-Time Analysis
            </span>
            <span className="inline-flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full text-white">
              <AlertTriangle className="w-4 h-4" />
              Accurate Detection
            </span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Stay Safe?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Do not let drowsiness put you at risk. Start using our AI-powered detection system now.
          </p>
          <Link
            href="/drowsiness"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold py-4 px-10 rounded-lg text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Now
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p className="mb-2">
            Driver Drowsiness Detection System
          </p>
          <p className="text-xs text-gray-600">
            Camera access required for eye monitoring • All processing happens in your browser • Your privacy is protected
          </p>
        </footer>
      </div>
    </main>
  );
}
