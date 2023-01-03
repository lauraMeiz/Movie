import { useEffect, useState } from "react";
import axios from "axios";
import OneMovie from "./OneMovie";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Read
  useEffect(() => {
    axios.get("http://localhost:3005/movies-manager").then((res) => {
      console.log(res.data);
      setMovies(res.data);
    });
  }, [lastUpdate]);
  return (
    <>
      <div className="column-list">
        <ul>
          {movies.map((movie) => (
            <OneMovie key={movie.id} movie={movie}></OneMovie>
          ))}
        </ul>
      </div>
    </>
  );
}
