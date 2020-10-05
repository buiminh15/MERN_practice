import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { getDataFromApi } from './../../service/index';


export const findBootCamps = async (miles, zipcode) => {
    if (miles && zipcode) {
        const res = await getDataFromApi();
        console.log(res);
    }
}

export default function Index() {
    const [miles, setMiles] = useState('');
    const [zipcode, setZipCode] = useState('');

    useEffect(() => {
        async function fetchMyAPI() {
            const res = await getDataFromApi();
            console.log(res);
        }
        fetchMyAPI()
    }, [])

    return (
        <>
            <Navbar />
            <section className="showcase">
                <div className="dark-overlay">
                    <div className="showcase-inner container">
                        <h1 className="display-4">Find a Code Bootcamp</h1>
                        <p className="lead">
                            Find, rate and read reviews on coding bootcamps
					    </p>
                        <form action="bootcamps.html">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="miles"
                                            placeholder="Miles From"
                                            value={miles}
                                            onChange={e => setMiles(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="zipcode"
                                            placeholder="Enter Zipcode"
                                            value={zipcode}
                                            onChange={e => setZipCode(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="button"
                                onClick={() => findBootCamps(miles, zipcode)}
                                value="Find Bootcamps"
                                className="btn btn-primary btn-block"
                            />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
