import React, { useState } from "react";
import { SplitButton, Form, InputGroup, Dropdown } from "react-bootstrap";

const LocationXYField = (props) => {

    return (
        <Form.Group>
            <Form.Label>X/Y</Form.Label>
            <InputGroup>
                <Form.Control value={props.value[0]} onChange={(e) => {
                            props.onValueChange([parseFloat(e.target.value), props.value[1]]);
                        }}/>
                <Form.Control value={props.value[1]} onChange={(e) => {
                            props.onValueChange([props.value[0], parseFloat(e.target.value)]);
                        }}/>
            </InputGroup>
        </Form.Group>
    );
}

export default LocationXYField;
