import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { getCharacterByQuery } from "services/MarvelService";
import "./searchForm.scss";
import '../../style/button.scss';

const SearchForm = () => {
    const [marvel, setMarvel] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema: Yup.object({
          name: Yup.string().required("This field is required"),
        }),
        onSubmit: ({name}) => {
            const searchValue = name.toLowerCase().trim();
            fetchMarvelByQuery(searchValue);
        }
      });


    useEffect(() => {
        fetchMarvelByQuery(formik.values.name);
    }, [formik.values.name]);

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


    return (
        <div className="search__part">
            <h2 className="search__title">Or find a character by name</h2>
            <form className="search__form" onSubmit={formik.handleSubmit}>
            <label className="search__label" htmlFor='name'>
                <input 
                    id="name" 
                    type="text" 
                    name="name" 
                    placeholder="Enter name" 
                    className="search__input"
                    value={formik.values.name}
                    onChange={formik.handleChange}/>
                    {formik.errors.name && formik.touched.name ? <div className="error">The Character was not found. Check the name and try again</div> : null}
            </label>
            <div className="char__btns" style={{marginTop: 0}}>
                <Link to={`/characters/${formik.values.name}`} className="button button__main">
                    <div className="inner">Find</div>
                </Link>
                <a href="www.hompage.com" className="button button__main" style={{display: 'none'}}>
                    <div className="inner">Find</div>
                </a>
            </div>
        </form>
        </div>
    )
}
export default SearchForm;