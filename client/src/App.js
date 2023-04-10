import NavBar from './components/NavBar';
import './App.css';
import React from 'react';
import FileInput from './components/InputPage';
import { useState, useEffect } from 'react';
import ConstTextCard from './components/ConstTextCard';

function App() {
  const [user, setUser] = useState()
  const [constText, setConstText] = useState()


  useEffect(() => {
    fetch("/api/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(()=> {
    fetch(`/api/example_texts`)
    .then(resp => resp.json())
    .then(data => setConstText(data))
  }, [])
  


  return (
    <div>
      <NavBar user={user} setUser={setUser}  />
      {constText.map((text) => {
        return <ConstTextCard key={text.id} title={text.title} content={text.text} />
      })}
      {/* <FileInput /> */}
    </div>
  );
}

export default App;
