import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

// Simple TF.js verification page
// Expects these files to exist under public/:
// - /tfjs_model_mobilenet/model.json (the converted TF.js model)
// - /verify_images/manifest.json (list of image filenames)
// - /verify_images/<sample_*.jpg/png>
// - /verify_savedmodel_preds.json (predictions from the SavedModel)

const IMAGE_SIZE = 96;

function preprocessImageElement(imgEl){
  return tf.tidy(() => {
    let t = tf.browser.fromPixels(imgEl).toFloat();
    t = tf.image.resizeBilinear(t, [IMAGE_SIZE, IMAGE_SIZE]);
    // mobilenet_v2 style normalization used during training
    return t.div(127.5).sub(1.0).expandDims(0);
  });
}

export default function TFJSVerify(){
  const [model, setModel] = useState(null);
  const [manifest, setManifest] = useState([]);
  const [savedPreds, setSavedPreds] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    async function init(){
      try{
        const [m, manRes, savedRes] = await Promise.all([
          tf.loadGraphModel('/tfjs_model_mobilenet/model.json').catch(e=>{console.warn('Graph model load failed',e); return null}),
          fetch('/verify_images/manifest.json').then(r=>r.ok? r.json() : []),
          fetch('/verify_savedmodel_preds.json').then(r=>r.ok? r.json() : {})
        ]);
        if(!mounted) return;
        setModel(m);
        setManifest(manRes || []);
        setSavedPreds(savedRes || {});
      }catch(err){
        console.error('init error', err);
      }finally{
        setLoading(false);
      }
    }
    init();
    return ()=>{ mounted = false; }
  },[]);

  useEffect(()=>{
    let mounted = true;
    async function runAll(){
      if(!model || !manifest || manifest.length===0) return;
      const out = [];
      for(let i=0;i<manifest.length;i++){
        const name = manifest[i];
        try{
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = '/verify_images/' + name;
          await new Promise((res, rej)=>{ img.onload = res; img.onerror = rej; });
          const input = preprocessImageElement(img);
          const pred = await model.predict(input);
          // pred may be a tensor or a dictionary depending on model; normalize to array
          let probs;
          if (Array.isArray(pred)){
            probs = await pred[0].data();
          } else if (pred.data){
            probs = await pred.data();
          } else if (typeof pred === 'object'){
            // graph models sometimes return NamedTensors map
            const vals = Object.values(pred);
            probs = await vals[0].data();
          }
          const probsArr = Array.from(probs || []);
          // find corresponding savedmodel key by original path heuristic
          // savedPreds keys are full original paths; we just try to match by filename
          const savedKey = Object.keys(savedPreds).find(k => k.endsWith(name) || k.includes(name));
          const saved = savedKey ? savedPreds[savedKey] : null;
          out.push({ name, tfjs: probsArr, saved });
          tf.dispose(input);
          if (pred && pred.dispose) pred.dispose();
        }catch(e){
          console.error('failed predict for', name, e);
          out.push({ name, error: String(e) });
        }
      }
      if(mounted) setResults(out);
    }
    runAll();
    return ()=>{ mounted = false; }
  },[model, manifest, savedPreds]);

  return (
    <div style={{padding:20}}>
      <h2>TF.js Verification</h2>
      {loading && <div>Loading model and manifest...</div>}
      {!loading && !model && <div style={{color:'orange'}}>TF.js model not found at /tfjs_model_mobilenet/model.json — place converted files into public/tfjs_model_mobilenet</div>}
      <div style={{marginTop:12}}>
        <strong>Images:</strong> {manifest.length}
      </div>
      <div style={{marginTop:12}}>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{borderBottom:'1px solid #ddd', textAlign:'left'}}>Image</th>
              <th style={{borderBottom:'1px solid #ddd'}}>SavedModel probs</th>
              <th style={{borderBottom:'1px solid #ddd'}}>TF.js probs</th>
              <th style={{borderBottom:'1px solid #ddd'}}>Max diff</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx}>
                <td style={{padding:8, borderBottom:'1px solid #f0f0f0'}}>
                  <img src={'/verify_images/'+r.name} alt={r.name} style={{height:64}} />
                  <div style={{fontSize:12}}>{r.name}</div>
                </td>
                <td style={{padding:8, borderBottom:'1px solid #f0f0f0', fontFamily:'monospace'}}>
                  {r.saved ? JSON.stringify(r.saved.map(v=>Number(v.toFixed(4)))) : 'n/a'}
                </td>
                <td style={{padding:8, borderBottom:'1px solid #f0f0f0', fontFamily:'monospace'}}>
                  {r.tfjs ? JSON.stringify(r.tfjs.map(v=>Number(v.toFixed(4)))) : (r.error? 'error' : 'pending')}
                </td>
                <td style={{padding:8, borderBottom:'1px solid #f0f0f0'}}>
                  {r.saved && r.tfjs ? Math.max(...r.saved.map((s,i)=>Math.abs(s - (r.tfjs[i]||0)))) .toFixed(4) : 'n/a'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
