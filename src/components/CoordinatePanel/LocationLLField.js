import React, { useState, useEffect } from "react";
import { SplitButton, Form, InputGroup, Dropdown } from "react-bootstrap";
import CoordinateInput, { decimalToDMS } from 'react-coordinate-input';

const LocationLLField = (props) => {
    const [valueDD, setValueDD] = useState([0, 0]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [availableOptions] = useState(['DMS', 'DD']);

    useEffect(() => {
        props.onValueChange(valueDD)
    }, [valueDD]);

    const handleLoseFocusLat = (e) => {
        props.onValueChange([parseFloat(e.target.value), props.value[1]]);
    }

    const handleLoseFocusLong = (e) => {
        props.onValueChange([props.value[0], parseFloat(e.target.value)]);
    }
    
    return (
        <Form.Group>
            <Form.Label>Latitude/Longitude</Form.Label>
            <InputGroup>
                {selectedIndex == 0?
                    <CoordinateInput className={'form-control'}
                        value={
                            `${props.value[0]}, ${props.value[1]}`
                        }
                        onChange={(value, { unmaskedValue, dd, dms }) => {
                            setValueDD(dd);
                        }}
                    />
                :''}

                {selectedIndex == 1?
                    <Form.Control value={props.value[0]}
                        onChange={(e) => {
                            setValueDD([e.target.value, props.value[1]]);
                        }}
                        onBlur={handleLoseFocusLat}
                    />
                :''}
                
                {selectedIndex == 1?
                    <Form.Control value={props.value[1]}
                        onChange={(e) => {
                            setValueDD([props.value[0], e.target.value]);
                        }}
                        onBlur={handleLoseFocusLong}
                    />
                :''}

                <SplitButton
                    variant="outline-secondary"
                    title={availableOptions[selectedIndex]}
                    onSelect={(eventKey, event) => {
                        setSelectedIndex(eventKey);
                    }}
                >
                    {availableOptions.map(
                        (value, index) => 
                            <Dropdown.Item key={index} eventKey={index} active={index == selectedIndex}>{value}</Dropdown.Item>
                    )}
                </SplitButton>
            </InputGroup>
        </Form.Group>
    );
}

export default LocationLLField;
