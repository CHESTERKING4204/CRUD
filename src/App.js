import React from 'react';
import Create from './create';
import Read from './show';
import Update from './Update';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="flex justify-center items-center gap-8 m-8">
          <Link to='/create' className="text-blue-800 hover:text-blue-600 font-semibold text-lg">Create</Link>
          <Link to='/add' className="text-blue-800 hover:text-blue-600 font-semibold text-lg">Add</Link>
        </div>
        <Routes>
          {/* <Route path='/' element={<Home />}></Route> */}
          <Route path='/create' element={<Create />}></Route>
          <Route path='/add' element={<Read />}></Route>
          <Route path='/:id' element={<Update />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
