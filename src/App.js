import logo from './logo.svg';
import './App.css';
import ListFutbolistasComponent from './components/ListFutbolistasComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div>
      <BrowserRouter>
      <HeaderComponent />
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<ListFutbolistasComponent />}></Route>
          <Route path='/futbolistas' element={<ListFutbolistasComponent />}></Route>
        </Routes>
      </div>
      <FooterComponent />
      </BrowserRouter>
    </div>




  );
}

export default App;
