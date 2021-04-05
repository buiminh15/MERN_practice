import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
export default function LeftContentTabComponent(props) {
    const [selectedItem, setSelectedItem] = useState(props.selectList.selectedItem)
    const handleChange = (index) => {
        setSelectedItem(props.selectList.list[index])
    }
    return (
        <ListGroup as="ul">
            {props.selectList.list.map((item, index) => (
                <ListGroup.Item as="li" key={item} active={selectedItem === item} onClick={() => handleChange(index)}>
                    {item}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
