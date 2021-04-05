import React from 'react'
import { useGlobalContext } from '../../../context/context';
import { features } from '../../../models/features'
import Card from './Card'

export default function TesterCardList() {
    var {
        indexOfSelectedItemLeftContentTabComponent,
    } = useGlobalContext();

    return (
        <div>
            {features.map((feature, index) => (index === indexOfSelectedItemLeftContentTabComponent ? (
                <div className="h-100" key={feature.name}>
                    <Card key={feature.name} {...feature} />
                </div>) : null
            ))}
        </div>
    )
}
