import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import CardList from '../card/CardList'
import ContentTabComponent from './ContentTabComponent'

export default function TabComponent(props) {
    // const selectList = { selectedItem: 'Apple', list: ['Apple', 'Orange', 'Mango'] }
    const selectListArr = [
        { category: 'tester', selectedItem: 'Apple', list: ['Apple', 'Orange', 'Mango'] },
        { category: 'dev', selectedItem: 'Apple1', list: ['Apple1', 'Orange', 'Mango'] },
        { category: 'pm', selectedItem: 'Apple2', list: ['Apple2', 'Orange', 'Mango'] },
        { category: 'comtor', selectedItem: 'Apple3', list: ['Apple3', 'Orange', 'Mango'] },
    ]
    return (
        <Tabs defaultActiveKey={props.defaultActiveKey} id="uncontrolled-tab-example">
            { props.list.map(item => (
                <Tab eventKey={item.key} title={item.value}>
                    <div className="container">
                        {selectListArr.map(list => list.category === item.key ? 
                            (<ContentTabComponent list={list} category={item.key}/>) : null)}
                    </div>
                </Tab>
            ))
            }
        </Tabs>
    )
}
