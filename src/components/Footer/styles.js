import { StyleSheet } from 'react-native';
import { Colors } from 'src/theme';

export default StyleSheet.create({
    footer: {
        backgroundColor: Colors.white
    },

    touch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        color: Colors.darkGray
    },
    active: {
        color: Colors.primary
    },
});