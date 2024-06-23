import { useState } from 'react';

function Button({feedback, setFeedback, text}) {
  return (
    <button onClick ={() => setFeedback(feedback + 1)}>{text}</button>
  );
}

function StatisticLine({text, value, suffix}) {
  return (
    <tr>
      <td>{text}</td><td>{value}{suffix}</td>
    </tr>
  );
}

function Statistics({good, bad, neutral}) {
  if (good+bad+neutral != 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good+bad+neutral} />
            <StatisticLine text="average" value={(good-bad) / (good+bad+neutral)} />
            <StatisticLine text="positive" value={good / (good+bad+neutral) * 100} suffix=" %"/>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>
          No feedback given
        </p>
      </div>
    );
  }
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button feedback={good} setFeedback={setGood} text="good"/>
        <Button feedback={neutral} setFeedback={setNeutral} text="neutral"/>
        <Button feedback={bad} setFeedback={setBad} text="bad"/>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  );
}

export default App;