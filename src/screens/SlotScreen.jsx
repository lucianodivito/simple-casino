import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MainContainer from '../components/MainContianer';
import { abreviarNumero } from '../utils/numberSuffix';
import { TextInput } from 'react-native-paper';

const SlotMachine = () => {
  const [reloadWin, setReloadWin] = useState(0);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(0);

  const symbols = ['🍒', '🍇', '🍊', '🍋', '🍉', '🍎', '🍓', '🍌', '🍍', '🥝'];

  useEffect(() => {
    console.log('ejecuto');
    const checkWin = () => {
      console.log('ejecuto check win');
      if (
        currentSymbols &&
        currentSymbols[0] === currentSymbols[1] &&
        currentSymbols[1] === currentSymbols[2]
      ) {
        setBalance((bal) => (bal += bet * 8));
      } else if (
        currentSymbols &&
        (currentSymbols[0] === currentSymbols[1] ||
          currentSymbols[1] === currentSymbols[2] ||
          currentSymbols[0] === currentSymbols[2])
      ) {
        setBalance((bal) => (bal += bet * 3));
      } else setBalance((bal) => (bal -= bet));
    };

    checkWin();
  }, [reloadWin]);

  const getRandomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];

  const [currentSymbols, setCurrentSymbols] = useState(['❓', '❓', '❓']);

  const [isSpinning, setIsSpinning] = useState(false);

  const onPressSpin = () => {
    setIsSpinning(true);

    const interval = setInterval(() => {
      setCurrentSymbols([
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol(),
      ]);
    }, 100);

    setTimeout(() => {
      setIsSpinning(false);
      clearInterval(interval);

      setReloadWin(reloadWin + 1);
    }, 3000);
  };

  return (
    <MainContainer>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[
            styles.slotContainer,
            {
              backgroundColor:
                currentSymbols.filter((s) => s === currentSymbols[0]).length >
                  1 &&
                !isSpinning &&
                currentSymbols[0] !== '❓'
                  ? '#2b3b4f'
                  : '#122339',
            },
          ]}
        >
          <Text style={styles.slot}>{currentSymbols[0]}</Text>
        </View>
        <View
          style={[
            styles.slotContainer,
            {
              backgroundColor:
                currentSymbols.filter((s) => s === currentSymbols[1]).length >
                  1 &&
                !isSpinning &&
                currentSymbols[1] !== '❓'
                  ? '#2b3b4f'
                  : '#122339',
            },
          ]}
        >
          <Text style={styles.slot}>{currentSymbols[1]}</Text>
        </View>
        <View
          style={[
            styles.slotContainer,
            {
              backgroundColor:
                currentSymbols.filter((s) => s === currentSymbols[2]).length >
                  1 &&
                !isSpinning &&
                currentSymbols[2] !== '❓'
                  ? '#2b3b4f'
                  : '#122339',
            },
          ]}
        >
          <Text style={styles.slot}>{currentSymbols[2]}</Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          color: '#999',
          textAlign: 'center',
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Your balance:{' '}
        <Text style={{ color: '#fff' }}>${abreviarNumero(balance)}</Text>
      </Text>
      <TextInput
        disabled={isSpinning}
        onChangeText={(value) => {
          setBet(parseInt(value));
          console.log(value);
        }}
        mode="flat"
        keyboardType="numeric"
        placeholder="Insert bet"
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
      <TouchableOpacity
        disabled={isSpinning || bet <= 0}
        style={[
          styles.button,
          {
            opacity: isSpinning || bet <= 0 || bet > balance ? 0.3 : null,
            backgroundColor: bet <= 0 || bet > balance ? '#999' : '#54D5EB',
            shadowColor:
              bet <= 0 || isSpinning || bet > balance ? null : '#00FFFF',
            shadowOffset:
              bet <= 0 || isSpinning || bet > balance
                ? null
                : { width: 0, height: 4 },
            shadowOpacity: bet <= 0 || isSpinning || bet > balance ? 0 : 0.9,
            shadowRadius: bet <= 0 || isSpinning || bet > balance ? 0 : 10,
            elevation: bet <= 0 || isSpinning || bet > balance ? 0 : 8,
          },
        ]}
        onPress={() => {
          if (!isSpinning) {
            if (bet <= 0) return;
            if (bet > balance) return;
            onPressSpin();
          }
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Spin</Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    overflow: 'hidden',
    backgroundColor: '#122339',
    borderRadius: 15,
    margin: 3,
    padding: 5,
  },
  slot: {
    fontSize: 65,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
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
    backgroundColor: '#122339',
    borderColor: '#132339',
    marginVertical: 4,
  },
});

export default SlotMachine;
