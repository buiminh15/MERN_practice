import React, { useState } from 'react';

import Header from '../components/common/Header';
import { useGlobalContext } from '../../context/context';
import { CATEGORY_EXCEL } from '../components/common/constant';

export default function ToolAdmin(props) {
    var {
        getFeatureExcel
    } = useGlobalContext();

    const feature = getFeatureExcel(CATEGORY_EXCEL.TOOL_ADMIN);

    return (
        <>
            <Header />
            <div>
                <div className="container">
                    <h1 className="s-title text-center text-capitalize">
                        {feature.title}
                    </h1>
                    <h2 className="s-sub-title text-center text-capitalize">
                        {feature.subTitle}
                    </h2>


                </div>
            </div>
        </>
    );
}
