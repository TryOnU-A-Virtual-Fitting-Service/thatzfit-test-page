import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { ProductDetailPage } from '@/pages/product-detail';
import { AnalyticsTracker } from '@/widgets/analytics/AnalyticsTracker';
import { PluginAnalyticsObserver } from '@/widgets/analytics/PluginAnalyticsObserver';
import { BaseLayout } from '@/widgets/layout/BaseLayout';
import { SeoManager } from '@/widgets/seo/SeoManager';

function App() {
  return (
    <Router>
      <SeoManager />
      <AnalyticsTracker />
      <PluginAnalyticsObserver />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
