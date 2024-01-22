import React, { useCallback, useEffect, useState } from 'react';
import './BookFinder.css';

export default function BookFinder() {
    const [data,setData] = useState([]);
    const [query,setQuery] = useState('technology');

    const [examples,setExamples] = useState([]);

    const findBooks = useCallback(async () => {
        let dataRaw = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        let dataObj = await dataRaw.json();
        console.log(dataObj.items);
        setExamples(dataObj?.items);
    },[query])


    useEffect(() => {
        findBooks()
    },[]);

   async function filterData(text){
    if (text) {
        let dataRaw = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
        let dataObj = await dataRaw.json();
        console.log(dataObj.items);
        setData(dataObj?.items);
    }
    }


  return (
    <div>
        <h1>Book Finder</h1>

        <input onChange={(e) => filterData(e.target.value)} className='search-input' placeholder='Enter book name' />
    {
        data?.map((item,index) => (
            <div key={index}>
                <h1>{item?.volumeInfo?.title}</h1>
                <p>{item?.volumeInfo?.description}</p>
                <img src={item?.volumeInfo?.imageLinks?.thumbnail}  alt=''/>
                <br/>
                <small>{item?.volumeInfo?.pageCount} pages {item?.volumeInfo?.language}</small>
                <br/>
                <small>Authors: {item?.volumeInfo?.authors?.map((author) => (author))}</small>
                <br/>
                <a href={item?.volumeInfo?.infoLink}>Learn More</a>
                <hr/>
            </div>
        ))
    }
     {
        examples?.map((item,index) => (
            <div key={index}>
                <h1>{item?.volumeInfo?.title}</h1>
                <p>{item?.volumeInfo?.description}</p>
                <img src={item?.volumeInfo?.imageLinks?.thumbnail}  alt=''/>
                <br/>
                <small>{item?.volumeInfo?.pageCount} pages {item?.volumeInfo?.language}</small>
                <br/>
                <small>Authors: {item?.volumeInfo?.authors?.map((author) => (author))}</small>
                <br/>
                <a href={item?.volumeInfo?.infoLink}>Learn More</a>
                <hr/>
            </div>
        ))
    }
    </div>
  )
}
