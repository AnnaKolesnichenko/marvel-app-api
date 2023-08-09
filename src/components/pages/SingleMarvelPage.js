import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCharacterByQuery } from 'services/MarvelService';
import AppBanner from 'components/appBanner/AppBanner';
import Spinner from 'components/spinner/Spinner';

const SingleMarvelPage = ({ data }) => {
  const [marvel, setMarvel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { marvelId } = useParams();
  console.log(marvelId);

  const fetchMarvelByQuery = async query => {
    setLoading(true);
    await getCharacterByQuery(query)
      .then(res => {
        setMarvel(res.results[0]);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMarvelByQuery(marvelId);
  }, [marvelId]);

  const { title, description, thumbnail } = data;
  const poster = `${thumbnail.path}.${thumbnail.extension}`;

  return (
    <>
      <AppBanner />
      {loading ? (
        <Spinner />
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
          </div>
          <Link to="/characters" className="single-comic__back">
            Back to all
          </Link>
        </div>
      )}
    </>
  );
};

export default SingleMarvelPage;
