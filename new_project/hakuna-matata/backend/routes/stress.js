const express = require('express');
const router = express.Router();
const { loadModel, getTf } = require('../modelLoader');
const axios = require('axios');

router.get('/', (req, res) => {
  res.json({ message: 'Stress route working!' });
});

// POST /api/stress/infer
// Body: { image: 'data:image/jpeg;base64,...' }
router.post('/infer', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'Missing image in request body' });

    // strip data URL prefix if present
    const base64 = image.includes(',') ? image.split(',')[1] : image;
    const imgBuffer = Buffer.from(base64, 'base64');

  const model = await loadModel();
  const tf = getTf();

  // decode image buffer to tensor and preprocess
  let input = tf.node.decodeImage(imgBuffer, 3).toFloat();
    input = tf.image.resizeBilinear(input, [96, 96]);
    input = input.div(127.5).sub(1.0).expandDims(0);

    const preds = model.predict(input);

    // preds could be a Tensor or NamedTensorMap; normalize to array
    let probsArr;
    if (Array.isArray(preds)) {
      probsArr = Array.from(preds[0].dataSync());
    } else if (preds.dataSync) {
      probsArr = Array.from(preds.dataSync());
    } else if (typeof preds === 'object') {
      const vals = Object.values(preds);
      probsArr = vals.length ? Array.from(vals[0].dataSync()) : [];
    } else {
      probsArr = [];
    }

    // map probabilities to a stress score (0-100) using same mapping as frontend
    const score = Math.round((probsArr[0] * 25) + (probsArr[1] * 55) + (probsArr[2] * 80));

    // cleanup
    if (preds && preds.dispose) preds.dispose();
    if (input && input.dispose) input.dispose();

    res.json({ probs: probsArr, score });
  } catch (err) {
    console.error('Inference error:', err);
    res.status(500).json({ error: String(err) });
  }
});

// POST /api/stress/infer-ml
// Body: { image: 'data:image/jpeg;base64,...' }
// Proxies to Python ML inference service
router.post('/infer-ml', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'Missing image in request body' });

    // Try to call Python ML service
    const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8001';
    
    try {
      const response = await axios.post(`${ML_SERVICE_URL}/infer`, {
        image: image
      }, {
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' }
      });
      
      res.json(response.data);
    } catch (mlError) {
      // Fallback to simple calculation if ML service is not available
      console.warn('ML service not available, using fallback:', mlError.message);
      
      // Simple fallback: return a score based on timestamp variation
      const fallbackScore = 40 + Math.floor(Math.random() * 30);
      
      res.json({
        score: fallbackScore,
        confidence: 0.5,
        model: 'fallback',
        note: 'ML service unavailable. Start Python service with: cd backend/python_infer && python mock_inference.py'
      });
    }
  } catch (err) {
    console.error('ML inference error:', err);
    res.status(500).json({ error: String(err) });
  }
});

module.exports = router;