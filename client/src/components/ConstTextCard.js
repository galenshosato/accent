import React, {useState} from "react";
import { Button, Card, Container } from 'react-bootstrap';
import LangChoiceModal from "./LangChoiceModal.js";

function ConstTextCard({title, content, user}) {
  const [expanded, setExpanded] = useState(false);
  const [showLangChoice, setShowLangChoice] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded);
  };


  return (
    <>
    <Card onClick={handleClick}>
      <Card.Body>
        <Card.Title className={expanded ? 'text-center mb-3' : 'text-center'}>{title}</Card.Title>
        {expanded && (
          <>
          <Card.Text className="text-center">
            {content.split("\n").map((text, index) => (
              <span key={index}>
                {text}
                <br />
              </span>
            ))}
          </Card.Text> 
          <Container className='d-flex justify-content-center mb-2 gap-2'>
            <Button onClick={() => setShowLangChoice(true)}>New Accent!</Button>
          </Container>
        </> 
        )}
      </Card.Body>
    </Card>
    <LangChoiceModal showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice} title={title} content={content} user={user}/>
    </>
  );
}
export default ConstTextCard