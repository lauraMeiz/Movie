import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import OneMovie from "../Components/Front/OneMovie";
import "../../src/Front.scss";

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
        <div className="logo">My favorite</div>
        <div className="nav-link-row">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
        </div>
      </div>

      <div>
        <div>
          <div className="column-list">
            <ul>
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
