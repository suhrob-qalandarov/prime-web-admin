import { Snackbar, Alert } from "@mui/material"
import { useState, useEffect } from "react"

const CustomSnackbar = ({ open, message, type, onClose, duration = 4000 }) => {
    const [isOpen, setIsOpen] = useState(open)

    useEffect(() => {
        setIsOpen(open)
    }, [open])

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }
        setIsOpen(false)
        if (onClose) {
            onClose()
        }
    }

    const getAlertStyles = () => {
        switch (type) {
            case "error":
                return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
            case "warning":
                return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
            case "success":
                return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
            default:
                return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
        }
    }

    const getIconColor = () => {
        switch (type) {
            case "error":
                return "text-red-600 dark:text-red-400"
            case "warning":
                return "text-yellow-600 dark:text-yellow-400"
            case "success":
                return "text-green-600 dark:text-green-400"
            default:
                return "text-blue-600 dark:text-blue-400"
        }
    }

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                variant="outlined"
                className={`${getAlertStyles()} border shadow-lg min-w-[300px]`}
                sx={{
                    "& .MuiAlert-icon": {
                        color: getIconColor(),
                    },
                    "& .MuiAlert-message": {
                        color: "inherit",
                    },
                }}
            >
                <span className="font-medium">{message}</span>
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar;