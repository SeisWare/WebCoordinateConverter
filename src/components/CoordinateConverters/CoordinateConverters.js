import React from "react";
import CoordinateBox from "../CoordinateBox/CoordinateBox";
import './CoordinateConverters.css'

const CoordinateConverters = (props) => {
    const { converters, removeCoordinateBox } = props;
    return (
        <div className="CoordinateConverters">
            <div>
                {converters.map((converter) => (
                    <CoordinateBox
                        key={converter.id}
                        data={converter}
                        removeCoordinateBox={removeCoordinateBox} 
                    />
                ))}
            </div>
        </div>
    )
}

export default CoordinateConverters;