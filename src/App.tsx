import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore.store";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  );
}

export default App;
