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
