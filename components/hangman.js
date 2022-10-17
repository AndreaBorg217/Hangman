/* eslint-disable prettier/prettier */
/* eslint-disable no-labels *//* eslint-disable no-trailing-spaces *//* eslint-disable prettier/prettier */
import  React,{useState} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,FlatList, ImageBackground, Vibration, Alert, Modal, TextInput, BackHandler} from 'react-native';
import Sound from 'react-native-sound';  
import {randomWord} from '../utilities/getRandomWord'


Sound.setCategory('playback');  

var correct = new Sound('correct.mp3', Sound.MAIN_BUNDLE, error => {
 if (error) {
   console.log('Failed to load correct', error);
   return;
 }
 console.log('Success');
});

var incorrect = new Sound('incorrect.mp3', Sound.MAIN_BUNDLE, error => {
 if (error) {
   console.log('Failed to load incorrect', error);
   return;
 }
 console.log('Success');
});

var win = new Sound('win.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load win', error);
      return;
    }
    console.log('Success');
});

var loss = new Sound('loss.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load loss', error);
      return;
    }
    console.log('Success');
});

const Hangman = () => {
 const [keyboard, setKeyboard] = useState([
    {char: 'a', background: 'white', border: 'black', text: 'black'},
    {char: 'b', background: 'white', border: 'black', text: 'black'},
    {char: 'c', background: 'white', border: 'black', text: 'black'},
    {char: 'd', background: 'white', border: 'black', text: 'black'},
    {char: 'e', background: 'white', border: 'black', text: 'black'},
    {char: 'f', background: 'white', border: 'black', text: 'black'},
    {char: 'g', background: 'white', border: 'black', text: 'black'},
    {char: 'h', background: 'white', border: 'black', text: 'black'},
    {char: 'i', background: 'white', border: 'black', text: 'black'},
    {char: 'j', background: 'white', border: 'black', text: 'black'},
    {char: 'k', background: 'white', border: 'black', text: 'black'},
    {char: 'l', background: 'white', border: 'black', text: 'black'},
    {char: 'm', background: 'white', border: 'black', text: 'black'},
    {char: 'n', background: 'white', border: 'black', text: 'black'},
    {char: 'o', background: 'white', border: 'black', text: 'black'},
    {char: 'p', background: 'white', border: 'black', text: 'black'},
    {char: 'q', background: 'white', border: 'black', text: 'black'},
    {char: 'r', background: 'white', border: 'black', text: 'black'},
    {char: 's', background: 'white', border: 'black', text: 'black'},
    {char: 't', background: 'white', border: 'black', text: 'black'},
    {char: 'u', background: 'white', border: 'black', text: 'black'},
    {char: 'v', background: 'white', border: 'black', text: 'black'},
    {char: 'w', background: 'white', border: 'black', text: 'black'},
    {char: 'x', background: 'white', border: 'black', text: 'black'},
    {char: 'y', background: 'white', border: 'black', text: 'black'},
    {char: 'z', background: 'white', border: 'black', text: 'black'},
]);

    const [toGuess, setWord] = useState(randomWord());
    const [blank, setBlank] = useState(Array(toGuess.length).fill('_ '))
    const [showModals, setShowModals] = useState(Array(9).fill(false))
    const [showLastChance, setShowLastChance] = useState(false)
    const [lifes, setLifes] = useState(0);
    const [guessed, setGuessed] = useState([]);
    const [text, setText] = useState('');
    const [showWin, setShowWin] = useState(false);
    const [showLoss, setShowLoss] = useState(false);
    const [length, setLength] = useState(toGuess.length)

    const Scaffold1 = () =>{
        return(
            <View style = {[styles.scaff1, {backgroundColor: showModals[0] ? 'black' : 'transparent'}]}></View>
        )
    }
    const Scaffold2 = () =>{
        return(
            <View style = {[styles.scaff2, {backgroundColor: showModals[1] ? 'black' : 'transparent'}]}></View>
        )
    }
    const Scaffold3 = () =>{
        return(
            <View style = {[styles.scaff3, {backgroundColor: showModals[2] ? 'black' : 'transparent'}]}></View>
        )
    }
    const Hook = () =>{
        return(
            <View style = {[styles.hook, {backgroundColor: showModals[2] ? 'black' : 'transparent'}]}></View>
        )
    }
    const Head = () =>{
        return(
            <View style = {[styles.head, {borderColor: showModals[3] ? 'black' : 'transparent'}]}></View>
        )
    }
    const Torso = () =>{
        return(
            <View style = {[styles.torso, {backgroundColor: showModals[4] ? 'black' : 'transparent'}]}></View>
        )
    }
    const LArm = () =>{
        return(
            <View style = {[styles.larm, {backgroundColor: showModals[5] ? 'black' : 'transparent'}]}></View>
        )
    }
    const RArm = () =>{
        return(
            <View style = {[styles.rarm, {backgroundColor: showModals[6] ? 'black' : 'transparent'}]}></View>
        )
    }
    const LLeg = () =>{
        return(
            <View style = {[styles.lleg, {backgroundColor: showModals[7] ? 'black' : 'transparent'}]}></View>
        )
    }
    const RLeg = () =>{
        return(
            <View style = {[styles.rleg, {backgroundColor: showModals[8] ? 'black' : 'transparent'}]}></View>
        )
    }

    const checkWin = () =>{
        if(blank.join("") === toGuess){
            winnerAction();
        }
    }

    const winnerAction = () =>{
        win.setVolume(1);
        win.setSpeed(1)
        win.play();
        setShowModals(Array(9).fill(false))
        setShowWin(true)
    }

    const checkLoss = () =>{
        if(lifes == 8){
            loserAction();
        }
    }

    const loserAction = () =>{
        setShowModals(Array(9).fill(false))
        setShowLastChance(true);
    }

    const handleClick = (letter, index) =>{
        correct.stop();
        incorrect.stop();

        if(showLastChance == true){
            setText(prev => prev.concat(letter));
        }
        else{
            var tempBlank, tempWord, tempKeyBoard;
        if(guessed.toString().includes(letter) == false){
            setGuessed(prev => [...prev, letter]);
            if(toGuess.includes(letter)){
                    for(let character = 0; character<JSON.stringify(toGuess.length); character++) {
                        if(toGuess.charAt(character) === letter){
                            correct.setVolume(1);
                            correct.setSpeed(1)
                            correct.play();

                            tempBlank = blank;
                            tempBlank[character] = letter;
                            
                            
                            tempWord = toGuess;
                            tempWord.replace(tempWord.charAt(character), '_');
                            console.log(index)
                            tempKeyBoard = [...keyboard]
                            tempKeyBoard[index].background = 'green';
                            tempKeyBoard[index].border = 'black';
                            tempKeyBoard[index].text = 'white';
                        }
                    } 
                    setBlank(prev => [...tempBlank]);
                    setWord(prev => tempWord);
                    setKeyboard(prev => tempKeyBoard);
                    checkWin();
            }
            else{
                incorrect.setVolume(1);
                incorrect.setSpeed(2)
                incorrect.play();
                console.log(index)
                let temp = [...keyboard]
                temp[index].background = 'red';
                temp[index].border = 'black';
                temp[index].text = 'white';
                setKeyboard([...temp])

                temp = [...showModals];
                temp[lifes] = true;
                setShowModals(prev => [...temp]);
                setLifes(prev => prev+1);    
                checkLoss()     
            }
        }
        else{
            Vibration.vibrate(400, false);
        }}
    }

const Key = ({letter, background, border, textColor, index} ) => {
    return(
        <TouchableOpacity style = {[styles.key, {backgroundColor: background}, {borderColor: border}]} onPress = {() => handleClick(letter, index)}>
            <Text style = {[styles.letter, {color: textColor}]}>{letter}</Text>
        </TouchableOpacity>
    );
};

const onChangeText = input => setText(input);
const onSubmit = (text) => {
    if(text == toGuess){
        setBlank(toGuess);
        winnerAction();
    }
    else{
        loss.setVolume(1);
        loss.setSpeed(1)
        loss.play();
        setShowLoss(true);
    }
    setText('');
    setShowLastChance(false);
}

const restart = () =>{
    const word = randomWord();
    setWord(prev => word);
    setLength(prev => word.length)
    setBlank(prev => [...Array(word.length).fill('_ ')])
    setShowModals(Array(9).fill(false))
    setShowLastChance(prev => false)
    setLifes(prev => 0);
    setGuessed(prev => []);
    setText(prev => '');
    setShowLoss(prev => false);
    setShowWin(prev => false);

    keyboard.forEach(key => {
        key.background = 'white';
        key.border = 'black';
        key.text ='black';
    });
    setKeyboard(prev => [...keyboard])
}


const WinModal = () =>{
    return (
      <Modal animationType = {"fade"} transparent = {true}
      visible = {showWin}
      onRequestClose = {() => { console.log("Modal has been closed.") } }>
        <View style = {styles.modal}>
          <Text style = {styles.modalheader}>CORRECT!</Text>
          <View style = {styles.btnContainer}>

          <TouchableOpacity style = {styles.modalButton} 
          onPress = {() =>  {win.stop();    loss.stop();   restart();}}>
            <Text style = {styles.modalBtntext}>New Game</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.modalButton} 
          onPress = {() =>  {BackHandler.exitApp()}}>
            <Text style = {styles.modalBtntext}>Quit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
  }
 
  const LossModal = () =>{
    return (
    <Modal animationType = {"fade"} transparent = {true}
    visible = {showLoss}
    onRequestClose = {() => { console.log("Modal has been closed.") } }>
      <View style = {styles.modal}>
        <Text style = {styles.modalheader}>YOU LOST!</Text>
        <Text style = {styles.correctWord}>The word was: {toGuess}</Text>
        <View style = {styles.btnContainer}>

        <TouchableOpacity style = {styles.modalButton} onPress = {() =>  {win.stop();    loss.stop();   restart();}}>
          <Text style = {styles.modalBtntext}>New Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.modalButton} onPress = {() =>  {BackHandler.exitApp()}}>
          <Text style = {styles.modalBtntext}>Quit</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
  }


 return (
    <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.container}>
    <View style = {styles.hangman}>
        <Scaffold1/>
        <Scaffold2/>
        <Scaffold3/>
        <Hook/>
        <Head/>
        <Torso/>
        <LArm/>
        <RArm/>
        <LLeg/>
        <RLeg/>

    {showLastChance?(
        <View style = {styles.textbox}>
        <Text style = {styles.warning}>You have 1 last chance!!</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder="Enter a final guess"
                value = {text}
                showSoftInputOnFocus={false}
            />
            <TouchableOpacity style={styles.button} title="Add Task" onPress={() => onSubmit(text)}>
                <Text style = {styles.btntext}>Submit</Text>
            </TouchableOpacity>
        </View>
    ): null}
    <WinModal />
    <LossModal/>
    </View>
    <View style = {styles.blankContainer}>
       <FlatList 
        style = {styles.blank}
        data={blank}
        renderItem= {({item}) => <Text style = {styles.blankSpace}>{item}</Text>}
        keyExtractor={(item, index) => index}
        numColumns = {length}
        key = {length}
        />
    </View>

  <FlatList 
        contentContainerStyle = {styles.keyboard}
        data={keyboard}
        renderItem= {({item, index}) => <Key letter={item.char} background={item.background} border={item.border} textColor={item.text} index = {index}/>}
        keyExtractor={(item, index) => index}
        numColumns = {6}
    />
    </ImageBackground>
 );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%'
    },
    keyboard:{
        width: '100%',
        height: '65%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        transform:[{translateY: 100}],
        flex: 1,
    },
    letter:{
        fontSize: 25,
        fontWeight: 'bold',
        position: 'absolute',
    },
    key:{
        height: 50,
        width: 60,
        borderWidth: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    },
    blank:{
        position: 'absolute',
        transform:[{translateY: 30}],
     },
     blankSpace:{
        fontSize: 60,
        fontWeight: 'bold',
        color: 'black',
     },
     blankContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
     },
     hangman:{
        width: '90%',
        height: 330,
        zIndex: 99
     },
     scaff1:{
        height: 5,
        width: 200,
        transform:[{translateX: 50},{translateY: 300}],
     },
     scaff2:{
        height: 250,
        width: 5,
        transform:[{translateX: 100},{translateY: 50}],
     }, 
     scaff3:{
        height: 5,
        width: 200,
        transform:[{translateX: 100},{translateY: -200}],
     },
     hook:{
        width: 5,
        height: 20,
        transform:[{translateX: 295},{translateY: -200}],
     },
     head:{
        borderWidth: 3,
        width: 50,
        height: 50,
        borderRadius: 25,
        transform:[{translateX: 272},{translateY: -200}],
     },
     torso:{
        height: 101,
        width: 3,
        transform:[{translateX: 295},{translateY: -200}],
     },
     larm:{
        height: 3,
        width: 50,
        transform:[{translateX: 250},{translateY: -270}, {rotate: '-35deg'}],
     },
     rarm:{
        height: 3,
        width: 50,
        transform:[{translateX: 290},{translateY: -273}, {rotate: '40deg'}],
     },
     lleg:{
        height: 3,
        width: 50,
        transform:[{translateX: 251},{translateY: -193}, {rotate: '-35deg'}],
     },
     rleg:{
        height: 3,
        width: 50,
        transform:[{translateX: 291},{translateY: -195}, {rotate: '39deg'}],
     },
     textbox:{
        borderColor: 'black',
        borderWidth: 3,
        width: '90%',
        height: 200,
        alignItems: 'center',
        justifyContent:'center',
        transform:[{translateX: 40},{translateY: -350}],
        zIndex: -1,
        borderRadius: 5,
     },
     input:{
        borderColor: 'black',
        borderWidth: 2,
        padding: 15,
        width: '80%',
        height: 60,
        fontSize: 20,
     },
     button:{
        backgroundColor: 'red',
        padding: 15,
        marginTop: 20,
        width: '40%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        transform:[{translateX: 0},{translateY: -10}],
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10
     },
     btntext:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
     },
     warning:{
        color: 'black',
        padding: 10,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
     },
     modal:{
        width: 300,
        height: 200,
        transform: [{translateX: 50}, { translateY: 100 }],
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
     },
     modalheader:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
     },
     btnContainer:{
        flexDirection: 'row',
        transform: [{ translateY: 30 }],
     },
     modalButton:{
        borderColor: 'black',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15, 
        borderRadius: 10
     },
     modalBtntext:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5
     },
     correctWord:{
        color: 'black',
        fontSize: 20,
        marginBottom: -20
     }
     
});
 export default Hangman;