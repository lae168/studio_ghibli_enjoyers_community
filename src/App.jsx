// React
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//css file
import "./App.css";

//components
import PostPage from "./components/PostPage";
import RootLayoutPage from "./components/RootLayputPage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import PostDetailPage from "./components/PostDetailPage";
import UserDetailPage from "./components/UserDetailPage";
import Register from "./components/Register";
import PostCreate from "./components/Create";

//context
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayoutPage />}>
        <Route index element={<Home />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        <Route path="/users/:userId" element={<UserDetailPage />} />
      </Route>
    )
  );
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
