import './App.css';
import { router } from './pages/Routes/Routes';
import {RouterProvider} from 'react-router-dom';
import bgimage from './assets/images/bg.png'


function App() {
  return (
    <div className={`max-w-[1440px] mx-auto`} 
    style={{
      background:`url(${bgimage})`
    }}
    >
      
      <RouterProvider router={router}>
        
      </RouterProvider>
    </div>
  );
}

export default App;
