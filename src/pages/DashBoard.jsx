// rrd imports
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// library imports
import { toast } from 'react-toastify';

// helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from '../helper';

// Components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
};

// action
export async function dashboardAction({ request }) {

  await waait();

  const data = await request.formData();
  const { _action, ...values} = Object.fromEntries(data);
  
  // new user submission
  if ( _action === "newUser" ) {
    try {
    
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome, ${values.userName}`)
      
    } catch(e){
        throw new Error("There was a Problem Creating your Account.")
    }
  }

  // create budget
  if ( _action === "createBudget" ) {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      })
      return toast.success("Budget Created!!")
      
    } catch(e){
        throw new Error("There was a Problem Creating your budget!!")
    }
  }

  // create expense
  if ( _action === "createExpense" ) {
    try {
      createExpense ({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} Created!!`)
      
    } catch(e){
        throw new Error("There was a Problem Creating the Expenses!!")
    }
  }

  // delete expense
  if ( _action === "deleteExpense" ) {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense Deleted!!");
      
    } catch(e){
        throw new Error("There was a Problem Deleting the Expenses!!");
    }
  }
  
}


const DashBoard = () => {
    const { userName, budgets, expenses } = useLoaderData()


  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h2>Welcome Back, <span className="accent">{userName}</span></h2>
          <div className="grid-sm">
            {
              budgets && budgets.length > 0
              ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets} />
                  </div>
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {
                      budgets.map((budget) => (
                        <BudgetItem key={budget.id} budget={budget} />
                      ))
                    }
                  </div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Recent Expenses</h2>
                        <Table 
                          expenses={expenses
                          .sort((a,b) => b.createAt - a.createAt)
                          .slice(0, 5)
                          }
                        />
                        {
                          expenses.length > 3 && (
                            <Link
                              to="expenses"
                              className="btn btn--dark"
                            >
                              View all expenses
                            </Link>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Do not tell your money where to go; instead, tell it where to grow. </p>
                  <p>Budgeting isn't about restriction, it's about opportunity.</p>
                  <AddBudgetForm />
                </div>
              )
            }
          </div>
        </div>
      ) : <Intro />}
    </>
  )
}

export default DashBoard;
