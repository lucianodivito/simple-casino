import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContianer from '../components/MainContianer';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import logo from '../../images/logo.png';
import roulette from '../../images/games/roulette.png';
import slots from '../../images/games/slots.png';
import coinflip from '../../images/games/coinflip.png';
import dices from '../../images/games/dices.png';
import hilo from '../../images/games/hilo.png';
import poker from '../../images/games/poker.png';

const GamesScreen = () => {
  const navigation = useNavigation();
  return (
    <MainContianer>
      <View style={styles.container}>
        <View style={styles.row}>
          <LinearGradient
            onTouchStart={() => navigation.navigate('Roulette')}
            style={[styles.item, { backgroundColor: 'transparent' }]}
            colors={['#EB5E0F', '#FAC445']}
          >
            <View
              style={{
                position: 'absolute',
                top: -5,
                left: -30,
                backgroundColor: '#ff3b3b',
                paddingVertical: 5,
                paddingHorizontal: 10,
                transform: [{ rotate: '-25deg' }],
                borderRadius: 5,
                zIndex: 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.9,
                shadowRadius: 10,
                elevation: 8,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Recommended
              </Text>
            </View>

            <Image
              source={roulette}
              style={{ height: 100, width: 300, resizeMode: 'contain' }}
            />
            <Text style={styles.text}>Roulette</Text>
          </LinearGradient>
          <LinearGradient
            onTouchStart={() => navigation.navigate('Coin')}
            style={[styles.item, { backgroundColor: 'transparent' }]}
            colors={['#49259A', '#119EE5']}
          >
            <Image
              source={coinflip}
              style={{ height: 100, width: 300, resizeMode: 'contain' }}
            />
            <Text style={styles.text}>Coin Flip</Text>
          </LinearGradient>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <LinearGradient
            onTouchStart={() => navigation.navigate('Slot')}
            style={[styles.item, { backgroundColor: 'transparent' }]}
            colors={['#C031D6', '#C4A9F9']}
          >
            <Image
              source={slots}
              style={{ height: 100, width: 300, resizeMode: 'contain' }}
            />
            <Text style={styles.text}>Slots</Text>
          </LinearGradient>
          <LinearGradient
            style={[styles.item, { backgroundColor: 'transparent' }]}
            colors={['#8cf7f5', '#43a4fa']}
          >
            <Image
              source={dices}
              style={{ height: 100, width: 130, resizeMode: 'contain' }}
            />
            <Text style={styles.text}>Dice Roll</Text>
          </LinearGradient>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <LinearGradient
            onTouchStart={() => navigation.navigate('Slot')}
            style={[styles.item, { backgroundColor: 'transparent' }]}
            colors={['#acffa0', '#44cd31']}
          >
            <Image
              source={poker}
              style={{ height: 100, width: 300, resizeMode: 'contain' }}
            />
            <Text style={styles.text}>High or Low</Text>
          </LinearGradient>
          <LinearGradient
            style={[styles.item, { backgroundColor: 'transparent' }]}
            colors={['#8cf7f5', '#43a4fa']}
          >
            <Image
              source={dices}
              style={{ height: 100, width: 130, resizeMode: 'contain' }}
            />
            <Text style={styles.text}>Dice Roll</Text>
          </LinearGradient>
        </View>
      </View>
    </MainContianer>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 8, // Añadido para bordes redondeados
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GamesScreen;
