import { useEffect, useState } from "react";
import axios from "axios";
import OneMovie from "./OneMovie";
import Create from "./Create";
import Edit from "./Edit";

export default function Back() {
  const [movies, setMovies] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);

  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalData, setModalData] = useState(null);

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

  //Edit
  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put("http://localhost:3005/movies-manager/" + editData.id, editData)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  //Delete
  useEffect(() => {
    if (null === deleteId) {
      return;
    }
    axios
      .delete("http://localhost:3005/movies-manager/" + deleteId.id)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [deleteId]);

  return (
    <>
      <div className="column-list">
        <div>
          <Create setCreateData={setCreateData}></Create>
        </div>
        <ul>
          {movies.map((movie) => (
            <OneMovie
              key={movie.id}
              movie={movie}
              setDeleteId={setDeleteId}
              setModalData={setModalData}
            ></OneMovie>
          ))}
        </ul>
      </div>
      <Edit
        setModalData={setModalData}
        modalData={modalData}
        setEditData={setEditData}
      ></Edit>
    </>
  );
}
