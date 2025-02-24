import React, { useEffect, useState } from 'react';
import { Dog } from '../utils/Api';
import toast from 'react-hot-toast';
import './user.css'; // Import the CSS file

function UserProfile({ setIsAuthenticated }) {
    const [profile, setProfile] = useState(null);
    const [fors, setFors] = useState({
        pincode: "", address: "", city: "", state: "", country: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const repo = await Dog.getProfile();
                if (!repo) {
                    toast.error("Failed to fetch profile. API might be down.");
                    return;
                }

                if (repo.status === 401 || repo.status === 403) {
                    setIsAuthenticated(false);
                    localStorage.removeItem("isAuthenticated");
                    toast.error("You must be logged in to see profile");
                    return;
                }

                const dat = await repo.json();
                if (dat && dat.address) {
                    setProfile(dat);
                    setFors({
                        pincode: dat.pincode,
                        address: dat.address,
                        city: dat.city,
                        state: dat.state,
                        country: dat.country,
                    });
                } else {
                    setProfile(null);
                }
            } catch (error) {
                toast.error("Error fetching profile");
            }
        };
        fetchProfile();
    }, [setIsAuthenticated]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFors((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const { pincode, address, city, state, country } = fors;
        try {
            let re = profile
                ? await Dog.updateProfile({ pincode, address, city, state, country })
                : await Dog.createProfile({ pincode, address, city, state, country });

            if (re.ok) {
                const updatedProfile = await re.json();
                toast.success(profile ? "Profile updated successfully" : "Profile created successfully");
                setProfile(updatedProfile);
            } else {
                const err = await re.json();
                toast.error(err.error || "Error saving profile");
            }
        } catch (error) {
            toast.error("Error saving profile");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-box">
                <div className="profile-details">
                    <h2 className="profile-heading">User Profile</h2>
                    {profile ? (
                        <div>
                            <p><strong>Address:</strong> {profile.address}</p>
                            <p><strong>City:</strong> {profile.city}</p>
                            <p><strong>State:</strong> {profile.state}</p>
                            <p><strong>Country:</strong> {profile.country}</p>
                            <p><strong>Pincode:</strong> {profile.pincode}</p>
                        </div>
                    ) : (
                        <p className="no-profile">No profile found 😕. Create a new one.</p>
                    )}
                </div>

                <form className="profile-form" onSubmit={handleProfileSubmit}>
                    <h3>{profile ? 'Update' : 'Create'} Profile</h3>
                    <div className="form-grid">
                        <input type="text" name="address" placeholder="Address" onChange={handleFormChange} required value={fors.address} />
                        <input type="text" name="city" placeholder="City" onChange={handleFormChange} required value={fors.city} />
                        <input type="text" name="state" placeholder="State" onChange={handleFormChange} required value={fors.state} />
                        <input type="text" name="country" placeholder="Country" onChange={handleFormChange} required value={fors.country} />
                        <input type="text" name="pincode" placeholder="Pincode" onChange={handleFormChange} required value={fors.pincode} />
                    </div>
                    <button type='submit' className="profile-button">
                        {profile ? "Update Profile" : "Create Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
