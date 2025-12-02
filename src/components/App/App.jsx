import './App.css';
import { useState, useEffect } from "react";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";

import About from "../About/about.jsx";
import Main from "../Main/main.jsx";
import Footer from "../Footer/footer.jsx";
import Header from "../Header/header.jsx";
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    saveArticleList(savedArticles);
  }, [savedArticles]);

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
  setUser(null)

  setArticles([]);
  setHasSearched(false);
  setSearchQuery("");
}

function handleSaveArticle(article, isSaved) {
   
   if (!currentUser) {
    setIsLoginOpen(true);
    return;
  }

   if (isSaved) {

    const articleWithKeyword = {
      ...article,
      keyword: searchQuery || "misc",
    };

    const updated = [...savedArticles, articleWithKeyword];
    setSavedArticles(updated);
    saveArticleList(updated);
    console.log("Updated saved articles:", updated);
  } else {
    const updated = savedArticles.filter(a => a.title !== article.title);
    setSavedArticles(updated);
    saveArticleList(updated);
  }
};

async function handleSearch(query) {
  setIsLoading(true);
  setHasSearched(true);
  setSearchQuery(query);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    const fetchedArticles = await searchNews(query);
    setArticles(fetchedArticles);
  } catch (error) {
    console.error("Search failed:", error);
    setArticles([]);
  } finally {
    setIsLoading(false);
  }
}

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
            <Main 
            onSearch={handleSearch}
            isLoggedIn={!!currentUser}
            />
            {hasSearched && (
                <section className="search-results">
                  {isLoading ? (
                    <div className="search-results__loading">
                      <Preloader />
                      <p className="search-results__text">
                        Searching for news...
                      </p>
                    </div>
                  ) : (
                    <NewsCardList
                      articles={articles}
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