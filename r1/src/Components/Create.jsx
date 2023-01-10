import { useRef, useState } from "react";
import check from "../check";
import getBase64 from "../Function/getBase64";

function Create({ setCreateData }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  let photo;

  const isValid = check(date);
  const fileInput = useRef();

  const buttonHandler = (event) => {
    const file = fileInput.current.files[0];

    event.preventDefault();

    if (isValid && title && description && file) {
      getBase64(file).then((photo) => {
        setCreateData({
          title,
          date,
          description,
          photo,
        });
      });
    } else {
      alert(
        `Something wrong !!!!!
         ${title ? title.toUpperCase() : "Title - Please enter title"}
         ${date ? date : "Date - Please enter date"} 
         ${photo ? photo : "Photo - Please enter photo"}
        ${description ? description : "Descritpion - Please enter description"}`
      );
    }
    setTitle("");
    setDate("");
    setDescription("");
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

  return (
    <div className="add">
      <div className="create-title">
        <h4>Add New Movie</h4>
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
          <small>Add new movie name here.</small>

          <label>Movie date</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => inputHandler(e, "date")}
            value={date.trim()}
          />
          {date.length < 1 ? (
            <small className="">Movie date.</small>
          ) : (
            <small className="">
              {!isValid
                ? "Please, enter just real years (4 digit)"
                : "Movie date "}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>Photo</label>
          <input ref={fileInput} type="file" className="form-control" />
          <small className="form-text text-muted">Movie photo.</small>
        </div>

        <div className="">
          <div className="form-group">
            <label>Movie description</label>
            <textarea
              className="textarea"
              rows="2"
              cols="30"
              onChange={(e) => inputHandler(e, "description")}
              value={description}
            ></textarea>
            <small className="">Movie description</small>
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="btn-modal" onClick={buttonHandler}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default Create;
