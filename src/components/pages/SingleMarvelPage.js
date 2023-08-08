
import { Link } from "react-router-dom";
import AppBanner from "components/appBanner/AppBanner";


const SingleMarvelPage = ({data}) => {

    const {title, description, thumbnail} = data;
    const poster = `${thumbnail.path}.${thumbnail.extension}`;
    
    return (
        <>
            <AppBanner />
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
        </>
 
    )
};

export default SingleMarvelPage;