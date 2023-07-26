import { useEffect, useState } from 'react';
import { getOneCharacter } from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import View from '../singleView/View';
import ErrorMessage from '../error/Error';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {   
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        renderRandomChar();
    });

    const renderRandomChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onLoading();
        clearError();
        
        getOneCharacter(id)
        .then(res => {
            setCharacter(res.results[0]);
            setLoading(false);
            setError(false);
        })
        .catch(onError)
    }

    const onLoading = () => {
        setLoading(true);
        setError(false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const clearError = (error) => {
        setError(null);
      }


    const contents = !(loading || error) && character!== null ? <View data={character}/> : null;
        
    return (
        <div className="randomchar">
            {error && <ErrorMessage/>}
            {loading && <Spinner />}
            {contents}
            
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={renderRandomChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}



export default RandomChar;