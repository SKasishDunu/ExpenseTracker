import React from 'react'
import { toast } from 'react-toastify';
// RRD Imports
import { useLoaderData } from 'react-router-dom';

// Helper
import { createExpense, deleteItem, getAllMatchingItems } from '../helper';

// Components
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import AddExpenseForm from '../components/AddExpenseForm';


// Loader
export async function budgetLoader({params}){
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });

    if (!budget) {
        throw new Error("The Budget Doesn't Exist!!");
    }

    return { budget, expenses };
}

// action
export async function budgetAction ({ request }){

    const data = await request.formData();
    const { _action, ...values} = Object.fromEntries(data);

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
}

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();
  return (
    <div 
        className="grid-lg"
        style={{
            "--accent": budget.color,
        }}
    >
        <h1 className="h2">
            <span className="accent">{budget.name}</span> Overview
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete={true} />
            <AddExpenseForm budgets={[budget]} />
        </div>
        {expenses && expenses.length > 0 && (
            <div className="grid-md">
                <h2>
                    <span className="accent">{budget.name}</span> Expenses
                </h2>
                <Table expenses={expenses} showBudget={false} />
            </div>
        )}
    </div>
  )
}

export default BudgetPage;
