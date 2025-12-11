export function setUser(user) {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

export function getUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

export function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers") || "{}");
}

export function setRegisteredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

export function getSavedArticles() {
  return JSON.parse(localStorage.getItem("savedArticles") || "[]");
}

export function saveArticleList(articles) {
  localStorage.setItem("savedArticles", JSON.stringify(articles));
}
