import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProgressProvider } from './state/progress.tsx';
import './index.css';
import App from './App.tsx';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('#root missing');

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ProgressProvider>
        <Suspense fallback={<div className="p-4">Laddar...</div>}>
          <App />
        </Suspense>
      </ProgressProvider>
    </BrowserRouter>
  </StrictMode>,
);
