import React, {useContext} from "react";
import {v4 as uuidv4} from "uuid";
import useLocalStorage from "../custom hooks/useLocalStorage";

const CategoryContext = React.createContext();
export const defaultExpenseCategory = "None";

export function useCategories() {
    return useContext(CategoryContext)
}

export const CategoriesProvider = ({children}) => {
    const [category, setCategory] = useLocalStorage("categories", []);
    const [transactions, setTransaction] = useLocalStorage("transactions", []);
    const [transactionHistory, setTransactionHistory] = useLocalStorage("transactionHistory", [])

    function getCategoryTransactions(categoryId) {
        return transactions.filter(transaction => transaction.categoryId === categoryId)
    }

    //create new expenses record
    function addTransaction({transactionType, description, amount, categoryId, date}) {
        let theId = uuidv4();
        if (transactionType === "1") {
            setTransaction(prevTransactions => {
                return [...prevTransactions, {id: theId, transactionType, description, amount, categoryId, date}]
            })
            setTransactionHistory(prevTransactions => {
                return [...prevTransactions, {id: theId, transactionType, description, amount, categoryId, date}];
            })
        } else if (transactionType === "2") {
            setCategory(foundCategory => {
                //Loop through category ids
                foundCategory.forEach(category => {
                    if (category.id === categoryId) {
                        category.max = category.max + amount;
                    }
                })
                localStorage.setItem("categories", JSON.stringify(foundCategory))
                return foundCategory;
            })
            setTransactionHistory(prevTransactions => {
                return [...prevTransactions, {id: uuidv4(), transactionType, description, amount, categoryId, date}];
            })
        } else if (transactionType === "3") {
            setCategory(foundCategory => {
                //Loop through category ids
                foundCategory.forEach(category => {
                    if (category.id === categoryId) {
                        category.max = category.max - amount;
                    }
                })
                localStorage.setItem("categories", JSON.stringify(foundCategory))
                return foundCategory;
            })
            setTransactionHistory(prevTransactions => {
                return [...prevTransactions, {id: uuidv4(), transactionType, description, amount, categoryId, date}]
            })
        }
    }

    // function deleteOtherTransactions({transactionType, description, amount, categoryId, date}) {
    //
    // }

    //creates new financial category
    function addCategory({name, max}) {
        setCategory(prevCategory => {
            if (prevCategory.find(category => category.name === name)) {
                return prevCategory
            }
            return [...prevCategory, {id: uuidv4(), name, max}]
        })
    }

    function deleteCategory({id, transactionType}) {
        setCategory(prevCategories => {
            return prevCategories.filter(category => category.id !== id)
        })

    }

    function deleteTransaction(id) {
        setTransaction(prevTransactions => {
            return prevTransactions.filter(transaction => transaction.id !== id)
        })
        setTransactionHistory(prevTransactions => {
            return prevTransactions.filter(transaction => transaction.id !== id)
        })
    }

    return <CategoryContext.Provider value={{
        category,
        transactions,
        transactionHistory,
        getCategoryTransactions,
        addTransaction,
        addCategory,
        deleteCategory,
        deleteTransaction
    }}>
        {children}
    </CategoryContext.Provider>
}