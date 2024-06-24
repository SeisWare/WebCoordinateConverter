import React, { useState } from "react";
import { SplitButton, Form, InputGroup, Dropdown } from "react-bootstrap";

const LocationXYField = (props) => {

    const handleLoseFocusX = (e) => {
        props.onValueChange([parseFloat(e.target.value), props.value[1]]);
    }

    const handleLoseFocusY = (e) => {
        props.onValueChange([props.value[0], parseFloat(e.target.value)]);
    }

    return (
        <Form.Group>
            <Form.Label>X/Y</Form.Label>
            <InputGroup>
                <Form.Control value={props.value[0]} onBlur={handleLoseFocusX} onChange={(e) => {
                            props.onValueChange([e.target.value, props.value[1]]);
                        }}/>
                <Form.Control value={props.value[1]} onBlur={handleLoseFocusY} onChange={(e) => {
                            props.onValueChange([props.value[0], e.target.value]);
                        }}/>
            </InputGroup>
        </Form.Group>
    );
}

export default LocationXYField;
