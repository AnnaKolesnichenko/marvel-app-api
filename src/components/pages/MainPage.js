import { useState } from 'react';

import RandomChar from 'components/randomChar/RandomChar';
import CharList from 'components/charList/CharList';
import CharInfo from 'components/charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [itemId, setItemId] = useState('');

  const handleItemClicked = id => {
    setItemId(id);
    console.log(itemId);
  };
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList handleItemClicked={handleItemClicked} />
        <CharInfo itemId={itemId} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
