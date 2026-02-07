import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
    background: '#0a0e27',
    primary: '#e8c811ff',
    dark: '#1a1a2e',
    accent: '#00d9ff',
    success: '#00ff88',
    danger: '#ff0055',
    neutral: '#2c3e50',
    text: '#ffffff'
};

const WinnerScreen = ({ route, navigation }) => {
    const { homeTeam, awayTeam, homeScore, awayScore, allPlayersStats } = route.params;

    let winner = null;
    let isTie = false;

    if (homeScore > awayScore) {
        winner = homeTeam;
    } else if (awayScore > homeScore) {
        winner = awayTeam;
    } else {
        isTie = true;
    }

    // --- LÓGICA DEL RANKING ---
    // 1. Filtramos los que tengan puntos y ordenamos de mayor a menor
    // Usamos el método .sort() que compara dos elementos (a y b)
    const topScorers = [...allPlayersStats]
        .sort((a, b) => b.points - a.points) // Orden descendente
        .slice(0, 5); // Nos quedamos solo con los 5 primeros

    // Funcionar para navegar a nueva partida
    const newGame = () => {
        navigation.navigate('TeamSelection');
    };

    // Función para revancha (mismos equipos)
    const rematch = () => {
        navigation.navigate('Game', {
            homeTeam: homeTeam,
            awayTeam: awayTeam
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[
                styles.container,
                // Si hay ganador, usamos su color primario con opacidad como fondo tintado, sino neutral
                !isTie && winner ? { backgroundColor: winner.primaryColor + '20' } : {}
            ]}>

                {/* Contenido Principal */}
                <View style={styles.contentContainer}>
                    {isTie ? (
                        <>
                            <Text style={styles.title}> EMPATE </Text>
                            <View style={styles.logosContainer}>
                                <View style={styles.teamResult}>
                                    <Image source={homeTeam.logoImage} style={styles.logoMedium} resizeMode="contain" />
                                    <Text style={styles.teamName}>{homeTeam.name}</Text>
                                </View>
                                <Text style={styles.versusText}>VS</Text>
                                <View style={styles.teamResult}>
                                    <Image source={awayTeam.logoImage} style={styles.logoMedium} resizeMode="contain" />
                                    <Text style={styles.teamName}>{awayTeam.name}</Text>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}> GANADOR </Text>
                            <View style={styles.winnerContainer}>
                                <Image source={winner.logoImage} style={styles.logoLarge} resizeMode="contain" />
                                <Text style={[styles.winnerName, { color: winner.primaryColor }]}>
                                    {winner.name.toUpperCase()}
                                </Text>
                                <Text style={styles.winnerCity}>{winner.city}</Text>
                            </View>
                        </>
                    )}

                    {/* MARCADOR FINAL */}
                    <View style={styles.scoreContainer}>
                        <Text style={styles.finalScoreText}>
                            {homeScore} - {awayScore}
                        </Text>
                    </View>

                    {/* --- SECCIÓN DE RANKING (NUEVA) --- */}
                    <View style={styles.rankingContainer}>
                        <Text style={styles.rankingTitle}>TOP 5 ANOTADORES</Text>

                        {topScorers.map((player, index) => (
                            <View key={`${player.teamName}-${player.id}`} style={styles.rankingRow}>
                                <View style={styles.playerRankInfo}>
                                    <Text style={styles.rankNumber}>{index + 1}.</Text>
                                    <Text style={[styles.rankPlayerName, { color: player.teamColor }]}>
                                        {player.name}
                                    </Text>
                                    <Text style={styles.rankTeamName}>({player.teamName})</Text>
                                </View>
                                <Text style={styles.rankPoints}>{player.points} PTS</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Botones de Navegación */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.rematchButton} onPress={rematch}>
                        <Text style={styles.rematchButtonText}>REVANCHA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.newGameButton} onPress={newGame}>
                        <Text style={styles.newGameButtonText}>NUEVA PARTIDA</Text>
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
        padding: 20,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    // Estilos Empate
    logosContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    teamResult: {
        alignItems: 'center',
    },
    logoMedium: {
        width: 80,
        height: 80,
        marginBottom: 5,
    },
    teamName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    versusText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.accent,
    },
    // Estilos Ganador
    winnerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoLarge: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    winnerName: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    winnerCity: {
        fontSize: 18,
        color: '#ccc',
        textAlign: 'center',
    },
    // Score
    scoreContainer: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginBottom: 25,
    },
    finalScoreText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    // --- ESTILOS RANKING ---
    rankingContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    rankingTitle: {
        color: COLORS.accent,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 1,
    },
    rankingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    playerRankInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rankNumber: {
        color: '#888',
        marginRight: 8,
        fontWeight: 'bold',
    },
    rankPlayerName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 5,
    },
    rankTeamName: {
        color: '#666',
        fontSize: 11,
    },
    rankPoints: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 15,
    },
    // Botones
    buttonsContainer: {
        width: '100%',
        gap: 10,
        marginTop: 20,
    },
    rematchButton: {
        backgroundColor: COLORS.accent,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    rematchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    newGameButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    newGameButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
});

export default WinnerScreen;
