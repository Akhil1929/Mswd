import React from 'react';

const Header = ({name}) => <h2>{name}</h2>;
const Content = ({parts}) => {

    const Total = parts.reduce((total, final) => total + final.exercises, 0);
    return (
        <div>
            {parts.map(part => <Part part={part} key={part.id} />)}
            <p>
                total of {Total} exercises
            </p>
        </div>
    );
};

const Part = ({part}) => <p>{part.name} {part.exercises}</p>;


const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    );
};

export default Course;



