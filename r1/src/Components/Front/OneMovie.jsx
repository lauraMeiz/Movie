import { useState } from "react";
import none from "../../img/none.png";
export default function OneMovie({ movie }) {
  const [show, setShow] = useState(false);

  const showDescription = () => {
    setShow(true);
  };
  const cancel = () => {
    setShow(false);
  };
  return (
    <>
      {show ? (
        <li className="column">
          <div className="modal-photo">
            <div className="title">
              <span>{movie.title}</span> ({movie.date})
            </div>

            <div className="photo-row" onClick={showDescription}>
              <img
                className="photo"
                src={movie.photo ? movie.photo : none}
                alt={movie}
              ></img>
            </div>
            <div className="description">
              <p>{movie.description}</p>
            </div>
            <div className="buttons">
              <button className="btn-modal" onClick={cancel}>
                Close
              </button>
            </div>
          </div>
        </li>
      ) : (
        <li className="column" onClick={showDescription}>
          <div className="title">
            <span>{movie.title}</span> ({movie.date})
          </div>
          <small onClick={showDescription}>Show more</small>
          <div className="photo-row">
            <img
              className="photo"
              src={movie.photo ? movie.photo : none}
              alt={movie}
            ></img>
          </div>
        </li>
      )}
    </>
  );
}
