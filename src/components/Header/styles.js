import { StyleSheet } from 'react-native';
import { Colors } from 'src/theme';

export default StyleSheet.create({
    primary: { backgroundColor: Colors.primary },

    secondary: { backgroundColor: Colors.white },

    transparent: { backgroundColor: 'transparent' },

    primaryText: { color: Colors.white },

    secondaryText: { color: Colors.black },

    thundersecondText: { color: Colors.thundersecond },

    largeHeader: {
        height: 70
    },

    roundedCorner: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    header: {
        borderBottomWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13
    },

    roundedBg: {
        backgroundColor: Colors.primary
    },
    titleText: {
        fontSize: 20,
        lineHeight: 32
    },

    leftStyle: {
        width: 30
    },

    bodyStyle: {
        flex: 1,
        marginHorizontal: 16
    },

    rightStyle: {
        width: 30
    }
});