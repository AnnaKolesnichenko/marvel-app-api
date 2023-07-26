const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;

    const poster = `${thumbnail.path}.${thumbnail.extension}`;
    
    let imgObjectFit = 'cover';
    if (poster === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgObjectFit = 'contain';
     }


    return (
        <div className="randomchar__block">
        <img src={poster} alt="Random character" className="randomchar__img" style={{objectFit: imgObjectFit}}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description ? description.slice(0, 150) + '...' : "There is description to this Marvel Star..."}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default View;

