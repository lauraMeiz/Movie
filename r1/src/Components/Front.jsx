import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import OneMovie from "../Components/Front/OneMovie";

function Front({ show }) {
  const [movies, setMovies] = useState([]);

  // Read
  useEffect(() => {
    axios.get("http://localhost:3005/movies-manager/" + show).then((res) => {
      console.log(res.data);
      setMovies(res.data);
    });
  }, [show]);

  return (
    <>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/admin">
          Admin
        </Link>
      </div>

      <div>
        <div>
          <div>
            <ul className="list-group">
              {movies.map((movie) => (
                <OneMovie key={movie.id} movie={movie}></OneMovie>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Front;
