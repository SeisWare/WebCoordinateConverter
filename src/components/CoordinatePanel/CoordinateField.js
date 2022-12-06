import React, { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import SystemSearch from "../SystemSearch/SystemSearch";
import './CoordinateField.css'

const CoordinateField = (props) => {
    const { title, coordinateSystems } = props;
    
    const elRef = useRef();

    const [coordinateSystem, setCoordinateSystem] = useState(null);
    const [displaySystemSearch, setDisplaySystemSearch] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if(textValue.length === 0) {
            elRef.current.classList.remove('focused');
        }
        else {
            elRef.current.classList.add('focused');
        }
    }, [textValue]);

    const requestSearch = (e) => {
        elRef.current.classList.add('focused');
        setX(elRef.current.offsetLeft);
        setY(elRef.current.offsetTop + elRef.current.clientHeight);
        setWidth(elRef.current.clientWidth);
        setDisplaySystemSearch(true);
    };

    const clearCoordinateSystem = (e) => {
        setCoordinateSystem(null);
        setSearchTerm("");
        setTextValue("");
    }

    const handleChange = (e) => {
        setTextValue(e.target.value);
        setSearchTerm(e.target.value);
        setCoordinateSystem(null);
    }

    const onCoordinateSystemSelected = (system) => {
        setCoordinateSystem(system);
        setDisplaySystemSearch(false);
        setSearchTerm(system.name);
        setTextValue(system.name);
    }

    const handleLoseFocus = (e) => {
        if(textValue.length === 0) {
            elRef.current.classList.remove('focused');
        }
    }

    const handleOnHide = () => {
        setDisplaySystemSearch(false)
        if(!coordinateSystem) {
            setSearchTerm("");
            setTextValue("");
        }
    }

    return (
        <div className="boxBody">
            <div className="source">
                <InputGroup ref={elRef}>
                    <Form.Control type="search" className="coordinateFieldInput" value={textValue} 
                        onFocus={requestSearch} onChange={handleChange} onBlur={handleLoseFocus} disabled={coordinateSystem}/>
                    <label className="coordinateFieldLabel">{title} Coordinate System</label>
                    <Button class="icon" variant="outline-secondary" className="coordinateFieldButton"
                        onClick={coordinateSystem? clearCoordinateSystem : requestSearch}>
                        {coordinateSystem? <i class="fa fa-close"></i> : <i class="fa fa-search"></i>}
                    </Button>
                </InputGroup>
            </div>
        {displaySystemSearch?
            <SystemSearch x={x} y={y} width={width} searchTerm={searchTerm} coordinateSystems={coordinateSystems}
                onHide={handleOnHide} onCoordinateSystemSelected={onCoordinateSystemSelected}
            />
        :''}
        </div>
    )
}

export default CoordinateField;