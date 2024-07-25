import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import UserProfile from "./pages/UserProfile";
import PokemonDetail from "./pages/PokemonDetail";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/:username" element={<UserProfile />} />
            <Route
              path="/auth/:username/:pokemonName"
              element={<PokemonDetail />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
