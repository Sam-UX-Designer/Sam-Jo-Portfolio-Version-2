import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './aaw.css';
import './product-ui.css';
import AawPage from './AawPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AawPage />
  </StrictMode>,
);
