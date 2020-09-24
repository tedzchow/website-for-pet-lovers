import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import "./style.css";
import jobData from "../utils/JobListings"
import JobCard from '../components/CardJob';
import app from '../utils/firebase';

export default function User() {
    let currentPositions = [];
    let currentPositionsBlaine = [];
    let currentPositionsStillwater = [];

    useEffect(() => {
        for (let i = 0; i < jobData.alljobs.length; i++) {
            if (jobData.alljobs[i].available === true) {
                currentPositions.push(jobData.alljobs[i])
                if (jobData.alljobs[i].location === "Blaine") {
                    currentPositionsBlaine.push(jobData.alljobs[i])
                } else if (jobData.alljobs[i].location === "Stillwater") {
                    currentPositionsStillwater.push(jobData.alljobs[i])
                }
            }
        }
        setJobState({
            all: currentPositions,
            Blaine: currentPositionsBlaine,
            Stillwater: currentPositionsStillwater
        })
        setJobs(currentPositions)
    }, [currentPositions, currentPositionsBlaine, currentPositionsStillwater])

    const [jobState, setJobState] = useState({
        all: [],
        Blaine: [],
        Stillwater: []
    })

    const [jobs, setJobs] = useState([])

    const handleLocationChange = (e) => {
        if (e.target.value === "Blaine") {
            setJobs(jobState.Blaine)
        } else if (e.target.value === "Stillwater") {
            setJobs(jobState.Stillwater)
        } else {
            setJobs(jobState.all)
        }
    }

    return (
        <main className="hide-overflow">
            <Background />
            <div className="row">
                <div className="col-md-6 job-section">
                    <div className="job-section-overlay"></div>
                    <div>
                        <div className="row">
                            <div className="col-md-12 text-center job-header">
                                <h1 className="section-title">Available Positions</h1>
                            </div>
                            <div className="col-md-12 text-center">
                                <button type="button" className="btn btn-light btn-filter" onClick={handleLocationChange} value="all">All Locations</button>
                                <button type="button" className="btn btn-light btn-filter" onClick={handleLocationChange} value="Blaine">Blaine</button>
                                <button type="button" className="btn btn-light btn-filter" onClick={handleLocationChange} value="Stillwater">Stillwater</button>
                            </div>
                        </div>
                        <JobCard
                            jobs={jobs}
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <h1>YOU ARE LOGGED IN</h1>
                    <button onClick={() => app.auth().signOut()}>Sign Out</button>
                </div>
            </div>
        </main>
    )

}