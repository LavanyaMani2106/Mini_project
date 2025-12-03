const path = require('path');
let tf;
let model = null;

function initTf() {
  if (!tf) {
    // require here to avoid importing heavy package until needed
    tf = require('@tensorflow/tfjs-node');
  }
  return tf;
}

async function loadModel() {
  if (model) return model;
  tf = initTf();
  const savedModelDir = path.resolve(__dirname, '..', '..', '..', 'best_model_mobilenet_savedmodel');
  console.log('Loading SavedModel from', savedModelDir);
  try {
    // tf.node.loadSavedModel loads the SavedModel from disk
    model = tf.node.loadSavedModel(savedModelDir);
    console.log('Model loaded');
    return model;
  } catch (e) {
    console.error('Failed to load SavedModel:', e);
    throw e;
  }
}

// Export loadModel and a getter for tf so we don't require heavy native bindings at module import time
module.exports = { loadModel, getTf: initTf };
