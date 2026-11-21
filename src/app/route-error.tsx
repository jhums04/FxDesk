import { Link, useRouteError } from "react-router-dom";

export function RouteError() {
  const error = useRouteError();

  console.error(error);

  return (
    <div>
      <h1>Something went wrong</h1>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
