import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './fb.css';
import FinanceBuddyPage from './FinanceBuddyPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FinanceBuddyPage />
  </StrictMode>,
);
