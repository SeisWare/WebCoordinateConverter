import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const LocationXYField = (props) => {

    const handleValueChangeX = (e) => {
        const value = parseFloat(e.target.value);
        if(props.value[0] === value) return;
        props.onValueChange([value, props.value[1]]);
    }

    const handleValueChangeY = (e) => {
        const value = parseFloat(e.target.value);
        if(props.value[1] === value) return;
        props.onValueChange([props.value[0], value]);
    }

    return (
        <Form.Group>
            <Form.Label>X/Y</Form.Label>
            <InputGroup>
                <Form.Control onBlur={handleValueChangeX} onChange={handleValueChangeX}/>
                <Form.Control onBlur={handleValueChangeY} onChange={handleValueChangeY}/>
            </InputGroup>
        </Form.Group>
    );
}

export default LocationXYField;
