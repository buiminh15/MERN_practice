import React from 'react'
import { useGlobalContext } from '../../../context/context';
import { featuresComtor } from '../../../models/featuresComtor'
import Card from './Card'
export default function ComtorCardList({features}) {
    var {
        indexOfSelectedItemLeftContentTabComponent,
    } = useGlobalContext();

    return (
        <div>
            {featuresComtor.map((feature, index) => (index === indexOfSelectedItemLeftContentTabComponent ? (
                <div className="h-100" key={feature.name}>
                    <Card key={feature.name} {...feature} />
                </div>) : null
            ))}
        </div>
    )
}
