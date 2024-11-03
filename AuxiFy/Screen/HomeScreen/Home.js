import React, { useEffect, useState, useContext } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlayIcon, FavIcon, MoreIcon, logo, SearchIcon, PlayerContext } from '../Component/Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

const Home = ({route}) => {

    const navigation = useNavigation(); 
    // const {currentTrack, setCurrentTrack} = useContext(PlayerProvider);


    // const {userData} = route.params; // Still not be used in home screen 
    // const { recentlyPlayed } = route.params || {};
    // console.log('Received recentlyPlayed data in Home:', recentlyPlayed);
    // console.log('Received User data in Home:', userData);

    //Menu List
    const menuItems = [
        { id: 1, title: 'All' },
        { id: 2, title: 'Music' },
        { id: 3, title: 'Podcasts' },
    
    ];
    const [activeId, setActiveId] = useState(1);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [topMixSongs, setTopMixSongs] = useState([]);
    const [newRelease, setnewRelease] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    
    // Recent Played Song API
    const getRecentlyPlayedSongs = async () =>{
        const accessToken = await AsyncStorage.getItem('token');
        try {
          const response = await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/player/recently-played?limit=20',
            headers: {
              Authorization: `Bearer ${accessToken}`, 
          },
          })
          const tracks = response.data.items
          setRecentlyPlayed(tracks);
        } catch (err) {
          console.error(err);
        }
      }
    
    useEffect(()=>{
        getRecentlyPlayedSongs();
    },[])



    // Your Top Mixed Song API
    const getTopmix = async () =>{
        const accessToken = await AsyncStorage.getItem('token');
        try {
          const response = await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/browse/new-releases',
            headers: {
              Authorization: `Bearer ${accessToken}`, 
          },
          })
          const topMixSong = response.data.albums.items
          setTopMixSongs(topMixSong);
        } catch (err) {
          console.error(err);
        }
      }
    
    useEffect(()=>{
        getTopmix();
    },[])


    // Your Top Mixed  Song API
    const getNewRelease = async () =>{
        const accessToken = await AsyncStorage.getItem('token');
            try {
              const response = await axios({
                method: 'GET',
                url: 'https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20',
                headers: {
                  Authorization: `Bearer ${accessToken}`, 
              },
              })
              const newReleaseTrack = response.data.albums.items
              setnewRelease(newReleaseTrack);
            } catch (err) {
              console.error(err);
            }
        }
        
    useEffect(()=>{
        getNewRelease();
    },[])


    // Top Artists API
    useEffect(() => {
        const getTopArtists = async () => {
            try{
                const accessToken = await AsyncStorage.getItem("token");
                if (!accessToken){
                    console.log("Access Token Not Found");
                    return;
                }
                const type = "artists";
                const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`, 
                    },
                })
                const topArtists = response.data.items;
                setTopArtists(topArtists);
            } catch(err){
                console.log(err.message);
            }
        }
        getTopArtists();
    }, [])





    // AllUI =================================================================================================
    const renderAllUI = () => (
        <ScrollView vertical showsVerticalScrollIndicator={false} style={{ paddingVertical:5, marginBottom: ScreenH*0.45}} contentContainerStyle={[styles.playlist, { flexGrow: 1 }]} >
    
            {/* Recent Played */}
            <View>
                <Text style={{ color: 'white', fontSize: ScreenW * 0.05, fontWeight: 'bold', paddingLeft: 25, paddingBottom: 10 }}>Recent Played</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical: 2, paddingHorizontal: 20,}}>
                {recentlyPlayed.map(item => (
                    <TouchableOpacity key={item.id} style={styles.topHitItem} onPress={() => navigation.navigate('PlayScreen',{recentlyPlayed: item})}>
                        <View style={styles.topHitContainer}>
                            <View style={styles.topHitLayout}>
                                <View style={{width: ScreenW * 0.38,height: ScreenH * 0.23,overflow: 'hidden',borderRadius: 30}}>
                                    <Image source={{uri:item.track.album.images[0].url}} style={{ width: '100%', height: '100%', resizeMode:'cover'}} />
                                </View>

                                {/* Play Icon  */}
                                <TouchableOpacity style={styles.playIconContainer}>
                                    <PlayIcon width="20" height="20" fill="#42C83C" color="#42C83C" style={styles.playIcon} />
                                </TouchableOpacity>
                            </View>
                            
                            {/* PlayList Name & Authors */}
                            <View style={{width: ScreenW * 0.38,}}>
                                <Text style={{color: 'white',fontWeight: '700', fontSize: ScreenW * 0.033,marginBottom: 0,paddingRight:10, paddingLeft:2}} numberOfLines={2} ellipsizeMode="tail">{item.track.name}</Text>
                                <Text style={{color: '#aeaeae',fontSize: ScreenW * 0.028, paddingLeft:2}}>{item.track.artists[0].name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>



            {/* Top Artists */}
            <View>
                <Text style={{ color: 'white', fontSize: ScreenW * 0.05, fontWeight: 'bold', paddingLeft: 25, paddingBottom: 10 }}>Top Artists</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical: 2, paddingHorizontal: 20,}}>
                {topArtists.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.topHitItem} onPress={() => navigation.navigate('ArtistProfile',{artist: item })}>
                        <View style={styles.topHitContainer}>
                            <View style={styles.topHitLayout}>
                                <View style={{width: ScreenW * 0.38,height: ScreenH * 0.23,overflow: 'hidden',borderRadius: 30}}>
                                    <Image source={{uri: item.images[0].url}} style={{ width: '100%', height: '100%', resizeMode:'cover'}} />
                                </View>
                            </View>
                            
                            {/* PlayList Name & Authors */}
                            <View style={{width: ScreenW * 0.38, paddingHorizontal:7}}>
                                <Text style={{color: 'white',fontWeight: '700', fontSize: ScreenW * 0.033, marginBottom: 0,}}>{item.name}</Text>
                                {/* <Text style={{color: '#aeaeae',fontSize: ScreenW * 0.028}}>{item.artists.map(artist => artist.name).join(', ')}</Text> */}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Trending Section */}
            <View>
                <Text style={{ color: 'white', fontSize: ScreenW * 0.05, fontWeight: 'bold', paddingLeft: 25, paddingBottom: 10 }}>Your top mixes</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical: 2, paddingHorizontal: 20,}}>
                {topMixSongs.map(item => (
                    <TouchableOpacity key={item.id} style={styles.topHitItem} onPress={() => handleMenuPress(item.title)}>
                        <View style={styles.topHitContainer}>
                            <View style={styles.topHitLayout}>
                                <View style={{width: ScreenW * 0.38,height: ScreenH * 0.23,overflow: 'hidden',borderRadius: 30}}>
                                    <Image source={{uri: item.images[0].url}} style={{ width: '100%', height: '100%', resizeMode:'cover'}} />
                                </View>

                                {/* Play Icon  */}
                                {/* <TouchableOpacity style={styles.playIconContainer}>
                                    <PlayIcon width="20" height="20" fill="grey" color="grey" style={styles.playIcon} />
                                </TouchableOpacity> */}
                            </View>
                            
                            {/* PlayList Name & Authors */}
                            <View style={{width: ScreenW * 0.38,}}>
                                <Text style={{color: 'white',fontWeight: '700', fontSize: ScreenW * 0.033, marginBottom: 0,}}>{item.name}</Text>
                                <Text style={{color: '#aeaeae',fontSize: ScreenW * 0.028}}>{item.artists.map(artist => artist.name).join(', ')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Trending Section */}
            <View>
                <Text style={{ color: 'white', fontSize: ScreenW * 0.05, fontWeight: 'bold', paddingLeft: 25, paddingBottom: 10 }}>Your top mixes</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical: 2, paddingHorizontal: 20,}}>
                {topMixSongs.map(item => (
                    <TouchableOpacity key={item.id} style={styles.topHitItem} onPress={() => handleMenuPress(item.title)}>
                        <View style={styles.topHitContainer}>
                            <View style={styles.topHitLayout}>
                                <View style={{width: ScreenW * 0.38,height: ScreenH * 0.23,overflow: 'hidden',borderRadius: 30}}>
                                    <Image source={{uri: item.images[0].url}} style={{ width: '100%', height: '100%', resizeMode:'cover'}} />
                                </View>

                                {/* Play Icon  */}
                                {/* <TouchableOpacity style={styles.playIconContainer}>
                                    <PlayIcon width="20" height="20" fill="grey" color="grey" style={styles.playIcon} />
                                </TouchableOpacity> */}
                            </View>
                            
                            {/* PlayList Name & Authors */}
                            <View style={{width: ScreenW * 0.38,}}>
                                <Text style={{color: 'white',fontWeight: '700', fontSize: ScreenW * 0.033, marginBottom: 0,}}>{item.name}</Text>
                                <Text style={{color: '#aeaeae',fontSize: ScreenW * 0.028}}>{item.artists.map(artist => artist.name).join(', ')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
    
            
        </ScrollView>
    );
    


    // Music UI 
    const renderMusicUI = () => (
        <ScrollView>
            {/* Top Hit */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical: 2, paddingHorizontal: 20,}}>
                {topMixSongs.map(item => (
                    <TouchableOpacity key={item.id} style={styles.topHitItem} onPress={() => handleMenuPress(item.title)}>
                        <View style={styles.topHitContainer}>
                            <View style={styles.topHitLayout}>
                                <View style={{width: ScreenW * 0.38,height: ScreenH * 0.23,overflow: 'hidden',borderRadius: 30}}>
                                    <Image source={{uri: item.images[0].url}} style={{ width: '100%', height: '100%', resizeMode:'cover'}} />
                                </View>

                                {/* Play Icon  */}
                                {/* <TouchableOpacity style={styles.playIconContainer}>
                                    <PlayIcon width="20" height="20" fill="grey" color="grey" style={styles.playIcon} />
                                </TouchableOpacity> */}
                            </View>
                            
                            {/* PlayList Name & Authors */}
                            <View style={{width: ScreenW * 0.38,}}>
                                <Text style={{color: 'white',fontWeight: '700', fontSize: ScreenW * 0.033, marginBottom: 0,}}>{item.name}</Text>
                                <Text style={{color: '#aeaeae',fontSize: ScreenW * 0.028}}>{item.artists.map(artist => artist.name).join(', ')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>


            {/* Playlist */}
            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={[styles.playlist, { flexGrow: 1 }]}>
                {/* Playlist */}
                <View style={{ paddingTop: 0, justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Play list Row */}
                    <View style={{ width: ScreenW, flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ color: 'white', fontSize: ScreenW * 0.043, fontWeight: 'bold', paddingLeft: 34 }}>
                                Playlist
                        </Text>
                        <Pressable onPress={() => navigation.navigate('RecentlyPlayed', { recentlyPlayed })}>
                            <Text style={{ fontSize: ScreenW * 0.03, paddingRight: 10, color: '#C6C6C6' }}>
                                See more
                            </Text>
                        </Pressable>
                    </View>

                    {/* Music Item */}
                    <View style={{ height: ScreenH, width: ScreenW * 0.89, alignItems: 'center' }}>
                        {recentlyPlayed.slice(0, 5).map(item => (
                            <Pressable onPress={() => navigation.navigate('PlayScreen')}>
                                <View style={{ height: ScreenH * 0.07, width: ScreenW * 0.89 }}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                        
                                        {/* Play Icon */}
                                        <TouchableOpacity style={{ width: 37, height: 37, borderRadius: 37, backgroundColor: '#2C2C2C', justifyContent: 'center', alignItems: 'center' }}>
                                            <PlayIcon width='24' height='24' fill='grey' color='grey' />
                                        </TouchableOpacity>

                                            {/* Song & Author Name */}

                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingLeft: 15 }}>
                                                <Text style={{ fontSize: ScreenW * 0.04 }}>{item.track.name}</Text>
                                                <Text style={{ fontSize: ScreenW * 0.03 }}>{item.track.artists[0].name}</Text>
                                            </View>

                                            {/* Favrouit Icon */}
                                            <FavIcon width='20' height='20' />
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ width: ScreenW * 0.89 }}>
                            <View style={{ height: 50, width: 100 }}>
                                <Text style={{ fontSize: ScreenW * 0.05 }}>Recent</Text>
                            </View>
                        </View>
                    </ScrollView>
            </ScrollView>
        </ScrollView>
    );




    // Podcast UI
    const renderPodcastUI = () => (
        <View>
            
        </View>
    );




    return (
        <View style={{ backgroundColor: '#1C1B1B', alignItems: 'center' }}>
            <View style={styles.appbar}>
                {/* Search Icon */}
                <TouchableOpacity>
                    <SearchIcon size={24} color="#fff" style={styles.icon} />
                </TouchableOpacity>

                {/* Logo */}
                <Image source={logo} style={styles.logo} />

                {/* More Options Icon */}
                <TouchableOpacity>
                    <MoreIcon size={24} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Banner */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PlayScreen')}>
                <View style={styles.banner} onPres>
                    {/* Image */}
                    <Image source={require('../../assets/AppImage/Billie-eilish(2).png')} style={styles.bannerImage} />

                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Fetured Album</Text>
                        <Text style={styles.bannerSongName}>Happier Than Ever</Text>
                        <Text style={styles.bannerAuthor}>Billie Eilish</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>



            {/* Menu */}
            <View style={{ marginHorizontal: 30, marginVertical: 20, flexDirection: 'row', alignSelf: 'flex-start', gap: 10 }}>
                {menuItems.map(item => (
                    <Pressable key={item.id} style={{ backgroundColor: activeId === item.id ? '#42C83C' : '#282828', borderRadius: 30, paddingHorizontal: 18, paddingVertical: 7, }} onPress={() => setActiveId(item.id)}>
                        <Text style={{ color: '#fff', fontSize: ScreenW * 0.033, fontWeight: '500' }}>{item.title}</Text>
                    </Pressable>
                ))}
            </View>



            {/* Filtring  */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {activeId === 1 && renderAllUI()}
                {activeId === 2 && renderMusicUI()}
                {activeId === 3 && renderPodcastUI()}
            </ScrollView>






        </View>

    );
};


const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: ScreenH * 0.03,
        width: '100%',
    },
    logo: {
        width: ScreenW * 0.23,
        height: ScreenH * 0.1,
        resizeMode: 'contain',
    },
    icon: {
        padding: 10,
    },
    banner: {
        width: ScreenW * 0.87,
        height: ScreenH * 0.16,
        backgroundColor: '#42C83C',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 1,
        position: 'relative',
    },
    bannerImage: {
        width: ScreenW * 0.47,
        height: ScreenH * 0.25,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    bannerContent: {
        flexDirection: 'column',
        paddingLeft: 10,
    },
    bannerTitle: {
        fontSize: ScreenW * 0.03,
        color: 'white',
        fontWeight: 'bold',
    },
    bannerSongName: {
        fontSize: ScreenW * 0.06,
        width: ScreenW * 0.4,
        color: 'white',
        fontWeight: 'bold'
    },
    bannerAuthor: {
        color: 'white',
        fontSize: ScreenW * 0.035,
        fontWeight: 'bold'
    },
    menu: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    // menuItem: {
    //     padding: 15,
    //     borderRadius: 20,
    //     backgroundColor: '#42C83C', 
    //     marginRight: 10,
    // },
    menuText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    topHit: {
        paddingVertical: 2,
        paddingHorizontal: 20,
    },
    topHitContainer: {
        flexDirection: 'column',
        height: ScreenH * 0.28,
        marginBottom: 20
    },
    topHitLayout: {
        width: ScreenW * 0.38,
        height: ScreenH * 0.24,
        borderRadius: 30
    },
    topHitBanner: {
        width: ScreenW * 0.38,
        height: ScreenH * 0.23,
        overflow: 'hidden',
        borderRadius: 30
    },
    topHitItem: {
        marginRight: 10,
    },
    topHitImage: {
        width: '100%',
        height: '100%'
    },
    topHitSong: {
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontWeight: 'bold',
        fontSize: ScreenW * 0.04,
        marginBottom: 5,
    },
    topHitAuthor: {
        color: 'white',
        position: 'absolute',
        bottom: 0,
        left: 10,
        fontSize: ScreenW * 0.03
    },
    playIconContainer: {
        position: 'absolute',
        backgroundColor: '#2C2C2C',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        bottom: 0,
        right: 10,
        zIndex: 1,
    },
});

export default Home;
