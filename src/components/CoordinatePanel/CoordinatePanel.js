import React, { useState } from "react";
import { Button, CloseButton, Form, InputGroup, OverlayTrigger, Popover } from "react-bootstrap";
import './CoordinatePanel.css'

const CoordinatePanel = (props) => {
    const { title } = props;
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">
            Search Coordinate Systems
            <CloseButton onClick={() => setShow(false)}/>
          </Popover.Header>
          <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
          </Popover.Body>
        </Popover>
      );

      const handleChange = (e) =>{
        setSearchTerm(e.target.value);
      }

    return (
        <div className="boxBody">
            <div className="source">
                <div>{title}:</div>
                <InputGroup>
                    <OverlayTrigger placement="bottom" overlay={popover} show={show}>
                        <Form.Control placeholder="Enter New Item" onChange={handleChange} onFocus={() => setShow(true)}/>
                    </OverlayTrigger>
                    <Button class="icon"><i class="fa fa-search"></i></Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default CoordinatePanel;