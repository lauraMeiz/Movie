import { useEffect, useState } from "react";
function Edit({ setModalData, modalData, setEditData }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("0");

  const buttonHandler = () => {
    setEditData({
      title,
      date,
      description,
      id,
    });
    setModalData(null);
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
        {/* <button
        type="button"
        className="close"
        onClick={() => setModalData(null)}
      >
        close
      </button> */}

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
            <small>Movie date.</small>

            <label>Movie description</label>
            <textarea
              className="textarea"
              rows="4"
              cols="50"
              onChange={(e) => inputHandler(e, "description")}
              value={description}
            ></textarea>
            <small>Movie description.</small>
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
