import './App.css';
import { router } from './pages/Routes/Routes';
import {RouterProvider} from 'react-router-dom';
import bgimage from './assets/images/bg.png'
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className={`max-w-[1440px] mx-auto`} >
      
      <RouterProvider router={router}>
        
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
