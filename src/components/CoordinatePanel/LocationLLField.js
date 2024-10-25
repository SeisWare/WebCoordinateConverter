import React, { useState, useEffect } from "react";
import { SplitButton, Form, InputGroup, Dropdown } from "react-bootstrap";
import CoordinateInput, { decimalToDMS } from 'react-coordinate-input';

const LocationLLField = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [availableOptions] = useState(['DMS', 'DD']);

    const handleLoseFocusLat = (e) => {
        props.onValueChange([parseFloat(e.target.value), props.value[1]]);
    }

    const handleLoseFocusLong = (e) => {
        props.onValueChange([props.value[0], parseFloat(e.target.value)]);
    }
    
    const formatInput = (input) => {
        const long = decimalToDMS(input[0], true);
        const lat = decimalToDMS(input[1], false);

        const reducer = (accumulator, input, index) => {
            if(isNaN(input)) {
                return accumulator + input;
            }
            else {
                return accumulator + input.toLocaleString('en-US', {
                    minimumIntegerDigits: index === 4? 3 : 2
                })
            }
         };

        return lat.concat(long).reduce(reducer, "");
    }

    return (
        <Form.Group>
            <Form.Label>Latitude/Longitude</Form.Label>
            <InputGroup>
                {selectedIndex === 0?
                    <CoordinateInput className={'form-control'}
                        value={ formatInput(props.value) }
                        onChange={(value, { unmaskedValue, dd, dms }) => {
                            // props.onValueChange(dd);
                        }}
                    />
                :''}

                {selectedIndex === 1?
                    <Form.Control value={props.value[1]}
                        onChange={(e) => {
                            props.onValueChange([props.value[0], e.target.value]);
                        }}
                        onBlur={handleLoseFocusLong}
                    />
                :''}
                    
                {selectedIndex === 1?
                    <Form.Control value={props.value[0]}
                        onChange={(e) => {
                            props.onValueChange([e.target.value, props.value[1]]);
                        }}
                        onBlur={handleLoseFocusLat}
                    />
                :''}

                <SplitButton
                    variant="outline-secondary"
                    title={availableOptions[selectedIndex]}
                    onSelect={(eventKey, event) => {
                        setSelectedIndex(parseInt(eventKey));
                    }}
                >
                    {availableOptions.map(
                        (value, index) => 
                            <Dropdown.Item key={index} eventKey={index} active={index === selectedIndex}>{value}</Dropdown.Item>
                    )}
                </SplitButton>
            </InputGroup>
        </Form.Group>
    );
}

export default LocationLLField;
