
const Part = ({parts}) => {

    //reduce() runs a callback function on each element of the array, returning the
    //result for the next iteration to use. Accumulating the combined results into
    //a single value
    const sumTotal = parts.reduce((a, c) => 
            a + c.exercises, 
            0,
        );

    return (
        <>
        {parts.map(part =>
            <p key={part.id}>{part.name} {part.exercises}</p>
        )}
        <p style={{fontWeight:"bold"}}>Total of {sumTotal} exercises</p>
        </>
    )
}

const Course = ({course}) => {

    return (
        <>
            {course.map(part => 
            <div key={part.id}>
                <h2>{part.name}</h2>
                <Part parts={part.parts}/>
            </div>
        )} 
        </>
    )
    }

export default Course