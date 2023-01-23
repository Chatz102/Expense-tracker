import React, {useContext} from "react";
import {v4 as uuidv4} from "uuid";
import useLocalStorage from "../custom hooks/useLocalStorage";

const CategoryContext = React.createContext();
export const defaultTransactionCategory = "None";

export function useCategories() {
    return useContext(CategoryContext)
}

export const CategoriesProvider = ({children}) => {
    const [category, setCategory] = useLocalStorage("categories", []);
    const [transactions, setTransaction] = useLocalStorage("transactions", []);
    const [transactionHistory, setTransactionHistory] = useLocalStorage("transactionHistory", [])

    function getCategoryTransactions(categoryName) {
        return transactions.filter(transaction => transaction.categoryName === categoryName)
    }

    function getTransactionHistoryTransactions(transactionId) {
        return transactionHistory.filter(transaction => transaction.id === transactionId)
    }

    //create new expenses record
    function addTransaction({transactionType, description, amount, categoryName, date, time}) {
        let theId = uuidv4();
        if (transactionType === "1") {
            setTransaction(prevTransactions => {
                return [...prevTransactions, {
                    id: theId,
                    transactionType,
                    description,
                    amount,
                    categoryName,
                    date,
                    time
                }]
            })
            setTransactionHistory(prevTransactions => {
                return [...prevTransactions, {
                    id: theId,
                    transactionType,
                    description,
                    amount,
                    categoryName,
                    date,
                    time
                }];
            })
        } else if (transactionType === "2") {
            setCategory(foundCategory => {
                //Loop through category ids
                foundCategory.forEach(category => {
                    if (category.name === categoryName) {
                        category.max = category.max + amount;
                    }
                })
                localStorage.setItem("categories", JSON.stringify(foundCategory))
                return foundCategory;
            })
            setTransactionHistory(prevTransactions => {
                return [...prevTransactions, {
                    id: uuidv4(),
                    transactionType,
                    description,
                    amount,
                    categoryName,
                    date,
                    time
                }];
            })
        } else if (transactionType === "3") {
            setCategory(foundCategory => {
                //Loop through category ids
                foundCategory.forEach(category => {
                    if (category.name === categoryName) {
                        category.max = category.max - amount;
                    }
                })
                localStorage.setItem("categories", JSON.stringify(foundCategory))
                return foundCategory;
            })
            setTransactionHistory(prevTransactions => {
                return [...prevTransactions, {
                    id: uuidv4(),
                    transactionType,
                    description,
                    amount,
                    categoryName,
                    date,
                    time
                }]
            })
        }
    }

    //creates new financial category
    function addCategory({name, max}) {
        setCategory(prevCategory => {
            if (prevCategory.find(category => category.name === name)) {
                return prevCategory
            }
            return [...prevCategory, {id: uuidv4(), name, max}]
        })
    }

    function deleteCategory({id, name}) {
        console.log(name);
        setCategory(prevCategories => {
            return prevCategories.filter(category => category.id !== id)
        })
        setTransaction(prevTransactions => {
            return prevTransactions.filter(transaction => transaction.categoryName !== name)
        })
        setTransactionHistory(prevTransactions => {
            return prevTransactions.filter(transaction => transaction.categoryName !== name)
        })

    }

    function deleteTransaction(id, name) {
        setTransaction(prevTransactions => {
            return prevTransactions.filter(transaction => transaction.id !== id)
        })
        setTransactionHistory(prevTransactions => {
            return prevTransactions.filter(transaction => transaction.id !== id)
        })
        transactionHistory.forEach(transactions => {
            if (transactions.id === id) {
                deleteOtherTransactions(transactions.transactionType, transactions.amount, transactions.name)
            }
            return true
        })

    }

    function deleteOtherTransactions(transactionType, amount, categoryName) {
        if (transactionType === "2") {
            setCategory(foundCategory => {
                //Loop through category ids
                foundCategory.forEach(category => {
                    if (category.name === categoryName) {
                        category.max = category.max - amount;
                    }
                })
                localStorage.setItem("categories", JSON.stringify(foundCategory))
                return foundCategory;
            })
        } else if (transactionType === "3") {
            setCategory(foundCategory => {
                //Loop through category ids
                foundCategory.forEach(category => {
                    if (category.name === categoryName) {
                        category.max = category.max + amount;
                    }
                })
                localStorage.setItem("categories", JSON.stringify(foundCategory))
                return foundCategory;
            })
        }
    }

    return <CategoryContext.Provider value={{
        category,
        transactions,
        transactionHistory,
        getCategoryTransactions,
        getTransactionHistoryTransactions,
        addTransaction,
        addCategory,
        deleteCategory,
        deleteTransaction,
        deleteOtherTransactions
    }}>
        {children}
    </CategoryContext.Provider>
}