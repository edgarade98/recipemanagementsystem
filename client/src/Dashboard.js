import React from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Dashboard({ username }) {
    const [isVisible, setIsVisible] = useState(false);
    

    useEffect(() => {
        // Set isVisible to true after component mounts to trigger the animation
        setIsVisible(true);
    }, []);

    return (
        <div className='dashboard'>
            <h2 style={{
                paddingLeft: 20,
                fontFamily: "Monospace",
                textAlign:"center",
                fontSize: 35,
                paddingTop: 200,
                opacity: isVisible ? 1 : 0, // Initially set opacity to 0
                transition: 'opacity 1s ease-in-out' // Add transition for smooth animation
            }}>Welcome to Your Kitchen, Chef {username}!</h2>
            <p style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 20,
                fontFamily: "Monospace",
                opacity: isVisible ? 1 : 0, // Initially set opacity to 0
                transition: 'opacity 1s ease-in-out' // Add transition for smooth animation
            }}>Start exploring delicious recipes from around the world and unleash your inner chef!</p>

            {/* Child routes will be rendered here */}
            <Outlet />
        </div>
    );
}

export default Dashboard;
