// src/screens/GameScreen.js
// Pantalla de juego que muestra el marcador, equipos seleccionados y controles de puntuación.

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GameScreen = ({ route, navigation }) => {
  // Recibimos los equipos seleccionados desde route.params
  const { homeTeam, awayTeam } = route.params;

  // Estado para las puntuaciones de cada equipo
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // Funciones para incrementar la puntuación
  const addTwoPointsHome = () => {
    setHomeScore((prev) => prev + 2);
  };

  const addTwoPointsAway = () => {
    setAwayScore((prev) => prev + 2);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fondo principal estilo arcade */}
      <View style={styles.container}>
        {/* Título de la pantalla de juego */}
        <Text style={styles.title}>RETRO GAME</Text>

        {/* Información del cuarto y tiempo */}
        <View style={styles.timeContainer}>
          <Text style={styles.quarterText}>Q1</Text>
          <Text style={styles.timeText}>12:00</Text>
        </View>

        {/* Marcador principal con colores de cada equipo */}
        <View style={styles.scoreboardContainer}>
          {/* Equipo Local */}
          <View
            style={[
              styles.teamScoreContainer,
              { borderColor: homeTeam.primaryColor },
            ]}
          >
            <Text style={styles.teamRole}>LOCAL</Text>
            <Text style={styles.teamLogo}>{homeTeam.logo}</Text>
            <Text style={[styles.teamAbbr, { color: homeTeam.primaryColor }]}>
              {homeTeam.abbreviation}
            </Text>
            <Text style={styles.scoreText}>{homeScore}</Text>
          </View>

          {/* Separador */}
          <View style={styles.scoreVsContainer}>
            <Text style={styles.scoreVsText}>-</Text>
          </View>

          {/* Equipo Visitante */}
          <View
            style={[
              styles.teamScoreContainer,
              { borderColor: awayTeam.primaryColor },
            ]}
          >
            <Text style={styles.teamRole}>VISITANTE</Text>
            <Text style={styles.teamLogo}>{awayTeam.logo}</Text>
            <Text style={[styles.teamAbbr, { color: awayTeam.primaryColor }]}>
              {awayTeam.abbreviation}
            </Text>
            <Text style={styles.scoreText}>{awayScore}</Text>
          </View>
        </View>

        {/* Botones de control de puntuación */}
        <View style={styles.controlsContainer}>
          <View style={styles.controlColumn}>
            <Text style={styles.controlLabel}>{homeTeam.name}</Text>
            <TouchableOpacity
              style={[
                styles.scoreButton,
                { backgroundColor: homeTeam.primaryColor },
              ]}
              onPress={addTwoPointsHome}
              activeOpacity={0.9}
            >
              <Text style={styles.scoreButtonText}>+2 PUNTOS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.controlColumn}>
            <Text style={styles.controlLabel}>{awayTeam.name}</Text>
            <TouchableOpacity
              style={[
                styles.scoreButton,
                { backgroundColor: awayTeam.primaryColor },
              ]}
              onPress={addTwoPointsAway}
              activeOpacity={0.9}
            >
              <Text style={styles.scoreButtonText}>+2 PUNTOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón para volver a selección si se desea cambiar equipos */}
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
    fontSize: 28,
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

