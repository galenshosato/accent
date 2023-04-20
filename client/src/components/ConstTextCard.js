import React, {useState} from "react";
import { Button, Card, Container } from 'react-bootstrap';
import ConstChoiceModal from "./ConstChoiceModal.js";

function ConstTextCard({title, content, user}) {
  const [expanded, setExpanded] = useState(false)
  const [showConstChoice, setShowConstChoice] = useState(false)


  const handleClick = () => {
    setExpanded(!expanded);
  };

  const cardStyle = {
    width: expanded ? '80%' : 'calc((40% - 10px) / 2)',
    height: expanded ? '85%' : '100px',
    marginTop: '30px',
    marginBottom: '10px',
  }

  return (
    <>
    <Card onClick={handleClick} style={cardStyle} className="cards">
      <Card.Body>
        <Card.Title className={expanded ? 'text-center mb-3 title' : 'text-center title'}>{title}</Card.Title>
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
            <Button className="custom-btn" onClick={() => setShowConstChoice(true)}>New Accent!</Button>
          </Container>
        </> 
        )}
      </Card.Body>
    </Card>
    <ConstChoiceModal showConstChoice={showConstChoice} setShowConstChoice={setShowConstChoice} title={title} content={content} user={user}/>
    </>
  );
}
export default ConstTextCard