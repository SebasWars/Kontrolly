import { RouterProvider } from "react-router-dom";
import { routes } from "./Front/Routes";
import { useAuthorization } from "./Front/Hooks/UseAuthorization";
import { LogIn } from "./Front/Pages/Login";

function App() {
  const { token } = useAuthorization();
  return <>{token ? <RouterProvider router={routes} /> : <LogIn />}</>;
}

export default App;
