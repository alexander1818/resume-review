import { makeStyles } from "mui-styles";

export const useStyles = makeStyles({
    content: {
        width: "100%",
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 50,
        marginBottom: 50,
    },
    repo_box: {
        display: "flex", 
        flexDirection: "row", 
        gap: 10
    },
    username: {
        width: "100%", 
        textAlign: "center", 
    },
    language_amount: {
        color: '#E46525'
    },
    repo_link: {
        color: '#FA7E01FF'
    },
    skeleton: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    }
})