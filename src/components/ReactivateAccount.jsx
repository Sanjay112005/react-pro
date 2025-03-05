import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom'; // For accessing URL query params
import { Dog } from '../utils/Api';

function ReactivateAccount() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token'); // Get the token from the URL
        if (token) {
            handleReactivateAccount(token);
        }
    }, [searchParams]);

    const handleReactivateAccount = async (token) => {
        try {
            const response = await Dog.reactivateAccount(token)
            const data = await response.json();

            if (response.ok) {
                toast.success(data.detail || 'Account activated successfully.');
            } else {
                toast.error(data.detail || 'Failed to activate account.');
            }
        } catch (error) {
            console.error('Error reactivating account:', error);
            toast.error('Error activating account.');
        }
    };

    return (
        <div>
            <h3>Reactivation Successful.</h3>
        </div>
    );
}

export default ReactivateAccount;
