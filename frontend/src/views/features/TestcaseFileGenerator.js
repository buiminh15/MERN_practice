import React, { useState, useCallback, useMemo, useEffect } from 'react'
import Header from '../components/common/Header';
import { CATEGORY } from '../components/common/constant';
import { URL_SERVER } from '../../helpers/constant';
import { useGlobalContext } from '../../context/context';
import request from '../../service/request';
import DataTable from 'react-data-table-component';
import { TESTCASE_FIELDS } from '../../helpers/constant'
export default function TestcaseFileGenerator() {
  var {
    getFeature,
  } = useGlobalContext();

  const feature = getFeature(CATEGORY.TESTCASE_FILE_GENERATOR);
  const CustomTitle = ({ row }) => (
    <div>
      {}
      <div>
        <div data-tag="allowRowEvents" style={{ color: 'grey', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
          {}
          {row.testcase}
        </div>
      </div>
    </div>
  );

  var [fields, setFields] = useState([])
  var [selectedFields, setSelectedFields] = useState('login_testcases')
  var [data, setData] = useState([])

  const columns = useMemo(() => [

    {
      name: 'Title',
      selector: 'testcase',
      sortable: true,
      maxWidth: '60%',
      cell: row => <CustomTitle row={row} />,
    },
    // {
    //   name: 'Title1',
    //   selector: '1',
    //   sortable: true,
    //   // maxWidth: '600px',
    //   // cell: row => <CustomTitle row={row} />,
    // },

  ])

  const handleFields = () => {
    const arr = []
    for (const key in TESTCASE_FIELDS) {
      arr.push(TESTCASE_FIELDS[key])
    }
    setFields(arr)
  }

  useEffect(() => {
    handleFields()
    getTableData()
  }, [selectedFields])

  const getTableData = async () => {
    try {
      const res = await request.get(URL_SERVER.GET_TESTCASES + '/' + selectedFields)
      console.log(res)
      if (res.status === 200) {
        setData(res.data.testcases[0].testcases)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (e) => {
    console.log(e.target.name.toLowerCase().replace(' ', '_'))
    setSelectedFields(e.target.name.toLowerCase().replace(' ', '_'))
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
            {data.length > 0 && <DataTable
              columns={columns}
              data={data}
              selectableRows
              selectableRowsHighlight
              pagination
              onSelectedRowsChange={handleChange}
              wrap
            />}
          </div>
        </div>
      </div>

    </>
  )
}
