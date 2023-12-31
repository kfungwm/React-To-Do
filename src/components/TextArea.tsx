'use client'

import React, { useState, useRef, useEffect } from 'react'
import { VscChecklist } from 'react-icons/vsc'
import { VscTrash } from 'react-icons/vsc'
import {
  LuEdit,
  LuCheckSquare,
  LuLoader2,
  LuCheckCircle2,
} from 'react-icons/lu'

const TextArea = () => {
  const [comment, setComment] = useState<string>('')
  const [items, setItems] = useState<{ text: string; completed: boolean }[]>([])
  const [editingIndex, setEditingIndex] = useState(-1)
  const [completedItems, setCompletedItems] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const editTextRef = useRef<HTMLInputElement | null>(null)

  function addComment(e: React.ChangeEvent<HTMLInputElement>) {
    let addValue = e.target.value
    setComment(addValue)
  }

  function handleClick(e: string) {
    if (e.length !== 0) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems, { text: e, completed: false }]
        setTotalItems(updatedItems.length)
        return updatedItems
      })
      setComment('')
    }
  }

  function toggleCompleted(index: number) {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      const prevCompletionStatus = updatedItems[index].completed
      updatedItems[index].completed = !prevCompletionStatus

      setCompletedItems((prevCompletedItems) =>
        prevCompletionStatus ? prevCompletedItems - 1 : prevCompletedItems + 1
      )

      return updatedItems
    })
  }
  function removeItem(e: number) {
    setItems((prevItems) => {
      const removedItem = prevItems[e]
      const updatedItems = prevItems.filter((item, index) => index !== e)
      setTotalItems((prevTotalItems) => prevTotalItems - 1)
      if (removedItem.completed) {
        setCompletedItems((prevCompletedItems) => prevCompletedItems - 1)
      }

      return updatedItems
    })
  }

  function startEditing(index: number) {
    setEditingIndex(index)
    if (editTextRef.current) {
      editTextRef.current.focus()
    }
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const updatedItems = [...items]
    updatedItems[index].text = e.target.value
    setItems(updatedItems)
  }

  function finishEditing(index: number) {
    setEditingIndex(-1)
  }

  // useEffect(() => {
  //   const storedItems = JSON.parse(localStorage.getItem('items'))
  //   if (storedItems) {
  //     setItems(storedItems)
  //   }
  // }, [])
  useEffect(() => {
    const storedItemsString = localStorage.getItem('items')
    if (storedItemsString) {
      const storedItems = JSON.parse(storedItemsString)
      setItems(storedItems)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  })

  // useEffect(() => {
  //   const storedCompletedItems =
  //     parseInt(localStorage.getItem('completedItems')) || 0
  //   const storedTotalItems = parseInt(localStorage.getItem('totalItems')) || 0

  //   setCompletedItems(storedCompletedItems)
  //   setTotalItems(storedTotalItems)
  // }, [])
  useEffect(() => {
    const storedCompletedItemsString = localStorage.getItem('completedItems')
    const storedTotalItemsString = localStorage.getItem('totalItems')

    if (storedCompletedItemsString && storedTotalItemsString) {
      const storedCompletedItems = parseInt(storedCompletedItemsString, 10) || 0
      const storedTotalItems = parseInt(storedTotalItemsString, 10) || 0

      setCompletedItems(storedCompletedItems)
      setTotalItems(storedTotalItems)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('completedItems', completedItems.toString())
  }, [completedItems])

  useEffect(() => {
    localStorage.setItem('totalItems', totalItems.toString())
  }, [totalItems])

  return (
    <div className="relative w-full md:w-[500px] mx-auto ">
      <div className="border-2 border-sky-500 rounded-xl md:min-h-[600px] shadow-xl p-8 bg-white">
        <div className="text-center text-xl ">Todo List</div>
        <div className="py-6 ">
          <div className="align-center bg-[#f3f3f3] rounded-3xl flex justify-between ">
            <div className="pl-5 py-[15px]">
              {' '}
              <VscChecklist size="20px" />
            </div>
            <input
              onChange={addComment}
              value={comment}
              type="text"
              className="border border-[#f3f3f3] bg-[#f3f3f3] outline-none p-3 w-full rounded-3xl"
              placeholder="Add your todo"
            ></input>{' '}
            <button
              type="submit"
              onClick={() => {
                handleClick(comment)
                setComment('')
              }}
              className="bg-[#ff5945] rounded-3xl cursor px-[40px] w-full md:w-auto p-3 mt-3 md:mt-0 text-white hidden md:block"
            >
              Add
            </button>
          </div>
          <button
            type="submit"
            onClick={() => {
              handleClick(comment)
              setComment('')
            }}
            className="bg-[#ff5945] rounded-3xl cursor w-full p-3 text-white mt-3 block md:hidden"
          >
            Add
          </button>
        </div>
        <div className="sm:flex justify-center gap-5 mb-3">
          <div className="flex items-center  gap-1">
            <LuLoader2 size="15px" className="mb-[1px]" />
            <span>Pending: {totalItems - completedItems}</span>
          </div>
          <div className="flex items-center  gap-1">
            <LuCheckCircle2 size="15px" className="mb-[1px]" />
            <span>Completed: {completedItems}</span>
          </div>{' '}
        </div>
        <hr className="h-px mb-8 rounded-3xl bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {items.map((item, index) => (
          <div key={index} id={index.toString()}>
            <div className="justify-between flex align-center gap-5 my-5">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(index)}
              />

              {editingIndex === index ? (
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleEditChange(e, index)}
                  onBlur={() => finishEditing(index)}
                  className="w-full border border-green-500 rounded-lg pl-3"
                />
              ) : (
                <div
                  className={`w-full ${item.completed ? 'line-through' : ''}`}
                >
                  {item.text}
                </div>
              )}
              <div className="flex gap-2 items-center">
                {editingIndex !== index ? (
                  <button onClick={() => startEditing(index)}>
                    {' '}
                    <LuEdit size="17px" className="mb-[1px]" />
                  </button>
                ) : (
                  <button onClick={() => finishEditing(index)}>
                    <LuCheckSquare size="18px" />
                  </button>
                )}
                <button
                  className=""
                  onClick={() => {
                    removeItem(index)
                  }}
                >
                  {' '}
                  <VscTrash size="20px" />
                </button>
              </div>
            </div>
            <hr className="mx-auto h-px rounded-3xl bg-gray-200 border-0 dark:bg-gray-200"></hr>
          </div>
        ))}
        <div>
          <h1 className="pb-2 pt-4">
            {' '}
            <span>Total: {totalItems}</span>
          </h1>
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default TextArea
