// In-memory data store using simple arrays and objects

const USERS = [
    {
        id: 999,
        username: 'admin',
        password: 'admin', // Hardcoded for simplified access as requested
        country: 'Italy',
        role: 'admin'
    }
];
const TEAMS = [
    {
        id: 1,
        name: "Red Bull Racing",
        base: "Milton Keynes, United Kingdom",
        boothCountry: "Austria",
        chassis: "RB21",
        powerUnit: "Honda RBPT",
        principal: "Christian Horner",
        drivers: ["Max Verstappen", "Sergio Perez"],
        history: "Defending champions looking to maintain dominance with the new RB21.",
        image: "/images/teams/red_bull_f1_car_1766090175673.png",
        color: "bg-blue-900"
    },
    {
        id: 2,
        name: "Mercedes-AMG PETRONAS",
        base: "Brackley, United Kingdom",
        boothCountry: "Germany",
        chassis: "W16",
        powerUnit: "Mercedes",
        principal: "Toto Wolff",
        drivers: ["George Russell", "Kimi Antonelli"],
        history: "A new era begins for the Silver Arrows with young prodigy Kimi Antonelli joining George Russell.",
        image: "/images/teams/mercedes_f1_car_1766090207861.png",
        color: "bg-teal-500"
    },
    {
        id: 3,
        name: "Scuderia Ferrari",
        base: "Maranello, Italy",
        boothCountry: "Italy",
        chassis: "SF-25",
        powerUnit: "Ferrari",
        principal: "Frédéric Vasseur",
        drivers: ["Charles Leclerc", "Lewis Hamilton"],
        history: "The biggest move in F1 history: Lewis Hamilton joins the Prancing Horse to chase his 8th title in Red.",
        image: "/images/teams/ferrari_f1_car_1766090191659.png",
        color: "bg-red-600"
    },
    {
        id: 4,
        name: "McLaren Formula 1 Team",
        base: "Woking, United Kingdom",
        boothCountry: "United Kingdom",
        chassis: "MCL39",
        powerUnit: "Mercedes",
        principal: "Andrea Stella",
        drivers: ["Lando Norris", "Oscar Piastri"],
        history: "After a stunning resurgence, McLaren aims for the Constructors' Championship with their star driver pairing.",
        image: "/images/teams/mclaren_f1_car_1766090222713.png",
        color: "bg-orange-500"
    },
    {
        id: 5,
        name: "Aston Martin Aramco",
        base: "Silverstone, United Kingdom",
        boothCountry: "United Kingdom",
        chassis: "AMR25",
        powerUnit: "Honda",
        principal: "Mike Krack",
        drivers: ["Fernando Alonso", "Lance Stroll"],
        history: "With the arrival of Adrian Newey (Simulated), Aston Martin looks to shake up the grid order.",
        image: "/images/teams/aston_martin_f1_car_1766090237562.png",
        color: "bg-emerald-700"
    }
];

const MEETUPS = [];

const STRATEGIES = [
    {
        track: "Monaco Grand Prix",
        recommended: "Hard -> Medium",
        pitWindow: "Lap 30-40",
        undercutPotential: "Low",
        avgPitLoss: "20s"
    },
    {
        track: "Silverstone",
        recommended: "Medium -> Hard",
        pitWindow: "Lap 22-26",
        undercutPotential: "High",
        avgPitLoss: "24s"
    },
    {
        track: "Monza",
        recommended: "Soft -> Medium -> Soft",
        pitWindow: "Lap 15-20, Lap 40-45",
        undercutPotential: "Medium",
        avgPitLoss: "22s"
    }
];

module.exports = {
    USERS,
    TEAMS,
    MEETUPS,
    STRATEGIES
};
