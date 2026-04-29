import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { DemoPage } from '@/pages/DemoPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/demo" element={<DemoPage />} />
    </Routes>
  );
}
