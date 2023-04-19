import NavBar from './components/NavBar';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import UserTextList from './components/UserTextList';
import ConstTextList from './components/ConstTextList';

import {Route, Routes, useNavigate} from 'react-router-dom'

function App() {
  const [user, setUser] = useState({})
  const [userTexts, setUserTexts] = useState([])
  const [constText, setConstText] = useState([])
  const [showAddFile, setShowAddFile] = useState(false)
  const [showInput, setShowInput] = useState(false)
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
      <Routes>
        <Route element={<ConstTextList constText={constText} user={user} showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice} />} path='/examples' />
        <Route element={<UserTextList user={user} userTexts={userTexts} showAddFile={showAddFile} setShowAddFile={setShowAddFile} 
        showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice} showInput={showInput} setShowInput={setShowInput} />} path={`${user.username}`} />
      </Routes>
    </div>
  );
}

export default App;
