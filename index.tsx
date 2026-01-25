
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Root elementni topish va ilovani ishga tushirish
const rootNode = document.getElementById('root');
if (rootNode) {
  createRoot(rootNode).render(<App />);
}
