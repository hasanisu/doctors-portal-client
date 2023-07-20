import './App.css';
import { router } from './pages/Routes/Routes';
import {RouterProvider} from 'react-router-dom';
import bgimage from './assets/images/bg.png'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from './context/AuthProvider';


function App() {
  const {theme} = useContext(AuthContext)

  
  return (
    <div className={`App max-w-[1440px] mx-auto`} id={theme}>
      
      <RouterProvider router={router}>
  
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
