import { useRouteLoaderData } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  let { user } = useRouteLoaderData("root") as { user: string | null };

  console.log(user, "user");

  return <div>Home</div>;
};

export default Home;
