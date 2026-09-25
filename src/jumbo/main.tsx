import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './jumbo.css';
import JumboPage from './JumboPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JumboPage />
  </StrictMode>,
);
