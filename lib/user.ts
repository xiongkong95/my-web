export type User = {
  name: string;
  email: string;
  password: string;
};

const STORAGE_KEY = "user";
const LOGGED_IN_KEY = "loggedIn";

export function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function loadUser(): User | null {
  const text = localStorage.getItem(STORAGE_KEY);
  if (text === null) return null;

  try {
    return JSON.parse(text) as User;
  } catch {
    return null;
  }
}

export function setLoggedIn() {
  localStorage.setItem(LOGGED_IN_KEY, "true");
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(LOGGED_IN_KEY) === "true";
}

export function logout() {
  localStorage.removeItem(LOGGED_IN_KEY);
}
