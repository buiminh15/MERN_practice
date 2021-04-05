import React from 'react'
import LeftContentTabComponent from './LeftContentTabComponent'
import TesterCardList from '../card/TesterCardList'
import DevCardList from '../card/DevCardList'
import PmCardList from '../card/PmCardList'
import ComtorCardList from '../card/ComtorCardList'

export default function ContentTabComponent(props) {
    const renderRightContent = () => {
        switch (props.category) {
            case 'tester':
                return <TesterCardList />
            case 'pm':
                return <PmCardList />
            case 'dev':
                return <DevCardList />
            case 'comtor':
                return <ComtorCardList />
            default:
                break;
        }
    }
    return (
        <div className='row'>
            <div className="col-3">
                <LeftContentTabComponent selectList={props.list} />
            </div>
            <div className="col-9">
                {renderRightContent()}
            </div>
        </div>
    )
}
