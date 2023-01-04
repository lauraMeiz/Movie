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
  const serverSort = (by, dir) => {
    //is cia siusim i servery (dir - kur, by - pagal ka)
    //
    axios
      .get("http://localhost:3005/movies-list-sorted/?dir=" + dir + "&by=" + by)
      .then((res) => {
        setMovies(res.data);
        // dispachFilms(getDataFromServer(res.data));
      });
  };

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
      <div className="row-rating">
        <span>
          By Date <small> (server)</small>
        </span>
        <div className="arrows">
          <svg className="up" onClick={() => serverSort("date", "asc")}>
            <use xlinkHref="#arrow"></use>
          </svg>
          <svg className="down" onClick={() => serverSort("date", "desc")}>
            <use xlinkHref="#arrow"></use>
          </svg>
        </div>
      </div>

      <div className="row-rating">
        <span>
          By title <small> (server)</small>
        </span>
        <div className="arrows">
          <svg className="up" onClick={() => serverSort("title", "asc")}>
            <use xlinkHref="#arrow"></use>
          </svg>
          <svg className="down" onClick={() => serverSort("title", "desc")}>
            <use xlinkHref="#arrow"></use>
          </svg>
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
