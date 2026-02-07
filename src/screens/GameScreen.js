import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Paleta de colores RETRO ARCADE
const COLORS = {
  background: '#0a0e27',
  primary: '#FFD700',
  dark: '#1a1a2e',
  accent: '#00d9ff',
  success: '#00ff88',
  danger: '#ff0055',
  cardBg: 'rgba(255, 255, 255, 0.05)',
};

// Componente individual para cada jugador
const PlayerItem = ({ player, teamType, teamColor, onAddPoints }) => (
  <View style={[styles.playerRow, { borderLeftColor: teamColor }]}>
    <View style={styles.playerInfo}>
      <Text style={[styles.playerNumber, { color: teamColor }]}>#{player.number}</Text>
      <View style={styles.playerDetails}>
        <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>
        <Text style={styles.playerPosition}>{player.position}</Text>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.pointButton, { backgroundColor: teamColor }]}
        onPress={() => onAddPoints(teamType, 2, player.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>+2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.pointButton, { backgroundColor: COLORS.secondary || '#ffffff' }]} // Fallback si no hay color secundario definido aqui, pero usaremos el del equipo
        onPress={() => onAddPoints(teamType, 3, player.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color: COLORS.dark }]}>+3</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const GameScreen = ({ route, navigation }) => {
  const { homeTeam, awayTeam } = route.params;

  // Estado para las puntuaciones generales
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // Estado para guardar los puntos individuales de cada jugador (clave única: "team-id")
  const [playerScores, setPlayerScores] = useState({});

  // Función para agregar puntos
  const addPoints = (team, points, playerId) => {
    // 1. Actualizar marcador general
    if (team === 'home') {
      setHomeScore(prev => prev + points);
    } else {
      setAwayScore(prev => prev + points);
    }

    // 2. Actualizar puntos individuales del jugador
    // Creamos una clave única usando el tipo de equipo y el ID del jugador
    const playerKey = `${team}-${playerId}`;

    setPlayerScores(prevScores => ({
      ...prevScores,
      // Sumamos los puntos actuales (o 0 si no tiene) más los nuevos puntos
      [playerKey]: (prevScores[playerKey] || 0) + points
    }));
  };

  // Función para finalizar el juego
  const endGame = () => {
    // 1. Preparamos la lista final de todos los jugadores con sus puntos
    const homePlayersWithStats = homeTeam.players.map(player => ({
      ...player,
      teamName: homeTeam.name,
      teamColor: homeTeam.primaryColor,
      // Recuperamos sus puntos usando la misma clave única
      points: playerScores[`home-${player.id}`] || 0
    }));

    const awayPlayersWithStats = awayTeam.players.map(player => ({
      ...player,
      teamName: awayTeam.name,
      teamColor: awayTeam.primaryColor,
      points: playerScores[`away-${player.id}`] || 0
    }));

    // Unimos todos los jugadores en una sola lista (flat array)
    const allPlayersStats = [...homePlayersWithStats, ...awayPlayersWithStats];

    // 2. Navegamos pasando todos los datos necesarios
    navigation.navigate('Winner', {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      homeScore: homeScore,
      awayScore: awayScore,
      allPlayersStats: allPlayersStats // Pasamos la lista completa con estadísticas
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* MARCADOR SUPERIOR (Sticky) */}
        <View style={styles.scoreboardHeader}>
          {/* Equipo LOCAL */}
          <View style={styles.teamHeader}>
            <Image source={homeTeam.logoImage} style={styles.headerLogo} resizeMode="contain" />
            <Text style={[styles.headerTeamName, { color: homeTeam.primaryColor }]}>{homeTeam.abbreviation}</Text>
            <Text style={styles.headerScore}>{homeScore}</Text>
          </View>

          {/* VS */}
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>Q4</Text>
            </View>
          </View>

          {/* Equipo VISITANTE */}
          <View style={styles.teamHeader}>
            <Image source={awayTeam.logoImage} style={styles.headerLogo} resizeMode="contain" />
            <Text style={[styles.headerTeamName, { color: awayTeam.primaryColor }]}>{awayTeam.abbreviation}</Text>
            <Text style={styles.headerScore}>{awayScore}</Text>
          </View>
        </View>

        {/* ÁREA DE JUGADORES (Dos Columnas) */}
        <View style={styles.playersArea}>

          {/* Columna LOCAL */}
          <View style={styles.columnContainer}>
            <Text style={[styles.columnTitle, { color: homeTeam.primaryColor }]}>LOCAL</Text>
            <FlatList
              data={homeTeam.players}
              keyExtractor={(item) => `home-${item.id}`}
              renderItem={({ item }) => (
                <PlayerItem
                  player={item}
                  teamType="home"
                  teamColor={homeTeam.primaryColor}
                  onAddPoints={addPoints}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          </View>

          {/* Separador vertical */}
          <View style={styles.verticalDivider} />

          {/* Columna VISITANTE */}
          <View style={styles.columnContainer}>
            <Text style={[styles.columnTitle, { color: awayTeam.primaryColor }]}>VISITANTE</Text>
            <FlatList
              data={awayTeam.players}
              keyExtractor={(item) => `away-${item.id}`}
              renderItem={({ item }) => (
                <PlayerItem
                  player={item}
                  teamType="away"
                  teamColor={awayTeam.primaryColor}
                  onAddPoints={addPoints}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </View>

        {/* BOTÓN FIN DEL JUEGO */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.endGameButton} onPress={endGame} activeOpacity={0.8}>
            <Text style={styles.endGameText}>FIN DEL JUEGO</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header Scoreboard
  scoreboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#252a4a',
    height: 110,
  },
  teamHeader: {
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginBottom: 2,
  },
  headerTeamName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  vsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  vsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
    fontStyle: 'italic',
  },
  timerContainer: {
    marginTop: 5,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timerText: {
    color: COLORS.danger,
    fontWeight: 'bold',
    fontSize: 12,
  },
  // Players Area
  playersArea: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
  },
  columnContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  columnTitle: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#252a4a',
    marginHorizontal: 2,
  },
  // Player Item Styles
  playerRow: {
    flexDirection: 'column', // Cambiado a columna para mejor ajuste en pantallas estrechas si es necesario, o row compacta
    backgroundColor: COLORS.cardBg,
    marginBottom: 10,
    borderRadius: 8,
    padding: 8,
    borderLeftWidth: 3,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    width: 25,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  playerPosition: {
    color: '#aaa',
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  pointButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Footer
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#252a4a',
    backgroundColor: COLORS.dark,
  },
  endGameButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  endGameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    letterSpacing: 2,
  },
});

export default GameScreen;
