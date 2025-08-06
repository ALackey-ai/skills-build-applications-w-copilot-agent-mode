
import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="card-title mb-3">Leaderboard</h2>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={entry.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary">Add Entry</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
