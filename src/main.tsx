import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/global.css';
import { App } from './app/App';

// 루트 DOM 요소에 React 애플리케이션을 마운트합니다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
