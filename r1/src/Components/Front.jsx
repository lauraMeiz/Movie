import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import OneMovie from "../Components/Front/OneMovie";
import "../../src/Front.scss";

function Front({ show }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState("");

  // Read
  useEffect(() => {
    axios.get("http://localhost:3005/movies-manager/" + show).then((res) => {
      console.log(res.data);
      setMovies(res.data);
    });
  }, [show]);
  const serverSort = (by, dir) => {
    axios
      .get("http://localhost:3005/movies-list-sorted/?dir=" + dir + "&by=" + by)
      .then((res) => {
        setMovies(res.data);
      });
  };
  const doSearch = (e) => {
    setSearch(e.target.value);

    axios
      .get("http://localhost:3005/movies-list-search/?s=" + e.target.value)
      .then((res) => {
        setMovies(res.data);
        if (search[0] === res.data[0]) {
          setNotFound("Something wrong, please, try again");
          console.log(search);
        }
      });
  };

  return (
    <>
      <div className="navbar-nav">
        <div className="logo">List of movies</div>
        <div className="nav-link-row">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/login">
            Admin
          </Link>
        </div>
      </div>
      <div className="row-rating">
        <div className="row-rating-date">
          <span>By Date</span>
          <div className="arrows">
            <svg className="up" onClick={() => serverSort("date", "asc")}>
              <use xlinkHref="#arrow"></use>
            </svg>
            <svg className="down" onClick={() => serverSort("date", "desc")}>
              <use xlinkHref="#arrow"></use>
            </svg>
          </div>
        </div>

        <div className="row-rating-title">
          <span>By title</span>
          <div className="arrows">
            <svg className="up" onClick={() => serverSort("title", "asc")}>
              <use xlinkHref="#arrow"></use>
            </svg>
            <svg className="down" onClick={() => serverSort("title", "desc")}>
              <use xlinkHref="#arrow"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="row-search">
        <div className="oneSearch">
          <label>Search</label>
          <input type="text" onChange={doSearch} value={search}></input>
        </div>
      </div>
      <div>
        <div>
          <div className="column-list">
            <ul>
              {movies.length ? (
                movies.map((movie) => (
                  <OneMovie key={movie.id} movie={movie}></OneMovie>
                ))
              ) : (
                <div className="error">{notFound}</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Front;
