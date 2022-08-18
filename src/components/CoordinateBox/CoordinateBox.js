import Button from 'react-bootstrap/Button';
import React from "react";
import './CoordinateBox.css'

const CoordinateBox = (props) => {
    const { id, type } = props.data;
    return (
        <div className="CoordinateBox">
            <h3>Coordinate Box {id}</h3>
            <Button className='removeBtn'
                variant='outline-danger'
                size='sm'
                onClick={() => props.removeCoordinateBox(id)}>
                remove
            </Button>
        </div>
    )
}

export default CoordinateBox;