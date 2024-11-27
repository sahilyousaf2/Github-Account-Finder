'use client'
import React from 'react'
import { useState } from 'react'
import { EventType, DataType } from './types/allTypes';
import axios from 'axios';

function Home() {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState<DataType>({
    login: '',
    avatar_url: '',
    bio: '',
    followers: 0,
    following: 0,
  })
  const onChangeHandler = (e: EventType) => {
    setUserName(e.target.value);
  }
  const onClickHandler = async () => {
    // Implement your logic here to fetch data from Github API
    const response = await axios.get(`https://api.github.com/users/${userName}`)
    // Then update the state with the fetched data
    const finalData = response.data
    setData(finalData)
    console.log(finalData)
  }
  return (
    <div>
      <main className='card max-w-sm mx-auto mt-16 mb-5'>
        <h1 className='text-center text-3xl my-5'>Github Account Finder</h1>
        <label htmlFor="userName" className='text-xl '>Name:</label>
        <input type="text"
          name='userName'
          value={userName}
          id="userName"
          placeholder="Enter your username"
          className='h-10 mx-2 px-5 pr-16 rounded-lg w-[300px] text-base border border-gray-600 text-black'
          onChange={onChangeHandler} />
        <br />
        <div className='flex justify-center'>
          <button onClick={onClickHandler}
            className='flex justify-center items-center hover:bg-white hover:text-black duration-300 transition-all bg-gray-200 rounded-full px-4 py-2 text-base mt-5 font-semibold text-gray-700 mr-2 mb-2'>Search</button>
        </div>
      </main>

      {
        data.login &&
        <div className='card max-w-sm mx-auto hover:scale-105 duration-300 transition-all mb-10 rounded-lg bg-gray-300'>
          <img src={data.avatar_url} 
          alt={data.login} 
          width={384} 
          height={384} 
          className='rounded-lg'
          />
          <div className='pt-5'>
            <h2 className='text-xl px-2 text-black font-bold'>{data.login}</h2>
            <p className='mt-2 px-2  text-[15px] text-gray-800'>{data.bio}</p>
            <div className='flex justify-start items-center'>
              <p className='mt-2 px-2  text-[18px] text-gray-800'>Followers: <span className='text-[15px]'>{data.followers}</span></p>
              <p className='mt-2 px-2  text-[18px] text-gray-800'>Following: <span className='text-[15px]'>{data.following}</span></p>
            </div>
            <div className='mt-5'>
              <button className='inline-block bg-gray-700 rounded-full px-3 py-1 text-base font-semibold text-gray-100 mx-2 mb-5 hover:bg-gray-800 duration-300 transition-all'
                onClick={() => {
                  window.open(`https://github.com/${data.login}`, '_blank')
                }}
              > See More</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home