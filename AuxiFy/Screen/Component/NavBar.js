import React, { useRef, useEffect } from "react";
import HomeIcon from '../../assets/Icon/home-01-stroke-rounded.svg'; 
import SearchIcon from '../../assets/Icon/search.svg';
import LibraryIcon from '../../assets/Icon/library.svg'; 
import UserIcon from '../../assets/Icon/user.svg';
import { BlurView } from "@react-native-community/blur";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native';

const NavBar = ({ navigation, state}) => {
    

    const indicatorPosition = useRef(new Animated.Value(0)).current;

    const iconWidth = ScreenW * 0.86 / 4;
    const offset = (iconWidth - 35) / 2;

    const animateIndicator = (index) => {
        if (index >= 0 && index <= 3) {
            Animated.timing(indicatorPosition, {
                toValue: index * iconWidth + offset,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    };

    // Trigger the animation when the tab index changes
    useEffect(() => {
        animateIndicator(state.index);
    }, [state.index]);

    return (
        <View style={styles.navLayout}>
            <Animated.View style={[styles.indicator, { left: indicatorPosition}]} />

            {/* Home Icon */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <HomeIcon width={45} height={27} color={state.index === 0 ? "#42C83C" : "gray"} fill={state.index === 0 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity>

            {/* Search Icon */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('Search')}
            >
                <SearchIcon width={45} height={27} color={state.index === 1 ? "#42C83C" : "gray"} fill={state.index === 1 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity>

            {/* Library Icon */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('Library')}
            >
                <LibraryIcon width={45} height={27} color={state.index === 2 ? "#42C83C" : "gray"} fill={state.index === 2 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity>

            {/* User Icon */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('Profile')}
            >
                <UserIcon width={45} height={27} color={state.index === 3 ? "#42C83C" : "gray"} fill={state.index === 3 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity>
        </View>
    );
};

export default NavBar;

const { width: ScreenW } = Dimensions.get('window');

const styles = StyleSheet.create({
    navLayout: {
        width: ScreenW * 0.89,
        backgroundColor: '#343434',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 5,
        position: 'absolute',
        bottom: 20,
    },
    iconButton: {
        padding: 10,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 5,
        backgroundColor: '#42C83C',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        zIndex: 0,        
    },
});
