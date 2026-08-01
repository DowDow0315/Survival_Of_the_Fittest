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
                                    "<br><br>\"글쎄요. 당신이 필요 없어질 날이 올까요.\"<br><br>" +
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

window.EVENTS.push({
    id : "upper_route_upperRequest_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "richTownStreet" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_02_done_day + 3) &&
        !player.flags?.upper_route_upperRequest_01,

    action : (player) => {
        player.flags.upper_route_upperRequest_01 = true;
        player.flags.act3_quest_03_upper_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "부유한 거리를 가로지르는 백색 군단의 행렬은 흐트러짐 하나 없이 사람들 앞을 당당히 지나가고 있었다." +
                    "<br><br>\"...강하지요?\"<br><br>" +
                    "바로 옆에서 들려오는 목소리에 당신은 고개를 들었다. 발렌은 미소와 함께 자신의 백색 군단을 바라보고 있었다." +
                    "<br><br>\"제가 기른 군단입니다. 누구보다도 강하게, 아름답게... 상류도시를 지킬 수 있게끔 만들어진 군단이지요.<br><br>당신이 없어졌던 시간 동안, 마물들은 우리들이 간신히 세워놓은 경계선을 뚫고 하류도시 마을 입구까지 내려왔습니다. 죽어가는 이들을 보며 저희는 끝까지 그들을 지키고자 했습니다.\"<br><br>" +
                    "발렌이 잠시 숨을 멈췄다. 그의 표정이 단호해졌다." +
                    "<br><br>\"전력을 쏟아도 모자랄 판에, 반란군은 이때다 싶어서 저희를 공격하더군요. 지금은 인간들끼리 싸울 때가 아닌데도.... 우매한 자들을 이해하는 데 시간을 낭비할 생각은 없습니다. 하류도시의 영웅, 저는 당신이 이들의 세력을 잠재워주시길 바랍니다. 그들은 깊은숲에 머무르고 있습니다.\"<br><br>" +
                    "백색 군단이 멀어져간다. 상류도시 시민들의 박수 갈채가 쏟아진다. 발렌은 멀어져가는 백색 군단을 끝까지 바라보며 말을 이었다." +
                    "<br><br>\"당신을 믿고 있겠습니다, 하류도시의 영웅. 언제나처럼.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_04_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.act3_quest_03_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_03_done_day + 2) &&
        !player.flags?.upper_route_quest_04_intro,

    action : (player) => {
        player.flags.upper_route_quest_04_intro = true;
        player.flags.act3_quest_04_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "비명소리가 들렸다. 당신은 고개를 돌렸다. 하얀꽃 마물이 비틀거리면서 길거리를 돌아다니고 있었다. 하얀꽃 마물 어깨에서 솟아난 흉물은 벌써 몇 명의 사람들을 집어삼키며 꿈틀거리고 있었다." +
                    "<br><br>\"아아아악!\"<br><br>" +
                    "당신은 무기를 쥐었다. 하지만 그 순간 총성이 들렸다. 에릭이다. 오늘따라 그의 얼굴이 더 무섭다. 그는 가차없이 하얀꽃 마물을 쏘았고 하얀꽃 마물은 비명을 지르다가 갑자기 노래를 불렀다." +
                    "<br><br>\"노래만 부르면 즐거워져~ 노래를~ 랄랄라라.....\"<br><br>" +
                    "기괴한 노랫소리였다." +
                    "<br><br>\"하류도시의 영웅. 그 괴물은 에릭에게 맡기십시오.\"<br><br>" +
                    "에이든이다. 에이든은 당신을 부르더니 폐쇄한 연구소에서 마물이 새어나왔다고 말했다." +
                    "<br><br>\"...하류도시 길거리에 위치한 연구소입니다. 비밀리에 실험을 진행 중이었습니다.<br>...지하로 내려가는 계단의 위치는 제가 적어놓겠습니다.\"<br><br>" +
                    "그는 준비를 한 후에 주점에서 의뢰를 받아서 가라고 말했다." +
                    "<br><br>\"소각하십시오. 이 세상에 증거 하나 안 남게.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_04_after",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.act3_quest_04_done &&
        !player.flags?.upper_route_quest_04_after,

    action : (player) => {
        player.flags.upper_route_quest_04_after = true;
        player.flags.upper_route_quest_04_after_invitation_day = getCurrentDay(player);
        changeNPCEmotion("yuri", "rage", 20);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "사람들의 비명 소리가 들렸다. 당신이 연구소를 소각시키면서 길거리에까지 불이 붙은 모양이다. 하류도시의 사람들 중 몇몇은 당신에게 도와달라고 말하려다가 뒤로 물러섰다. 하류도시의 몇몇 사람들은 이미 당신을 자신과는 다른 사람이라고 인식하고 있는 모양이었다." +
                    "<br><br>\"위험해요!\"<br><br>" +
                    "익숙한 목소리, 유리다. 유리는 불 붙은 나무에 깔릴 뻔한 사람을 끌어당겼다. 그는 뒤를 돌더니 쉘터의 어린 아이들에게는 쉘터에 들어가 있으라고 말했다." +
                    "<br><br>\"하, 하지만...\"<br><br>" +
                    "그제야 유리의 눈에 불이 붙은 쉘터의 모습이 들어왔다. 유리는 급하게 쉘터로 돌아갔다. 당신은 당신도 모르게 불타는 쉘터 쪽으로 발걸음을 돌렸지만 그 순간 누군가가 당신의 어깨를 잡았다." +
                    "<br><br><span class='log-valen'>발렌이다.</span><br><br>" +
                    "\"스테리...\"<br><br>" +
                    "그는 유리 쪽을 보며 미소를 지었다. 그러더니 다시 당신에게로 시선을 돌렸다." +
                    "<br><br>\"이번 일은 훌륭하게 처리해주셨습니다. 곧 초대장을 보내겠습니다. 그때까지 기다려주시길.\"<br><br>" +
                    "발렌은 당신을 떠나갔다. 당신은 다시 쉘터로 시선을 돌렸다. 유리와 아이들이 힘을 합쳐 불길을 잡고 있었다. 쉘터는 아직 안전했다. 그곳에 당신의 도움을 청하는 사람은 없었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_04_after_paleDream",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_04_done_day + 3) &&
        player.flags?.upper_route_quest_04_after &&
        !player.flags?.after_paleDream,

    action : (player) => {
        player.flags.after_paleDream = true;
        player.flags.after_paleDream_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "발걸음을 내딛는 순간, 지면이 너무 부드러웠다. 당신은 아래를 내려다보았다. 하얀 꽃잎들이 바닥에 한가득이었다. 당신은 다시 고개를 들었다." +
                    "<br><br>\"으아악! 이게 뭐야!\"<br><br>" +
                    "...꿈이 아닌가? 바닥에 깔린 하얀 꽃잎들이 보이는 건 당신만이 아니었던 모양이다. 몇몇 사람들은 하얀 꽃잎들을 조금이라도 줍겠다며 달려들었고, 몇몇 사람들은 하얀 꽃잎을 피해 몸을 사렸다. 당신은 주변을 둘러보다가 본능적으로 정면을 보았다." +
                    "<br><br>백발의 금안. 창백이다. 소라와 똑같이 생겼지만 가까스로 이루어진 형체가 끊임없이 하얀 꽃으로 부서져내리는, <span class='log-pale'>창백</span>.<br><br>" +
                    "그것은 당신을 향해 말했다." +
                    "<br><br>\"ㄴ... ㄱ...ㅎ...ㅈ...\"<br><br>" +
                    "탕, 소리와 함께 에릭의 총알이 창백의 머리를 꿰뚫었다. 형체가 산산조각나면서 하얀 꽃들이 무너져내렸다. 수북하게 쌓인 하얀꽃 무덤을 밟으며 에릭은 당신을 응시했다." +
                    "<br><br>\"...창백의 위치를 알고 있나.\"<br><br>" +
                    "그는 무표정으로 당신의 표정을 읽은 후 다시 고개를 돌렸다. 그 순간, 하얀 꽃에서 피어난 창백한 촉수들이 에릭을 공격해왔다. 총성이 난다. 촉수들이 소리없는 비명을 지르며 스러져간다. 당신은 하얀 꽃잎들이 이어진 길을 내려다보았다." +
                    "<br><br><span class='log-sora'>하얀 꽃들은 소라의 상점으로 이어져 있었다.</span>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_04_after_withValen_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "tavern" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_04_after_invitation_day + 3) &&
        !player.flags?.upper_route_quest_04_after_withValen_01,

    action : (player) => {
        player.flags.upper_route_quest_04_after_withValen_01 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"발렌님께서 보낸 초대장입니다.\"<br><br>" +
                    "걸어가고 있는 당신의 앞으로 백색 군인복을 입은 자가 무릎을 꿇더니 초대장을 내밀었다. 하류도시의 사람들이 가던 길을 멈추고 당신과 군인을 번갈아 쳐다보는 것이 느껴진다. 아니, 그들은 번갈아 쳐다보는 것도 아니었다. 그들은 당신만을 바라보고 있었다." +
                    "<br>당신은 그에게서 초대장을 받았다. 백색 군인은 당신에게 예의를 갖추더니 앞으로 당신의 출신은 상류도시의 모두가 신경쓰지 않을 거라고 말했다." +
                    "<br><br>\"당신은 하류도시의 영웅이기도 하지만, 상류도시의 영웅이기도 하니까요. 우리 백색 군단은 당신을 존중하고 있습니다.\"<br><br>" +
                    "그들은 끝까지 예의바르게 당신에게서 물러났다. 당신은 초대장을 읽었다. 발렌의 우아한 글씨체가 눈에 띈다." +
                    "<br><br>상류도시의 영웅, 상류도시의 모든 사람들에게 당신을 알리고자 합니다. 천국의 성으로 와주시면 감사하겠습니다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_04_after_withValen_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_04_after_withValen_01 &&
        !player.flags?.upper_route_quest_04_after_withValen_02,

    action : (player) => {
        player.flags.upper_route_quest_04_after_withValen_02 = true;
        player.flags.upper_route_quest_04_after_withValen_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "천국의 성에 도착하자마자 보인 건 백색 군단의 행렬이었다. 그들은 나란히 두 열로 서서 당신을 맞이하고 있었다. 그리고 백색 군단의 대열 밖에 있는 상류도시의 귀족들은 당신을 보며 열렬히 박수를 쳤다. 그들은 당신의 곁에 발렌이 없는데도 당신을 바라보고 있었다." +
                    "<br><br>\"하류도시의 영웅.\"<br><br>" +
                    "가운데 의자에서 발렌이 일어나면서 말했다. 그의 목소리는 크지 않았지만, 모두의 박수와 환호를 잦아들게 했다." +
                    "<br><br>\"아니, 이제는 상류도시의 영웅이라 불러야겠지요.<br><br><span class='log-valen'>상류도시의 영웅.</span>\"<br><br>" +
                    "발렌은 당신에게 천천히 걸어오더니 칼을 뽑아들었다.<br><br>" +
                    "\"무릎을 꿇어주십시오, 상류도시의 영웅.\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 무릎을 꿇었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 무릎을 꿇자 발렌은 당신의 한쪽 어깨 위로 자신의 검을 올렸다." +
                                    "<br><br>\"...당신을 저의 기사로 임명하겠습니다.\"<br><br>" +
                                    "주변에서 웅성거리기 시작한다. 발렌의 옆에 있던 아카시아마저도 발렌의 말에 놀란 듯 고개를 들었다가 희미한 미소를 지으며 다시 고개를 숙였다." +
                                    "짝. 짝. 이번에는 화려한 박수 소리가 아니었다. 경건한 박수 소리였다." +
                                    "<br><br>...당신은 상류도시 사람들의 앞에서 상류도시의 영웅으로 인정받았다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.uppercityHero = true;
                                    changeNPCEmotion("valen", "affection", 3);
                                    changeNPCEmotion("akasia", "affection", 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 무릎을 꿇지 않았다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 무릎을 꿇지 않자 발렌은 당신을 위아래로 훑어보더니 다시 검을 집어넣었다. 그는 당신에게 강요하지 않았다. 하지만 그의 푸른색 눈은 몇 겹이나 어두워져 있었다." +
                                    "<br><br>\"...상류도시의 영웅, 앞으로도 힘써주시길 바랍니다.\"<br><br>" +
                                    "발렌은 당신에게 예의를 갖춘 후 식을 끝냈다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("valen", "affection", -10);
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

window.EVENTS.push({
    id : "upper_route_quest_05_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_04_after_withValen_02_day + 3),

    action : (player) => {
        player.flags.upper_route_quest_05_intro = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"상류도시의 영웅.\"<br><br>" +
                    "백색 군단의 전령이다. 그는 당신에게 깍듯이 인사를 하더니 발렌 님께서 기다리고 있다고 말했다." +
                    "<br><br>\"당신께 긴히 맡길 임무가 있다고 합니다.<br><br>그럼.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_05_start",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_05_intro,

    action : (player) => {
        player.flags.act3_quest_05_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 천국의 성을 들어가다가 천국의 성에서 나가고 있는 에릭을 보았다. 그의 안색은 평소보다 더 안 좋아보였다. 그는 당신을 힐끗 내려다보더니 그대로 당신을 지나쳐버렸다." +
                    "<br><br>\"아, 오셨군요, 나의 상류도시의 영웅.\"<br><br>" +
                    "발렌은 당신에게 다가오더니 하얀 꽃을 먹고 다니는 흉물을 찾고 있다고 말했다. 그는 하얀 꽃을 먹은 흉물들 중 이상하게 누군가를 공격하는 것보다는 하얀 꽃을 먹는 것에 집착하는 흉물이 있었다고 말했다." +
                    "<br><br>\"그리고 그 흉물은 여전히 무언가를 찾아다니고 있습니다. 그 흉물이 원하는 걸 얻게 된다면 상류도시에 어떤 위협으로 돌아올지 상상하고 싶지도 않습니다. 생포해주십시오.\"<br><br>" +
                    "생포 명령에 당신이 의아해하자 발렌은 미소를 지었다. <br><br>" +
                    "\"물론 당신이 죽을 것 같으면 죽이셔도 됩니다. 그것을 생포하면 우리 쪽에서도 얻어낼 것이 많지만... 그보다는 당신이 더 중요하니까요.\"<br><br>" +
                    "그는 어디 흉물 소굴에 갔는 지는 주점의 퀘스트에 정확한 위치를 올려놨다고 말했다.<br><br>" +
                    "\"흉물 소굴은 폐야에 있습니다. 부디 몸 조심해주시길.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});