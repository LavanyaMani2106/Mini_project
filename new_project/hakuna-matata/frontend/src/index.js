import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Development-time accessibility checks (axe)
if (process.env.NODE_ENV !== 'production') {
  try {
    // Load dev-only dependency without letting webpack statically resolve it.
    // Using `eval('require')` prevents bundlers from including this as a hard dependency.
    const maybeRequire = (name) => {
      try {
        return eval("require")(name);
      } catch (err) {
        return null;
      }
    };
    const axe = maybeRequire('@axe-core/react');
    const legacyReactDom = maybeRequire('react-dom');
    if (axe && legacyReactDom) {
      axe(React, legacyReactDom, 1000);
    }
  } catch (e) {
    // ignore — dev-time accessibility checks are optional
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
