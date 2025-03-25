import { useState } from "react";

const useNotifications = () => {
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    // Show notification with auto-dismiss
    const showNotification = (message, type = "info") => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 5000);
    };

    return {
        notification,
        showNotification
    };
};

export default useNotifications;