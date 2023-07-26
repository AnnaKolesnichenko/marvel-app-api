import { Link } from 'react-router-dom';
import errorImg from '../images/4044.avif';

const NotExist = () => {
  return (
    <div>
      <Link to="/">
        <button style={{ margin: '10px', width: '150px', padding: '5px 10px' }}>
          Back to Main
        </button>
      </Link>
      <div style={{ margin: '10px', display: 'block' }}>
        <img
          src={errorImg}
          alt="error"
          style={{
            width: '100vw',
            height: '70vh',
          }}
        ></img>
      </div>
    </div>
  );
};

export default NotExist;
