import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manufacturer from './Pages/Manufacturer';
import Home from './Pages/Home'
import Platform from './Pages/Platform';
import GetPriceHistory from './Pages/GetPriceHistory';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path='/manfacturer' element={<Manufacturer />} />
          <Route exact path='/platform' element={ <Platform/> } />
          <Route exacr path="/pricehistory" element={ <GetPriceHistory/> } />
          <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
