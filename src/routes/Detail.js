import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Link to="/">Go Home</Link>
          <h1>
            {movie.data.movie.title} - ({movie.data.movie.year})
          </h1>
          <h3>{movie.data.movie.rating}</h3>
          <img
            src={movie.data.movie.large_cover_image}
            alt={movie.data.movie.title}
          ></img>

          <ul>
            {movie.data.movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p>{movie.data.movie.description_full}</p>
        </div>
      )}
    </div>
  );
}
export default Detail;
