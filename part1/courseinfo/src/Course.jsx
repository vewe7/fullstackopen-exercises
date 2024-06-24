const Header = ({course}) => {
    return <h1>{course.name}</h1>;
  };
  
  const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    );
  }
  
  const Content = ({course}) => {
    return (
      <div>
        { 
          course.parts.map(part => { 
            return (<Part key={part.id} name={part.name} exercises={part.exercises} />);
          })
        }
      </div>
    );
  };
  
  const Total = ({course}) => {
    const sum = course.parts.reduce((accum, current) => accum + current.exercises, 0);
    return (
      <p style={{fontWeight: 'bold'}}>total of {sum} exercises</p>
    );
  };
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    );
  }

  export default Course;