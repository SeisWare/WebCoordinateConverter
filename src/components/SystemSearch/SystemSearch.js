import React, { useState, useRef, useEffect }  from "react";
import './SystemSearch.css';
import {ListGroup, CloseButton} from 'react-bootstrap';
import { List } from "react-virtualized";

function useOutsideAlerter(ref, hideCall) {
    useEffect(() => {
        // Alert if clicked on outside of element
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && ref.current.parentNode && !ref.current.parentNode.contains(event.target)) {
                hideCall();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const SystemSearch = (props) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.onHide);

    var { coordinateSystems, x, y, width, searchTerm } = props;

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSystems = async () => {
            const filtering = (el) => 
            searchTerm.length === 0 
            || el.name.toLowerCase().includes(searchTerm.toLowerCase())
            || el.code.toLowerCase().includes(searchTerm.toLowerCase());

            return coordinateSystems.filter(filtering);
        };
        
        fetchSystems().then((results) => setSearchResults(results));

    }, [searchTerm, coordinateSystems]);

    const coordinateSystemSelected = (system) => {
        props.onCoordinateSystemSelected(system);
    }

    const renderRow = ({index, key, style}) => {
        const system = searchResults[index];
        let nameIndex = -1;
        let codeIndex = -1;

        if(searchTerm.length > 0) {
            nameIndex = system.name.toLowerCase().indexOf(searchTerm.toLowerCase());
            codeIndex = system.code.indexOf(searchTerm);
        }

        return(
            <ListGroup.Item key={key} style={style} className='coordinateSearchResult' onClick={() => coordinateSystemSelected(system)}>
                {
                    nameIndex < 0 ? <h5>{system.name}</h5> :
                    <h5>{system.name.substring(0, nameIndex)}<mark>{system.name.substring(nameIndex, nameIndex + searchTerm.length)}</mark>{system.name.substring(nameIndex + searchTerm.length)}</h5>
                }
                {
                    codeIndex < 0 ? <h6>Code: {system.code}</h6> :
                    <h6>Code: {system.code.substring(0, codeIndex)}<mark>{system.code.substring(codeIndex, codeIndex + searchTerm.length)}</mark>{system.code.substring(codeIndex + searchTerm.length)}</h6>
                }
            </ListGroup.Item>
        );
    }

    return (
        <div className={'systemSearch'} style={{top: y, left: x}} ref={wrapperRef}>
            <div className='systemSeachControl'>
                <h3 style={{flexGrow: 1}}>{searchTerm.length === 0? 'System Search' : searchTerm}</h3>
                <CloseButton onClick={() => props.onHide()}/>
            </div>
            <List
                rowRenderer={renderRow}
                rowCount={searchResults.length}
                width={width}
                height={300}
                rowHeight={80}
            />
        </div>
    )
}

export default SystemSearch;