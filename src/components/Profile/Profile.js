import React, { } from 'react';
import { useAuth } from '../Login/useAuth';

const Profile = () => {

    const auth = useAuth();

    const user = auth?.user

    return (
        <div className="container">
            <div className="row mt-4">
                {
                    auth?.user &&
                    <div className="card mb-4 text-center" style={{ width: '18rem', height: "60vh" }}>
                        <div className="mt-4">
                            <img src={user.photo} class="card-img-top img-fluid w-50" alt="..." />
                        </div>
                        <div class="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <div className="">{user.email}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;