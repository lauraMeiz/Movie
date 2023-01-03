export default function OneMovie({ movie, setDeleteId, setModalData }) {
  return (
    <>
      <li className="column">
        <div>
          <span>{movie.title}</span> ({movie.date})
        </div>

        <div>{movie.description}</div>
      </li>
    </>
  );
}
