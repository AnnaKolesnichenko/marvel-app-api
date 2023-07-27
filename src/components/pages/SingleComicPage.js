import AppBanner from 'components/appBanner/AppBanner';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOneComic } from 'services/MarvelService';
import Spinner from 'components/spinner/Spinner';
import ErrorMessage from 'components/error/Error';

const SingleComicPage = () => {
  const [comic, setComic] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const param = params.comicId;

  useEffect(() => {
    fetchComicById(param);
  }, [param]);

  const fetchComicById = async id => {
    setLoading(true);
    await getOneComic(id)
      .then(res => {
        setComic(res.results[0]);
        setLoading(false);
      })
      .catch(error => setError(error));
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!comic) {
    return <div>Comic not found.</div>;
  }

  const { description, title, pageCount, prices, thumbnail } = comic;
  const poster = `${thumbnail.path}.${thumbnail.extension}`;

  return (
    <>
      <AppBanner />
      {loading && <Spinner />}
      {error || !comic ? (
        <ErrorMessage />
      ) : (
        <div className="single-comic">
          <img
            src={thumbnail ? poster : <p>Hello</p>}
            alt={title}
            className="single-comic__img"
          />
          <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount} pages</p>
            <p className="single-comic__descr">Language: en-us</p>
            <div className="single-comic__price">{prices[0].price}$</div>
          </div>
          <Link to="/comics" className="single-comic__back">
            Back to all
          </Link>
        </div>
      )}
    </>
  );
};

export default SingleComicPage;
