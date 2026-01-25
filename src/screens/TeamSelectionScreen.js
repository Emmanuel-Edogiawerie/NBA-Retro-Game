import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NBA_TEAMS } from '../data/nbaData';

const TeamSelectionScreen = ({ navigation }) => {
  const [homeTeamIndex, setHomeTeamIndex] = useState(0);
  const [awayTeamIndex, setAwayTeamIndex] = useState(1);

  const homeTeam = NBA_TEAMS[homeTeamIndex];
  const awayTeam = NBA_TEAMS[awayTeamIndex];

  const handleCycleHomeTeam = () => {
    setHomeTeamIndex((prevIndex) => (prevIndex + 1) % NBA_TEAMS.length);
  };

  const handleCycleAwayTeam = () => {
    setAwayTeamIndex((prevIndex) => (prevIndex + 1) % NBA_TEAMS.length);
  };

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerNumber}>#{item.number}</Text>
      <Text style={styles.playerName}>{item.name}</Text>
      {/*<Text style={styles.playerPosition}>{item.position}</Text>*/}
    </View>
  );

  const handleStartGame = () => {
    navigation.navigate('Game', {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>NBA RETRO JAM</Text>
        <View style={styles.teamsContainer}>
          <View style={styles.teamColumn}>
            <Text style={styles.teamLabel}>LOCAL</Text>
            <TouchableOpacity
              style={[
                styles.teamCard,
                { borderColor: homeTeam.primaryColor },
              ]}
              onPress={handleCycleHomeTeam}
              activeOpacity={0.8}
            >
              <Image
                source={homeTeam.logoImage}
                style={styles.teamLogo}
                resizeMode="contain"
              />
              <Text style={styles.teamCity}>{homeTeam.city}</Text>
              <Text
                style={[
                  styles.teamName,
                  { color: homeTeam.primaryColor },
                ]}
              >
                {homeTeam.name}
              </Text>
            </TouchableOpacity>
            <View style={styles.playersContainer}>
              <Text style={styles.playersTitle}>Jugadores</Text>
              <FlatList
                data={homeTeam.players}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamColumn}>
            <Text style={styles.teamLabel}>VISITANTE</Text>
            <TouchableOpacity
              style={[
                styles.teamCard,
                { borderColor: awayTeam.primaryColor },
              ]}
              onPress={handleCycleAwayTeam}
              activeOpacity={0.8}
            >
              <Image
                source={awayTeam.logoImage}
                style={styles.teamLogo}
                resizeMode="contain"
              />
              <Text style={styles.teamCity}>{awayTeam.city}</Text>
              <Text
                style={[
                  styles.teamName,
                  { color: awayTeam.primaryColor },
                ]}
              >
                {awayTeam.name}
              </Text>
            </TouchableOpacity>
            <View style={styles.playersContainer}>
              <Text style={styles.playersTitle}>Jugadores</Text>
              <FlatList
                data={awayTeam.players}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartGame}
          activeOpacity={0.9}
        >
          <Text style={styles.startButtonText}>START GAME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  teamsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamColumn: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#252a4a',
  },
  teamLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 6,
  },
  teamCard: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 10,
  },
  teamLogo: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  teamCity: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  playersContainer: {
    flex: 1,
    marginTop: 4,
  },
  playersTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
    textAlign: 'center',
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: '#0f3460',
    borderRadius: 6,
    marginBottom: 4,
  },
  playerNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
    width: 40,
  },
  playerName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginHorizontal: 6,
  },
  playerPosition: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9A01B',
    width: 30,
    textAlign: 'right',
  },
  vsContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  startButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    letterSpacing: 2,
  },
});

export default TeamSelectionScreen;
