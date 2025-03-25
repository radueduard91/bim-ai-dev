// Common button style
export const buttonStyle = (isLoading) => ({
    height: "38px",
    border: "none",
    borderRadius: "4px",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.7 : 1,
    transition: "all 0.3s ease",
    color: "white",
    fontSize: "0.875rem"
});