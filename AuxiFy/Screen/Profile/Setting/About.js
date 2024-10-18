import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { ScreenH, ScreenW, BackIcon, MoreIcon, LinkIcon } from '../../Component/Assets';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const AboutScreen = () => {
    const flashMessage = useRef();
    const navigation = useNavigation();
    const [clickCount, setClickCount] = useState(0);

    const handleVersionPress = () => {
        setClickCount(prevCount => {
            const newCount = prevCount + 1;
            const remainingClicks = 8 - newCount; 

            if (remainingClicks > 0) {
                showMessage({
                    message:`${remainingClicks} clicks remaining to redirect`,
                    duration:showMessage.LENGTH_SHORT,
                })
            }

            if (remainingClicks === 0) {
                // Navigate to the target screen when 8 clicks are reached
                navigation.navigate('TargetScreen');

                // Show a final message
                flashMessage.current.showMessage({
                    text: `${remainingClicks} clicks remaining to redirect`,
                    duration: Snackbar.LENGTH_SHORT,
                    style: {borderColor:'#222', color:'red'},
                });

                return 0; // Reset click count after redirection
            }

            return newCount;
        });
    };

    const settingsItems = [
        { id: 0, title: 'Version', value: DeviceInfo.getVersion(), onPress: handleVersionPress, Component: Text },
        { id: 1, title: 'Privacy Policy', value: '', onPress: () => console.log('Privacy Policy'), Component: Text }, 
        { id: 2, title: 'Third-party Licenses', value: '', onPress: () => console.log('Third-party Licenses'), Component: LinkIcon },
        { id: 3, title: 'Terms of Use', value: '', onPress: () => console.log('Terms of Use'), Component: LinkIcon },
        { id: 4, title: 'Platform Rules', value: '', onPress: () => console.log('Platform Rules'), Component: LinkIcon },
    ];

    return (
        <View style={{ height: '100%', backgroundColor: '#1C1B1B', paddingVertical: 50, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'column' }}>
                {/* AppBar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>
                    {/* Back Icon */}
                    <TouchableOpacity 
                        style={{ width: ScreenW * 0.07, height: ScreenW * 0.07, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center' }} 
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon color="#B5B5B5" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={{ color: '#DDDDDD', fontSize: 18, fontWeight: 'bold' }}>About</Text>

                    {/* More Options Button */}
                    <TouchableOpacity style={{ opacity: 0.4 }} onPress={() => console.log('More options')}>
                        <MoreIcon fill="#B5B5B5" />
                    </TouchableOpacity>
                </View>

                {/* Settings Items */}
                {settingsItems.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={{width: ScreenW * 0.89, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
                        onPress={item.onPress}>
                        <FlashMessage ref={flashMessage}/>
                        <Text style={{ fontSize: ScreenW * 0.038, color: 'white'}}>{item.title}</Text>

                        {/* Conditional rendering based on the component type */}
                        {item.Component === LinkIcon ? (
                            <item.Component width="20" height="20" alignItems="center" />
                        ) : (
                            <item.Component style={{ fontSize: ScreenW * 0.0295 }}>{item.value}</item.Component>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default AboutScreen;


const styles = StyleSheet.create({
    flashMessage: {
        position:'absolute',
        bottom:0,
        borderRadius: 12,
        opacity: 0.8,
        borderWidth: 2,
        borderColor: '#222',
        margin: 12
    }
  });
