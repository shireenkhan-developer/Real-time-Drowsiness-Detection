# 🚗 Driver Drowsiness Detection System

An AI-powered system that monitors your eyes through your webcam and alerts you when you're getting drowsy. Helps prevent accidents by detecting when drivers are falling asleep.

![Status](https://img.shields.io/badge/Status-Active-green)
![AI](https://img.shields.io/badge/AI-Powered-blue)
![Privacy](https://img.shields.io/badge/Privacy-Protected-orange)

---

## ✨ What Does It Do?

This system uses your computer's camera to:
- 👁️ **Watch your eyes** in real-time
- 🔍 **Detect** if they're open or closed
- ⏱️ **Track** how long your eyes stay closed
- 🚨 **Alert you** with sound and visuals if you're drowsy
- 🔒 **Protect your privacy** - everything happens in your browser

---

## 🎯 Key Features

### For Safety
- ✅ **Instant Alerts** - Warns you within seconds if you're drowsy
- ✅ **Audio Alarm** - Beeping sound to wake you up
- ✅ **Visual Warning** - Big red alert on screen
- ✅ **Smart Detection** - Ignores normal blinking (only alerts for 3+ second closures)

### For Privacy
- ✅ **100% Private** - No videos saved or uploaded
- ✅ **No Internet Required** - Works completely offline
- ✅ **Your Device Only** - All processing happens in your browser

### For Ease of Use
- ✅ **No Setup** - Just open and start
- ✅ **Easy Interface** - Simple buttons and clear instructions
- ✅ **Works on Any Computer** - With a webcam and modern browser

---

## 🚀 How to Use

### Step 1: Setup (One-Time)
```bash
# Make sure you have Node.js installed
# Then run these commands:

npm install      # Install the app
npm run dev      # Start the app
```

### Step 2: Open the App
- Open your web browser
- Go to: `http://localhost:3001`

### Step 3: Start Detection
1. Click **"Start Detection"** button
2. Allow camera access when asked
3. Position yourself so your face is visible
4. Click **"Start Detection"** again
5. You're protected! 🎉

### Step 4: Stay Alert
- The system will watch your eyes continuously
- If you get drowsy, you'll hear beeping and see a warning
- **Take a break** when you see the alert!

---

## 📋 Requirements

### Hardware
- ✅ Computer with webcam
- ✅ Good lighting (so the camera can see your face)

### Software
- ✅ Node.js (version 18 or higher)
- ✅ Modern web browser (Chrome, Edge, Firefox, Safari)

---

## 💡 How It Works (Simple Explanation)

1. **Camera Watches You** 📷
   - Your webcam captures video of your face

2. **AI Finds Your Eyes** 🤖
   - Smart face detection finds where your eyes are

3. **System Checks Eye State** 👁️
   - AI determines if eyes are open or closed

4. **Counts Closed Seconds** ⏱️
   - Tracks how long eyes have been closed

5. **Alerts When Drowsy** 🚨
   - If eyes closed for 3+ seconds → alarm sounds

---

## 🎨 What You'll See

### When Alert
- Green "👁️ Open" indicator
- Confidence percentage
- Live video feed

### When Drowsy
- Red "😴 Closed" indicator  
- Warning message: "You seem drowsy!"
- Beeping alarm sound 🔊
- Suggestion to take a break

---

## 📱 Screenshot Guide

```
┌─────────────────────────────────┐
│  Driver Drowsiness Detection    │
├─────────────────────────────────┤
│                                 │
│    [Your Live Video Feed]       │
│         👁️ Open                  │
│       Confidence: 94.2%         │
│                                 │
├─────────────────────────────────┤
│    Status: Open                 │
│    Confidence: 94.2%            │
│    Closed Count: 0/6            │
│    Inference Time: 120ms        │
├─────────────────────────────────┤
│   [⏹️ Stop Detection]            │
└─────────────────────────────────┘
```

---

## 🔧 Installation Guide

### For Beginners

1. **Download Node.js**
   - Go to https://nodejs.org
   - Download and install

2. **Download This Project**
   ```bash
   # Open terminal/command prompt and run:
   git clone <your-repository-url>
   cd Real-time-Drowsiness-Detection
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Add AI Model** (Important!)
   - Place your trained AI model files in `public/model/`
   - Files needed: `model.json` and `.bin` weight files
   - See `public/model/README.md` for instructions

5. **Start the App**
   ```bash
   npm run dev
   ```

6. **Open Browser**
   - Navigate to `http://localhost:3001`

---

## ❓ Common Questions

### Is my video being recorded?
**No.** Nothing is saved, recorded, or sent anywhere. All processing happens live in your browser and is immediately discarded.

### Does it work offline?
**Yes.** Once loaded, the app works completely offline. No internet connection needed.

### How accurate is it?
The AI has been trained on thousands of eye images and can accurately detect open vs closed eyes. However, it works best with:
- Good lighting
- Clear view of your face
- No obstructions (sunglasses, hats, etc.)

### What if I blink?
Normal blinking (less than 1 second) is ignored. The alarm only triggers after eyes are closed for 3+ seconds continuously.

### Can I adjust the sensitivity?
Yes. In the code, you can change the `DROWSINESS_THRESHOLD` value (currently set to 6 frames = 3 seconds).

---

## 🛡️ Privacy & Safety

### What We Don't Do
- ❌ We don't record videos
- ❌ We don't save images
- ❌ We don't send data to servers
- ❌ We don't track you
- ❌ We don't require internet

### What We Do
- ✅ Process video locally in your browser
- ✅ Immediately discard each frame after analysis
- ✅ Keep everything on your device
- ✅ Protect your complete privacy

---

## 🆘 Troubleshooting

### Camera Not Working?
- Check if another app is using your camera
- Grant camera permissions in browser
- Try refreshing the page
- Make sure your webcam is connected

### App Not Loading?
```bash
# Try these commands:
npm install
npm run dev
```
- Check if port 3001 is already in use
- Try a different browser

### No Alerts Showing?
- Make sure you clicked "Start Detection"
- Check if your face is clearly visible
- Ensure good lighting
- Close your eyes for 3+ seconds to test

### Model Not Found?
- Check that `public/model/model.json` exists
- Ensure all `.bin` weight files are present
- See `public/model/README.md` for setup help

---

## 🎓 Built With

- **Next.js** - Web framework
- **React** - User interface
- **AI Technology** - Eye detection
- **Tailwind CSS** - Styling

---

## 📞 Support

Need help?
- 📖 Check `public/model/README.md` for model setup
- 🐛 Open an issue on GitHub
- 💬 Check existing issues for solutions

---

## 🙏 Important Notice

**This system is designed to help detect drowsiness, but it should not be relied upon as the sole safety mechanism. Always:**
- Get proper rest before driving
- Take breaks every 2 hours
- Pull over if you feel tired
- Never rely solely on technology for safety

---

## 📜 License

MIT License - Free to use and modify

---

## 🎉 Get Started Now!

```bash
npm install
npm run dev
```

**Stay Alert. Stay Safe. 🚗💤**

