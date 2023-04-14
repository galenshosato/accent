import NavBar from './components/NavBar';
import './App.css';
import React from 'react';
import InputPage from './components/InputPage'
import { useState, useEffect } from 'react';
import ConstTextCard from './components/ConstTextCard';
import UserTextList from './components/UserTextList';


function App() {
  const [user, setUser] = useState({})
  const [userTexts, setUserTexts] = useState([])
  const [constText, setConstText] = useState([])


  useEffect(() => {
    fetch("/api/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);


  useEffect(()=> {
    fetch('/api/example_texts')
    .then(resp => resp.json())
    .then(data => setConstText(data))
  }, [])

  useEffect(() => {
    fetch(`/api/gmoney/texts`)
    .then(resp => resp.json())
    .then(data => setUserTexts(data))
  }, [])



  return (
    <div>
      <NavBar user={user} setUser={setUser}/>
      {constText.map((text) => {
        return <ConstTextCard key={text.id} title={text.title} content={text.text} user={user} />
      })}
      {/* <UserTextList user={user} userTexts={userTexts} /> */}
      <InputPage />
    </div>
  );
}

export default App;
