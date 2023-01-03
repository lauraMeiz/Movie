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
      <div>
        <div>
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalData(null)}
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
          </div>
          <div className="modal-body">
            <div className="card-body">
              <div className="form-group">
                <label>Movie title</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => inputHandler(e, "title")}
                  value={title}
                />
                <small>Add new movie name here.</small>
              </div>
              <div className="container">
                <div>
                  <div>
                    <div>
                      <label>Movie date</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => inputHandler(e, "date")}
                        value={date}
                      />
                      <small>Movie date.</small>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Movie description</label>
                      <textarea
                        className="form-control"
                        onChange={(e) => inputHandler(e, "description")}
                        value={description}
                      ></textarea>
                      <small>Movie description.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={buttonHandler}>
              Save
            </button>
            <button type="button" onClick={() => setModalData(null)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;