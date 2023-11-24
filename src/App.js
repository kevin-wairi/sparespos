import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import SidebarMenu from './Pages/SidebarMenu/SidebarMenu';
import './App.css';

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
      <SidebarMenu />
      <Routes>
       <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
