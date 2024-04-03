import React from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard({ username, onLogout }) {
    return (
        <div>
            <h2>Welcome, {username}!</h2>
            <button onClick={onLogout}>Logout</button>

            {/* Child routes will be rendered here */}
            <Outlet />
        </div>
    );
}

export default Dashboard;
