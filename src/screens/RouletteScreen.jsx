import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import Roulette from 'react-native-casino-roulette';
import marker2 from '../../images/marker.png';
import MainContianer from '../components/MainContianer';
import RouletteGrid from '../components/RouletteGrid';
import LinearGradient from 'react-native-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { abreviarNumero } from '../utils/numberSuffix';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const options = numbers.map((o) => ({ index: o }));
const customOptions = numbers.map((o) => (
  <Text
    style={{
      left: 45,
      fontWeight: 'bold',
      color: o === 1 ? '#006DDD' : o % 2 === 0 ? '#fff' : '#000',
      fontSize: 16,
      opacity: 0.3,
    }}
    index={o}
  >
    {}
  </Text>
));

const CasinoRouletteApp = () => {
  const [bet, setBet] = useState(0);
  const [number, setNumber] = useState('');
  const [color, setColor] = useState('');
  const [rouletteState, setRouletteState] = useState('stop');
  const [optionCustom, setOptionCustom] = useState('Option selected:');
  const [rouletteCustomState, setRouletteCustomState] = useState('stop');
  const [numbersHistory, setNumbersHistory] = useState([]);
  const [winnerNumber, setwinnerNumber] = useState(null);
  const [chipSelected, setChipSelected] = useState(0);
  const [reloadGame, setReloadGame] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const explosionRef = useRef(null);

  const handleThrowConfetti = () => {
    explosionRef.current && explosionRef.current.start();
  };

  const onRotateCustomChange = (state) => {
    setRouletteCustomState(state);
  };

  const onRotateCustom = (selectedOption) => {
    setIsSpinning(true);
    const number = selectedOption.props.index;
    setOptionCustom(number);

    setTimeout(() => {
      setNumbersHistory([...numbersHistory, number]);

      setwinnerNumber(number);
      setReloadGame(reloadGame + 1);
      setIsSpinning(false);
    }, 3500);
  };

  return (
    <MainContianer colors={['#3B3146', '#571819']}>
      <ImageBackground
        blurRadius={0}
        resizeMode="contain"
        style={{
          opacity: 0.5,
          width: '100%',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 60,
          left: 30,
          right: 0,
          bottom: 0,
        }}
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/238/852/small/blobs-mesh-gradient-transparent-that-faded-png.png',
        }}
      ></ImageBackground>
      <ImageBackground
        blurRadius={0}
        resizeMode="contain"
        style={{
          opacity: 0.5,
          width: '100%',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: -20,
          left: -30,
          right: 0,
          bottom: 0,
        }}
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/238/902/small/blobs-mesh-gradient-transparent-that-faded-png.png',
        }}
      ></ImageBackground>
      <ImageBackground
        blurRadius={0}
        resizeMode="contain"
        style={{
          opacity: 0.5,
          width: '100%',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: -20,
          left: 30,
          right: 0,
          bottom: 0,
        }}
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/238/902/small/blobs-mesh-gradient-transparent-that-faded-png.png',
        }}
      ></ImageBackground>
      <ImageBackground
        blurRadius={0}
        resizeMode="contain"
        style={{
          opacity: 1,
          width: '100%',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 20,
          right: 0,
          bottom: 0,
        }}
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/238/852/small/blobs-mesh-gradient-transparent-that-faded-png.png',
        }}
      >
        <Roulette
          enableUserRotate={rouletteCustomState === 'stop'}
          background={require('../../images/wheel.png')}
          onRotate={onRotateCustom}
          onRotateChange={onRotateCustomChange}
          marker={marker2}
          options={customOptions}
          rotateEachElement={(index) =>
            ((index * 360) / options.length) * -1 - 90
          }
          markerWidth={20}
        />
      </ImageBackground>
      <RouletteGrid
        numbers={numbers}
        winnerNumber={winnerNumber}
        reloadGame={reloadGame}
        isSpinning={isSpinning}
      />
      <ConfettiCannon
        count={15}
        origin={{ x: -20, y: 0 }}
        autoStart={false}
        ref={explosionRef}
      />
    </MainContianer>
  );
};

const styles = StyleSheet.create({
  numbersHistoryContainer: {
    margin: 5,
    height: 40,
  },
  numbersHistory: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CasinoRouletteApp;
