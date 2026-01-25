// src/data/nbaData.js
// Datos de equipos NBA para el juego retro.
// Se separan en este archivo para no hardcodear datos en las vistas.

// Importar logos locales
const lakersLogo = require('../../assets/images/logos/lakers.jpg');
const celticsLogo = require('../../assets/images/logos/celtics.png');
const bullsLogo = require('../../assets/images/logos/bulls.png');
const heatLogo = require('../../assets/images/logos/heat.png');
const knicksLogo = require('../../assets/images/logos/knicks.png');
const spursLogo = require('../../assets/images/logos/spurs.jpg');

export const NBA_TEAMS = [
  {
    id: 1,
    name: 'Lakers',
    city: 'Los Angeles',
    abbreviation: 'LAL',
    primaryColor: '#552583',
    secondaryColor: '#FDB927',
    //logo: '⭐',
    logoImage: lakersLogo,
    players: [
      {
        id: 101,
        name: 'Magic Johnson',
        number: '32',
        position: 'PG',
      },
      {
        id: 102,
        name: 'Kobe Bryant',
        number: '24',
        position: 'SG',
      },
      {
        id: 103,
        name: 'LeBron James',
        number: '23',
        position: 'SF',
      },
      {
        id: 104,
        name: 'Anthony Davis',
        number: '3',
        position: 'PF',
      },
      {
        id: 105,
        name: 'Shaquille O’Neal',
        number: '34',
        position: 'C',
      },
    ],
  },
  {
    id: 2,
    name: 'Celtics',
    city: 'Boston',
    abbreviation: 'BOS',
    primaryColor: '#007A33',
    secondaryColor: '#BA9653',
    logo: '☘️',
    logoImage: celticsLogo,
    players: [
      {
        id: 201,
        name: 'Larry Bird',
        number: '33',
        position: 'SF',
      },
      {
        id: 202,
        name: 'Paul Pierce',
        number: '34',
        position: 'SF',
      },
      {
        id: 203,
        name: 'Kevin Garnett',
        number: '5',
        position: 'PF',
      },
      {
        id: 204,
        name: 'Bill Russell',
        number: '6',
        position: 'C',
      },
      {
        id: 205,
        name: 'Rajon Rondo',
        number: '9',
        position: 'PG',
      },
    ],
  },
  {
    id: 3,
    name: 'Bulls',
    city: 'Chicago',
    abbreviation: 'CHI',
    primaryColor: '#CE1141',
    secondaryColor: '#000000',
    logo: '🐂',
    logoImage: bullsLogo,
    players: [
      {
        id: 301,
        name: 'Michael Jordan',
        number: '23',
        position: 'SG',
      },
      {
        id: 302,
        name: 'Scottie Pippen',
        number: '33',
        position: 'SF',
      },
      {
        id: 303,
        name: 'Derrick Rose',
        number: '1',
        position: 'PG',
      },
      {
        id: 304,
        name: 'Dennis Rodman',
        number: '91',
        position: 'PF',
      },
      {
        id: 305,
        name: 'Joakim Noah',
        number: '13',
        position: 'C',
      },
    ],
  },
  {
    id: 4,
    name: 'Heat',
    city: 'Miami',
    abbreviation: 'MIA',
    primaryColor: '#98002E',
    secondaryColor: '#F9A01B',
    //logo: '🔥',
    logoImage: heatLogo,
    players: [
      {
        id: 401,
        name: 'Dwyane Wade',
        number: '3',
        position: 'SG',
      },
      {
        id: 402,
        name: 'LeBron James',
        number: '6',
        position: 'SF',
      },
      {
        id: 403,
        name: 'Chris Bosh',
        number: '1',
        position: 'PF',
      },
      {
        id: 404,
        name: 'Jimmy Butler',
        number: '22',
        position: 'SF',
      },
      {
        id: 405,
        name: 'Alonzo Mourning',
        number: '33',
        position: 'C',
      },
    ],
  },
  {
    id: 5,
    name: 'Knicks',
    city: 'New York',
    abbreviation: 'NYK',
    primaryColor: '#006BB6',
    secondaryColor: '#F58426',
    //logo: '🗽',
    logoImage: knicksLogo,
    players: [
      {
        id: 501,
        name: 'Patrick Ewing',
        number: '33',
        position: 'C',
      },
      {
        id: 502,
        name: 'Walt Frazier',
        number: '10',
        position: 'PG',
      },
      {
        id: 503,
        name: 'Carmelo Anthony',
        number: '7',
        position: 'SF',
      },
      {
        id: 504,
        name: 'Allan Houston',
        number: '20',
        position: 'SG',
      },
      {
        id: 505,
        name: 'Amar’e Stoudemire',
        number: '1',
        position: 'PF',
      },
    ],
  },
  {
    id: 6,
    name: 'Spurs',
    city: 'San Antonio',
    abbreviation: 'SAS',
    primaryColor: '#000000',
    secondaryColor: '#C4CED4',
    logo: '🌪️',
    logoImage: spursLogo,
    players: [
      {
        id: 601,
        name: 'Tim Duncan',
        number: '21',
        position: 'PF',
      },
      {
        id: 602,
        name: 'Tony Parker',
        number: '9',
        position: 'PG',
      },
      {
        id: 603,
        name: 'Manu Ginóbili',
        number: '20',
        position: 'SG',
      },
      {
        id: 604,
        name: 'Kawhi Leonard',
        number: '2',
        position: 'SF',
      },
      {
        id: 605,
        name: 'David Robinson',
        number: '50',
        position: 'C',
      },
    ],
  },
];

