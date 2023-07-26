// import { Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import ComicsList from '../comicsList/ComicsList';

import { useState } from 'react';


import decoration from '../../resources/img/vision.png';
import './app.scss';

const App = () => {

  const [itemId, setItemId] = useState('');


  const handleItemClicked = (id) => {
    setItemId(id);
    console.log(itemId);
  }

  

  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar />
        <div className='char__content'>
          <CharList handleItemClicked={handleItemClicked}/>
          <CharInfo itemId={itemId}/>
          
        </div>
        <ComicsList/>
        <img className='bg-decoration' src={decoration} alt="vision"/>
      </main>

        
    </div>
  );

  /*return (
    <div className="app">
      <Routes>
        <Route path='/' element={<AppHeader/>}>
        <>
          <Route path='/' element={<RandomChar />}></Route>
          
            <Route path="characters" element={<CharList handleItemClicked={handleItemClicked}/>}/>
            <Route path="charchters/:charId" element={<CharInfo itemId={itemId}/>}/>
          
          
        </>
        </Route>
        
      </Routes>

        
    </div>
  ); */
}

export default App;
