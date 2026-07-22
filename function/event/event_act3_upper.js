window.EVENTS.push({
    id : "act_03_start_uppercity_route",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act_02_abomination_attack_start_uppercity_route_seen &&
        player.flags?.act_02_abomination_attack_guardPost3_seen &&
        player.flags?.act3CollapseDone &&
        !player.flags?.act_03_start_uppercity_route_seen,

    action : (player) => {
        player.flags.act_03_start_uppercity_route_seen = true;
        player.flags.act3_uppercity_route = true;
        player.flags.act3_quest_01_unlocked = true;
        changeNPCEmotion("yuri", "rage", 50);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"하류도시의 영웅.\"<br><br>" +
                    "쉘터에 도착하자 에이든이 있었다. 푸른 머리카락 아래로 드러난 그의 금안에는 당신이 온전히 담겨 있었다." +
                    "<br><br>\"...살아계셨군요. 이번에는 정말로 죽었을 거라 생각하고 있었습니다.<br>발렌 님이 죽었을지도 모르는 누군가를 일주일 동안이나 찾은 건 처음인 것 같습니다.\"<br><br>" +
                    "그는 당신이 없던 일주일 동안 많은 것들이 바뀌었지만, 결국 본질은 바뀌지 않았다고 말했다." +
                    "<br><br>\"도적떼들은 여전합니다. 이제는 마을 입구까지 밀려왔지만 당신이라면 해내실 수 있을 거라고 생각합니다.\"<br><br>" +
                    "그는 퀘스트는 평소처럼 주점에 올려놨다고 말했다. 그는 잠깐 말을 멈췄다가 다시 당신을 보았다." +
                    "<br><br>\"저는 그럼 발렌님께 당신의 소식을 전하러 가겠습니다. 몸 평안하시길.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});