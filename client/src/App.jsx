import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/navBar";
import RightBar from "./components/rightBar";
import Single from "./pages/Single";
import Publish from "./pages/Publish";
import Simulate from "./pages/Simulate";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";
import Results from "./pages/results";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRouter = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <Outlet />
          <RightBar />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRouter>
          <Layout />
        </ProtectedRouter>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/single/:id",
          element: <Single />,
        },
        {
          path: "/publish",
          element: <Publish />,
        },
        {
          path: "/simulate",
          element: <Simulate />,
        },
        {
          path: "/results",
          element: <Results />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
