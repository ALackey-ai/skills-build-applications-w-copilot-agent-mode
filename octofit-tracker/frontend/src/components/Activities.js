
import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/activities')
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="card-title mb-3">Activities</h2>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{activity.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary">Add Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
