//유리
window.EVENTS.push({
    id : "yuri_hisGathering",

    condition : (player) =>
        player.justMoved &&
        player.location === "deepForest" &&
        NPC_DATA["yuri"].emotion.affection > 30 &&
        (
            getTimePeriod(player) === "morning" ||
            getTimePeriod(player) === "afternoon"
        ) &&
        !player.flags?.yuriDie &&
        Math.random() < 0.1,

    action : (player) => {

        startScene(
            NPC_DATA["yuri"].scenes.yuri_hisGathering,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//에릭
window.EVENTS.push({
    id : "eric_chasingSomething_event_01",

    condition : (player) =>
        player.justMoved &&
        player.location === "deepForest" &&
        player.flags?.uppercity_story_02_done &&
        player.flags?.eric_chasingSomething_event_01_day !== getCurrentDay(player) &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        !player.flags?.ericDie &&
        Math.random() < 0.07,

    action : (player) => {
        player.flags.eric_chasingSomething_event_01_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["eric"].scenes.eric_chasingSomething_event_01,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "eric_chasingSomething_event_02",

    condition : (player) =>
        player.justMoved &&
        player.location === "banditForest" &&
        player.flags?.uppercity_story_02_done &&
        player.flags?.eric_chasingSomething_event_02_day !== getCurrentDay(player) &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        !player.flags?.ericDie &&
        Math.random() < 0.07,

    action : (player) => {
        player.flags.eric_chasingSomething_event_02_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["eric"].scenes.eric_chasingSomething_event_02,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "eric_chasingSomething_event_03",

    condition : (player) =>
        player.justMoved &&
        player.location === "guardPost3" &&
        player.flags?.uppercity_story_02_done &&
        player.flags?.eric_chasingSomething_event_03_day !== getCurrentDay(player) &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        !player.flags?.ericDie &&
        Math.random() < 0.07,

    action : (player) => {
        player.flags.eric_chasingSomething_event_03_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["eric"].scenes.eric_chasingSomething_event_03,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "eric_notStopFiring",
    once : true,

    condition : (player) =>
        player.location === "guardPost3" &&
        player.flags?.uppercity_story_02_done &&
        NPC_DATA["eric"].emotion.affection > 30 &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        !player.flags?.eric_notStopFiring_seen &&
        !player.flags?.ericDie,

    action : (player) => {
        player.flags.eric_notStopFiring_seen = true;
        savePlayer(player);
        
        startScene(
            NPC_DATA["eric"].scenes.eric_notStopFiring,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});