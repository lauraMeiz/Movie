import { useEffect, useRef, useState } from "react";
import check from "../check";
import getBase64 from "../Function/getBase64";
import none from "../img/none.png";
function Edit({ setModalData, modalData, setEditData }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("0");
  const [remove, setRemove] = useState(false);

  const isValid = check(date);
  const fileInput = useRef();

  const buttonHandler = () => {
    const file = fileInput.current.files[0];
    if (isValid && title && description && file) {
      getBase64(file).then((photo) => {
        setEditData({
          title,
          date,
          description,
          photo,
          del: remove ? 1 : 0,
          id,
        });
        setModalData(null);
        setRemove(false);
      });
    } else if (isValid && title && description && !file) {
      alert(
        `Check:
         ${title ? title.toUpperCase() : "Title - Please enter title"}

         ${date ? date : "Date - Please enter date"}

        ${description ? description : "Description - Please enter description"}`
      );
      setEditData({
        title,
        date,
        description,
        photo: "",
        id,
        del: remove ? 1 : 0,
      });
      setModalData(null);
      setRemove(false);
    }
  };

  const inputHandler = (e, which) => {
    switch (which) {
      case "title":
        setTitle(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      default:
    }
  };

  useEffect(() => {
    if (modalData === null) {
      setTitle("");
      setDate("");
      setDescription("");
    } else {
      setTitle(modalData.title);
      setDate(modalData.date);
      setDescription(modalData.description);
      setId(modalData.id);
    }
  }, [modalData]);

  if (modalData === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="edit">
        <div className="create-title">
          <h3>Edit New Movie</h3>
        </div>
        <div className="create-tab">
          <div className="form-group">
            <label>Movie title</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => inputHandler(e, "title")}
              value={title}
            />
            <small>Edit movie name here</small>

            <label>Movie date</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => inputHandler(e, "date")}
              value={date}
            />

            {date.length < 1 ? (
              <small>Movie date.</small>
            ) : (
              <small>
                {!isValid
                  ? "Please, enter just real years (4 digit)"
                  : "Movie date "}
              </small>
            )}
          </div>{" "}
          <div>
            <div className="form-group">
              <label>Photo</label>
              <input ref={fileInput} type="file" className="form-control" />
              <small> Photo.</small>
            </div>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              onChange={() => setRemove((r) => !r)}
              checked={remove}
            />
            <label>Delete Photo</label>
          </div>
          <div className="col-10">
            {modalData.photo ? (
              <img className="photo" src={modalData.photo}></img>
            ) : null}
          </div>
          <div>
            <div className="form-group">
              <label>Movie description</label>
              <textarea
                className="textarea"
                rows="3"
                cols="30"
                onChange={(e) => inputHandler(e, "description")}
                value={description}
              ></textarea>
              <small>Movie description.</small>
            </div>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn-modal "
              onClick={buttonHandler}
            >
              Save
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={() => setModalData(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
