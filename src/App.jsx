import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout.jsx";
import Main from "./components/Main/Main.jsx";
import About from "./components/About/About.jsx";
import SavedNews from "./components/SavedNews/SavedNews.jsx";

import LoginModal from "./components/LoginModal/LoginModal.jsx";
import RegisterModal from "./components/RegisterModal/RegisterModal.jsx";

function App() {
  return (
    <>
      <LoginModal />
      <RegisterModal />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="saved-news" element={<SavedNews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
