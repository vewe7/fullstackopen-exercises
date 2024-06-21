const Header = ({course}) => {
  return <h1>{course}</h1>;
};

const Part = ({title, exercises}) => {
  return (
    <p>{title} {exercises}</p>
  );
}

const Content = ({titles, exercises}) => {
  return (
    <div>
      <Part title={titles[0]} exercises={exercises[0]}/>
      <Part title={titles[1]} exercises={exercises[1]}/>
      <Part title={titles[2]} exercises={exercises[2]}/>
    </div>
  );
};

const Total = ({exercises}) => {
  let sum = 0;
  exercises.forEach(part => sum += part);
  return (
    <p>Number of exercises {sum}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';  
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content titles={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
