import { useState, useEffect } from 'react';
import { getAllComic } from '../../services/MarvelService';

import ErrorMessage from '../error/Error';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';



const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadBtn, setLoadBtn] = useState(false);
    const [offset, setOffset] = useState(210);

    useEffect(() => {
        fetchComics();
    }, []);

    const fetchComics = async () => {
        setLoading(true);
        clearError();

        try{
            await getAllComic(offset).then(res => {
                console.log(res.results);

                if(res.results.length < 9 || res.results.length === 0) {
                    setLoadBtn(false);
                } setLoadBtn(true);

                setComics((prevState) => [...prevState, ...res.results]);
                setOffset(prevState => prevState + 9);
                setLoading(false);
            })
        } catch (error) {
            setError(error);
        }
    }

    const onPageUploaded = () => {
        fetchComics();
    };

    const clearError = (error) => {
        setError(null);
    }


    return (
        <div className="comics__list">
            {loading && <Spinner/>}
            {error && <ErrorMessage />}
            <ul className="comics__grid">
                {comics.map(comics => {
                const poster = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;
                
                return (
                    <li className="comics__item" key={comics.id}>
                    <a href="www.gmail.com">
                        <img src={poster} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}</div>
                    </a>
                </li>
                )
     })}
                
            </ul>
            <button className="button button__main button__long" onClick={onPageUploaded}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;