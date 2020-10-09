import React, { useEffect, useState } from 'react'
import Navbar from './../navbar/Navbar';
import Bootcamp from './Bootcamp';
import axios from "axios";

export default class Bootcamps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bootcamps: []
        }
    }
    componentDidMount() {
        axios
            .get("/api/v1/bootcamps")
            .then((response) => {
                this.setState({ bootcamps: response.data.data })
            })
            .catch((error) => {
                console.log("registration error", error);
            });
    }
    render() {
        return (
            <>
                <Navbar />
                <section className="browse my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card card-body mb-4">
                                    <h4 className="mb-3">By Location</h4>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="miles"
                                                        placeholder="Miles From"
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
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="submit"
                                            value="Find Bootcamps"
                                            className="btn btn-primary btn-block"
                                        />
                                    </form>
                                </div>

                                <h4>Filter</h4>
                                <form>
                                    <div className="form-group">
                                        <label> Rating</label>
                                        <select className="custom-select mb-2">
                                            <option value="any" selected>Any</option>
                                            <option value="9">9+</option>
                                            <option value="8">8+</option>
                                            <option value="7">7+</option>
                                            <option value="6">6+</option>
                                            <option value="5">5+</option>
                                            <option value="4">4+</option>
                                            <option value="3">3+</option>
                                            <option value="2">2+</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label> Budget</label>
                                        <select className="custom-select mb-2">
                                            <option value="any" selected>Any</option>
                                            <option value="20000">$20,000</option>
                                            <option value="15000">$15,000</option>
                                            <option value="10000">$10,000</option>
                                            <option value="8000">$8,000</option>
                                            <option value="6000">$6,000</option>
                                            <option value="4000">$4,000</option>
                                            <option value="2000">$2,000</option>
                                        </select>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Find Bootcamps"
                                        className="btn btn-primary btn-block"
                                    />
                                </form>
                            </div>

                            <div className="col-md-8">
                                {
                                    this.state.bootcamps.map(bootcamp => <Bootcamp key={bootcamp._id} bootcamp={bootcamp}/>)
                                }
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#">Previous</a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}


// export default function Bootcamps() {
//     const [bootcampsState, setBootcampsState] = useState([]);

//     useEffect(() => {
//         axios
//             .get("/api/v1/bootcamps")
//             .then((response) => {
//                 console.log('bootcamps: ', response.data.data[0].name);
//                 setBootcampsState(response.data.data)
//             })
//             .catch((error) => {
//                 console.log("registration error", error);
//             });
//     },[]);
//     console.log('bootcamps: ', bootcampsState);
//     return (
//         <>
//             <Navbar />
//             <section className="browse my-5">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-4">
//                             <div className="card card-body mb-4">
//                                 <h4 className="mb-3">By Location</h4>
//                                 <form>
//                                     <div className="row">
//                                         <div className="col-md-6">
//                                             <div className="form-group">
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     name="miles"
//                                                     placeholder="Miles From"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="form-group">
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     name="zipcode"
//                                                     placeholder="Enter Zipcode"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <input
//                                         type="submit"
//                                         value="Find Bootcamps"
//                                         className="btn btn-primary btn-block"
//                                     />
//                                 </form>
//                             </div>

//                             <h4>Filter</h4>
//                             <form>
//                                 <div className="form-group">
//                                     <label> Rating</label>
//                                     <select className="custom-select mb-2">
//                                         <option value="any" selected>Any</option>
//                                         <option value="9">9+</option>
//                                         <option value="8">8+</option>
//                                         <option value="7">7+</option>
//                                         <option value="6">6+</option>
//                                         <option value="5">5+</option>
//                                         <option value="4">4+</option>
//                                         <option value="3">3+</option>
//                                         <option value="2">2+</option>
//                                     </select>
//                                 </div>

//                                 <div className="form-group">
//                                     <label> Budget</label>
//                                     <select className="custom-select mb-2">
//                                         <option value="any" selected>Any</option>
//                                         <option value="20000">$20,000</option>
//                                         <option value="15000">$15,000</option>
//                                         <option value="10000">$10,000</option>
//                                         <option value="8000">$8,000</option>
//                                         <option value="6000">$6,000</option>
//                                         <option value="4000">$4,000</option>
//                                         <option value="2000">$2,000</option>
//                                     </select>
//                                 </div>
//                                 <input
//                                     type="submit"
//                                     value="Find Bootcamps"
//                                     className="btn btn-primary btn-block"
//                                 />
//                             </form>
//                         </div>

//                         <div className="col-md-8">
//                             {/* <Bootcamp /> */}
//                             {/* <h1>{bootcampsState[0].name}</h1> */}
//                             <nav aria-label="Page navigation example">
//                                 <ul className="pagination">
//                                     <li className="page-item">
//                                         <a className="page-link" href="#">Previous</a>
//                                     </li>
//                                     <li className="page-item"><a className="page-link" href="#">1</a></li>
//                                     <li className="page-item"><a className="page-link" href="#">2</a></li>
//                                     <li className="page-item"><a className="page-link" href="#">3</a></li>
//                                     <li className="page-item">
//                                         <a className="page-link" href="#">Next</a>
//                                     </li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }
