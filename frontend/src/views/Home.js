import React from 'react'
import CardList from './components/card/CardList'
import Header from './components/common/Header'
export default function Home() {
    return (
        <>
            <Header/>
            <div className="container">
                <CardList/>
            </div>
        </>
    )
}
