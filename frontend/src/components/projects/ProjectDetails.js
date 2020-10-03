import React from 'react'

export default function ProjectDetails(props) {
    const id = props.match.params.id

    return (
        <div className="container section project-detail">
            <div className="card z-depth-0">
                <div className="card-content">
                    <div className="card-title">Project Title - {id}</div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta blanditiis, non alias, voluptatibus, numquam voluptatem dicta deserunt culpa adipisci reiciendis nam quam ipsum? Iusto nihil minus fuga? Culpa, ducimus vitae?</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by The Net Ninja</div>
                    <div>2nd September, 2am</div>
                </div>
            </div>
        </div>
    )
}

