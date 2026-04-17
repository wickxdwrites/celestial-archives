import celestialTheme from "./celestial";
import ef007eTheme from "./ef007e";
import aehbTheme from "./aehb";

const themes = {
  celestial: celestialTheme,
  ef007e: ef007eTheme,
  aehb: aehbTheme,
};

export function getTheme(themeId = "celestial") {
  return themes[themeId] || themes.celestial;
}

export default themes;