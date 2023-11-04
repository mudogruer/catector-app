// Contains the style definitions for app components
const styles = {
    appContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px'
    },
    container: {
        width: '1000px',
        padding: '10px 20px',
        backgroundColor: '#555',
        borderRadius: '10px',
        boxShadow: '0 0 25px #444',
        color: '#f5f5f5'
    },
    content: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {

    },
    label: {
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    input: {
        display: 'table',
        padding: '10px 15px',
        margin: 10,
        backgroundColor: '#f5f5f5',
        border: 'none',
        borderRadius: '5px',
        outline: 'none',
        width: 200
    },
    button: {
        margin: 10,
        maxWidth: 100,
        padding: '0px 16px',
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        minHeight: 32,
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    signOut: {
        backgroundColor: 'black'
    },
    header: {
        padding: '0 20px'
    },
    headerText: {
        fontSize: 24,
        color: 'gold',
    },
    anchor: {
        color: 'orange',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    body: {
        padding: '0px 30px',
        height: '78vh'
    }
};

export default styles;