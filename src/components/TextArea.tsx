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
  const storedItems = JSON.parse(localStorage.getItem('items'))

  console.log(storedItems)
  const [comment, setComment] = useState('')
  const [items, setItems] = useState(storedItems)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [completedItems, setCompletedItems] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const editTextRef = useRef<HTMLInputElement | null>(null)

  function addComment(e) {
    let addValue = e.target.value
    setComment(addValue)
  }

  function handleClick(e) {
    setItems((prevItems) => {
      const updatedItems = [...prevItems, { text: e, completed: false }]
      setTotalItems(updatedItems.length)
      return updatedItems
    })
    setComment('')
  }

  function toggleCompleted(index) {
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
  function removeItem(e) {
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

  function startEditing(index) {
    setEditingIndex(index)
    if (editTextRef.current) {
      editTextRef.current.focus()
    }
  }

  function handleEditChange(e, index) {
    const updatedItems = [...items]
    updatedItems[index].text = e.target.value
    setItems(updatedItems)
  }

  function finishEditing(index) {
    setEditingIndex(-1)
  }
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
    console.log(items), items
  })

  return (
    <div className="relative w-full md:w-[500px] md:px-5 mx-auto">
      <div className="border-2 border-sky-500 rounded-xl md:min-h-[600px] shadow-xl p-8">
        <div className="text-center text-xl ">Todo List</div>
        <div className="py-10">
          <div className="align-center bg-[#f3f3f3] rounded-3xl flex justify-between ">
            <div className="pl-5 py-[15px]">
              {' '}
              <VscChecklist size="20px" />
            </div>
            <input
              onChange={addComment}
              value={comment}
              type="text"
              className="border border-[#f3f3f3] bg-[#f3f3f3] outline-none p-3 w-full"
              placeholder="Add your todo"
            ></input>{' '}
            <button
              type="submit"
              onClick={() => {
                handleClick(comment)
                setComment('')
              }}
              className="bg-[#ff5945] rounded-3xl cursor px-[40px] p-3 text-white"
            >
              Add
            </button>
          </div>
        </div>
        <div className="sm:flex justify-center gap-5 mb-3">
          <div className="flex items-center  gap-1">
            <LuLoader2 size="18px" className="mb-1" />
            <span>Pending: {totalItems - completedItems}</span>
          </div>
          <div className="flex items-center  gap-1">
            <LuCheckCircle2 size="15px" className="mb-1" />
            <span>Completed: {completedItems}</span>
          </div>{' '}
        </div>
        <hr className="h-px mb-8 rounded-3xl bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {items.map((item, index) => (
          <div key={index} id={index}>
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
                    <LuEdit size="18px" />
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
