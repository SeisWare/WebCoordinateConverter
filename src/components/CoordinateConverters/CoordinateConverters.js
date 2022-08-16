import React from "react";
import CoordinateBox from "../CoordinateBox/CoordinateBox";
import './CoordinateConverters.css'

const CoordinateConverters = (props) => {
    const { converters } = props;
    return (
        <div className="CoordinateConverters">
            <div>
                {/* <h1>{converters}</h1> */}
                {/* converters.map((converter) => ( */}
                {/* <Book key={book.id} book={book}) /> */}
                {converters.map((converter) => (
                    <CoordinateBox key={converter} />
                ))}
            </div>
        </div>
    )
}

export default CoordinateConverters;