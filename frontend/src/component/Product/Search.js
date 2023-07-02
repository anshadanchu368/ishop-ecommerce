import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import './search.css'

const Search = () => {

    const Navigate =useNavigate();
    
    const [keyword,setKeyword]=useState("");
    
    const searchSUbmitHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            Navigate(`/products/${keyword}`)
        }else{
            Navigate('/products')
        }
    } 
  return (
    <>
      <form className='searchBox' onSubmit={searchSUbmitHandler}>
         <input type="text"   placeholder="Search a product..."
         onChange={(e)=>setKeyword(e.target.value)}/>
         <input type="submit"  />
      </form>
    </>
  )
}

export default Search
