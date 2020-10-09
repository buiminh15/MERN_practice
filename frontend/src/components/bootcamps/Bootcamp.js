import React from 'react'

export default function Bootcamp({ bootcamp }) {
    return (
        <>
            <div className="card mb-3" key={bootcamp._id}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={`img/${bootcamp.photo}`} className="card-img" alt={`${bootcamp.photo}`} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href={`/bootcamps/${bootcamp.slug}`} >{bootcamp.name}
                                    <span className="float-right badge badge-success">{bootcamp.averageRating ? Math.round(bootcamp.averageRating * 10) / 10 : 0}</span></a
                                >
                            </h5>
                            <span className="badge badge-dark mb-2">{bootcamp.location.city}</span>
                            <p className="card-text">
                                {bootcamp.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
