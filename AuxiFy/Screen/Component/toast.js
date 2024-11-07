import react from 'react';
import {View,} from 'react-native';


export default customToast = () =>{
    return(
        <View style={{width:"87%", height:"10%", backgroundColor:'gray', alignItems:'center', alignSelf:'center', borderRadius:12, marginTop:40}}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                <Text>Hii</Text>
                <Text>Hii</Text>
            </View>
    
            <Text>Hii </Text>
        </View>
    )
}