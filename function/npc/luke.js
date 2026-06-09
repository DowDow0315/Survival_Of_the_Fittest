function processLukeText(text, player){
    return text.replaceAll("{lukeTitle}", getLukeTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getLukeTitle(player){
    if (NPC_DATA["luke"].emotion.affection > 80) return "내 또라이";
    else if(NPC_DATA["luke"].emotion.affection > 50) return "멍청한 새끼";
    return "쓰레기";
}

registerActions("luke", {
    //처음 이벤트
    firstMeeting_defiant: (player) => {
        changeEmotion("luke", "affection", 5);
        changeHP(player, -10);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "m", 5)
        );
        changeSensitivity(player, "mSensitivity", 5);
        startScene(NPC_DATA["luke"].scenes.luke_firstMeeting_defiant, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_neutral: (player) => {
        changeEmotion("luke", "lust", 10);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "m", 10)
        );
        changeSensitivity(player, "mSensitivity", 10);
        startScene(NPC_DATA["luke"].scenes.luke_firstMeeting_neutral, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_submissive: (player) => {
        changeEmotion("luke", "lust", 15);
        changeEmotion("luke", "affection", 5);
        changeHP(player, -5);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "m", 15)
        );
        changeSensitivity(player, "mSensitivity", 20);
        addBodyFluid(player, "m", 15);
        startScene(NPC_DATA["luke"].scenes.luke_firstMeeting_submissive, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    //개인 이벤트

    //스토리 이벤트
    undercity_03_barrack_event(player){
        startScene(
            NPC_DATA["luke"].scenes.undercity_03_barrack_event,
            player,
            {
                onEnd : () => finishUndercity03BarrackEvent(player)
            }
        );
    },

    barrack_mock_fight: (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신이 한번 더 비웃자 루크는 잠시 말이 없었다. 그러더니 그는 폭소했다. 감히, 네가, 날, 비웃어? 웃음 소리가 끝나기도 전에 그의 주먹이 당신의 시야를 가득 채운다."
                ]
            }
        ], player, {
            onEnd : () => startLukeBarrackFight(player)
        });
    },


    //반복이벤트
    normalEncounter: (player) => {
        startScene(NPC_DATA["luke"].scenes.luke_normalEncounter, player, {
            onEnd: () => startScene(getLocationScene(player), player)
            });
    },

    normalEncounter_submissive: (player) => {
        runScene(
            NPC_DATA["luke"].scenes.luke_normalEncounter_submissive,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    },
    normalCheck: (player) => {
        startScene(NPC_DATA["luke"].scenes.luke_normalCheck, player, {
            onEnd: () => startScene(getLocationScene(player), player)
            });
    },
    normalCheck_submissive: (player) => {
        runLukeNormalCheckSubmissive(player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    patrol_event: (player) => {
        const patrolEvents = [
            ...NPC_DATA["luke"].scenes.luke_patrol_events
        ];
        
        const canUseUnsmoke =
        player.flags?.luke_told_stop_smoking &&
        NPC_DATA["luke"].emotion.affection > 50;
        
        if (canUseUnsmoke) {
            patrolEvents.push(
                ...NPC_DATA["luke"].scenes.luke_patrol_unsmoke_events
            );
        } else {
            patrolEvents.push(
                ...NPC_DATA["luke"].scenes.luke_patrol_smoke_events
            );
        }
        
        const scene = patrolEvents[Math.floor(Math.random() * patrolEvents.length)];
        startScene(scene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    missing_player_event_answer_sayYes: (player) => {
        const isMale = player.gender === "male";
        
        const scene = isMale
        ? NPC_DATA["luke"].scenes.luke_missing_player_event_sayYes_male
        : NPC_DATA["luke"].scenes.luke_missing_player_event_sayYes_female;
        
        startScene(scene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    patience_limit_accept: (player) => {
        const scene = player.gender === "male"
        ? NPC_DATA["luke"].scenes.luke_patience_limit_accept_male
        : NPC_DATA["luke"].scenes.luke_patience_limit_accept_female;
        startScene(scene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },
    
    patience_limit_refuse: (player) => {
        const luke = NPC_DATA["luke"].emotion;
        const forceScene = player.gender === "male"
        ? NPC_DATA["luke"].scenes.luke_patience_limit_force_male
        : NPC_DATA["luke"].scenes.luke_patience_limit_force_female;
        
        const forceCondition =
        luke.fear > 60 ||
        luke.dominance > luke.affection;
        
        if (forceCondition) {
            startScene(forceScene, player, {
                onEnd: () => startScene(getLocationScene(player), player)
            });
            return;
        }
        
        if (luke.affection > 70) {
            startScene(
                NPC_DATA["luke"].scenes.luke_patience_limit_respect,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }
        
        const playerStr = getPlayerStat(player, "str");
        
        if (playerStr >= 15) {
            startScene(
                NPC_DATA["luke"].scenes.luke_patience_limit_escape,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }
        
        startScene(forceScene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    }
})

window.luke_normalEncounter_runFailByGender = function(player, options){
    const affection = NPC_DATA["luke"].emotion.affection || 0;
    const isMale = player.gender === "male";

    let scene;

    if (affection > 80){
        scene = isMale
            ? NPC_DATA["luke"].scenes.luke_normalEncounter_fail_male_highAffection
            : NPC_DATA["luke"].scenes.luke_normalEncounter_fail_female_highAffection;

        runScene(scene, player, options);
        return true;
    }

    const effects = isMale
        ? [
            { target: "player", key: "hp", amount: -35 },
            { target: "player", key: "stamina", amount: -40 },
            { target: "player", key: "trauma", amount: 10 },
            { target: "sensitivity", key: "aSensitivity", amount: 30 },
            { "target" : "fluid", "key" : "a", "amount" : 25},
            { target: "sensitivity", key: "mSensitivity", amount: 20 },
            { "target" : "fluid", "key" : "m", "amount" : 25},
            { target: "npc", npc: "luke", key: "lust", amount: 15 },
            { target: "npc", npc: "luke", key: "fear", amount: 10 },
            { target: "npc", npc: "luke", key: "dominance", amount: 10 },
            { target: "time", amount: 40 }
        ]
        : [
            { target: "player", key: "hp", amount: -35 },
            { target: "player", key: "stamina", amount: -40 },
            { target: "player", key: "trauma", amount: 10 },
            { target: "sensitivity", key: "cSensitivity", amount: 30 },
            { target : "fluid", key : "c", amount : 25},
            { target: "sensitivity", key: "mSensitivity", amount: 20 },
            { target : "fluid", key : "m", amount : 25},
            { target: "sensitivity", key: "aSensitivity", amount: 30 },
            { target : "fluid", key : "a", amount : 25},
            { target: "npc", npc: "luke", key: "lust", amount: 15 },
            { target: "npc", npc: "luke", key: "fear", amount: 15 },
            { target: "npc", npc: "luke", key: "dominance", amount: 10 },
            { target: "time", amount: 40 }
        ];

    effects.forEach(effect => applyEffect(effect, player));

    scene = isMale
        ? NPC_DATA["luke"].scenes.luke_normalEncounter_fail_male
        : NPC_DATA["luke"].scenes.luke_normalEncounter_fail_female;

    startScene(scene, player, options);
    return true;
};

window.runLukeNormalCheckDexFail = function(player){
    const isMale = player.gender === "male";

    const effects = isMale
        ? [
            { target: "time", amount: 3 },
            { target: "npc", npc:"luke", key: "lust", amount: 10 },
            { target: "npc", npc:"luke", key: "dominance", amount: 3 },
            { target: "player", key: "arousal", amount: 8 },
            { target: "sensitivity", key: "aSensitivity", amount: 3 }
        ]
        : [
            { target: "time", amount: 3 },
            { target: "npc", npc:"luke", key: "lust", amount: 15 },
            { target: "npc", npc:"luke", key: "dominance", amount: 3 },
            { target: "player", key: "arousal", amount: 12 },
            { target: "sensitivity", key: "cSensitivity", amount: 5 },
            { target: "sensitivity", key: "aSensitivity", amount: 3 }
        ];

    effects.forEach(effect => applyEffect(effect, player));

    return true;
};

window.runLukeNormalCheckSubmissive = function(player, options){
    const isMale = player.gender === "male";

    if (isMale){
        const effects = [
            { target: "time", amount: 6 },
            { target: "player", key: "arousal", amount: 15 },
            { target: "sensitivity", key: "aSensitivity", amount: 6 },
            { target: "npc", npc: "luke", key: "dominance", amount: 5 }
        ];

        effects.forEach(effect => applyEffect(effect, player));

        startScene(
            NPC_DATA["luke"].scenes.luke_normalCheck_submissive_male,
            player,
            options
        );

        return true;
    }

    const effects = [
        { target: "time", amount: 6 },
        { target: "player", key: "arousal", amount: 20 },
        { target: "sensitivity", key: "cSensitivity", amount: 6 },
        { target: "sensitivity", key: "aSensitivity", amount: 6 },
        { target: "npc", npc: "luke", key: "dominance", amount: 5 }
    ];

    effects.forEach(effect => applyEffect(effect, player));

    startScene(
        NPC_DATA["luke"].scenes.luke_normalCheck_submissive_female,
        player,
        options
    );

    return true;
};

window.startLukeBarrackFight = function(player){
    startBattle("luke", player, {
        noEscape: true,

        onWin: () => {
            startScene(NPC_DATA["luke"].scenes.undercity_03_barrack_fight_win, player, {
                onEnd: () => finishUndercity03BarrackEvent(player)
            });
        },

        onSkipDefeat: () => {
            startScene(NPC_DATA["luke"].scenes.undercity_03_barrack_fight_lose, player, {
                onEnd: () => finishUndercity03BarrackEvent(player)
            });
        }
    });

    return true;
};

window.finishUndercity03BarrackEvent = function(player){
    player.location = "barracks";

    player.flags = player.flags || {};
    player.flags.undercity_03_luke_barrack_event_seen = true;
    player.flags.undercity_story_03_unlocked = true;

    savePlayer(player);

    startScene(getLocationScene(player), player);
};

window.setLukeStopSmokingFlag = function(player){
    player.flags = player.flags || {};
    player.flags.luke_told_stop_smoking = true;
    savePlayer(player);
};