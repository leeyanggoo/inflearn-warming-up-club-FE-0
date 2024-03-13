// https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
export const colors = {
  normal: "#A8A77A",
  fighting: "#C22E28",
  flying: "#A98FF3",
  poison: "#A33EA1",
  ground: "#E2BF65",
  rock: "#B6A136",
  bug: "#A6B91A",
  ghost: "#735797",
  steel: "#B7B7CE",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  psychic: "#F95587",
  ice: "#96D9D6",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
  default: "#808080",
};

export function getColor(type) {
  if (type in colors) {
    return colors[type];
  } else {
    return colors.default;
  }
}
