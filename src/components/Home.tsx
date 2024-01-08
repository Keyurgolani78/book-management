import { Link } from "react-router-dom";
import "styles/home.css";

const Home = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Book Management App</h1>
      <p>Please log in or sign up to manage your books.</p>

      <div className="action-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
