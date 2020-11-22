import React from 'react'
import {features} from '../models/features'
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <div>
            Home
            <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        {
                            features.map(feature => <li><Link key={feature.name} to={feature.path}>{feature.name}</Link></li>)
                        }
                    
                    </ul>
                </nav>
            </header>
        </div>
    )
}
