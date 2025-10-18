# Model Files Directory

This directory contains the TensorFlow.js model files for local browser inference.

## Required Files

Place your converted TensorFlow.js model files here:

- **`model.json`** - Model architecture and configuration (required)
- **`group1-shard1of1.bin`** (or similar) - Model weights (required)

## How to Add Your Model

### Option 1: Convert from Keras (.h5)

If you have a Keras model file:

```bash
# Install tensorflowjs converter
pip install tensorflowjs

# Convert your Keras model
tensorflowjs_converter --input_format=keras \
  path/to/your/model.h5 \
  public/model/
```

This will generate:
- `model.json`
- One or more `.bin` shard files

### Option 2: Train a New Model

If you need to train a model from scratch, use an eye state dataset:

**Recommended Datasets:**
- MRL Eye Dataset
- CEW (Closed Eyes in the Wild)
- Your own collected dataset

**Model Requirements:**
- **Input**: Grayscale images of size 24×24
- **Input shape**: `(None, 24, 24, 1)`
- **Output**: Binary classification
  - Single value (0-1): >0.5 = Open, ≤0.5 = Closed
  - OR two values: [closed_prob, open_prob]
- **Format**: TensorFlow.js (Layers Model)

### Example Model Architecture (Python/Keras)

```python
from tensorflow import keras
from tensorflow.keras import layers

model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(24, 24, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(2, activation='softmax')  # [closed, open]
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train your model...
# model.fit(...)

# Save
model.save('eye_model.h5')
```

Then convert to TensorFlow.js:

```bash
tensorflowjs_converter --input_format=keras \
  eye_model.h5 \
  public/model/
```

## Model Loading in App

The app loads the model at `/model/model.json`:

```typescript
// In src/lib/modelLoader.ts
const model = await tf.loadLayersModel("/model/model.json");
```

## Preprocessing

Frames are preprocessed to match model input:

1. Capture from webcam
2. Resize to 24×24
3. Convert to grayscale
4. Normalize to [0, 1]
5. Add batch dimension

```typescript
const tensor = tf.tidy(() => {
  return tf.browser.fromPixels(video)
    .resizeNearestNeighbor([24, 24])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .div(255.0);
});
```

## Testing Your Model

After adding model files:

1. **Start the app**:
   ```bash
   npm run dev
   ```

2. **Open** `http://localhost:3001`

3. **Navigate to** `/drowsiness`

4. **Check browser console** for:
   - "Loading TensorFlow.js model..."
   - "✅ Model loaded successfully!"
   - Model input/output shapes

5. **Test predictions**:
   - Start detection
   - Check if eye state updates
   - Verify confidence scores

## Troubleshooting

### Model Not Found

**Error**: `Failed to load model from /model/model.json`

**Fix**:
- Ensure `model.json` exists in `public/model/`
- Ensure all `.bin` shard files are present
- Check browser Network tab for 404 errors

### Wrong Input Shape

**Error**: `Input shape mismatch`

**Fix**:
- Verify model expects (24, 24, 1)
- Check `model.json` input layer:
  ```json
  "input_shape": [null, 24, 24, 1]
  ```

### Wrong Output Format

**Error**: `Unexpected model output shape`

**Fix**: 
- Model should output either:
  - Single value (binary): 1 output node
  - Two values (softmax): 2 output nodes
- Update `src/lib/modelLoader.ts` if needed

### CORS Issues

**Error**: `CORS policy blocked`

**Fix**:
- Model files must be served from same origin
- Use development server (`npm run dev`)
- In production, deploy model files with app

## File Structure

```
public/model/
├── README.md              # This file
├── model.json            # Model architecture (required)
├── group1-shard1of1.bin  # Weights (required)
└── (additional shards)   # If model is large
```

## Model Size Considerations

- **Small model** (~1-2 MB): Single shard file
- **Large model** (>2 MB): Multiple shard files
- Keep model size reasonable for fast loading
- Optimize model if needed (quantization, pruning)

## Next Steps

1. ✅ Add model files to this directory
2. ✅ Verify files with `ls public/model/`
3. ✅ Run `npm run dev`
4. ✅ Check browser console for errors

---

**Need help?** Check the main [README.md](../../README.md) or open an issue.

