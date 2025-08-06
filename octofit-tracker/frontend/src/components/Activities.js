
import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityTypeInput, setActivityTypeInput] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/activities/')
      .then(res => res.json())
      .then(data => setActivities(data));
    fetch('https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/users/')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // Get unique activity types from activities
  const activityTypes = Array.from(new Set(activities.map(a => a.activity_type).filter(Boolean)));

  const handleAddClick = () => {
    setShowModal(true);
    setSelectedUser(users.length > 0 ? users[0]._id : "");
    setActivityType(activityTypes.length > 0 ? activityTypes[0] : "");
    setActivityTypeInput("");
    setDuration("");
    setError("");
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser("");
    setActivityType("");
    setActivityTypeInput("");
    setDuration("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      setError("User is required.");
      return;
    }
    const typeToSend = activityTypeInput.trim() ? activityTypeInput.trim() : activityType;
    if (!typeToSend) {
      setError("Activity type is required.");
      return;
    }
    if (!duration.trim()) {
      setError("Duration is required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch('https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/activities/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: selectedUser,
          activity_type: typeToSend,
          duration: duration
        }),
      });
      let errorMsg = "";
      if (!response.ok) {
        // Try to parse backend error message
        try {
          const errData = await response.json();
          if (errData && typeof errData === 'object') {
            if (errData.detail) {
              errorMsg = errData.detail;
            } else if (errData.non_field_errors) {
              errorMsg = errData.non_field_errors.join(' ');
            } else {
              // Show all field errors
              errorMsg = Object.entries(errData).map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(' ') : msgs}`).join(' ');
            }
          } else {
            errorMsg = JSON.stringify(errData);
          }
        } catch (parseErr) {
          errorMsg = `Failed to add activity. (${response.status})`;
        }
        throw new Error(errorMsg);
      }
      const added = await response.json();
      setActivities([...activities, added]);
      setShowModal(false);
      setSelectedUser("");
      setActivityType("");
      setActivityTypeInput("");
      setDuration("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete activity handler
  const handleDelete = async (activityId) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;
    try {
      const response = await fetch(`https://shiny-giggle-4rg9x465wg72q9jr-8000.app.github.dev/api/activities/${activityId}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete activity.');
      }
      setActivities(activities.filter(a => a._id !== activityId));
    } catch (err) {
      alert(err.message);
    }
  };

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
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity._id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{users.find(u => u._id === activity.user)?.username || activity.user}</td>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(activity._id)} disabled={!activity._id}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleAddClick}>Add Activity</button>

            {/* Modal */}
            {showModal && (
              <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: "rgba(0,0,0,0.5)"}}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Activity</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label htmlFor="userSelect" className="form-label">User</label>
                          <select
                            className="form-select"
                            id="userSelect"
                            value={selectedUser}
                            onChange={e => setSelectedUser(e.target.value)}
                          >
                            <option value="">Select user...</option>
                            {users.map(user => (
                              <option key={user._id} value={user._id}>{user.username}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="activityType" className="form-label">Activity Type</label>
                          <div className="input-group">
                            <select
                              className="form-select"
                              id="activityType"
                              value={activityType}
                              onChange={e => setActivityType(e.target.value)}
                            >
                              <option value="">Select type...</option>
                              {activityTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Or enter new type"
                              value={activityTypeInput}
                              onChange={e => setActivityTypeInput(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="duration" className="form-label">Duration (hh:mm:ss)</label>
                          <input
                            type="text"
                            className="form-control"
                            id="duration"
                            placeholder="e.g. 00:30:00"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                          />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Adding..." : "Add Activity"}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
