import React from "react";
import { SafeAreaView, View, Text, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity} from 'react-native';
import { ScreenH, ScreenW, BackIcon, SearchIcon, DevImage, PlayIcon  } from '../Component/Assets';
import { TextInput } from "react-native-gesture-handler";

export default ProfileEdit = ({route, navigation }) => {
    const {userData} = route.params;

    return (
        <View style={{flex: 1, backgroundColor: '#1C1B1B', paddingVertical:40, paddingHorizontal:20, flexDirection:'column'}}>
            <View>
                {/* AppBar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: ScreenW*0.5, zIndex:1}}>
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
                    <Text style={{ color: '#DDDDDD', fontSize: 18, fontWeight: 'bold'}}>Profile</Text>
                </View>

                {/* User*/}
                <View style={{paddingVertical:25}}>
                    {/* User Profile */}
                    <View style={{width:ScreenW, alignItems:'center', paddingVertical:ScreenH*0.02}}>
                        <View style={{height:ScreenH*0.1, alignItems:'center', overflow: 'hidden',}}>
                            <View style={{}}>
                                {userData?.images && userData.images.length > 0 && userData.images[0]?.url ? (
                                    <Image source={{ uri: userData.images[0].url }} style={{ width: 75, height: 75, borderRadius: 35, alignItems: 'center', justifyContent: 'center' }} />
                                ) : (
                                    <Image source={DevImage} style={{ width: 75, height: 75, borderRadius: 35, alignItems: 'center', justifyContent: 'center' }}/>
                                )}
                                <TouchableWithoutFeedback style={{position: 'absolute',backgroundColor: '#2C2C2C', borderRadius: 30,justifyContent: 'flex-end',alignItems: 'center',width: 30, height: 30,bottom:0,right:50,zIndex:1,}}>
                                    <PlayIcon width="20" height="20" fill='grey' color='grey'/>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>

                    {/* User Id */}
                    <View style={{flexDirection: 'row', borderColor:'grey', borderWidth:1, width:ScreenW*0.89, paddingVertical:ScreenH*0.02, borderRadius:20,alignItems:'center' , paddingHorizontal: 20}}>
                        <Text style={{color:'white'}}>SpotiFy</Text>
                        <View style={{width:1, backgroundColor:'white', alignSelf:'center', height:'100%', paddingTop:10, paddingBottom:10,marginHorizontal:10}}/>
                        <Text style={{color:'white', fontSize:ScreenW*0.04, fontWeight:'500'}}>{userData?.id}</Text>
                    </View>
                    <View>
                        <TextInput>

                        </TextInput>
                    </View>

                    <View>
                        <Text>

                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}