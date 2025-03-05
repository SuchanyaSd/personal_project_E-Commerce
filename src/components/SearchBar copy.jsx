import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
import { CrossIcon, SearchIcon } from '../icon/icon'
import { useLocation } from 'react-router'

const SearchBar = () => {
   // const { showSearch, search, setSearch, setShowSearch } = useContext(ShopContext)
   const [visible, setVisible] = useState(false)
   const location = useLocation()
   const [search, setSearch] = useState("")
   const [showSearch, setShowSearch] = useState(false)

   useEffect(() => {
      if (location.pathname.includes("collection")) {
         setVisible(true)
      } else {
         setVisible(false)
      }
   }, [location])

   return showSearch && visible ? (
      <div className='border-t border-b bg-gray-50 text-center'>
         <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <SearchIcon className="w-5" />
         </div>
         <CrossIcon onClick={() => setShowSearch(false)} className="inline w-6 cursor-pointer" />
      </div>
   ) : null
}

export default SearchBar
