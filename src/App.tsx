import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore.store";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
