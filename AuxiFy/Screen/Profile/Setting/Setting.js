import React, { useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Animated, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "@react-native-community/blur";
import { ScreenH, ScreenW, BackIcon, SearchIcon, UserIcon, VolIcon, LockIcon, NotifiIcon, InfoIcon, MusicBarIcon } from '../../Component/Assets';
// import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const SettingScreen = () => {
    const navigation = useNavigation();

    // Search Handle
    const width = useRef(new Animated.Value(0)).current; // Initial width set to 0 (hidden)
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSearchPress = () => {
        if (!isExpanded) {
            // Expand the search bar
            Animated.timing(width, {
                toValue: ScreenW * 0.9, // Expand to 90% of the screen width
                duration: 300,
                useNativeDriver: false,
            }).start(() => setIsExpanded(true));
        } else {
            // Collapse the search bar
            Animated.timing(width, {
                toValue: 0, // Collapse to 0 (hidden)
                duration: 300,
                useNativeDriver: false,
            }).start(() => setIsExpanded(false));
        }
    };


    // Reusable Setting Option Component
    const SettingOption = ({ Icon, title, subtitle, onPress }) => (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ paddingVertical: 10 }}>
                <View style={{ paddingHorizontal: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Icon width="28" height="28" />
                        <View style={{ flexDirection: "column", marginLeft: 20 }}>
                            <Text style={{ fontSize: ScreenH * 0.017, color: 'white' }}>{title}</Text>
                            {subtitle && <Text style={{ fontSize: 13, color: 'grey' }}>{subtitle}</Text>}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <View style={{ height: '100%', backgroundColor: '#1C1B1B', paddingVertical: 50, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'column' }}>
                {/* AppBar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex:1}}>
                    {/* Back Icon */}
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{
                            width: ScreenW * 0.07,
                            height: ScreenW * 0.07,
                            borderRadius: 25,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <BackIcon color="#B5B5B5" />
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Title */}
                    <Text style={{ color: '#DDDDDD', fontSize: 18, fontWeight: 'bold' }}>Setting</Text>

                    {/* Search Button */}
                    <TouchableOpacity onPress={handleSearchPress}>
                        <SearchIcon name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                

                {/* List of Options */}
                <View style={{ paddingVertical: ScreenH * 0.02 }}>
                    {isExpanded && (
                    <Animated.View style={{ width, backgroundColor: 'transparent', height:45, borderRadius: 20, borderColor: '#1DB954', borderWidth:1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,}}>
                        <TextInput style={{width:ScreenW*0.74}} placeholder="Search Setting" placeholderTextColor={'white'}/>
                    </Animated.View>                    
                    )}


                    <SettingOption
                        Icon={UserIcon}
                        title="Account"
                        subtitle="Username"
                        onPress={() => { /* Add navigation or functionality here */ }}
                    />

                    <SettingOption
                        Icon={UserIcon}
                        title="Content & Display"
                        subtitle="Language for music • App Language"
                        onPress={() => { /* Add navigation or functionality here */ }}
                    />

                    <SettingOption
                        Icon={VolIcon}
                        title="Playback"
                        subtitle="Gapless playback • Autoplay"
                        onPress={() => { /* Add navigation or functionality here */ }}
                    />

                    <SettingOption
                        Icon={LockIcon}
                        title="Privacy and social"
                        subtitle="Recently played artists • Followers and following"
                        onPress={() => { /* Add navigation or functionality here */ }}
                    />

                    <SettingOption
                        Icon={NotifiIcon}
                        title="Notification"
                        subtitle="Push • Email"
                        onPress={() => { /* Add navigation or functionality here */ }}
                    />

                    <SettingOption
                        Icon={MusicBarIcon}
                        title="Media quality"
                        subtitle="Wi-Fi streaming quality • Cellular streaming quality"
                        onPress={() => { /* Add navigation or functionality here */ }}
                    />

                    <SettingOption
                        Icon={InfoIcon}
                        title="About"
                        subtitle="Version • Privacy Policy"
                        onPress={() => navigation.navigate('AboutScreen')}
                    />
                </View>
            </View>
        </View>
    );
};

export default SettingScreen;
