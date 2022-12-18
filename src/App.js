import {BrowserRouter , Routes, Route} from 'react-router-dom'
import { QueryClient,QueryClientProvider } from 'react-query'
import './App.css';



// import Components
import Landing from './Components/LandingComponent/Landing';


// import Pages
import Create from './Pages/FirstPage/FirstPage';
import Success from './Pages/SuccessPage/Success';
import List from './Pages/ListPage/List';
import Detail from './Pages/ListDetail/Detail';


const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/success' element={<Success/>}></Route>
          <Route path='/list' element={<List/>}></Route>
          <Route path='/detail/:listID' element={<Detail/>}></Route>
        </Routes>
      </BrowserRouter>  
    </QueryClientProvider>
  );
}

export default App;
