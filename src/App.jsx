import PaginaPrincipala from "./pagina-principala/pagina-principala.jsx";
import Istoric from "./istoric/istoric";
import Quiz from "./quiz/quiz";
import ContactMe from "./contact-me/contact-me";
import Navbar from "./components/Navbar";

//import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      {/* Pagina principală */}
      <div id="acasa">
        <PaginaPrincipala />
      </div>

      {/* Istoric */}
      <div id="istoric">
        <Istoric />
      </div>

      {/* Quiz */}
      <div id="quiz">
        <Quiz />
      </div>

      {/* Contact */}
      <div id="contact">
        <ContactMe />
      </div>
    </>
  );
}

export default App;
