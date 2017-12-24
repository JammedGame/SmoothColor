export { Levels }

let Levels = 
[ 
    // Level 1
    {
        Level: 1,
        BasicOnly: true,
        LowChannel: false,
        LowHighMixes: false,
        Humans: 5,
        BronzeScore: 3,
        SilverScore: 5,
        GoldScore: 10,
        Hint: "Use [Q,W,E] to activate channels. [Q] for Red, [W] for Green, [E] for Blue."
    },
    // Level 2
    {
        Level: 2,
        BasicOnly: false,
        LowChannel: false,
        LowHighMixes: false,
        Humans: 8,
        BronzeScore: 10,
        SilverScore: 12,
        GoldScore: 15,
        Hint: "By combining channels you get different colors."
    },
    // Level 3
    {
        Level: 3,
        BasicOnly: false,
        LowChannel: false,
        LowHighMixes: false,
        Humans: 12,
        BronzeScore: 15,
        SilverScore: 17,
        GoldScore: 20
    },
    // Level 4
    {
        Level: 4,
        BasicOnly: false,
        LowChannel: false,
        LowHighMixes: false,
        Humans: 15,
        BronzeScore: 18,
        SilverScore: 21,
        GoldScore: 25
    },
    // Level 5
    {
        Level: 3,
        BasicOnly: false,
        LowChannel: true,
        LowHighMixes: false,
        Humans: 10,
        BronzeScore: 15,
        SilverScore: 17,
        GoldScore: 20,
        Hint: "Use [A,S,D] to activate HALF channels. [A] for Red, [S] for Green, [D] for Blue."
    },
    // Level 6
    {
        Level: 6,
        BasicOnly: false,
        LowChannel: true,
        LowHighMixes: false,
        Humans: 10,
        BronzeScore: 17,
        SilverScore: 20,
        GoldScore: 25
    },
    // Level 7
    {
        Level: 7,
        BasicOnly: false,
        LowChannel: true,
        LowHighMixes: true,
        Humans: 10,
        BronzeScore: 17,
        SilverScore: 20,
        GoldScore: 25,
        Hint: "You can mix FULL and HALF channels."
    },
    // Level 8
    {
        Level: 8,
        BasicOnly: false,
        LowChannel: true,
        LowHighMixes: true,
        Humans: 10,
        BronzeScore: 20,
        SilverScore: 25,
        GoldScore: 30,
    },
    // Level 9
    {
        Level: 9,
        BasicOnly: false,
        LowChannel: true,
        LowHighMixes: true,
        Humans: 20,
        BronzeScore: 50,
        SilverScore: 80,
        GoldScore: 100,
    }
];