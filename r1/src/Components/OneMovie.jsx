export default function OneMovie({ movie, setDeleteId, setModalData }) {
  return (
    <>
      <li className="column">
        <div>{movie.title}</div>
        <div>{movie.date}</div>
        <div>
          <p className="description">{movie.description}</p>
        </div>
        <button
          type="button"
          className="btn-modal "
          onClick={() => setModalData(movie)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-delete "
          onClick={() => setDeleteId({ id: movie.id })}
        >
          Delete
        </button>
      </li>
    </>
  );
}
