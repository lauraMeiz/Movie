export default function OneMovie({ movie, setDeleteId, setModalData }) {
  return (
    <>
      <li className="column">
        <div>{movie.title}</div>
        <div>{movie.date}</div>
        <div>{movie.description}</div>
      </li>
    </>
  );
}
