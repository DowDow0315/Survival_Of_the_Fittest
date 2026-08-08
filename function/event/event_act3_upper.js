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
                    "<br><br>\"저희 쪽에서도 죽은 사람들은 많습니다. 하류도시에 군대를 보내지 말라는 의견이 많은데도 군대를 보내주는 건, 전부 발렌 님의 의지 때문이라는 걸 알아주시길.\""
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
                                    changeNPCEmotion("aiden", "affection", -10);
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

window.EVENTS.push({
    id : "upper_route_quest_05_after",
    priority : true,
    once : true,

    condition : (player) =>
        ["shelter", "goldenShelter"].includes(player.location) &&
        player.flags?.act3_uppercity_route &&
        player.flags?.act3_quest_05_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_05_done_day + 1),

    action : (player) => {
        player.location = "townStreet";
        player.flags.upper_route_quest_05_after = true;
        player.flags.upper_route_quest_05_after_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신이 쉘터에 들어가서 몸을 눕히려는 순간, 멀리서 땅을 뒤흔드는 광음이 터졌다. 당신은 자리에서 벌떡 일어났다. 쉘터의 어린아이들이 비명을 지르면서 주저앉았다. 당신은 급하게 밖으로 뛰쳐나왔다." +
                    "<br>길거리에 나왔지만 보이는 것은 아무것도 없었다. 그저 하얀 꽃잎 한 장이 길바닥 위로 천천히 떨어졌을 뿐이었다. 광음 때문에 놀라서 나온 길거리의 사람들도 어안이 벙벙한 얼굴로 주변을 둘러보았다." +
                    "<br><br>\"...실험실 하나가 폭발했습니다.\"<br><br>" +
                    "에이든이다. 그는 당신과 시선이 마주치자 예의를 갖춰 한 번 더 인사를 올렸다. 어떤 실험실이냐고 묻자 에이든은 목소리를 낮췄다. 저번 연구소와 마찬가지로 흉물과 하얀 꽃을 결합해, 스스로 판단하고 싸울 수 있는 존재를 만들던 곳이라고 했다.<br><br>" +
                    "\"...연구소가 안에서부터 터졌습니다. 남긴 기록을 보면, 백색 흉물 하나가 연구소로 들어왔다고 합니다. 그리고 소식이 끊겨버렸습니다.\"<br><br>" +
                    "에이든은 해당 연구소에 이미 백색 군단이 투입되었다고 말했다." +
                    "<br><br>\"발렌님께서 언제 당신의 힘이 필요할지 모릅니다. 준비를 해두고 계십시오.\"<br><br>" +
                    "그리고 에이든은 다시 어둠 속으로 사라졌다. 그의 눈만이 어둠 속에서 순간적으로 반짝였을 뿐이었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_05_after_abominationAttack",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_05_after &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_05_after_day + 4),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"비켜, 비켜!\"<br><br>" +
                    "경계병 한 명이 경비병을 부축하고 걸어가고 있었다. 마을 입구에서부터 걸어온 건가? 대체 어디로 가고 있는 거지? 백색 군단은 경계병이 걸어오자 기다렸다는 듯이 그를 맞이했다. 경계병이 경비병을 그들에게 넘기려는 순간, 경비병의 몸이 기괴하게 비틀렸다." +
                    "<br><br>\"이게 대체 뭐....\"<br><br>" +
                    "그가 말을 제대로 끝맺기도 전에, 경비병의 입에서 튀어나온 흉물이 그대로 경계병의 얼굴을 먹어버렸다. 뒤늦게 정신을 차린 백색 군단이 무기를 들었다. 그들은 당신을 보더니 위험하니까 가까이 가지 말라고 말했다." +
                    "<br><br>\"가까이 갔다가는...\"<br><br>" +
                    "\"뭐야, 무슨 일이야!\"<br><br>" +
                    "경계병과 경비병들이 합세하여 흉물에게 얼굴이 삼켜진 경계병을 돕기 위해 흉물을 공격했다. 루크는 그들의 가장 앞에 있었다. 그는 아무렇지도 않게 권갑을 흉물의 옆구리에 박아넣었고, 흉물은 그르륵거리는 소리와 함께 다시 수그러들었다. 그동안 경계병들과 경비병들은 흉물에 먹혔던 경계병을 구해낼 수 있었다." +
                    "<br><br>\"그럼 내가 막사에 갈 테니까...\"<br><br>" +
                    "\"위험합니다!\"<br><br>" +
                    "백색 군단이 당신의 팔을 뒤로 낚아챘다. 그 순간, 얼굴이 먹혔던 경계병의 입에서 똑같이 흉물이 튀어나오더니 옆의 경비병들의 얼굴을 삼키기 시작했다. 비명 소리가 울린다. 당신은 백색 군단과 함께 무기를 쥐었다."
                ]
            },
            {
                type : "effect",
                run : "startUpperQuest05AfterBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startUpperQuest05AfterBattle = function(player){

    startBattle(["abominatedSoldier1", "abominatedSoldier1"], player, {
        noEscape : true,
        onWin : () => startUpperQuest05AfterBattle1Event(player),
        onLose : () => startUpperQuest05AfterBattleLosingEvent(player)
    });

    return true;
};

window.startUpperQuest05AfterBattle1Event = function(player){
    startScene([
        {
            type: "text",
            value: [
                "당신은 흉물을 쓰러뜨렸지만, 금세 다른 오염된 사람들에게 둘러싸였다. 당신은 당신의 무기를 다시금 쥐었다. 옆에서 반란군으로 보이는 사람들이 사람들을 지키기 위해 싸우는 모습이 보인다."
            ]
        },
        {
            type: "effect",
            run: (player) => {
                startBattle(["abominatedSoldier1", "abominatedSoldier1", "abominatedSoldier2"], player, {
                    noEscape: true,
                    onWin: () => startUpperQuest05AfterBattle2Event(player),
                    onLose: () => startUpperQuest05AfterBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startUpperQuest05AfterBattle2Event = function(player){
    startScene([
        {
            type : "text",
            value : [
                "\"...다치지는 않으셨습니까?\"<br><br>" +
                "에이든이다. 그는 당신에게 다가와 상태를 살피더니 낮게 한숨을 쉬었다. 그는 흉물로 오염된 개체에는 가까이 가면 안 된다고 말했다." +
                "<br><br>\"백색 흉물이 실험실에서 탈출한 이후로 흉물들이 점점 기생체의 행동을 따라하고 있다고 합니다. 조심하셔야 합니다.\"<br><br>" +
                "에이든의 손이 당신의 옷깃에 닿았다. 그는 아무렇지도 않게 당신의 옷에 묻은 검붉은 것을 털어내더니 자신의 흰색 장갑을 바닥에 버렸다." +
                "<br><br>\"저새끼도 위험한 거 아냐?\"<br><br>" +
                "살아남은 하류도시 사람들은 이제 루크마저 위험 대상으로 몰고 있었다. 마을 밖으로 쫓아내야 한다는 말에 몇 명이 동조했다. 몇몇 경비병들이 그 말에 항의했다. 루크의 상처는 오래 됐지만 아직까지 별다른 반응을 보이지 않았다, 루크가 없었으면 우리들은 더 죽었을 것이다.... 에이든은 그들을 무표정으로 응시했다." +
                "<br><br>\"...루크는 아직 쓸모가 있습니다. 이쯤에서 상황을 정리해야겠습니다.\"<br><br>" +
                "에이든의 손짓이 떨어지자, 백색 군단은 능숙하게 질서를 정리하기 시작했다. 사람들이 다시 흩어진다. 루크에 대한 비난은 멈췄지만 그래도 어수선한 분위기는 계속 남아있었다."
            ]
        }
    ], player, {
        onEnd : () => 
        {
            player.flags.abominationsTownStreetAttack = true;
            player.flags.abominationsTownStreetAttack_day = getCurrentDay(player);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.startUpperQuest05AfterBattleLosingEvent = function(player){
    startScene([      
        {
            type : "text",
            value : [
                "당신은 흉물의 공격을 버티지 못하고 쓰러졌다. 하지만 그 순간, 백색 군단이 당신의 주변을 둘러싸며 당신을 지켜주었다." +
                "<br><br>\"괜찮습니까?\"<br><br>" +
                "한 번의 실수로 죽어나가는 사람들과는 다르게, 당신은 그들에게 보호를 받고 있다. 흉물에 감염된 개체를 쓰러뜨린 에이든은 당신을 힐끗 보더니 영웅님을 최우선으로 보호하라고 말했다. 에이든의 명령을 마지막으로 당신은 정신을 잃었다...."
            ]
        },
        {
            type : "text",
            value : [
                "다시 일어났을 때 에이든이 당신의 목에 물수건을 대고 있었다. 그는 당신이 눈을 뜨자마자 더 불편한 곳은 없냐고 물었다." +
                "<br><br>\"당신은 아직은 쓰러지시면 안 됩니다.\"<br><br>" +
                "그는 당신에게서 손을 뗐다. 그리고 당신이 걸어갈 수 있는지 확인한 후에야 비로소 자리를 떴다."
            ]
        }
    ], player, {
        onEnd : () => 
        {
            player.flags.abominationsTownStreetAttack = true;
            player.flags.abominationsTownStreetAttackAiden = true;
            player.flags.abominationsTownStreetAttack_day = getCurrentDay(player);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.EVENTS.push({
    id : "upper_route_quest_06_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.abominationsTownStreetAttack &&
        getCurrentDay(player) >= (player.flags.abominationsTownStreetAttack_day + 4),

    action : (player) => {
        player.flags.act3_quest_06_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 경계병들이 수군수군 떠들고 있는 모습을 보았다. 그들은 당신을 보더니 머뭇거리다가 다가왔다." +
                    "<br><br>\"하류... 상류도시의 영웅, 부탁할 것이 있습니다.\"<br><br>" +
                    "그들은 요 근래에 실종자들이 더 많아져서 경비병들을 풀고 있는데, 그 경비병들마저 실종되었다고 말했다." +
                    "<br><br>\"그들은 깊은 숲에서 수색하다가 사라졌습니다. 혹시, 도와주실 생각이 있다면 주점에 의뢰를 올려놓을 테니 한 번 봐주시길 바랍니다.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_06_after",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.act3_quest_06_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_06_done_day + 2),

    action : (player) => {
        player.flags.upper_route_quest_06_after = true;
        player.flags.act3_upper_quest_07_unlock = true;
        player.location = "heavenRoad";
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "<span class='log-danger'>쿵</span><br><br>" +
                    "일순간 천국으로 가는 길 쪽에서 큰소리가 났다. 상류도시의 거리를 거닐던 사람들이 어안이 벙벙한 표정으로 주변을 둘러보다가 천국으로 가는 길 쪽으로 시선을 돌렸다. 사람들이 천국으로 가는 길로 향하려고 하자 백색 군인들이 막았다. 하지만 백색 군인들은 당신만큼은 막지 않았다." +
                    "<br><br>천국으로 가는 길은 붉은색으로 물들어 있었다. 큰 소리가 났던 것에 비해 다리는 무너지지 않았다, 금이 가 있었을 뿐. 그리고 그 금 앞에서는 발렌이 서 있었다. 당신은 그의 뒷모습만으로도 살기를 느꼈다." +
                    "<br>당신은 주변을 둘러보았다." +
                    "<br><br><span class='log-danger'>반란군과 백색 군인들의 시체가 널려 있었다.</span>" +
                    "<br><br>\"상류도시의 영웅.\"<br><br>" +
                    "당신은 뒤를 돌았다. 아카시아의 손에는 핏빛으로 물든 은장도가 들려 있었다. 그는 아무렇지도 않게 피를 털어내더니 당신이 해줘야 할 일이 있다고 말했다." +
                    "<br><br>\"백색 흉물보다는 반란군 처리가 먼저인 것 같습니다. 저희가 계속 없앤다고 해도 그들의 씨를 완전히 말릴 수는 없겠지만 적어도...\"<br><br>" +
                    "아카시아는 당신을 똑바로 바라보았다. 그의 입가에는 차가운 미소가 그려져 있었다.<br><br>" +
                    "\"<strong>백색 도시</strong>를 이렇게 만든 자들은 죽여야 하지 않겠습니까. 제대로 된 위치는 주점에 올려놓겠습니다.\"<br><br>" +
                    "벌써 그들의 위치 파악이 끝났냐며 의아해하자 아카시아는 한번 더 미소를 지었다." +
                    "<br><br>\"아마 곧 끝날 겁니다. 저희에게는 고문 기술자가 있으니까요.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_07_after",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_07_done_day + 2) &&
        player.flags?.act3_quest_07_done,

    action : (player) => {
        player.flags.upper_route_quest_07_after_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "영광의 거리를 지나던 당신은 반란군들이 끌려나가는 것을 보았다. 그들은 모두 목에 개목걸이 같은 것을 차고 있었다. 안쪽은 칼날로 되어 있어 움직일 때마다 그들의 살을 깎아먹었다. 당신을 본 반란군들 중 한 명이 당신을 하류도시의 역적이라 부르며 달려들었다. 당신을 발견한 반란군 하나가 당신을 하류도시의 역적이라 부르며 달려들었다. 그러나 그들의 목줄은 한 줄로 연결되어 있었다. 그가 튀어나가는 순간 뒤따르던 반란군들의 몸이 거칠게 끌려왔고, 목걸이 안쪽의 칼날이 살을 파고들었다. 여러 사람의 입에서 동시에 피가 터져 나왔다. 그들을 끌고 가고 있던 백색 군인은 인상을 찌푸리더니 반란군놈들은 마지막까지 쓸모가 없다고 중얼거렸다." +
                    "<br><br>\"이들은 모두 전선 가장 앞에 서게 될 것입니다.\"<br><br>" +
                    "지금까지 상류도시에 피해를 줬으니, 마지막은 고기방패가 되어서라도 상류도시를 지켜야지요. 백색 군인들 중 한 명이 당신에게 반란군을 토벌해줘서 감사하다고 말하며 경례를 했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});
