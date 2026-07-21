Object.assign(DUNGEONS, {
    survivalBandit : {
        id : "survivalBandit",
        name : "도적들의 생존지",
        startRoom : "r2c4",

        layout : [
            ["r0c0",     "", "r0c2", "r0c3", "r0c4"],
            ["r1c0",     "", "r1c2",     "", "r1c4"],
            ["r2c0", "r2c1", "r2c2",     "", "r2c4"],
            [    "", "r3c1",     "",     "",     ""],
            ["r4c0", "r4c1", "r4c2", "r4c3",     ""]
        ],

        rooms : {
            "r0c0" : {name : "", exits : {down : "r1c0"}},
            "r0c2" : {name : "", exits : {down : "r1c2", right : "r0c3"}},
            "r0c3" : {name : "", exits : {left : "r0c2", right : "r0c4"}},
            "r0c4" : {name : "", exits : {left : "r0c3", down : "r1c4"}},

            "r1c0" : {name : "", exits : {up : "r0c0", down : "r2c0"}},
            "r1c2" : {name : "", exits : {up : "r0c2", down : "r2c2"}},
            "r1c4" : {name : "", exits : {up : "r0c4", down : "r2c4"}},

            "r2c0" : {name : "", exits : {up : "r1c0", right : "r2c1"}},
            "r2c1" : {name : "", exits : {left : "r2c0", down : "r3c1", right : "r2c2"}},
            "r2c2" : {name : "", exits : {left : "r2c1", up : "r1c2"}},
            "r2c4" : {name : "", exits : {up : "r1c4"}},

            "r3c1" : {name : "", exits : {up : "r2c1", down : "r4c1"}},

            "r4c0" : {name : "", exits : {right : "r4c1"}},
            "r4c1" : {name : "", exits : {left : "r4c0", up : "r3c1", right : "r4c2"}},
            "r4c2" : {name : "", exits : {left : "r4c1", right : "r4c3"}},
            "r4c3" : {name : "", exits : {left : "r4c2"}}
        }
    },

    abominationCave : {
        id : "abominationCave",
        name : "흉물소굴",
        startRoom : "r1c6",

        layout : [
            [    "",     "", "r0c2", "r0c3", "r0c4", "r0c5",     "",     ""],
            ["r1c0", "r1c1",     "", "r1c3",     "",     "", "r1c6",     ""],
            ["r2c0",     "",     "", "r2c3",     "",     "", "r2c6",     ""],
            ["r3c0", "r3c1", "r3c2", "r3c3", "r3c4", "r3c5", "r3c6", "r3c7"],
            [    "", "r4c1",     "",     "",     "",     "",     "", "r4c7"],
            [    "", "r5c1",     "",     "", "r5c4",     "", "r5c6", "r5c7"],
            [    "", "r6c1", "r6c2", "r6c3", "r6c4",     "",     "", "r6c7"]
        ],

        rooms : {
            "r0c2" : {name : "", exits : {right : "r0c3"}},
            "r0c3" : {name : "", exits : {left : "r0c2", right : "r0c4", down : "r1c3"}},
            "r0c4" : {name : "", exits : {left : "r0c3", right : "r0c5"}},
            "r0c5" : {name : "", exits : {left : "r0c4"}},

            "r1c0" : {name : "", exits : {right : "r1c1", down : "r2c0"}, safeZone: true, allowRest: true },
            "r1c1" : {name : "", exits : {left : "r1c0"}, bossId: "abominationMixedLarge", boss : ["abominationMixedHead", "abominationMixedArms", "abominationMixedArms", "abominationMixedMiddle"]},
            "r1c3" : {name : "", exits : {up : "r0c3", down : "r2c3"}},
            "r1c6" : {name : "", exits : {down : "r2c6"}},

            "r2c0" : {name : "", exits : {up : "r1c0", down : "r3c0"}},
            "r2c3" : {name : "", exits : {up : "r1c3", down : "r3c3"}},
            "r2c6" : {name : "", exits : {up : "r1c6", down : "r3c6"}},

            "r3c0" : {name : "", exits : {up : "r2c0", right : "r3c1"}},
            "r3c1" : {name : "", exits : {left : "r3c0", right : "r3c2", down : "r4c1"}},
            "r3c2" : {name : "", exits : {left : "r3c1", right : "r3c3"}},
            "r3c3" : {name : "", exits : {left : "r3c2", right : "r3c4", up : "r2c3"}},
            "r3c4" : {name : "", exits : {left : "r3c3", right : "r3c5"}},
            "r3c5" : {name : "", exits : {left : "r3c4", right : "r3c6"}},
            "r3c6" : {name : "", exits : {left : "r3c5", right : "r3c7", up : "r2c6"}},
            "r3c7" : {name : "", exits : {left : "r3c6", down : "r4c7"}},

            "r4c1" : {name : "", exits : {up : "r3c1", down : "r5c1"}},
            "r4c7" : {name : "", exits : {up : "r3c7", down : "r5c7"}},

            "r5c1" : {name : "", exits : {up : "r4c1", down : "r6c1"}},
            "r5c4" : {name : "", exits : {down : "r6c4"}},
            "r5c6" : {name : "", exits : {right : "r5c7"}},
            "r5c7" : {name : "", exits : {left : "r5c6", up : "r4c7", down : "r6c7"}},
            
            "r6c1" : {name : "", exits : {up: "r5c1", right : "r6c2"}},
            "r6c2" : {name : "", exits : {left : "r6c1", right : "r6c3"}},
            "r6c3" : {name : "", exits : {left : "r6c2", right : "r6c4"}},
            "r6c4" : {name : "", exits : {left : "r6c3", up : "r5c4"}},
            "r6c7" : {name : "", exits : {up : "r5c7"}}
        },

        encounters : [
            { type : "battle", enemy : "abomination1", minCount : 2, maxCount : 4, weight : 30},
            { type : "battle", enemies : ["abomination1", "abomination2"], weight : 35},
        ]

    }
})