export function getGenderLabel(gender: string): string {
  switch (gender) {
    case "female":
      return "Gênero feminino";
    case "male":
      return "Gênero masculino";
    case "hermaphrodite":
      return "Hermafrodita";
    default:
      return "Gênero desconhecido";
  }
}

export function getHairColorLabel(hairColor: string): string {
  const hairColorMap: Record<string, string> = {
    blond: "Loiro",
    brown: "Castanho",
    black: "Preto",
    auburn: "Castanho Avermelhado",
    grey: "Cinza",
    gray: "Cinza",
    white: "Branco",
    red: "Ruivo",
    bald: "Careca",
    "n/a": "Sem cabelo",
    none: "Sem cabelo",
  };

  const colors = hairColor
    .toLowerCase()
    .split(",")
    .map((c) => c.trim());

  const translated = colors.map(
    (color) => hairColorMap[color] || "Desconhecido"
  );

  return [...new Set(translated)].join(" e ");
}

export function getSkinColorLabel(skinColor: string): string {
  const skinColorMap: Record<string, string> = {
    fair: "Clara",
    pale: "Pálida",
    light: "Clara",
    dark: "Escura",
    green: "Verde",
    gold: "Dourada",
    blue: "Azul",
    red: "Vermelha",
    white: "Branca",
    brown: "Marrom",
    orange: "Laranja",
    yellow: "Amarela",
    grey: "Cinza",
    gray: "Cinza",
    pink: "Rosa",
    unknown: "Desconhecida",
  };

  const colors = skinColor
    .toLowerCase()
    .split(",")
    .map((c) => c.trim());

  const translated = colors.map(
    (color) => skinColorMap[color] || "Desconhecida"
  );

  return [...new Set(translated)].join(" e ");
}

export function getEyeColorLabel(eyeColor: string): string {
  const eyeColorMap: Record<string, string> = {
    blue: "Azul",
    brown: "Castanho",
    yellow: "Amarelo",
    red: "Vermelho",
    orange: "Laranja",
    black: "Preto",
    hazel: "Avelã",
    pink: "Rosa",
    gold: "Dourado",
    green: "Verde",
    white: "Branco",
    unknown: "Desconhecida",
  };

  const colors = eyeColor
    .toLowerCase()
    .split(",")
    .map((c) => c.trim());

  const translated = colors.map(
    (color) => eyeColorMap[color] || "Desconhecida"
  );

  return [...new Set(translated)].join(" e ");
}

export function translateFilmTitle(englishTitle: string): string {
  const titulo = englishTitle.toLowerCase();

  switch (titulo) {
    case "a new hope":
      return "Uma Nova Esperança";
    case "the empire strikes back":
      return "O Império Contra-Ataca";
    case "return of the jedi":
      return "O Retorno de Jedi";
    case "the phantom menace":
      return "A Ameaça Fantasma";
    case "attack of the clones":
      return "O Ataque dos Clones";
    case "revenge of the sith":
      return "A Vingança dos Sith";
    case "the force awakens":
      return "O Despertar da Força";
    default:
      return englishTitle;
  }
}

export function formatBirthYear(year: string, gender: string): string {
  if (!year || year.toLowerCase() === "unknown") {
    return "Ano de nascimento desconhecido";
  }

  const match = year.match(/^(\d+\.?\d*)(bby|aby)$/i);

  if (!match) {
    return `Ano de nascimento: ${year}`;
  }

  const [_, valor, era] = match;
  const number = Number.parseFloat(valor);
  const unity = number === 1 ? "ano" : "anos";

  const formatedGender = gender.toLowerCase();
  const femOrMasc = formatedGender === "female" ? "Nascida" : "Nascido";

  if (era.toLowerCase() === "bby") {
    return `${femOrMasc} ${number} ${unity} antes da Batalha de Yavin`;
  }

  if (era.toLowerCase() === "aby") {
    return `${femOrMasc} ${number} ${unity} depois da Batalha de Yavin`;
  }

  return `Ano de nascimento: ${year}`;
}

export function getClimateLabel(climate: string): string {
  const climateMap: Record<string, string> = {
    arid: "Árido",
    artic: "Ártico",
    temperate: "Temperado",
    frozen: "Congelado",
    tropical: "Tropical",
    murky: "Turvo",
    windy: "Ventoso",
    hot: "Quente",
    humid: "Úmido",
    moist: "Úmido",
    frigid: "Frio extremo",
    subartic: "Subártico",
    artificial: "Artificial",
    polluted: "Poluído",
    rocky: "Pedregoso",
    superheated: "Superaquecido",
    frozen_wastes: "Desertos Congelados",
    unknown: "Desconhecido",
    "artificial temperate": "Artificial temperado",
  };

  return climate
    .split(",")
    .map((item) => {
      const trimmed = item.trim().toLowerCase();
      return climateMap[trimmed] || capitalize(trimmed);
    })
    .join(", ");
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getTerrainLabel(terrain: string): string {
  const terrainMap: Record<string, string> = {
    desert: "Deserto",
    deserts: "Desertos",
    grasslands: "Campos de grama",
    mountains: "Montanhas",
    jungle: "Selva",
    forest: "Floresta",
    forests: "Florestas",
    lakes: "Lagos",
    rivers: "Rios",
    ocean: "Oceano",
    swamp: "Pântano",
    cityscape: "Área urbana",
    tundra: "Tundra",
    ice: "Gelo",
    rocky: "Rochoso",
    volcanoes: "Vulcões",
    plains: "Planícies",
    hills: "Colinas",
    caves: "Cavernas",
    barren: "Estéril",
    savanna: "Savana",
    savannas: "Savanas",
    savannahs: "Savanas",
    sinkholes: "Sumidouros",
    cliffs: "Penhascos",
    fields: "Campos",
    rainforests: "Florestas tropicais",
    canyons: "Cânions",
    glaciers: "Geleiras",
    islands: "Ilhas",
    beaches: "Praias",
    plateaus: "Planaltos",
    unknown: "Desconhecido",
    jungles: "Selvas",
    swamps: "Pântanos",
    mountain: "Montanha",
    grass: "Grama",
    scrublands: "Regiões de arbustos",
    urban: "Urbano",
    oceans: "Oceanos",
    bogs: "Turfeiras",
    mesas: "Chapadas",
    seas: "Mares",
    reefs: "Recifes",
    valleys: "Vales",
    ash: "Cinzas",
    verdant: "Verdejante",
    vines: "Vinhas",
    cities: "Cidades",
    "gas giant": "Gigante de gás",
    "lava rivers": "Rios de lava",
    "mountain ranges": "Serras",
    "ice caves": "Cavernas de gelo",
    "grassy hills": "Montanhas gramadas",
    "airless asteroid": "Asteroide sem atmosfera",
    "ice canyons": "Cânios de gelo",
    "rocky canyons": "Cânios de pedra",
    "fungus forests": "Florestas de fungos",
    "rock arches": "Arcos de pedra",
    "rocky islands": "Ilhas de pedra",
    "rocky deserts": "Desertos de pedra",
    "toxic cloudsea": "Mar de nuvens tóxicas",
    "acid pools": "Lagos de ácido",
  };

  return terrain
    .split(",")
    .map((item) => {
      const trimmed = item.trim().toLowerCase();
      return terrainMap[trimmed] || capitalize(trimmed);
    })
    .join(", ");
}

export function getRotationPeriodLabel(value: string): string {
  if (value.toLowerCase() === "unknown") return "Desconhecido";

  const num = Number.parseInt(value, 10);
  if (Number.isNaN(num)) return "Período inválido";

  if (num === 0) return "Sem rotação";

  return `Um dia dura ${num} h`;
}

export function getOrbitalPeriodLabel(value: string): string {
  if (value.toLowerCase() === "unknown") return "Desconhecido";

  const num = Number.parseInt(value, 10);
  if (Number.isNaN(num)) return "Período inválido";

  if (num === 0) return "Sem translação";

  return `Um ano dura ${num} dia${num === 1 ? "" : "s"}`;
}

export function formatDiameter(diameter: string): string {
  const km = Number.parseInt(diameter, 10);
  if (Number.isNaN(km)) return "Diâmetro desconhecido";

  if (km >= 1000) {
    const milhares = (km / 1000).toFixed(1).replace(".", ",");
    return `${milhares} mil km de diâmetro`;
  }
  return `${km} km de diâmetro`;
}

export function formatPopulation(population: string): string {
  const pop = Number.parseInt(population, 10);
  if (Number.isNaN(pop)) return "População desconhecida";

  if (pop >= 1_000_000_000_000) {
    return `${(pop / 1_000_000_000_000)
      .toFixed(1)
      .replace(".", ",")} trilhões de habitantes`;
  }
  if (pop >= 1_000_000_000) {
    return `${(pop / 1_000_000_000)
      .toFixed(1)
      .replace(".", ",")} bilhões de habitantes`;
  }
  if (pop >= 1_000_000) {
    return `${(pop / 1_000_000)
      .toFixed(1)
      .replace(".", ",")} milhões de habitantes`;
  }
  return `${pop.toLocaleString("pt-BR")} habitantes`;
}
