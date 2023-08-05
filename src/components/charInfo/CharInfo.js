import "./charInfo.scss";
import { useState, useEffect } from "react";
import { getOneCharacter } from "../../services/MarvelService";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/Error";
import Skeleton from "../skeleton/Skleton";

const CharInfo = ({ itemId }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    getCharacterById(itemId);
  }, [itemId]);

  const getCharacterById = (id) => {
    setLoading(true);
    clearError();

    getOneCharacter(id)
      .then((res) => {
        setCharacter(res.results[0]);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const clearError = (error) => {
    setError(null);
  }

  if(!character) {
    return <Skeleton/>
  }

  if (loading) {
    return <Spinner />;
  }

  if (error || !character) {
    return <ErrorMessage />;
  }

  const { name, description, thumbnail, comics } = character;
  const poster = `${thumbnail.path}.${thumbnail.extension}`;
  let imgObjectFit = "cover";
  if (
    poster ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgObjectFit = "contain";
  }

  return (
    <TransitionGroup component={null}>
      <CSSTransition timeout={1000} classNames='char__fade'>
        <div className='char__info'>
        {/* {loading && <Spinner />} */}
        {error || !character ? (
          <ErrorMessage />
        ) : (
          <>
            <div className="char__basics">
              <img src={poster} alt={name} style={{ objectFit: imgObjectFit }} />
              <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                  <a href="www.gmail.com" className="button button__main">
                    <div className="inner">Homepage</div>
                  </a>
                  <a href="www.gmail.com" className="button button__secondary">
                    <div className="inner">Wiki</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
              {comics.items.map((comic) => {
                return (
                  <li className="char__comics-item">
                    <h3>{comic.name}</h3>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </CSSTransition>
    </TransitionGroup>
  );
};

export default CharInfo;
