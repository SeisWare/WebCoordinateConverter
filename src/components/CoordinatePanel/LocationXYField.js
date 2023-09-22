import React, { useState } from "react";
import { SplitButton, Form, InputGroup, Dropdown } from "react-bootstrap";

const LocationXYField = (props) => {

    return (
        <Form.Group>
            <Form.Label>X/Y</Form.Label>
            <InputGroup>
                <Form.Control/>
                <Form.Control/>
            </InputGroup>
        </Form.Group>
    );
}

export default LocationXYField;
