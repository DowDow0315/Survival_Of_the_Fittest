window.EVENTS.push({
    id : "act_03_start_rebel_route",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act_02_abomination_attack_start_rebel_route_seen &&
        player.flags?.act_02_abomination_attack_guardPost3_seen &&
        player.flags?.act3CollapseDone &&
        !player.flags?.act_03_start_rebel_route_seen,

    action : (player) => {
        player.flags.act_03_start_rebel_route_seen = true;
        player.flags.act3_rebel_route = true;
        player.flags.act3_quest_01_unlocked = true;
        changeNPCEmotion("yuri", "rage", -30);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 오자 쉘터의 아이들이 당신에게 달려왔다. 몇몇은 당신에게 안겨서 당신이 죽은 줄 알았다고, 무서웠다며 울음을 터뜨렸다." +
                    "<br><br>\"{playerName}...?\"<br><br>" +
                    "뒤에서 들리는 익숙한 목소리, 툭, 그가 들고 있던 봉투가 바닥으로 떨어졌다. 유리는 눈을 느리게 깜박이다가 그대로 당신을 끌어안았다." +
                    "<br>그는 당신을 끌어안은 채 아무 말도 하지 않았다. 하지만 당신은 그가 어떻게든 울음을 참고 있다는 걸 느낄 수 있었다. 그의 숨소리는 젖어 있었다. 그렇게 몇 초간 당신만을 안고 있던 유리는 천천히 당신을 놓아주었다." +
                    "<br><br>\"...네가 정말로 죽은 줄 알았어.\"<br><br>" +
                    "그 순간 뒤에서 큰 소리가 들렸다. 쉘터의 아이가 눈물이 가득한 얼굴로 들어왔다. 그는 자신의 동생이 도적떼에게 잡혀간 것 같다고 말했다. 유리는 당신을 끌어안으며 아이를 돌아보았다." +
                    "<br><br>\"내가 갈게. {playerName}, 넌.... 위험한 곳은 가지 않았으면 해.\"<br><br>" +
                    "유리는 당신이 또 위험헤 처하는 것을 보고 싶지 않은 모양이다.<br><br>...의뢰는 주점에서 받을 수 있다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});