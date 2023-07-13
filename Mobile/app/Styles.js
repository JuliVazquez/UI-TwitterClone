import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    app_root: {
        flex: 1,
        backgroundColor: "#000",
    },

    register_root: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
        alignItems: 'center'
    },

    profile_root: {
        flex: 1,
        backgroundColor: "#000",
    },

    login_root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#000",
    },

    home_root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    
    text: {
        color: "#FFFF",
    },

    register_headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFF',
        marginTop: '-70%',
        marginHorizontal: '10%',
        padding: 20,
        marginLeft: '-18%',
    },

    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        color: "#FFFFFF",
        marginTop: '-55%',
        marginHorizontal: "10%",
    },

    register_logo: {
        width: '7%',
        marginTop: '-60%',
    },

    login_logo: {
        width: "20%",
        marginTop: "-25%",
    },

    register_successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFF',
        marginTop: '-60%',
        padding: 20,
    },
    
    profile_backgroundContainer: {
        alignItems: 'flex-start',
    },

    profile_backgroundImage: {
        flex: 1,
        width: '100%',
    },

    profile_imageContainer: {
        position: 'absolute',
        left: 10,
        top: 110,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 999,
        overflow: 'hidden',
    },

    profile_profileImage: {
        width: 80,
        height: 80,
        borderRadius: 999,
    },

    profile_username_text: {
        marginTop: 45,
        fontSize: 18,
        left: 10,
        fontWeight: 'bold',
        color: '#FFFF',
    },

    profile_id_text: {
        fontSize: 16,
        left: 10,
        color: '#627074',
    },
    
    profile_backgroundContainer: {
        width: '100%',
        height: 240,
        alignItems: 'flex-start',
        marginTop: 30,
        marginTop: 0,
    },

    profile_backgroundImage: {
        flex: 1,
        marginTop: 0,
        width: '100%',
    },

    profile_imageContainer: {
        position: 'absolute',
        left: 10,
        top: 110,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 999,
        overflow: 'hidden',
    },

    profile_profileImage: {
        width: 80,
        height: 80,
        borderRadius: 999,
    },

    profile_username_text: {
        marginTop: 45,
        fontSize: 18,
        left: 10,
        fontWeight: 'bold',
        color: '#FFFF',
    },

    profile_id_text: {
        fontSize: 16,
        left: 10,
        color: '#627074',
    },
});

export default styles;