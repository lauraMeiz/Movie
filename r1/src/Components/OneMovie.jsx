import { useState } from "react";
import none from "../img/none.png";

export default function OneMovie({ movie, setDeleteId, setModalData }) {
  return (
    <>
      <li className="column-back">
        <div>{movie.title}</div>
        <div>{movie.date}</div>
        <div className="photo-row">
          <img
            className="photo"
            src={movie.photo ? movie.photo : none}
            alt={movie}
          ></img>
        </div>

        <div className="description-back">
          <h5>About movie</h5>
          <p>{movie.description}</p>
          <div className="buttons">
            {" "}
            <button
              type="button"
              className="btn-modal "
              onClick={() => setModalData(movie)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={() => setDeleteId({ id: movie.id })}
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
