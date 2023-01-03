import { useState } from "react";

function Create({ setCreateData }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const buttonHandler = () => {
    setCreateData({
      title,
      date,
      description,
    });
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
        <h2>Add New Film</h2>
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
          <small className="form-text text-muted">
            Add new movie name here.
          </small>

          <label>Movie date</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => inputHandler(e, "date")}
            value={date}
          />
          <small className="">Movie date.</small>
        </div>
        <div className="">
          <div className="form-group">
            <label>Movie description</label>
            <textarea
              className="form-control"
              onChange={(e) => inputHandler(e, "description")}
              value={description}
            ></textarea>
            <small className="">Movie description</small>
          </div>
        </div>
        <div className="buttons">
          <button type="button" className="" onClick={buttonHandler}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default Create;