import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const query = `{
    productCollection{
      items {
        title
        description
        author
      }
    }
  }`;
  useEffect(() => {
    fetch("https://47a1k79tb0.execute-api.us-east-1.amazonaws.com/default/testing")
      .then(response => response.json())
      .then(json => console.log(json));

    fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CMS_SPACE_ID}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authenticate the request
        Authorization: `Bearer ${process.env.REACT_APP_CMS_TOKEN}`,
      },
      // send the GraphQL query
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        console.log(data);
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
