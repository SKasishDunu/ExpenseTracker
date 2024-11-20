import React from 'react'
import { toast } from 'react-toastify';
// rrd imports
import { useLoaderData } from 'react-router-dom';

// helper
import { deleteItem, fetchData } from '../helper';

// components
import Table from '../components/Table';


// loader
export async function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses }
};

// action
export async function expenseAction ({request}){

    const data = await request.formData();
    const { _action, ...values} = Object.fromEntries(data)

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

const ExpensesPage = () => {
    const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
        <h2>All Expenses <small>( {expenses.length} total )</small></h2>
        {
            expenses && expenses.length > 0
            ? (
                <div className="grid-md">
                    
                    <Table expenses={expenses} />
                </div>
            )
            : <p>No Expenses Found!!</p>
        }
    </div>
  )
};

export default ExpensesPage;
