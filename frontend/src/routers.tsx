import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from './telas/Login';
import Tasks from './telas/Tasks';
import ProtectRoute from './provider/protectedRoute';

const Routes = () => {

  const authenticatedRoutes = [
    {
      path: '/',
      element: <ProtectRoute />,
      children: [
        {
          path: "/tarefas",
          element: <Tasks />
        }
      ]
    }
  ]

  const unAuthenticatedRoutes = [
    {
      path: '/login',
      element: <Login />
    },
  ]

  const router = createBrowserRouter([
    ...unAuthenticatedRoutes,
    ...authenticatedRoutes
  ])

  return <RouterProvider router={router} />

}

export default Routes;
