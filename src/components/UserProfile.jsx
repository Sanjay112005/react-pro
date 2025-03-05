import React, { useEffect, useState } from 'react';
import { Dog } from '../utils/Api';
import toast from 'react-hot-toast';
import './user.css'; // Import the CSS file
import ReactivateVerification from './ReactivateVerification';

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

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({ ...prevData, [name]: value }));
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
const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword } = passwordData;

    try {
        const response = await Dog.changePassword({ current_password: currentPassword, new_password: newPassword });
        if (response.ok) {
            toast.success('Password changed successfully');
        } else {
            const errorData = await response.json();
            toast.error(errorData.detail || 'Failed to change password');
        }
    } catch (error) {
        console.error('Error changing password:', error.message);
        toast.error('Error changing password');
    }
};

// Handle account deactivation
const handleDeactivateAccount = async () => {
    try {
        const response = await Dog.deactivateAccount();
        if (response.ok) {
            toast.success('Profile deactivated successfully');
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated'); // Clear auth state
        } else {
            const errorData = await response.json();
            toast.error(errorData.error || 'Failed to deactivate account');
        }
    } catch (error) {
        console.error('Error deactivating account:', error.message);
        toast.error('Error deactivating account');
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
                <form onSubmit={handlePasswordSubmit}>
                <h3>Change Password</h3>
                <label>
                    Current Password:
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <button type="submit">Change Password</button>
            </form>
    
            
            <button onClick={handleDeactivateAccount}>Deactivate Account</button>
    
        
            <div>
                <button onClick={() => setShowReactivation(!showReactivation)}>
                    {showReactivation ? 'Hide Reactivation Options' : 'Reactivate Account'}
                </button>
                {showReactivation && (
                    <div>
                        <ReactivateVerification />
                        <p>If you have a token, use the provided reactivation link in your email.</p>
                    </div>
                )}
            </div>
        </div>
            </div>
      
    );
}

export default UserProfile;
