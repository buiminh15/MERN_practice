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
            <div className="col-3" style={{ paddingLeft: 0, paddingRight: 0, borderRadius: 0 }}>
                <LeftContentTabComponent selectList={props.list} />
            </div>
            <div className="col-9" style={{ paddingLeft: 0, paddingRight: 0 }}>
                {renderRightContent()}
            </div>
        </div>
    )
}
