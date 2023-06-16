import './App.css';
import HeaderComponent from './components/HeaderComponent';
import TableComponent from './components/TableComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const RootComponent = () => (
    <>
      <HeaderComponent />
      <TableComponent />
    </>
  )
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootComponent />} >
            <Route path=":duration/:status" element={<RootComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
