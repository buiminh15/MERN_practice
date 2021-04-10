import React, { useState, useCallback, useMemo, useEffect } from 'react'
import Header from '../components/common/Header';
import { CATEGORY } from '../components/common/constant';
import { URL_SERVER } from '../../helpers/constant';
import { useGlobalContext } from '../../context/context';
import request from '../../service/request';
import DataTable from 'react-data-table-component';

export default function TestcaseFileGenerator() {
  var {
    getFeature,
  } = useGlobalContext();

  const feature = getFeature(CATEGORY.TESTCASE_FILE_GENERATOR);

  var [fields, setFields] = useState([])
  var [data, setData] = useState()
  // const data = [
  //   { _id: 1, title: 'Conan the Barbarian1', year: '1982' },
  //   { _id: 2, title: 'Conan the Barbarian2', year: '1983' },
  //   { _id: 3, title: 'Conan the Barbarian3', year: '1984' },
  //   { _id: 4, title: 'Conan the Barbarian4', year: '1985' },
  // ]
  const columns = useMemo(() => [
    {
      name: 'Title',
      selector: 'test_case',
      sortable: true,
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true,
      right: true,
    },
  ])


  useEffect(async () => {
    try {
      const res = await request.get(URL_SERVER.GET_TESTCASES)
      const fieldArr = []
      if (res.status === 200) {
        setData(res.data.testcases[0])
        for (const property in res.data.testcases[0]) {
          fieldArr.push(property)
        }
        setFields(fieldArr)
      }
    } catch (error) {
      console.log(error)
    }

  }, [])

  const renderFieldButtons = () => {
    if (fields.length > 0) {
      fields.map(field =>
        <button className="btn btn-primary mx-2">{field}</button>
      )
    }
  }
  const handleClick = () => {

  }
  const handleChange = useCallback(state => console.log(state));
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="s-title text-center text-capitalize">
          {feature.title}
        </h1>
        <h2 className="s-sub-title text-center text-capitalize">
          {feature.subTitle}
        </h2>
        <div className="row">
          <div className="col-3 border rounded">
            {fields.length > 0 && fields.map(field =>
              <button key={field} name={field} className="btn btn-outline-primary btn-sm my-2 w-100" onClick={e => handleClick(e)}>{field}</button>
            )}
          </div>
          <div className="col-9 border rounded">
            {data && <DataTable
              columns={columns}
              data={data}
              selectableRows
              selectableRowsHighlight
              Clicked
              onSelectedRowsChange={handleChange}
            />}
          </div>
        </div>
      </div>

    </>
  )
}
