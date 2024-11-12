import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, {
    Capability,
    State,
    usePlaybackState,
    useProgress,
} from 'react-native-track-player';

// Import your icons
import BackIcon from '../../assets/Icon/back.svg';
import MoreIcon from '../../assets/Icon/more.svg';
import FavIcon from '../../assets/Icon/favourite.svg';
import ShuffleIcon from '../../assets/Icon/shuffle.svg';
import PrevIcon from '../../assets/Icon/previous.svg';
import PauIcon from '../../assets/Icon/pause.svg';
import PlayIcon from '../../assets/Icon/play.svg';
import NexIcon from '../../assets/Icon/next.svg';
import RepeatIcon from '../../assets/Icon/repeat.svg';

// Import Progress Bar Component
import ProgressBar from '../Component/progressIndicator';

const PlayScreen = ({ route }) => {
    const navigation = useNavigation();
    const { track } = route.params;
    const playbackState = usePlaybackState() || State.None;
    const progress = useProgress();

    const [isPlayerReady, setIsPlayerReady] = useState(false);


    // Initialize TrackPlayer
    const initializePlayer = async () => {
        try {
            const state = await TrackPlayer.getPlaybackState();
            console.log('TrackPlayer state before setup:', state);
    
            if (state == State.None) {
                console.log('TrackPlayer is not set up. Initializing...');
                await TrackPlayer.setupPlayer();
                console.log('Player setup successful.');
    
                await TrackPlayer.updateOptions({
                    capabilities: [
                        Capability.Play,
                        Capability.Pause,
                        Capability.SkipToNext,
                        Capability.SkipToPrevious,
                    ],
                });
                console.log('Player options updated.');
            } else {
                console.log('TrackPlayer already initialized.');
            }
    
            setIsPlayerReady(true); // Mark player as ready
            console.log('isPlayerReady set to true');
        } catch (error) {
            console.error('Error initializing TrackPlayer:', error);
        }
    };
    
    
    

    // Play a track
    const playTrack = async (track) => {
        if (!isPlayerReady) {
            console.error('Player not initialized. Waiting...');
            return;
        }
    
        if (!track || !track.track || !track.track.id) {
            console.error('Invalid track data. Returning to the previous screen.');
            navigation.goBack();
            return;
        }
    
        try {
            console.log('Loading track:', track.track.name);
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: track.track.id,
                url: track.track.preview_url,
                title: track.track.name,
                artist: track.track.artists[0]?.name,
                artwork: track.track.album.images[0]?.url,
            });
            await TrackPlayer.play();
            console.log('Track is playing.');
        } catch (error) {
            console.error('Error playing track:', error);
        }
    };
    

    useEffect(() => {
        console.log('useEffect triggered');
        console.log('isPlayerReady:', isPlayerReady);
        console.log('track data:', JSON.stringify(track, null, 2));
        initializePlayer();
    
        if (isPlayerReady && track && track.track && track.track.id) {
            console.log('Playing track...');
            playTrack(track);
        } else {
            console.warn('Player not ready or invalid track data');
        }
    }, [track, isPlayerReady]);
    
    console.log(track)
    


    return (
        <View style={styles.container}>
            {/* AppBar */}
            <View style={styles.appBar}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={styles.backButn}>
                        <BackIcon color="#B5B5B5" />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.title}>{track?.track?.name}</Text>
                <TouchableWithoutFeedback onPress={() => console.log('More options')}>
                    <View style={styles.moreButn}>
                        <MoreIcon fill="#B5B5B5" />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {/* Space */}
            <View style={{ height: 20 }} />

            {/* Thumbnail */}
            <View>
                <Image
                    source={{ uri: track?.track?.album?.images[0]?.url }}
                    style={styles.thumbnail}
                />
            </View>

            {/* Music Title */}
            <View style={styles.playTitle}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.trackTitle}>{track?.track?.name}</Text>
                    <Text style={styles.artistName}>{track?.track?.artists[0]?.name}</Text>
                </View>
                <FavIcon />
            </View>

            {/* Progress Bar */}
            <ProgressBar progress={progress.position} duration={progress.duration} />

            {/* Player Controls */}
            <View style={styles.playbuttn}>
                <RepeatIcon color="#A7A7A7" />
                <PrevIcon fill="#A7A7A7" color="#A7A7A7" />
                <View style={styles.playButton}>
                    <TouchableWithoutFeedback onPress={playTrack}>
                        {playbackState === State.Playing ? (
                            <PauIcon fill="white" width="38" height="38" />
                        ) : (
                            <PlayIcon fill="white" width="38" height="38" />
                        )}
                    </TouchableWithoutFeedback>
                </View>
                <NexIcon fill="#A7A7A7" color="#A7A7A7" />
                <ShuffleIcon color="#A7A7A7" />
            </View>

            {/* Lyrics */}
            <Pressable style={styles.lyrics}>
                <BackIcon style={styles.lyricsIcon} />
                <Text style={styles.lyricsText}>Lyrics</Text>
            </Pressable>
        </View>
    );
};

export default PlayScreen;

// Dimensions
const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

// Styles
const styles = StyleSheet.create({
    container: {
        height: ScreenH,
        backgroundColor: '#1C1B1B',
        flex: 1,
        alignItems: 'center',
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 10,
        paddingTop: ScreenH * 0.065,
        width: '100%',
    },
    backButn: {
        width: ScreenW * 0.07,
        height: ScreenW * 0.07,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreButn: { opacity: 0.4 },
    title: { color: '#DDDDDD', fontSize: 18, fontWeight: 'bold' },
    thumbnail: {
        width: ScreenW * 0.89,
        height: ScreenH * 0.55,
        backgroundColor: 'green',
        borderRadius: 30,
    },
    playTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: ScreenH * 0.03,
        width: '100%',
    },
    trackTitle: { fontWeight: 'bold', fontSize: ScreenW * 0.05, color: 'white' },
    artistName: { fontSize: ScreenW * 0.034, color: 'white', opacity: 0.6 },
    playbuttn: {
        width: ScreenW * 0.7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ScreenH * 0.07,
    },
    playButton: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#42C83C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lyrics: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    lyricsIcon: { transform: [{ rotate: '90deg' }] },
    lyricsText: {
        color: 'white',
        fontSize: ScreenW * 0.04,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
});
