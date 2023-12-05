import { promises as fs } from "fs";

const input = await fs.readFile("./2023/day5/document.txt", "utf8");

function parseInput(input) {
  const blocks = input.split("\n\n");
  const seeds = blocks[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => Number(x));
  const seedToSoil = blocks[1]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((x) => Number(x)));
  const soilToFertilizer = blocks[2]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((x) => Number(x)));
  const fertilizerToWater = blocks[3]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((x) => Number(x)));
  const waterToLight = blocks[4]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((x) => Number(x)));
  const lightToTemperature = blocks[5]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((x) => Number(x)));
  const temperatureToHumidity = blocks[6]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((x) => Number(x)));
  const humidityToLocation = blocks[7]
    .split(":\n")[1]
    .split("\n")
    .map((line) => line.split(" ").map((x) => Number(x)));
  return {
    seeds,
    maps: {
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    },
  };
}

const { seeds, maps } = parseInput(input);
const types = Object.keys(maps);

/* --- Part One --- */

function sourceToDistination(number, type) {
  for (const line of maps[type]) {
    if (number >= line[1] && number <= line[1] + line[2]) {
      return line[0] + number - line[1];
    }
  }
  return number;
}

function getLocations(seeds) {
  return seeds.map((seed) => {
    types.forEach((type) => {
      seed = sourceToDistination(seed, type);
    });
    return seed;
  });
}
const locations = getLocations(seeds);

console.log(Math.min(...locations));

/* --- Part Two --- */

const partTwoSeeds = [];

const rangedSeeds = seeds
  .map((seed, index) => {
    if (index % 2 === 1) return null;
    return { start: seed, length: seeds[index + 1] };
  })
  .filter(Boolean);
