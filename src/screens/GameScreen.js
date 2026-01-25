import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GameScreen = ({ route, navigation }) => {
  const { homeTeam, awayTeam } = route.params;

  // Estado para las puntuaciones,pero no lo estoy usando
  const [homeScore] = useState(0);
  const [awayScore] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>RETRO GAME</Text>

        <View style={styles.timeContainer}>
          <Text style={styles.quarterText}>Q1</Text>
          <Text style={styles.timeText}>12:00</Text>
        </View>

        {/* Cada equipo muestra logo, abreviatura y puntuación. Los colores de borde se calculan dinámicamente */}
        <View style={styles.scoreboardContainer}>
          <View
            style={[
              styles.teamScoreContainer,
              { borderColor: homeTeam.primaryColor },
            ]}
          >
            <Text style={styles.teamRole}>LOCAL</Text>
            <Image
              source={homeTeam.logoImage}
              style={styles.teamLogo}
              resizeMode="contain"
            />
            <Text style={[styles.teamAbbr, { color: homeTeam.primaryColor }]}>
              {homeTeam.abbreviation}
            </Text>
            <Text style={styles.scoreText}>{homeScore}</Text>
          </View>

          <View style={styles.scoreVsContainer}>
            <Text style={styles.scoreVsText}>-</Text>
          </View>

          <View
            style={[
              styles.teamScoreContainer,
              { borderColor: awayTeam.primaryColor },
            ]}
          >
            <Text style={styles.teamRole}>VISITANTE</Text>
            <Image
              source={awayTeam.logoImage}
              style={styles.teamLogo}
              resizeMode="contain"
            />
            <Text style={[styles.teamAbbr, { color: awayTeam.primaryColor }]}>
              {awayTeam.abbreviation}
            </Text>
            <Text style={styles.scoreText}>{awayScore}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <View style={styles.controlColumn}>
            <Text style={styles.controlLabel}>{homeTeam.name}</Text>
          </View>
          <View style={styles.controlColumn}>
            <Text style={styles.controlLabel}>{awayTeam.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}
        >
          <Text style={styles.backButtonText}>CAMBIAR EQUIPOS</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quarterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9A01B',
    marginRight: 16,
  },
  timeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scoreboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#252a4a',
  },
  teamScoreContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#0f3460',
  },
  teamRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  teamAbbr: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scoreVsContainer: {
    width: 30,
    alignItems: 'center',
  },
  scoreVsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  controlColumn: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  scoreButton: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    letterSpacing: 1,
  },
  backButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    letterSpacing: 1,
  },
});

export default GameScreen;
