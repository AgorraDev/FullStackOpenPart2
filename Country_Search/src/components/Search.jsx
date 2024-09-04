import { useState } from "react";
import React from "react";

const Search = ({setSearch}) => {
//Text input that reads string of input value

    const handleSearch = (e) => {
        setSearch(e.target.value) 
    }
    return (
        <>
        <div>
            Search: <input onChange={handleSearch} />
        </div>
        </>
    )
}

export default Search