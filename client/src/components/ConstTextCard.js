import React, {useState} from "react";
import {Accordion, AccordionButton, Card} from 'react-bootstrap';

function ConstTextCard({title, content}) {
    const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card onClick={handleClick}>
      <Card.Body>
        <Card.Title className={expanded ? 'text-center mb-3' : 'text-center'}>{title}</Card.Title>
        {expanded && (
          <Card.Text className="text-center">
            {content.split("\n").map((text, index) => (
              <span key={index}>
                {text}
                <br />
              </span>
            ))}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
export default ConstTextCard