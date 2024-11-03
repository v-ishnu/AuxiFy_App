import React, { useContext } from 'react';
import { View, Text, FlatList, Image, ScrollView, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { PlayIcon, FavIcon, MoreIcon, logo, SearchIcon, ScreenH, ScreenW, BackIcon,PlayerProvider } from '../Component/Assets';


const RecentPlayed = ({ route, navigation }) => {
  const { recentlyPlayed } = route.params;
  // const {currentTrack, setCurrentTrack} = useContext(PlayerProvider);

  // Function to convert milliseconds to minutes and seconds
  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };




  const renderItem = ({ item}) => (
    <View style={{ width: ScreenW * 0.89, alignItems: 'center', alignSelf:'center' }}>
      <Pressable onPress={() => navigation.navigate('PlayScreen')}>
        <View style={{ height: ScreenH * 0.07, width: ScreenW * 0.89 }}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Play Icon */}
            <Image style={{ width: 50, height: 50, borderRadius:12 }} source={{ uri: item.track.album.images[0].url }} />

            {/* Song & Author Name */}

            <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingLeft: 15 }}>
              <Text style={{ fontSize: ScreenW * 0.039, color:'white' }}>{item.track.name}</Text>
              <Text style={{ fontSize: ScreenW * 0.028 }}>{item.track.artists[0].name}</Text>
            </View>
          
            <View style={{paddingRight:ScreenW*0.1}}> 
              <Text style={{color:'white'}}>{formatDuration(item.track.duration_ms)}</Text>
            </View>
            {/* Play Icon */}
            <TouchableOpacity style={{ width: 37, height: 37, borderRadius: 37, backgroundColor: '#2C2C2C', justifyContent: 'center', alignItems: 'center' }}>
              <PlayIcon width='24' height='24' fill='grey' color='grey' />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  );



  return (
    <View style={{ flex: 1, backgroundColor: '#1C1B1B', paddingVertical: 30, flexDirection: 'column' }}>
      {/* AppBar */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: ScreenW * 0.582, zIndex: 1, paddingVertical: 20 }}>
          {/* Back Icon */}
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{ width: ScreenW * 0.07, height: ScreenW * 0.07, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center', }}>
              <BackIcon color="#B5B5B5" />
            </View>
          </TouchableWithoutFeedback>

          {/* Title */}
          <Text style={{ color: '#DDDDDD', fontSize: 18, fontWeight: 'bold' }}>Recently Played</Text>
        </View>
      </View>


      {/* Recenta pLayed LIst */}
      <FlatList showsVerticalScrollIndicator={false} data={recentlyPlayed} renderItem={renderItem} keyExtractor={(item) => item.track.id.toString()} />
    </View>
  );
};

export default RecentPlayed;
