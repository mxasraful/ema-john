import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../Login/useAuth';

const Profile = () => {

    const history = useHistory()

    const auth = useAuth();
    const { photo, name, email } = auth?.user;

    useEffect(() => {
        if (auth?.user) {

        } else {
            history.push("/login")
        }
    }, [auth, history])

    return (
        <div className="container">
            <div className="row mt-4">
                {
                    auth.user &&
                    <div className="card mb-4 text-center" style={{ width: '18rem', height: "60vh" }}>
                        <div className="mt-4">
                            <img src={photo} class="card-img-top img-fluid w-50" alt="..." />
                        </div>
                        <div class="card-body">
                            <h5 className="card-title">{name}</h5>
                            <div className="">{email}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;