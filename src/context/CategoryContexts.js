import React, {useContext} from "react";
import {v4 as uuidv4} from "uuid";
import useLocalStorage from "../custom hooks/useLocalStorage";

const CategoryContext = React.createContext();

export function useCategories() {
    return useContext(CategoryContext)
}

export const CategoriesProvider = ({children}) => {
    const [category, setCategory] = useLocalStorage("categories", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function getCategoryExpenses(categoryId) {
        return expenses.filter(expense => expense.categoryId === categoryId)
    }

    //create new expenses record
    function addExpense({description, amount, categoryId}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidv4, description, amount, categoryId}]
        })
    }

    //creates new financial category
    function addCategory({name, max}) {
        setCategory(prevCategory => {
            if (prevCategory.find(category => category.name === name)) {
                return prevCategory
            }
            return [...prevCategory, {id: uuidv4, name, max}]
        })
    }

    function deleteCategory({id}) {
        setCategory(prevCategories => {
            return prevCategories.filter(category => category.id !== id)
        })
    }

    function deleteExpense(id) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return <CategoryContext.Provider value={{
        category,
        expenses,
        getCategoryExpenses,
        addExpense,
        addCategory,
        deleteCategory,
        deleteExpense
    }}>
        {children}
    </CategoryContext.Provider>
}