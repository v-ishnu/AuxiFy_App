import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableOpacity, ImageBackground, ScrollView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ScreenH, ScreenW, BackIcon, MoreIcon, LinkIcon, VerifiedIcon } from '../Component/Assets';


const BgImage = require('../../assets/AppImage/BGImage.jpg');

export default ArtistProfile = ({ route, navigation }) => {

    const { artist } = route.params;
    const [isVerified, setIsVerified] = useState(false);
    const [artistAlbum, setArtistAlbum] = useState([]);


    const artistId = artist.id

    console.log(artistId);


    // Check verified artist or not 
    useEffect(() => {
        if (artist.popularity > 70 && artist.followers.total > 100000) {
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    }, [artist]);


    // Artist Topp Track 
    useEffect(() => {
    const getArtistAlbum = async () => {
        const accessToken = await AsyncStorage.getItem('token');
        if (!artistId) {
            console.error("Artist ID is not defined.");
            return;
        }
        console.log("Artist ID:", artistId);

        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/artists/${artistId}/albums`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const artistAlbum = response.data.items;
            setArtistAlbum(artistAlbum);
            console.log("Artist Album after setting state:", artistAlbum); // Log after setting state
        } catch (err) {
            console.error("Error fetching artist albums:", err.message);
        }
    };

    getArtistAlbum();
}, [artistId]);
      

    return (
        <View style={{ backgroundColor: '#1C1B1B', height: '100%' }}>
            <View style={{ flexDirection: 'column', height: ScreenH * 0.33, backgroundColor: '#2C2B2B', borderBottomLeftRadius: 66, borderBottomRightRadius: 66 }}>

                <ImageBackground
                    source={{ uri: artist.images[0].url }}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
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

            <View style={{ paddingVertical: ScreenH * 0.02 }}>
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

                    {/* Track */}
                    <Text style={{alignItems:'center', textAlign:'center'}}>Helo</Text>

                    {/* Albums */}
                    <ScrollView vertical showsVerticalScrollIndicator={false} style={{ paddingVertical: 5, marginBottom: ScreenH * 0.45 }} contentContainerStyle={{ flexGrow: 1 }} >
                        <View>
                            <Text style={{ color: 'white', fontSize: ScreenW * 0.05, fontWeight: 'bold', paddingLeft: 25, paddingBottom: 10 }}>Album</Text>
                        </View>

                        
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 2, paddingHorizontal: 20, }}>
                            {artistAlbum.map(item => (
                                <View key={item.id} style={{ width: 80, height:80}}>
                                    <Image source={{ uri: item.album.images[0].url}} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                </View>
                                
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}