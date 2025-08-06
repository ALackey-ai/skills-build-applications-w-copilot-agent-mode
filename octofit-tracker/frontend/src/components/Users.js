
import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="card-title mb-3">Users</h2>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary">Add User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
