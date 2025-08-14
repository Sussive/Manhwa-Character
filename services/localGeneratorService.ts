import type { CharacterProfile } from '../types';

// Data pools for generating character profiles locally
const localizaciones = [
  "La Cima Celestial del Loto Nevado, una montaña que perfora las nubes y donde solo los más puros pueden respirar.",
  "El Valle Escondido del Eco del Dragón, un lugar místico donde las técnicas marciales resuenan en el aire.",
  "La Ciudadela de Acero Negro, una fortaleza inexpugnable forjada en el corazón de un volcán inactivo.",
  "El Pantano de las Mil Ilusiones, un laberinto mortal que confunde la mente y el espíritu.",
  "El Bosque de las Espadas Susurrantes, donde cada hoja de árbol corta como el acero más fino.",
];

const sectas = [
  "La Secta de la Espada de Jade Imperial",
  "El Culto del Demonio de Sangre Ascendente",
  "El Pabellón de la Nube Púrpura",
  "La Alianza de los Mendigos Justos",
  "El Templo del Puño Inmortal",
];

const artesMarcialesDivinas = [
  "El Arte de los Mil Golpes Fantasmales",
  "La Palma Divina que Somete al Dragón",
  "La Danza de la Sombra Lunar Cortante",
  "El Sutra del Corazón de Diamante Inquebrantable",
  "La Técnica de la Aguja Voladora del Fénix",
];

const familias = [
  "El Clan Namgung, conocidos por su maestría inigualable con la lanza.",
  "La Familia Baek, desterrados y caídos en desgracia, pero guardianes de un antiguo secreto.",
  "La Casa Murong, aristócratas marciales cuya riqueza solo es superada por su arrogancia y poder.",
  "El linaje Tang, maestros del veneno y el sigilo, temidos en cada rincón del Murim.",
  "La estirpe Jo, famosos por su inquebrantable 'Puño de Hierro' y su lealtad férrea.",
];

const destinos = [
  "está destinado/a a unificar las facciones fracturadas del Murim bajo una sola bandera.",
  "según una antigua profecía, despertará un poder ancestral dormido para enfrentar una calamidad.",
  "lleva una maldición de sangre que lo/la obliga a buscar venganza contra el Emperador Demonio.",
  "se convertirá en la única persona en cien años en dominar las Siete Artes Celestiales Prohibidas.",
  "su camino está entrelazado con el de un rival celestial, y su batalla final sacudirá los cimientos del mundo.",
];

// Helper function to get a random element from an array
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateLocalCharacterProfile = async (name: string): Promise<CharacterProfile> => {
  // Simulate network delay to keep the loader experience consistent
  await new Promise(resolve => setTimeout(resolve, 1200));

  const profile: CharacterProfile = {
    localizacion: getRandomElement(localizaciones),
    secta: getRandomElement(sectas),
    arteMarcialDivina: getRandomElement(artesMarcialesDivinas),
    familia: getRandomElement(familias),
    // Customize the destiny slightly with the character's name
    destino: `Se dice que alguien llamado ${name} ${getRandomElement(destinos)}`,
  };

  return profile;
};
