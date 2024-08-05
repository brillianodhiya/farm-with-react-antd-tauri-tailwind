import { Button } from "antd";
import { Link, useLoaderData } from "react-router-dom";
import { jotaiSessionStore } from "../../config/store/jotaiStore";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  const token = jotaiSessionStore.getItem("token", null);
  const isAuthenticated = jotaiSessionStore.getItem("isAuthenticated", null);

  if (isAuthenticated && token) {
    window.location.replace("/auth");
  } else {
    window.location.replace("/login");
  }

  return "this is redirect page";
}

export function Component() {
  let data = useLoaderData() as string;

  return (
    <div>
      <h2>Login Page</h2>
      <p>{data}</p>
      <Link to={"/login"}>
        <Button>Redirect To Login </Button>
      </Link>
    </div>
  );
}

Component.displayName = "LoginPage";
