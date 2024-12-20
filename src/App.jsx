// RRD Imports
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

// Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Error from "./pages/error";
import ExpensesPage, { expenseAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import DashBoard, { dashboardAction, dashboardLoader } from "./pages/DashBoard";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";


// Brower Router
const router = createHashRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expenseAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
      
    ]
  },
  
]);

// Main
function App() {
  
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />

    </div>
  )
}

export default App
