import { useState } from "react";
import check from "../check";

function Create({ setCreateData }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const isValid = check(date);

  const buttonHandler = (event) => {
    event.preventDefault();

    if (isValid && title && description) {
      setCreateData({
        title,
        date,
        description,
      });
      setTitle("");
      setDate("");

      setDescription("");
    } else {
      alert(
        `Something wrong !!!!!
         ${title ? title.toUpperCase() : "Title - Please enter title"}
         ${date ? date : "Date - Please enter date"} 
        ${description ? description : "Descritpion - Please enter description"}`
      );
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
        <div className="">
          <div className="form-group">
            <label>Movie description</label>
            <textarea
              className="textarea"
              rows="5"
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
