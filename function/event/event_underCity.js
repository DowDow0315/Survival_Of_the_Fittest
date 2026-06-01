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

//소라

//유리

//니콜라이

