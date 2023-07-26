import { getAllCharacters } from "../../services/MarvelService";
import { useState, useEffect } from "react";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

const CharList = (props) => {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadBtn, setLoadBtn] = useState(false);
  const [offset, setOffset] = useState(210);

  useEffect(() => {
    fetchCaharacters();
  });

  const fetchCaharacters = async () => {
    setLoading(true);
    clearError();
    try {
      await getAllCharacters(offset).then((res) => {
        
        if(res.results.length < 9 || res.results.length === 0) {
          setLoadBtn(false);
        } setLoadBtn(true);
        
        setItemList((prevState) => [...prevState, ...res.results]);
        setOffset((prevOffset) => prevOffset + 9);
        setLoading(false);

      });
    } catch (error) {
      onError();
    }
  };

  const getCharId = (id) => {
    props.handleItemClicked(id);
  };

  const onPageAdded = () => {
    fetchCaharacters();
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const clearError = (error) => {
    setError(null);
  }

  return (
    <div className="char__list">
      {error && <Error />}
      {loading && <Spinner />}
      <ul className="char__grid">
        {itemList.map((item) => {
          const poster = `${item.thumbnail.path}.${item.thumbnail.extension}`;
          let imgObjectFit = "cover";
          if (
            poster ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ) {
            imgObjectFit = "contain";
          }

          return (
            <li
              className="char__item"
              key={item.id}
              onClick={() => getCharId(item.id)}
            >
              <img
                src={poster}
                alt={item.name}
                style={{ objectFit: imgObjectFit }}
              />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })}
      </ul>
      
      {loadBtn && (<button
        className="button button__main button__long"
        onClick={onPageAdded}
      >
        <div className="inner">load more</div>
      </button>)}
        
    </div>
  );
};

// state = {
//     itemList: [],
//     loading: true,
//     error: false
// }

// componentDidMount() {
//     this.marvelService.getAllCharacters()
//         .then(this.onCharListLoaded)
//         .catch(this.onError)
// }

// onCharListLoaded = (itemList) => {
//     this.setState({
//         itemList,
//         loading: false
//     })
// }

// Этот метод создан для оптимизации,
// чтобы не помещать такую конструкцию в метод render

// marvelService = new MarvelService();

// state = {
//     list: [],
//     loading: true,
//     error: false
// }

// componentDidMount = () => {
//     this.onCharactersUpload();
// }

// onCharactersUpload = () => {
//     this.marvelService
//         .getAllCharacters()
//         // .then(this.onListLoaded)
//         .then(() => this.onListLoaded)
//         .catch(this.onError)
// }

// onListLoaded = (list) => {
//     this.setState({
//         list: list,
//         loading: false
//     })
// }

// onError = () => {
//     this.setState({
//         loading: false,
//         error: true
//     })
// }

// renderListItems(arr) {
//     const items = arr.map(item => {
//         let imgObjectFit = 'cover';
//         if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
//             imgObjectFit = 'contain';
//         }

//         return(
//             <li className="char__item">
//                 <img src={item.thumbnail} alt={item.name} style={{objectFit: imgObjectFit}}/>
//                 <div className="char__name">{item.name}</div>
//             </li>
//         )
//     });
//     return (
//         <ul className="char__grid">
//             {items}
//         </ul>
//     )
// }

// render() {
//     const {list, loading, error} = this.state;
//     const items = this.renderListItems(list);

//     const errorM = error ? <Error/> : null;
//     const spinner = loading ? <Spinner/> : null;
//     const contentItems = !(loading || error) ? items : null;

//     return (
//         <div className="char__list">
//             {errorM}
//             {spinner}
//             {contentItems}
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

export default CharList;
