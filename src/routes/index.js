import PrivateRoute from "../components/PrivateRoute";
import LayoutDefault from "../layout/LayoutDefault";
import Answers from "../page/Answers";
import Home from "../page/Home";
import Login from "../page/Login";
import Logout from "../page/Logout";
import Register from "../page/Register";
import Topics from "../page/Topics";
import Quiz from "../page/Quiz";
import Result from "../page/Result";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [ 
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "topics",
            element: <Topics />
          },
          {
            path: "answers",
            element: <Answers />
          },
          {
            path: "result/:id",
            element: <Result />
          },
          {
            path: "quiz/:id",
            element: <Quiz />
          },
        ]
      }
    ],
  },
]