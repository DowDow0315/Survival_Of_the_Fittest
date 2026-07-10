//유리
window.EVENTS.push({
    id : "yuri_hisGathering",

    condition : (player) =>
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