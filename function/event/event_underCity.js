//에릭

//루크
window.EVENTS.push({
    id : "luke_guard_punishment_event",
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.bandit_luke_event_done &&
        NPC_DATA["luke"].emotion.affection > 50 &&
        !player.flags?.luke_guard_punishment_event_seen,

    action : (player) => {
        player.flags.luke_guard_punishment_event_seen = true;
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_guard_punishment_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "luke_missing_player_event",

    condition : (player) =>
        player.flags?.bandit_luke_event_done &&
        NPC_DATA["luke"].emotion.affection > 80 &&
        !["townEntrance", "townStreet", "darkStreet", "barracks"].includes(player.location) &&
        getLukeUndercityAbsenceDays(player) >= 14 &&
        Math.random() < 0.15,

    action : (player) => {
        player.flags = player.flags || {};
        player.flags.luke_left_undercity_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_missing_player_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

function updateLukeUndercityAbsence(player){
    player.flags = player.flags || {};

    const undercityLocations = ["townEntrance", "townStreet", "darkStreet", "barracks"];
    const isInUndercity = undercityLocations.includes(player.location);
    const today = getCurrentDay(player);

    if (isInUndercity) {
        player.flags.luke_left_undercity_day = null;
        return;
    }

    if (player.flags.luke_left_undercity_day == null) {
        player.flags.luke_left_undercity_day = today;
        savePlayer(player);
    }
}

function getLukeUndercityAbsenceDays(player){
    const leftDay = player.flags?.luke_left_undercity_day;
    if (leftDay == null) return 0;

    return getCurrentDay(player) - leftDay;
}

window.EVENTS.push({
    id : "luke_patience_limit_event",

    condition : (player) =>
        (player.location === "townEntrance" ||
         player.location === "townStreet" ||
         player.location === "darkStreet") &&
        NPC_DATA["luke"].emotion.lust >= 100,

    action : (player) => {
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_patience_limit_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//소라

//유리

//니콜라이

