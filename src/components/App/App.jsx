import "./App.css";
import { useState, useEffect } from "react";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";

import About from "../About/About.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";

import Preloader from "../Preloader/Preloader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

import {
  getUser,
  setUser,
  getRegisteredUsers,
  setRegisteredUsers,
  getSavedArticles,
  saveArticleList,
} from "../../utils/storage.jsx";

import { searchNews } from "../../Api/newsApi.jsx";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [savedArticles, setSavedArticles] = useState(getSavedArticles());

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Load user if saved
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  // Sync saved list
  useEffect(() => {
    saveArticleList(savedArticles);
  }, [savedArticles]);

  // ------------------------------
  // Login / Register / Logout
  // ------------------------------

  function handleLogin(data) {
    const storedUsers = getRegisteredUsers();
    const userData = storedUsers[data.email];

    if (!userData) {
      alert("User not found. Please register first.");
      return;
    }

    const loggedInUser = {
      name: userData.name,
      email: userData.email,
    };

    setCurrentUser(loggedInUser);
    setUser(loggedInUser);
    setIsLoginOpen(false);
  }

  function handleRegister(data) {
    const storedUsers = getRegisteredUsers();

    if (storedUsers[data.email]) {
      alert("User already registered. Please login instead.");
      return;
    }

    storedUsers[data.email] = { name: data.name, email: data.email };
    setRegisteredUsers(storedUsers);

    const newUser = { name: data.name, email: data.email };
    setCurrentUser(newUser);
    setUser(newUser);

    setIsRegisterOpen(false);
    setIsSuccessOpen(true);
  }

  function handleLogout() {
    setCurrentUser(null);
    setUser(null);

    setArticles([]);
    setHasSearched(false);
    setSearchQuery("");
  }

  // ------------------------------
  // Save / Delete
  // ------------------------------

  function handleSaveArticle(article, shouldSave) {
    if (!currentUser) {
      setIsLoginOpen(true);
      return;
    }

    if (shouldSave) {
      const articleWithKeyword = {
        ...article,
        keyword: searchQuery || "misc",
      };
      const updated = [...savedArticles, articleWithKeyword];
      setSavedArticles(updated);
      saveArticleList(updated);
    } else {
      const updated = savedArticles.filter(a => a.title !== article.title);
      setSavedArticles(updated);
      saveArticleList(updated);
    }
  }

  // ------------------------------
  // Search Handler
  // ------------------------------

  async function handleSearch(query) {
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(query);
    setErrorMessage("");

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const news = await searchNews(query);

      if (!news || news.length === 0) {
        setArticles([]);
        return;
      }

      setArticles(news);
    } catch (error) {
      console.error("Search failed:", error);
      setErrorMessage(
        "Sorry, something went wrong during the request. Please try again later."
      );
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }

  // ------------------------------
  // Render
  // ------------------------------

  return (
    <BrowserRouter>
      <Header
        currentUser={currentUser}
        isLoggedIn={!!currentUser}
        onSignInClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsRegisterOpen(true)}
        onLogout={handleLogout}
        isAnyModalOpen={isLoginOpen || isRegisterOpen || isSuccessOpen}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main onSearch={handleSearch} isLoggedIn={!!currentUser} />

              {hasSearched && (
                <section className="search-results">
                  {isLoading ? (
                    <div className="search-results__loading">
                      <Preloader />
                      <p className="search-results__text">Searching for news...</p>
                    </div>
                  ) : (
                    <NewsCardList
                      articles={articles}
                      errorMessage={errorMessage}
                      onSaveArticle={handleSaveArticle}
                      isLoggedIn={!!currentUser}
                      isSavedNewsPage={false}
                      savedArticles={savedArticles}
                    />
                  )}
                </section>
              )}

              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/saved-news"
          element={
            <SavedNews
              currentUser={currentUser}
              savedArticles={savedArticles}
              onDeleteArticle={(article) => {
                const updated = savedArticles.filter(
                  (a) => a.title !== article.title
                );
                setSavedArticles(updated);
                saveArticleList(updated);
              }}
            />
          }
        />
      </Routes>

      {/* --- Modals --- */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        switchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegistrationSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        switchToLogin={() => {
          setIsSuccessOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegister}
        switchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </BrowserRouter>
  );
}

export default App;
