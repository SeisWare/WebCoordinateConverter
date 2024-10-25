import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const LocationXYField = (props) => {

    const handleLoseFocusX = (e) => {
        const value = parseFloat(e.target.value);
        if(props.value[0] === value) return;
        props.onValueChange([value, props.value[1]]);
    }

    const handleLoseFocusY = (e) => {
        const value = parseFloat(e.target.value);
        if(props.value[1] === value) return;
        props.onValueChange([props.value[0], value]);
    }

    return (
        <Form.Group>
            <Form.Label>X/Y</Form.Label>
            <InputGroup>
                <Form.Control value={isNaN(props.value[0]) ? '' : props.value[0]} onBlur={handleLoseFocusX} onChange={(e) => {
                            props.onValueChange([parseFloat(e.target.value), props.value[1]]);
                        }}/>
                <Form.Control value={isNaN(props.value[1]) ? '' : props.value[1]} onBlur={handleLoseFocusY} onChange={(e) => {
                            props.onValueChange([props.value[0], parseFloat(e.target.value)]);
                        }}/>
            </InputGroup>
        </Form.Group>
    );
}

export default LocationXYField;
