import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCharacterByQuery } from 'services/MarvelService';

import './searchForm.scss';
import '../../style/button.scss';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [marvel, setMarvel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
    }),
    onSubmit: ({ name }) => {
      const searchValue = name.toLowerCase().trim();
      //   setQuery(searchValue);
      //   console.log(query);
    },
  });

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
    fetchMarvelByQuery(formik.values.name);
  }, [formik.values.name]);

  const errorMessage =
    formik.errors.name && formik.touched.name ? (
      <div className="error">
        The Character was not found. Check the name and try again
      </div>
    ) : null;

  const results = !marvel ? null : marvel.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {marvel[0].name} page?
      </div>
      <Link
        to={`/characters/${marvel[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  //   const result = marvel ? (
  //     <div className="char__btns" style={{ marginTop: 0 }}>
  //       <Link
  //         to={`/comics/${formik.values.name}`}
  //         className="button button__main"
  //       >
  //         <div className="inner">Find</div>
  //       </Link>
  //       <a href="www.hompage.com" className="button button__main">
  //         <div className="inner">Find</div>
  //       </a>
  //     </div>
  //   ) : null;

  return (
    <div className="search__part">
      <h2 className="search__title">Or find a character by name</h2>
      <form className="search__form" onSubmit={formik.handleSubmit}>
        <label className="search__label" htmlFor="name">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            className="search__input"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {!marvel ? errorMessage : null}
        </label>
        {results}
      </form>
    </div>
  );
};
export default SearchForm;
