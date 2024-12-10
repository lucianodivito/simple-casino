import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MainContainer from '../components/MainContianer';
import { Button } from 'react-native-paper';

import dice1 from '../../images/dice/1.png';
import dice2 from '../../images/dice/2.png';
import dice3 from '../../images/dice/3.png';
import dice4 from '../../images/dice/4.png';
import dice5 from '../../images/dice/5.png';
import dice6 from '../../images/dice/6.png';

export default function DiceScreen() {
  const [diceNumber, setDiceNumber] = useState(null);

  const rollDice = () => {
    const random = Math.random();
    const oneToSix = Math.floor(random * 6) + 1;
    setDiceNumber(oneToSix);
  };

  return (
    <MainContainer>
      {diceNumber === 1 && <Image source={dice1} />}
      {diceNumber === 2 && <Image source={dice2} />}
      {diceNumber === 3 && <Image source={dice3} />}
      {diceNumber === 4 && <Image source={dice4} />}
      {diceNumber === 5 && <Image source={dice5} />}
      {diceNumber === 6 && <Image source={dice6} />}
      <Button
        style={styles.button}
        textColor="#fff"
        mode="outlined"
        onPress={rollDice}
      >
        Girar dado
      </Button>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    margin: 10,
  },
});
