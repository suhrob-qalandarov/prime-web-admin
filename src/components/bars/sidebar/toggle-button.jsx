import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

const ToggleButton = ({ isOpen, setIsOpen }) => {
    return (
        <Button
            onClick={() => setIsOpen(!isOpen)}
            sx={{
                position: "fixed",
                top: "50%",
                left: isOpen ? "calc(var(--sidebar-width) + 5px)" : "65px",
                transform: "translateY(-50%)",
                minWidth: "40px",
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                zIndex: 1200,
                cursor: "pointer",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                    background: "linear-gradient(135deg, var(--secondary-color), var(--primary-color))",
                    transform: "translateY(-50%) scale(1.15)",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} style={{ fontSize: "18px", color: "white" }} />
        </Button>
    );
};

export default ToggleButton;