import { makeStyles } from "mui-styles";

export const useStyles = makeStyles({
    home_root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        marginTop: 20,
    },
    error_text: {
        color: "#FF3B30",
        position: "absolute",
        left: 27,
        bottom: -15,
    },
})