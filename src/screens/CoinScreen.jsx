import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import MainContainer from '../components/MainContianer';
import { abreviarNumero } from '../utils/numberSuffix';
import { TextInput } from 'react-native-paper';

const CoinScreen = () => {
  const [coinSide, setCoinSide] = useState('Cara');
  const [selected, setSelected] = useState('');
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCoin = () => {
    if (bet > balance) return;
    if (bet <= 0) return;
    if (selected === '') return;
    setIsFlipping(true);

    console.log(selected !== 'Cara' || selected !== 'Cruz');

    const randomSide = Math.floor(Math.random() * 2);

    Animated.timing(flipAnimation, {
      toValue: 12,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      flipAnimation.setValue(0);
      if (randomSide === 0) {
        setCoinSide('Cara');
        if (selected === 'Cara') {
          setBalance((bal) => bal + bet);
        } else {
          setBalance((bal) => bal - bet);
        }
      } else {
        setCoinSide('Cruz');
        if (selected === 'Cruz') {
          setBalance((bal) => bal + bet);
        } else {
          setBalance((bal) => bal - bet);
        }
      }
      setIsFlipping(false);
    });
  };

  return (
    <MainContainer>
      <View style={styles.coinContainer}>
        {coinSide && (
          <Animated.Image
            source={
              coinSide === 'Cara'
                ? require('../../images/coinflip/heads.png')
                : require('../../images/coinflip/tails.png')
            }
            style={[
              styles.coinImage,
              {
                transform: [
                  {
                    rotateY: flipAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
      </View>
      <Text
        style={{
          fontSize: 16,
          color: '#999',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Your balance:{' '}
        <Text style={{ color: '#fff' }}>${abreviarNumero(balance)}</Text>
      </Text>
      <TextInput
        onChangeText={(value) => {
          setBet(parseInt(value));
          console.log(value);
        }}
        mode="flat"
        keyboardType="numeric"
        placeholder="Ingresar apuesta"
        selectionColor="#fff"
        textColor="#fff"
        underlineStyle={{ backgroundColor: 'transparent' }}
        style={styles.input}
        left={
          <TextInput.Affix
            text="$"
            textStyle={{ color: '#fff', marginRight: 5 }}
          />
        }
        placeholderTextColor="#999"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.buttonCara,
            { backgroundColor: selected === 'Cara' ? '#FFB53B' : '#999' },
          ]}
          onPress={() => {
            setSelected('Cara');
          }}
        >
          <Text style={styles.buttonText}>Heads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.buttonCruz,
            { backgroundColor: selected === 'Cruz' ? '#FFB53B' : '#999' },
          ]}
          onPress={() => {
            setSelected('Cruz');
          }}
        >
          <Text style={styles.buttonText}>Tails</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={isFlipping}
        style={[
          styles.button,
          {
            opacity: isFlipping || bet <= 0 || bet > balance ? 0.3 : null,
            backgroundColor: bet <= 0 || bet > balance ? '#999' : '#54D5EB',
            shadowColor:
              bet <= 0 || isFlipping || bet > balance ? null : '#00FFFF',
            shadowOffset:
              bet <= 0 || isFlipping || bet > balance
                ? null
                : { width: 0, height: 4 },
            shadowOpacity: bet <= 0 || isFlipping || bet > balance ? 0 : 0.9,
            shadowRadius: bet <= 0 || isFlipping || bet > balance ? 0 : 10,
            elevation: bet <= 0 || isFlipping || bet > balance ? 0 : 8,
          },
        ]}
        onPress={flipCoin}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Flip</Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  coinContainer: {
    marginVertical: 20,
  },
  coinImage: {
    width: 150,
    height: 160,
  },
  countContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  count: {
    marginRight: 20,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  buttonCara: {
    width: '40%',
    height: 50,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#FFB53B',
  },
  buttonCruz: {
    width: '40%',
    height: 50,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#FFC15B',
  },
  button: {
    width: '80%',
    height: 50,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#54D5EB',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    borderRadius: 15,
    backgroundColor: '#132339',
    borderColor: '#132339',
    marginBottom: 4,
  },
});

export default CoinScreen;
