
import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/workouts')
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="card-title mb-3">Workouts</h2>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{workout.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary">Add Workout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
