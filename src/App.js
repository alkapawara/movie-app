import './App.css';
import Card from './Component/Card';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { movieDetail } from './Redux/movieSlice';

function App() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(movieDetail());
  }, [dispatch]);

  return (
    <>
      <div className='w-100 bg-search'>
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='input-search'
        />
      </div>
      <Card searchTerm={searchTerm} />
    </>
  );
}

export default App;
