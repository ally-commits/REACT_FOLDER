import React from 'react';

function App(props) {
    const facts = props.facts.map((fact,i) => {
        return <li key={i}>{fact.text}</li>
    })
    return (
        <div>
            <h1>Hello world</h1>
            <ul>
                {facts}
            </ul>
        </div>
    )
}
export default App;