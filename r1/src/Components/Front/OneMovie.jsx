export default function OneMovie({ movie }) {
  return (
    <>
      <li className="column">
        <div>
          <span>{movie.title}</span> ({movie.date})
        </div>
        <div className="description">
          <p>{movie.description}</p>
        </div>
      </li>
    </>
  );
}
