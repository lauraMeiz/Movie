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
      <li className="column">
        <div>
          <span>{movie.title}</span> ({movie.date})
        </div>
        <div className="photo-row" onClick={showDescription}>
          <img
            className="photo"
            src={movie.photo ? movie.photo : none}
            alt={movie}
          ></img>
        </div>
        {show && (
          <div className="modal-photo">
            <div>
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
            <button onClick={cancel}>close</button>
          </div>
        )}
      </li>
    </>
  );
}
