import { useEffect, useState } from "react";
import axios from "axios";
import OneMovie from "./OneMovie";
import Create from "./Create";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);

  // Read
  useEffect(() => {
    axios.get("http://localhost:3005/movies-manager").then((res) => {
      console.log(res.data);
      setMovies(res.data);
    });
  }, [lastUpdate]);

  //Create
  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3005/movies-manager", createData)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  return (
    <>
      <div className="column-list">
        <div>
          <Create setCreateData={setCreateData}></Create>
        </div>
        <ul>
          {movies.map((movie) => (
            <OneMovie key={movie.id} movie={movie}></OneMovie>
          ))}
        </ul>
      </div>
    </>
  );
}
