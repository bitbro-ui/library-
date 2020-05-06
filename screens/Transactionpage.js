import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,inputbox} from 'react-native';
import  * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'; 
import { TextInput } from 'react-native-gesture-handler';
import { timing } from 'react-native-reanimated';

export default class Transactionscreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hascamerapermission:null,
            scanned:false,
            scandata:'',
            buttonstate : 'normal',
            scannedstudentid:'',
            scannedbookid:''
        }
    }
    
    getcamerapermission = async(id)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hascamerapermission:status === "granted",
            buttonstate:id,scanned:false
        })
    } 

    handlebarcodescan = async({type,data})=>{
        const {buttonstate}=this.state
        if(buttonstate==="book id"){
        this.setState({
            scanned:true,scannedbookid:data,buttonstate:'normal'
        })
        }
        else if(buttonstate==="student id"){
        this.setState({
                scanned:true,scannedstudentid:data,buttonstate:'normal' 
        }
        )}}
        render(){
        const hascamerapermission = this.state.hascamerapermission;
        const scanned = this.state.scanned;
        const buttonstate = this.state.buttonstate;
        if (buttonstate!=="normal" && hascamerapermission){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned?undefined:this.handlebarcodescan}
                style = {StyleSheet.absoluteFillObject}/>
            )
        }

        else if(buttonstate==="normal"){
            return(
            <View style ={styles.container}>
                <View>
                <Image source={require("../assets/booklogo.jpg")}
                style={{width:200,height:200}}/>
                <Text style={{textAlign:'center',fontSize:30}}>willi</Text>
                <View style ={styles.inputView}>
                    <TextInput style ={styles.inputbox}
                    placeholder="book id"
                    value={this.state.scannedbookid}/>
                    <TouchableOpacity style={styles.scanButton}
                    onPress={()=>{
                        this.getcamerapermission("book id")
                    }}
                    >
                        <Text style ={styles.buttonText}>scan</Text></TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                <TextInput style ={styles.inputbox}
                placeholder="student id"
                value={this.state.scannedstudentid}/>
                <TouchableOpacity style={styles.scanButton}
                onPress={()=>{this.getcamerapermission("student id")}}
                >
                <Text style ={styles.buttonText}>scan</Text></TouchableOpacity></View>
                </View>
                <Text style ={styles.displayText}>{hascamerapermission===true?this.state.scandata:"request camera permission"}</Text>
                <TouchableOpacity 
                onPress={this.getcamerapermission}
                style ={styles.scanButton}>
                <Text style ={styles.buttonText}>scan the QR code to run the app</Text>
                </TouchableOpacity>
            </View>
        )
        }
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },
    displayText:{
        fontSize:10,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:"black",
        width:200,
        marginBottom: 20
    },
    buttonText:{
        
        fontSize:30,       
    },
    inputView:{
        flexDirection:'row',
        margin:20 
    },
    inputbox:{
        width:200,
        height:100,
        borderWidth:3,
        fontSize:20
    }
})



