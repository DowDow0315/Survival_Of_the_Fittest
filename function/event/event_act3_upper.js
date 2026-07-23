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

window.EVENTS.push({
    id : "upper_route_abominationAttack",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_01_done_day + 2) &&
        !player.flags?.upper_route_abominationAttack,

    action : (player) => {
        player.flags.upper_route_abominationAttack = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"하류도시의 영웅.\"<br><br>" +
                    "백색 군인 전령이다. 몇몇 하류도시의 사람들이 백색 군인 전령을 곱지 않은 시선으로 바라보았다. 특히나 경비병들은 더 심했다." +
                    "<br><br>\"아카시아 님께서 부르십니다. 천국의 성으로 와주시길 바랍니다.\"<br><br>" +
                    "그의 말이 끝나기도 전에 어떤 사람이 그에게 돌을 집어서 던졌다. 주변에 있던 모든 사람들의 행동이 굳었다. 돌을 던진 사람은 씩씩거리며 왜 상류도시는 군대를 안 보내주냐고 물었다." +
                    "<br><br>\"미천한 것이.\"<br><br>" +
                    "당신에게만 들릴 정도로 작은 목소리였다. 그는 고개를 돌리더니 돌을 던진 자에게 성큼성큼 다가갔다." +
                    "<br><br>\"군대를 안 보냈다고요? 그럼 저기 서있는 사람들은 백색 군대가 아닌가 보군요.\"<br><br>" +
                    "\"저렇게 적은 사람들만 보내놓고 군대를 보낸 거라고? 다른 군인들은 성안에 숨어있기라도 한 거냐!?\"<br><br>" +
                    "당신은 그의 손이 자신의 검에 닿았다가 떨어지는 것을 보았다. 사람들 시선 때문에 그는 억지로 살의를 참고 있었다." +
                    "<br><br>\"저희는 보내지 않아도 되는데도 보내드린 겁니다. 이런 호의까지 거절하신다면, 다음번에는 당신들에게 아예 호의를 안 보일 수도 있겠군요. 안타깝게도.<br><br>하류도시의 군대가 이리 엉망일 거라고 발렌 님이 상상이나 하셨을까요.\"<br><br>" +
                    "개판인 군대 체계. 모두가 느끼고 있는 문제점이었다. 그는 자연스럽게 적의를 하류도시의 경비병들에게 돌리며 마지막으로 쐐기를 박았다." +
                    "<br><br>\"저희 쪽에서도 죽은 사람들은 많습니다. 하류도시에 군대를 보내지 말라는 의견이 많은데도 군대를 보내주는 건, 전부 발렌 님의 의지 떄문이라는 걸 알아주시길.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_abominationAttack_about",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_abominationAttack &&
        getCurrentDay(player) >= (player.flags.act3_quest_01_done_day + 2) &&
        !player.flags?.upper_route_abominationAttack_about,

    action : (player) => {
        player.flags.upper_route_abominationAttack_about = true;
        player.flags.act3_quest_02_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 천국의 성에 도착해 주변을 살폈다. 다른 귀족들과 같이 서있던 아카시아가 당신 쪽으로 고개를 돌렸다. 그는 당신에게 다가오더니 할 말이 있다고 말했다." +
                    "<br>아카시아는 당신이 집무실에 들어오자마자 집무실의 문을 닫았다. 그는 당신에게 차를 대접하며 도적떼를 토벌한 공을 치하했다." +
                    "<br><br>\"물론 당신이라면 해낼 것이라 믿고 있었습니다.\"<br><br>" +
                    "아카시아는 차를 홀짝이며 당신에게 바로 부담을 주고 싶지는 않지만, 어쩔 수 없이 부탁해야 할 일이 있다고 말했다." +
                    "<br><br>\"흉물을 조사하러 간 사람이 지금 돌아오지 않고 있습니다. 죽었다고 생각하고 있긴 하지만 일은 확실해야 해서요.<br><br><span class='log-akasia'>그의 죽음을 확인하시거나, 그가 살아있다면 죽여주세요.</span>\"<br><br>" +
                    "아카시아는 당신에게 그가 조사하러 간 흉물 소굴은 뒤틀린 깊은숲에 있으며 정확한 위치는 주점 퀘스트에 적혀 있다고 말했다." +
                    "<br><br>\"그곳에서 시체도 발견되지 않는다면 이미 흡수당해서 죽은 거겠죠. 죽었다고 생각하셔도 됩니다.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 자기도 언젠가 필요없어지면 죽일 거냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "아카시아는 표정 변화 없이 당신을 마주했다." +
                                    "<br><br>\"글쎄요. 당신이 필요없어질 날이 올까요.\"<br><br>" +
                                    "아카시아는 차를 홀짝였다. 더 이상의 대화는 없었다.... 당신은 집무실 밖으로 나갔다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 고개를 끄덕였다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 수긍에 아카시아도 짧게 고개를 끄덕였다." +
                                    "<br><br>\"...끝나면.\"<br><br>" +
                                    "당신이 나가기 전에 아카시아는 입을 열었다." +
                                    "<br><br>\"차라도 한 잔 마시죠, {akasiaTitle}.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("akasia", "affection", 3);
                                    player.flags.akasia_teaPromise = true;
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});