import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, ScrollView, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlayIcon, FavIcon , MoreIcon, logo, SearchIcon} from '../Component/Assets';


// const logo = require('../../assets/AppImage/logo4.png');

const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

const Home = () => {

    const navigation = useNavigation();

    //Menu List
    const menuItems=[
        {id:1, title:'Home'},
        {id:2, title:'Trending'},
        {id:3, title:'Podcasts'},
        {id:5, title:'Artist'},
        {id:6, title:'Library'},
        {id:7, title:'Library'},
    ];

    const topHit=[
        {id:1, title:'Bad Guy', image:require('../../assets/AppImage/BillieEilish.png'), author:'Ellie Billie'},
        {id:2, title:'Scorpion',image:require('../../assets/AppImage/BillieEilish.png'), author:'Drake'},
        {id:3, title:'When we all fall asleep', image:require('../../assets/AppImage/BillieEilish.png'), author:'Ellie Billie'},
        {id:5, title:'Artist', image:require('../../assets/AppImage/BillieEilish.png'), author:'Ellie Billie'},
        {id:6, title:'Library', image:require('../../assets/AppImage/BillieEilish.png'), author:'Ellie Billie'},
        {id:7, title:'Library', image:require('../../assets/AppImage/BillieEilish.png'), author:'Ellie Billie'},
    ];

    const truncateTitle = (title) => {
        return title.length > 15 ? title.substring(0, 15) + '...' : title;
      };

    return (
        <View style={{backgroundColor:'#1C1B1B', alignItems: 'center',}}>
            <View style={styles.appbar}>
                {/* Search Icon */}
                <TouchableOpacity>
                    <SearchIcon size={24} color="#fff" style={styles.icon} />
                </TouchableOpacity>

                {/* Logo */}
                <Image source={logo} style={styles.logo} />

                {/* More Options Icon */}
                <TouchableOpacity>
                    <MoreIcon  size={24} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Banner */}

            <TouchableWithoutFeedback onPress = {()=> navigation.navigate('PlayScreen')}>
                <View style={styles.banner} onPres>
                    {/* Image */}
                    <Image source={require('../../assets/AppImage/Billie-eilish(2).png')} style={styles.bannerImage}/>

                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Fetured Album</Text>
                        <Text style={styles.bannerSongName}>Happier Than Ever</Text>
                        <Text style={styles.bannerAuthor}>Billie Eilish</Text>
                    </View>                
                </View>
            </TouchableWithoutFeedback>

            {/* Menu */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menu}>
                {menuItems.map(item=>(
                    <TouchableOpacity key={item.id} style={styles.menu}onPress={() => handleMenuPress(item.title)}>
                        <Text style={styles.menuText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Top Hit */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topHit}>
                {topHit.map(item => (
                    <TouchableOpacity key={item.id} style={styles.topHitItem} onPress={() => handleMenuPress(item.title)}>
                        <View style={styles.topHitContainer}>
                            {/* Layout */}
                            <View style={styles.topHitLayout}>
                                <View style={styles.topHitBanner}>
                                    {item.image && (
                                        <Image source={item.image} style={styles.topHitImage} />
                                    )}
                                </View>
                                <TouchableOpacity style={styles.playIconContainer}>
                                    <PlayIcon width="20" height="20" fill='grey' color='grey' style={styles.playIcon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.topHitSong}>{truncateTitle(item.title)}</Text>
                            <Text style={styles.topHitAuthor}>{item.author}</Text> 
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>



            {/* Playlist */}
            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.playlist}>

                {/* Playlist */}
                <View style={{paddingTop:0, justifyContent: 'space-between', alignItems:'center'}}>

                    {/* Play list Row */}
                    <View style={{width:ScreenW, flexDirection:'row', flex:1, justifyContent: 'space-between', alignItems:'center', marginVertical:10}}>
                        <Text style={{color:'white', fontSize:ScreenW*0.043, fontWeight:'bold', paddingLeft:34}}>
                            Playlist
                        </Text>
                        <Pressable onPress={{}}>
                            <Text style={{fontSize:ScreenW*0.03,paddingRight:10, color:'#C6C6C6' }}>
                                See more
                            </Text>
                        </Pressable>
                    </View>

                    {/* Music Item */}
                    <View style={{height: ScreenH, width: ScreenW * 0.89, alignItems: 'center'}}>
                    {topHit.map(item => (
                        <Pressable onPress={() => navigation.navigate('PlayScreen')} key={item.id}>
                            <View style={{height: ScreenH * 0.07, width: ScreenW * 0.89}}>
                                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>

                                    {/* Play Icon */}

                                    <TouchableOpacity style={{width: 37, height: 37, borderRadius: 37, backgroundColor: '#2C2C2C', justifyContent: 'center', alignItems: 'center'}}>
                                        <PlayIcon width='24' height='24' fill='grey' color='grey'/>
                                    </TouchableOpacity>

                                    {/* Song & Author Name */}

                                    <View style={{flexDirection: 'column', alignItems: 'flex-start', flex:1, paddingLeft:15}}>
                                        <Text style={{fontSize: ScreenW * 0.04}}>{item.title}</Text>
                                        <Text style={{fontSize: ScreenW * 0.03}}>{item.author}</Text>
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
                    <View style={{width:ScreenW*0.89}}>
                        <View style={{height:50, width: 100}}>
                            <Text style={{fontSize:ScreenW*0.05}}>Recent</Text>
                        </View>
                    </View>
                </ScrollView>
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
        paddingTop: ScreenH *0.03,
        width: '100%',
    },
    logo: {
        width: ScreenW*0.23,
        height: ScreenH*0.1,
        resizeMode: 'contain',
    },
    icon: {
        padding: 10,
    },
    banner:{
        width: ScreenW*0.87,
        height:ScreenH*0.16,
        backgroundColor:'#42C83C',
        borderRadius:22,
        justifyContent:'center',
        alignItems:'flex-start',
        zIndex: 1,
        position:'relative',
    },
    bannerImage:{
        width:ScreenW*0.47,
        height:ScreenH*0.25,
        position:'absolute',
        bottom:0,
        right:0,
    },
    bannerContent:{
        flexDirection:'column',
        paddingLeft:10,
    },
    bannerTitle:{
        fontSize:ScreenW*0.03,
        color:'white',
        fontWeight:'bold',
    },
    bannerSongName:{
        fontSize: ScreenW*0.06,
        width:ScreenW*0.4,
        color:'white',
        fontWeight:'bold'
    }, 
    bannerAuthor:{
        color:'white',
        fontSize:ScreenW*0.035,
        fontWeight:'bold'
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
        fontSize:18,
        color: '#fff',
        fontWeight: 'bold',
    },
    topHit:{
        paddingVertical: 10,
        paddingHorizontal: 20, 
    },
    topHitContainer:{
        flexDirection:'column',
        height:ScreenH*0.28,
        marginBottom:20
    },
    topHitLayout:{
        width:ScreenW*0.38,
        height:ScreenH*0.24,
        borderRadius:30
    },
    topHitBanner:{
        width:ScreenW*0.38,
        height:ScreenH*0.23,
        overflow: 'hidden',
        borderRadius:30
    },
    topHitItem:{
        marginRight: 10,
    },
    topHitImage:{
        width:'100%',
        height:'100%'
    },
    topHitSong:{
        color:'white',
        position:'absolute',
        bottom:10,
        left:10,
        fontWeight:'bold',
        fontSize:ScreenW*0.04,
        marginBottom:5,
    },
    topHitAuthor:{
        color:'white',
        position:'absolute',
        bottom:0,
        left:10,
        fontSize:ScreenW*0.03
    },
    playIconContainer: {
        position: 'absolute',
        backgroundColor: '#2C2C2C', 
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30, 
        height: 30,
        bottom:0,
        right:10,
        zIndex:1,
    },
});

export default Home;
