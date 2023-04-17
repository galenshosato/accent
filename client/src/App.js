import NavBar from './components/NavBar';
import './App.css';
import React from 'react';
import InputModal from './components/InputModal'
import { useState, useEffect } from 'react';
import ConstTextCard from './components/ConstTextCard';
import Header from './components/Header';
import UserTextList from './components/UserTextList';


function App() {
  const [user, setUser] = useState({})
  const [userTexts, setUserTexts] = useState([])
  const [constText, setConstText] = useState([])
  const [showAddFile, setShowAddFile] = useState(false)
  const [showLangChoice, setShowLangChoice] = useState(false)


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
      <Header />
      <br></br>
      <NavBar user={user} setUser={setUser}/>
      {constText.map((text) => {
        return <ConstTextCard key={text.id} title={text.title} content={text.text} user={user} />
      })}
      <UserTextList user={user} userTexts={userTexts} showAddFile={showAddFile} setShowAddFile={setShowAddFile} 
        showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice} />
      <InputModal />
    </div>
  );
}

export default App;
