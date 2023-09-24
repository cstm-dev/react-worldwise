import { AuthContext } from "contexts/_components.jsx";
import { useContext } from "react";

function useAuth() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined)
    throw new Error("Auth context outside of its provider");

  return authContext;
}

export default useAuth;
