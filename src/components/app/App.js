import { Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import MainPage from 'components/pages/MainPage';
import ComicsPage from 'components/pages/ComicsPage';
import SingleComicPage from 'components/pages/SingleComicPage';
import NotExist from 'components/pages/404';

import './app.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppHeader />}>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/comics" element={<ComicsPage />}></Route>
        <Route path="comics/:comicId" element={<SingleComicPage />}></Route>
      </Route>
      <Route path="*" element={<NotExist />} />
    </Routes>
  );
};

/*return (
    <div className="app">
      <div className="app">
        <AppHeader />
        <main>
            {/* <RandomChar />
            <div className="char__content">
              <CharList handleItemClicked={handleItemClicked} />
              <CharInfo itemId={itemId} />
            </div> */

// <AppBanner />
// <ComicsList />

/* <img className='bg-decoration' src={decoration} alt="vision"/> */
//           </main>
//         </div>

//     </div>
//   ); */
// };

export default App;
