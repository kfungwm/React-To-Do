'use client'

import React, { useState, useRef, useEffect } from 'react'
import { VscChecklist } from 'react-icons/vsc'

function AddButton() {
  ;<div className="py-6 ">
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
}

export default AddButton
