import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableOpacity, ImageBackground, ScrollView, Image, StatusBar, FlatList, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PlayIcon, ScreenH, ScreenW, BackIcon, MoreIcon, LinkIcon, VerifiedIcon } from './Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const BgImage = require('../../assets/AppImage/BGImage.jpg');

export default ArtistProfile = ({ route, navigation }) => {

    const { artist } = route.params;
    const [isVerified, setIsVerified] = useState(false);
    const [artistAlbum, setArtistAlbum] = useState({ items: [] });
    const [artistTrack, setArtistTrack] = useState({ items: [] });

    const artistId = artist.id

    console.log(artistId);


    // Duration==========================
    const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };


    // Check verified artist or not 
    useEffect(() => {
        if (artist.popularity > 70 && artist.followers.total > 100000) {
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    }, [artist]);


    // Artist Album 
    useEffect(() => {
        const getArtistAlbum = async () => {
            const accessToken = await AsyncStorage.getItem('token');
            if (!artistId) {
                console.error("Artist ID is not defined.");
                return;
            }

            try {
                // Validate access token
                if (!accessToken || typeof accessToken !== 'string') {
                    console.error('Invalid access token');
                    return;
                }

                const response = await axios.get(
                    `https://api.spotify.com/v1/artists/${artistId}/albums`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    const artistAlbum = response.data;
                    setArtistAlbum(artistAlbum);

                } else {
                    console.error('Failed to fetch artist albums:', response.statusText);
                }
            } catch (err) {
                console.error("Error fetching artist albums:", err.message);
            }
        };

        console.log("Artist Album after setting state:", artistAlbum);
        getArtistAlbum();
    }, [artistId]); // Add artistId as a dependency



    // =====================Top Track =================================
    useEffect(() => {
        const getArtistTopTrack = async () => {
            const accessToken = await AsyncStorage.getItem('token');
            if (!artistId) {
                console.error("Artist ID is not defined.");
                return;
            }

            try {
                // Validate access token
                if (!accessToken || typeof accessToken !== 'string') {
                    console.error('Invalid access token');
                    return;
                }

                const response = await axios.get(
                    `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    const artistTrack = response.data;
                    setArtistTrack(artistTrack);

                } else {
                    console.error('Failed to fetch artist albums:', response.statusText);
                }
            } catch (err) {
                console.error("Error fetching artist albums:", err.message);
            }
        };

        getArtistTopTrack();
    }, [artistId]); // Add artistId as a dependency

    console.log("Top Track", artistTrack);

    // Top Track
    const renderItem = ({ item }) => (
        <ScrollView vertical>
            <View style={{ width: ScreenW * 0.89, alignItems: 'center', alignSelf: 'center' }}>
                <Pressable onPress={() => navigation.navigate('PlayScreen')}>
                    <View style={{ height: ScreenH * 0.07, width: ScreenW * 0.89 }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Play Icon */}
                            <Image style={{ width: 50, height: 50, borderRadius: 12 }} source={{ uri: item.album.images[0].url }} />
                            {/* Song & Author Name */}
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingLeft: 15 }}>
                                <Text style={{ fontSize: ScreenW * 0.039, color: 'white' }}>{item.album.name}</Text>
                            </View>
                            {/* <View style={{ paddingRight: ScreenW * 0.1 }}>
                                <Text style={{ color: 'white' }}>{formatDuration(item.track.duration_ms)}</Text>
                            </View> */}
                            {/* Play Icon */}
                            <TouchableOpacity style={{ width: 37, height: 37, borderRadius: 37, backgroundColor: '#2C2C2C', justifyContent: 'center', alignItems: 'center' }}>
                                <PlayIcon width='24' height='24' fill='grey' color='grey' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </View>
        </ScrollView>
    );


    return (
        <View style={{ backgroundColor: '#1C1B1B', height: '100%' }}>
            <View style={{ flexDirection: 'column', height: ScreenH * 0.33, backgroundColor: '#2C2B2B', borderBottomLeftRadius: 66, borderBottomRightRadius: 66 }}>
                <ImageBackground
                    source={{ uri: artist.images[0].url }}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '100%',
                        borderBottomLeftRadius: 66,
                        borderBottomRightRadius: 66,
                        overflow: 'hidden',
                    }}>

                    {/* App Bar */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10, paddingVertical: 50, paddingHorizontal: 20 }}>


                        {/* Back Icon */}
                        <TouchableOpacity
                            style={{ width: ScreenW * 0.07, height: ScreenW * 0.07, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.goBack()}
                        >
                            <BackIcon color="#B5B5B5" />
                        </TouchableOpacity>

                        {/* More Options Button */}
                        <TouchableOpacity style={{ opacity: 0.4 }} onPress={() => console.log('More options')}>
                            <MoreIcon fill="#B5B5B5" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>

            <View style={{ paddingVertical: ScreenH * 0.018 }}>
                {/* User Name */}
                <View style={{ marginBottom: 40 }}>

                    {/* Artist Name */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: ScreenW * 0.05, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{artist.name}</Text>
                        {isVerified && (
                            <VerifiedIcon width={18} height={18} style={{ marginLeft: 10 }} />)
                        }
                        <Text style={{ fontWeight: 'bold', color: '#42C83C', marginLeft: 5 }}>Verified</Text>
                    </View>

                    {/*============================ Track ========================*/}
                    <Text style={{ alignItems: 'center', textAlign: 'center' }}>Helo</Text>

                    {/* =====================================Albums============================= */}
                    <View>
                        <Text style={{ color: 'white', fontSize: ScreenW * 0.05, fontWeight: 'bold', paddingLeft: 25, paddingBottom: 10 }}>Albums</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 2, paddingHorizontal: 20, }}>
                        {artistAlbum.items.map(item => (
                            <TouchableOpacity key={item.id} style={{ marginRight: 10 }} onPress={() => navigation.navigate('PlayScreen', { recentlyPlayed: item })}>
                                <View style={{
                                    flexDirection: 'column',
                                    height: ScreenH * 0.28,
                                    marginBottom: 10
                                }}>
                                    <View style={{
                                        width: ScreenW * 0.38,
                                        height: ScreenH * 0.24,
                                        borderRadius: 30
                                    }}>
                                        <View style={{ width: ScreenW * 0.38, height: ScreenH * 0.23, overflow: 'hidden', borderRadius: 30 }}>
                                            <Image source={{ uri: item.images[0].url }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                        </View>

                                        {/* Play Icon  */}
                                        {/* <TouchableOpacity style={styles.playIconContainer}>
                                            <PlayIcon width="20" height="20" fill="#42C83C" color="#42C83C" style={styles.playIcon} />
                                        </TouchableOpacity> */}
                                    </View>

                                    {/* PlayList Name & Authors */}
                                    <View style={{ width: ScreenW * 0.38, }}>
                                        <Text style={{ color: 'white', fontWeight: '700', fontSize: ScreenW * 0.033, marginBottom: 0, paddingRight: 10, paddingLeft: 2 }} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>


                    {/* Top Track */}
                    <View>
                        <Text style={{ color: 'white', fontSize: ScreenW * 0.05, fontWeight: 'bold', paddingLeft: 25, paddingBottom: 5 }}>Top Track</Text>
                    </View>

                    <View style={{ height: ScreenH * 0.55 }}>
                        <ScrollView vertical
                            contentContainerStyle={{ paddingBottom: 300 }}
                            style={{ flex: 1 }}>
                            {artistTrack && artistTrack.tracks && Array.isArray(artistTrack.tracks) ? (
                                artistTrack.tracks.map(item => (
                                    <View style={{ width: ScreenW * 0.89, alignItems: 'center', alignSelf: 'center' }}>
                                        <Pressable onPress={() => navigation.navigate('PlayScreen')}>
                                            <View style={{ height: ScreenH * 0.07, width: ScreenW * 0.89 }}>
                                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                                    {/* Track Image */}
                                                    <Image style={{ width: 50, height: 50, borderRadius: 12 }} source={{ uri: item.album.images[0].url }} />
                                                    {/* Song & Album Name */}
                                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingLeft: 15 }}>
                                                        <Text style={{ fontSize: ScreenW * 0.039, color: 'white' }}>{item.name}</Text>
                                                        <Text style={{ fontSize: ScreenW * 0.028, color: 'white' }}>{item.album.name}</Text>
                                                    </View>
                                                    {/* Duration */}
                                                    <View style={{ paddingRight: ScreenW * 0.1 }}>
                                                        <Text style={{ color: 'white' }}>{formatDuration(item.duration_ms)}</Text>
                                                    </View>
                                                    {/* Play Icon */}
                                                    <TouchableOpacity style={{ width: 37, height: 37, borderRadius: 37, backgroundColor: '#2C2C2C', justifyContent: 'center', alignItems: 'center' }}>
                                                        <PlayIcon width='24' height='24' fill='grey' color='grey' />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>
                                ))
                            ) : (
                                <Text>No tracks available</Text>
                            )}
                        </ScrollView>
                    </View>


                </View>
            </View>
        </View>
    )
}