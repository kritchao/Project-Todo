import React, { useState } from 'react';
import './App.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import LocalStorageServices from './services/localStorageService'

function App() {
  const [role, setRole] = useState(LocalStorageServices.getRole);
  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
