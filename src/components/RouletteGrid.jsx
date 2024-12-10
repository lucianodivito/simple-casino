import React, {useEffect, useState, useCallback, memo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {abreviarNumero} from '../utils/numberSuffix';
import {Button} from 'react-native-paper';
import {getColorByRange} from '../utils/betsColors';

const RouletteGrid = ({numbers, winnerNumber, reloadGame, isSpinning}) => {
  const [chipSelect, setChipSelect] = useState(0);
  const [bets, setBets] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [balance, setBalance] = useState(100000);
  const [totalBet, setTotalBet] = useState(0);
  const [winMultiplier, setWinMultiplier] = useState(0);
  const [winNumber, setWinNumer] = useState(winnerNumber);
  const [counter, setCounter] = useState(0);

  const handleWinOrFail = useCallback(() => {
    console.log('Roulette animation ended');
    
    bets.forEach((bet, index) => {
      if (bet > 0) {
        if (index + 1 === winnerNumber) {
          console.log('User wins');
          setBalance(bal => (bal += bet * winMultiplier - 1));
        } else {
          console.log('User loses', index + 1);
          setBalance(bal => (bal -= bet));
        }
      } else {
        console.log("No bets");
      }
    });
  
    // Pares o impares
    if (bets[10] > 0 && winnerNumber % 2 === 0) {
      console.log('gana par');
      setBalance(bal => (bal += bets[10] * 2));
    }
  
    if (bets[11] > 0 && winnerNumber % 2 !== 0) {
      console.log('gana impar');
      setBalance(bal => (bal += bets[11] * 2));
    }
  
    setBets([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setCounter(0);
  }, [bets, winnerNumber, winMultiplier, setBalance, setBets, setCounter]);

  useEffect(() => {
    console.log('cambia counter');
    switch (counter) {
      case 1:
        setWinMultiplier(10);
        console.log(setWinMultiplier);
        break;
      case 2:
        setWinMultiplier(5);
        break;
      case 3:
        setWinMultiplier(3.33);
        break;
      case 4:
        setWinMultiplier(2.5);
        break;
      case 5:
        setWinMultiplier(2);
        break;
      case 6:
        setWinMultiplier(1.67);
        break;
      case 7:
        setWinMultiplier(1.43);
        break;
      case 8:
        setWinMultiplier(1.25);
        break;
      case 9:
        setWinMultiplier(1.11);
        break;
      case 10:
        setWinMultiplier(1);
        break;
      default:
        setWinMultiplier(0);
        break;
    }
  }, [counter]);

  useEffect(() => {
    const addArrayBets = bets.reduce((acc, actualValue) => {
      return acc + actualValue;
    }, 0);
    setTotalBet(addArrayBets);
  }, [bets]);

  useEffect(() => {
    if (winnerNumber !== null) {
      handleWinOrFail();
    }
  }, [reloadGame]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'center',
          marginTop: -15,
        }}>
        Your bet:{' '}
        <Text style={{color: '#E79F49'}}>${abreviarNumero(totalBet)}</Text>
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#999',
          textAlign: 'center',
        }}>
        Your balance:{' '}
        <Text style={{color: '#fff'}}>${abreviarNumero(balance)}</Text>
      </Text>

      <View style={styles.row}>
        {numbers.map((number, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if(isSpinning) return;
              if (totalBet + chipSelect > balance) return;
              if (chipSelect <= 0) return;

              if (bets[index] == 0) {
                setCounter(prev => prev + 1);
              }

              const newBets = [...bets];
              newBets[index] += chipSelect;
              setBets(newBets);
            }}
            key={index}
            style={[
              styles.gridItem,
              {
                backgroundColor:
                  winnerNumber === index + 1 ? '#2b3b4f' : '#122339',
              },
            ]}>
            <Text style={styles.numberText}>{number}</Text>
            <Text
              style={[
                styles.bets,
                {color: bets[index] > 0 ? '#EE9C58' : '#999'},
              ]}>{`$${abreviarNumero(bets[index])}`}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if(isSpinning) return;
            if (totalBet + chipSelect > balance) return;
            if (chipSelect <= 0) return;

            console.log(bets);
            
            const newBets = [...bets];
            newBets[10] += chipSelect;
            setBets(newBets);
          }}
          style={[
            styles.gridItem,
            {
              backgroundColor:
                winnerNumber && winnerNumber % 2 === 0 ? '#2b3b4f' : '#122339',
            },
          ]}>
          <Text style={styles.numberText}>EVEN</Text>
          <Text
            style={[
              styles.bets,
              {color: bets[10] > 0 ? '#EE9C58' : '#999'},
            ]}>{`$${abreviarNumero(bets[10])}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if(isSpinning) return;
            if (totalBet + chipSelect > balance) return;
            if (chipSelect <= 0) return;

            const newBets = [...bets];
            newBets[11] += chipSelect;
            setBets(newBets);
          }}
          style={[
            styles.gridItem,
            {
              backgroundColor:
                winnerNumber && winnerNumber % 2 !== 0 ? '#2b3b4f' : '#122339',
            },
          ]}>
          <Text style={styles.numberText}>ODD</Text>
          <Text
            style={[
              styles.bets,
              {color: bets[11] > 0 ? '#EE9C58' : '#999'},
            ]}>{`$${abreviarNumero(bets[11])}`}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          textColor="#fff"
          style={styles.buttonQuitar}
          onPress={() => {
            setBets([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setCounter(0);
          }}>
          <Text style={styles.buttonText}>Remove</Text>
        </Button>
        <Button
          mode="outlined"
          textColor="#fff"
          style={styles.buttonDuplicar}
          onPress={() => {
            if (totalBet * 2 > balance) {
              return;
            }
            const duplicateBet = bets.map(valor => valor * 2);

            setBets(duplicateBet);
          }}>
          <Text style={styles.buttonText}>Double bet</Text>
        </Button>
      </View>
      <View style={styles.chips}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.chip,
            {
              bottom: chipSelect === 500 ? 8 : 0,
              shadowColor: '#DA4297',
              shadowOpacity: 0.5,
              elevation: 6,
            },
          ]}
          onPress={() => {
            setChipSelect(500);
          }}>
          <Text style={styles.number}>500</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chip,
            {
              bottom: chipSelect === 1000 ? 8 : 0,
              shadowColor: '#3A73CA',
              shadowOpacity: 0.5,
              elevation: 6,
            },
          ]}
          onPress={() => {
            setChipSelect(1000);
          }}>
          <Text style={styles.number}>1k</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chip,
            {
              bottom: chipSelect === 10000 ? 8 : 0,
              shadowColor: '#6CF6FF',
              shadowOpacity: 0.5,
              elevation: 6,
            },
          ]}
          onPress={() => {
            setChipSelect(10000);
          }}>
          <Text style={styles.number}>10k</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chip,
            {
              bottom: chipSelect === 100000 ? 8 : 0,
              shadowColor: '#7C3CE4',
              shadowOpacity: 0.5,
              elevation: 6,
            },
          ]}
          onPress={() => {
            setChipSelect(100000);
          }}>
          <Text style={styles.number}>100k</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chip,
            {
              bottom: chipSelect === 500000 ? 8 : 0,
              shadowColor: '#DA4297',
              shadowOpacity: 0.5,
              elevation: 6,
            },
          ]}
          onPress={() => {
            setChipSelect(500000);
          }}>
          <Text style={styles.number}>500k</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 330},
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  gridItem: {
    width: 100,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#122339',
    margin: 1,
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  chips: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    
  },
  chip: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    backgroundColor: '#12233B',
  },
  number: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bets: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 26,
    marginTop: 15,
  },
  buttonQuitar: {
    width: '50%',
    height: 50,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#54D5EB',
  },
  buttonDuplicar: {
    width: '50%',
    height: 50,
    margin: 2,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#FFB53B',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default memo(RouletteGrid);
