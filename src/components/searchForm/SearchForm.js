import * as Yup from 'yup';
import { useFormik } from 'formik';

import "./searchForm.scss";
import '../../style/button.scss';

const SearchForm = () => {

    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema: Yup.object({
          name: Yup.string().min(2, "Write more symbols for a better query").required("This field is required"),
        }),
        onSubmit: values => console.log(values, null, 2)
      })

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
                <a href="www.hompage.com" className="button button__main">
                    <div className="inner">Find</div>
                </a>
                <a href="www.hompage.com" className="button button__main" style={{display: 'none'}}>
                    <div className="inner">Find</div>
                </a>
            </div>
        </form>
        </div>
    )
}
export default SearchForm;