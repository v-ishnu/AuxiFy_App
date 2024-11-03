import React, {useState} from 'react';
import BackIcon from '../../assets/Icon/back.svg';
import MoreIcon from '../../assets/Icon/more.svg';
import FavIcon from '../../assets/Icon/favourite.svg'
import ShuffleIcon from '../../assets/Icon/shuffle.svg'
import PrevIcon from '../../assets/Icon/previous.svg'
import PauIcon from '../../assets/Icon/pause.svg'
import PlayIcon from '../../assets/Icon/play.svg'
import NexIcon from '../../assets/Icon/next.svg'
import RepeatIcon from '../../assets/Icon/repeat.svg'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Modal,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../Component/progressIndicator';
import { transform } from 'typescript';
import { Pressable } from 'react-native-gesture-handler';

const PlayScreen = ({route}) => {

    const { recentlyPlayed } = route.params;

    console.log("Recent Played", recentlyPlayed);


    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View style={styles.container}>

            {/* AppBar */}
            <View style={styles.appBar}>

                {/* Back Button */}
                <TouchableWithoutFeedback style={styles.backButn} onPress={() => navigation.goBack()}>
                    <View style={styles.backButn}>
                        <BackIcon color="#B5B5B5" />
                    </View>
                </TouchableWithoutFeedback>

                {/* Title */}
                <Text style={styles.title}>$tITLE</Text>

                {/* More Options Button */}
                <TouchableWithoutFeedback style={styles.moreButn} onPress={() => setModalVisible(true)}>
                    <View style={styles.moreButn}>
                        <MoreIcon fill="#B5B5B5" />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>More Options</Text>
                        <TouchableWithoutFeedback onPress={() => console.log("Option 1 pressed!")}>
                            <Text style={styles.modalOption}>Option 1</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => console.log("Option 2 pressed!")}>
                            <Text style={styles.modalOption}>Option 2</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>


            {/* Space */}
            <View style={{height:20}} />



            {/* Thumbnail */}
            <View>
                <Image source={require('../../assets/AppImage/BillieEilish.png')} style={styles.thumbnail}></Image>
            </View>


            {/* Music Title */}
            <View style={styles.playTitle}>
                {/* Tilte */}
                <View style={{flexDirection:'column'}}>
                    <Text style={{fontWeight:'bold', fontSize: ScreenW*0.05}}>Helo</Text>
                    <Text style={{fontSize: ScreenW*0.04}}>Helo</Text>
                </View>
                {/* Favourite*/}
                <FavIcon />
            </View>

            <ProgressBar />

            {/* Next, Shuffle Option */}
            <View style={styles.playbuttn}>
                <RepeatIcon color="#A7A7A7"/>
                <PrevIcon fill="#A7A7A7" color="#A7A7A7"/>
                <View style={{
                    width:70,
                    height:70,
                    borderRadius:50,
                    backgroundColor:'#42C83C',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <PauIcon fill='white' width="38" height="38"/>
                </View>
                <NexIcon fill="#A7A7A7" color="#A7A7A7"/>
                <ShuffleIcon color="#A7A7A7"/>
            </View>

            <View>
            {/* Pressable to show/hide ScrollView */}
            <Pressable
                style={[styles.lyrics, { width: '60%' }]}
                onPress={{}}>
                <BackIcon style={[styles.lyricsIcon]} />
                <Text style={styles.lyricsText}>Lyrics</Text>
            </Pressable>
</View>



        </View>
    );
};

export default PlayScreen;

const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

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

    moreButn: {
        opacity: 0.4,
    },

    title: {
        color: '#DDDDDD',
        fontSize: 18,
        fontWeight: 'bold',
    },
    thumbnail:{
        width:ScreenW*0.89,
        height:ScreenH*0.55,
        backgroundColor:'green',
        borderRadius:30,
    },

    playTitle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: ScreenH * 0.03,
        paddingLeft:30,
        paddingRight:30,
        width: '100%',
    },
    playbuttn:{
        width:ScreenW*0.7,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:ScreenH*0.07
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalOption: {
        fontSize: 18,
        marginVertical: 10,
        color: '#007BFF', // Link color
    },
    closeButton: {
        fontSize: 16,
        marginTop: 20,
        color: 'red',
    },
    lyrics:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lyricsIcon: {
       transform:[{rotate: '90deg'}],
       
    },
    lyricsText:{
        color: 'white', 
        fontSize: ScreenW * 0.04, 
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'flex-start',
    },
});
