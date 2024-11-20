// library
import { toast } from "react-toastify";

// rrd imports
import { redirect } from "react-router-dom";

// Helper
import { deleteItem, getAllMatchingItems } from "../helper";


export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        });

        associatedExpenses.forEach((expenses) => {
            deleteItem ({
                key: "expenses",
                id: expenses.id,
            })
            
        });
        toast.success("Budget Deleted!!")

    } catch (e) {
        throw new Error("There was a Problem Deleteing the Budget!!")
    }

    return redirect("/");
}