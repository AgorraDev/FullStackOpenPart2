import { useState } from "react"

const Filter = ({setFilter}) => {


    const handleFilterChange = (e) => {
        setFilter(e.target.value)
      }

    return (
        <>
        <div>
          Type to filter names:
          <input onChange={handleFilterChange} />
        </div>
        </>
    )
}

export default Filter