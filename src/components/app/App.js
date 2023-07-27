import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import AppHeader from '../appHeader/AppHeader';
import Spinner from 'components/spinner/Spinner';
import MainPage from 'components/pages/MainPage';
import ComicsPage from 'components/pages/ComicsPage';
import SingleComicPage from 'components/pages/SingleComicPage';
import './app.scss';

const NotExist = lazy(() => import('../pages/404'));
// import NotExist from 'components/pages/404';

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<AppHeader />}>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/comics" element={<ComicsPage />}></Route>
          <Route path="comics/:comicId" element={<SingleComicPage />}></Route>
        </Route>
        <Route path="*" element={<NotExist />} />
      </Routes>
    </Suspense>
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
