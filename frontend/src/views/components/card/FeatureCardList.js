import React, { useState } from 'react'
import { useGlobalContext } from '../../../context/context';
import { features } from '../../../models/features'
import Card from './Card'

export default function FeatureCardList(props) {
    var {
        indexOfSelectedItemLeftContentTabComponent,
    } = useGlobalContext();

    return (
        <div>
            {props.features ? props.features.map((feature, index) => (index === indexOfSelectedItemLeftContentTabComponent && (
                <div className="h-100" key={feature.name}>
                    <Card key={feature.name} {...feature} />
                </div>)
            )) : null}
        </div>
    )
}
