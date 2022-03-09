import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import Logo from '../img/loto-logo-app.png';
import Form from '../img/Tor.png';
import emptyForm from '../img/form-loto.png';
import { Picker } from "@react-native-picker/picker";

const MainScreen = () => {

    const [lotoArr, setLotoArr] = useState(null)
    const Tores = [2, 4, 6, 8, 10, 12, 14];
    const [numOfTores, setNumOfTores] = useState(0);

    const randomTor = function () {
        setLotoArr([])
        let smallArr = [];
        let bigArr = [];
        let index = 1;
        while (bigArr.length < numOfTores) {
            while (smallArr.length < 6) {
                var r = Math.floor(Math.random() * 37) + 1;
                if (smallArr.indexOf(r) === -1) smallArr.push(r);
            }
            let strong = Math.floor(Math.random() * 7) + 1;
            smallArr.sort((a, b) => a > b)
            bigArr.push({
                "index": index,
                "lotoNum": smallArr,
                "strong": strong,
            })
            smallArr = [];
            index++;
        }
        setLotoArr(bigArr)
    };

    const leftStrong = function (num) {
        switch (num) {
            case 2:
            case 4:
            case 6:
                return '87.4%'
                break;
            case 1:
            case 3:
            case 5:
            case 7:
                return '95.2%'
                break;

            default:
                break;
        }
    }

    const topStrong = function (num) {
        switch (num) {
            case 1:
                return '16%'
                break;
            case 2:
            case 3:
                return '41%'
                break;
            case 4:
            case 5:
                return '66%'
            case 6:
            case 7:
                return '91.5%'
                break;

            default:
                break;
        }
        
    }

    const leftLoccation = function (num) {
        switch (num) {
            case 1:
            case 11:
            case 21:
            case 31:
                return '30.2%';
                break;
            case 2:
            case 12:
            case 22:
            case 32:
                return '38.4%';
                break;
            case 3:
            case 13:
            case 23:
            case 33:
                return '46.5%';
                break;
            case 4:
            case 14:
            case 24:
            case 34:
                return '54.7%';
                break;
            case 5:
            case 15:
            case 25:
            case 35:
                return '62.9%';
                break;
            case 6:
            case 16:
            case 26:
            case 36:
                return '71.1%';
                break;
            case 7:
            case 17:
            case 27:
            case 37:
                return '79.3%';
                break;
            case 8:
            case 18:
            case 28:
                return '5.8%';
                break;
            case 9:
            case 19:
            case 29:
                return '13.8%';
                break;
            case 10:
            case 20:
            case 30:
                return '22%';
                break;
        }
    };

    const topLocation = function (num) {
        switch (true) {
            case num >= 1 && num <= 7:
                return '16%' ;
                break;
            case num >= 8 && num <= 17:
                return '41%' ;
                break;
            case num >= 18 && num <= 27:
                return '66.5%' ;
                break;
            case num >= 28 && num <= 37:
                return '91.3%' ;
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={Logo}
                    style={{
                        width: 220,
                        height: 220,
                        alignSelf: 'center',
                    }}
                />
                <View style={{
                    flexDirection: "row",
                }}>
                    <Pressable style={styles.button} onPress={randomTor}>
                        <Text style={styles.text}>קדימה למלא</Text>
                    </Pressable>
                    <Picker
                        selectedValue={numOfTores}
                        onValueChange={(value, index) => setNumOfTores(value)}
                        mode="dropdown"
                        style={styles.picker}
                        label='Placeholder'
                    >
                        <Picker.Item key={0} label='בחר מספר טורים' value={0} />
                        {Tores.map((item) => (
                            <Picker.Item key={item} label={item.toString()} value={item} />
                        ))}
                    </Picker>
                </View>
            </View>
            <ScrollView>
                {
                    lotoArr != null ?
                        (
                            lotoArr.map((item) =>
                                <ImageBackground key={item.index} source={Form} resizeMode="stretch" style={styles.image}>
                                    <View style={styles.table}><Text style={styles.text}>טבלה {item.index}</Text></View>
                                    {
                                        item.lotoNum.map((element) =>
                                             <View key={item.element} style={{
                                                flexDirection: "row",
                                                height: 6,
                                                width: 17,
                                                backgroundColor: "black",
                                                position: 'absolute',
                                                top: topLocation(element),
                                                left: leftLoccation(element),
                                            }} /> 
                                        )
                                    }
                                      <View style={{
                                            flexDirection: "row",
                                            height: 6,
                                            width: 17,
                                            backgroundColor: "black",
                                            position: 'absolute',
                                            top: topStrong(item.strong),
                                            left: leftStrong(item.strong),
                                        }} /> 
                                    
                                </ImageBackground>
                            )
                        )
                        :
                        (
                            <ImageBackground  source={emptyForm} resizeMode="stretch" style={styles.emptyForm}>
                                </ImageBackground>
                        )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: "10%"
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: '100%',
        height: 90,
        marginBottom: 5
    },
    emptyForm:{
        justifyContent: "center",
        width: '100%',
        height: 1400,
    },
    v: {
        flexDirection: "row",
        height: 6,
        width: 17,
        backgroundColor: "black",
        /* bottom: 199,
        left: 290 */
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ed1b2d',
        width: 150,
        height: 50,
        borderRadius: 25,
        left: 30,
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize:12
    },
    picker: {
        width: 200,
        height: 50,
        left: 50,
        marginTop: 20,
        marginBottom: 20,
    },
    table: {
        width: 60,
        left:'5%',
        bottom:'37%',
        
    },

});


export default MainScreen;

