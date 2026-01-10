import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './screens/LandingPage';

const App: React.FC = () => {
  const [isInApp, setIsInApp] = useState(false);

  if (!isInApp) {
    return <LandingPage onEnterApp={() => setIsInApp(true)} />;
  }

  return <Layout />;
};

export default App;