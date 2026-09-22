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
                    "\"...연구소가 안에서부터 터졌습니다. 남긴 기록을 보면, 백흉물 하나가 연구소로 들어왔다고 합니다. 그리고 소식이 끊겨버렸습니다.\"<br><br>" +
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
                "<br><br>\"백흉물이 실험실에서 탈출한 이후로 흉물들이 점점 기생체의 행동을 따라하고 있다고 합니다. 조심하셔야 합니다.\"<br><br>" +
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
                    "<br><br>\"백흉물보다는 반란군 처리가 먼저인 것 같습니다. 저희가 계속 없앤다고 해도 그들의 씨를 완전히 말릴 수는 없겠지만 적어도...\"<br><br>" +
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
        player.flags.upper_route_quest_07_after = true;
        player.flags.upper_route_quest_07_after_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "영광의 거리를 지나던 당신은 반란군들이 끌려나가는 것을 보았다. 그들은 모두 목에 개목걸이 같은 것을 차고 있었다. 안쪽은 칼날로 되어 있어 움직일 때마다 그들의 살을 깎아먹었다. 당신을 본 반란군들 중 한 명이 당신을 하류도시의 역적이라 부르며 달려들었다. 그러나 그들의 목줄은 한 줄로 연결되어 있었다. 그가 튀어나가는 순간 뒤따르던 반란군들의 몸이 거칠게 끌려왔고, 목걸이 안쪽의 칼날이 살을 파고들었다. 여러 사람의 입에서 동시에 피가 터져 나왔다. 그들을 끌고 가고 있던 백색 군인은 인상을 찌푸리더니 반란군놈들은 마지막까지 쓸모가 없다고 중얼거렸다." +
                    "<br><br>\"이들은 모두 전선 가장 앞에 서게 될 것입니다.\"<br><br>" +
                    "지금까지 상류도시에 피해를 줬으니, 마지막은 고기방패가 되어서라도 상류도시를 지켜야지요. 백색 군인들 중 한 명이 당신에게 반란군을 토벌해줘서 감사하다고 말하며 경례를 했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_07_after_food_intro_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_07_after_day + 5) &&
        player.flags?.upper_route_quest_07_after,

    action : (player) => {
        player.flags.upper_route_quest_07_after_food_intro_01_day = getCurrentDay(player);
        savePlayer(player);
        startScene([
            {
                type : "text",
                value : [
                    "하류도시 마을 입구에 도착한 당신은 경계병들이 식량 상자의 식량을 세보더니 불만을 터뜨리는 모습을 보았다. 그들은 흉물과 꽃 마물들을 경계하는 것도 벅찬데, 반란군들 때문에 상황이 더 힘들어졌다고 말했다. 반란군을 바라보는 그들의 시선은 전보다 훨씬 싸늘해져 있었다." +
                    "<br><br>\"요새 흉물 때문에 자원 수송도 거의 안 되고 있다고.\"<br><br>" +
                    "\"백색 군단도 난리더라.\"<br><br>" +
                    "당신은 시선을 돌려 백색 군단을 보았다. 그들은 언제나처럼 완벽해보였다. 하지만 그 완벽함 뒤에 어떤 모습이 있을지는 아무도 모르는 법이다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_07_after_food_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "richTownEntrance" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_07_after_food_intro_01_day + 3),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"상류도시의 영웅.\"<br><br>" +
                    "에이든이다. 그는 당신에게 다가오더니 흉물이 날뛰는 것이 심해져서 당장 백색 군단이 먹을 식량도 부족하다고 목소리를 낮춰 말했다." +
                    "<br><br>\"지금까지 많이 해주셨다는 걸 압니다. 하지만…… 무리가 되지 않는 선에서 식량 건도 도와주셨으면 합니다. 영웅님께서는 한 달에 한 번씩만 식량을 채워주시면 됩니다. 상류도시 관문에 물품 상자를 놓겠습니다.\"<br><br>" +
                    "<br><br><span class='log-warning'>앞으로 당신은 한 달을 주기로 지정된 식량을 채워넣어야 합니다.</span>"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startUpperFoodSupply(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_08_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_07_after_day + 5),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"저게 뭐야?\"<br><br>" +
                    "쿵, 쿵, 당신은 땅이 울리는 것 같은 느낌에 고개를 들고 경계병이 보고 있는 방향으로 시선을 틀었다. 자욱하게 인 흙먼지 사이로 무리들이 보였다." +
                    "<br><br>흉물들이다.<br><br>" +
                    "그들은 마치 군대처럼 무리를 지어 하류도시 관문으로 오고 있었다. 경계병은 처음에는 자신이 본 것을 제대로 인식하지 못하고 눈만 느리게 끔벅였다. 땅이 울리는 소리에 나온 경계병들 중 한 명이 욕설을 내뱉으며 흉물이 습격해온다고 소리를 질렀다. 흉물이 습격해온다는 소리를 들은 백색 군단이 마을 입구에 섰다." +
                    "<br><br>\"...이번에도 잘 부탁드립니다, 상류도시의 영웅.\"<br><br>" +
                    "에이든은 당신의 옆에 서서 낮은 목소리로 말했다. 그의 금색 눈동자는 체계적인 대열을 이루어 다가오는 흉물들에 고정되어 있었다. 그들은 나무 십자가 형틀에 묶인 반란군들을 가장 앞에 세웠다. 경비병들은 반인륜적인 행동에 인상을 찌푸리긴 했지만 어쨌든 백색 군단의 옆에 서서 흉물들에게 맞설 준비를 했다. 루크도 반란군들의 꼴을 보며 인상을 찌푸렸지만 별 말은 하지 않았다. 그저 낮게 쌍욕만 내뱉었을 뿐." +
                    "<br><br>당신은 그저 동그랬던 흉물들이 점점 모습을 변화시키는 것을 보았다. 몇 놈들은 늑대로 변했고, 몇 놈들은 사슴으로 변했다. 그리고 그들은 전부 하류도시의 마을 입구를 향해 달려왔다. 몇몇 흉물들은 형틀에 묶인 반란군들에게 흥미를 보이긴 했다. 하지만 그것도 잠시, 몇몇을 제외한 흉물들은 고개를 들더니 반란군에게서 관심을 거두고 맞서 싸우려는 사람들에게 달려들기 시작했다. 거대 융합 흉물의 팔이 군인들과 경비병, 경계병들을 쓸었다. 거대한 팔은 곧 당신에게도 날아들었다. 당신은 무기를 단단히 쥐고 융합 흉물의 팔을 쳐냈다. 거대 융합 흉물과의 전투가 시작된다."
                ]
            },
            {
                type : "effect",
                run : "startUpperQuest08IntroBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startUpperQuest08IntroBattle = function(player){

    startBattle(["abominationMixedArms", "abominationMixedArms", "abominationMixedMiddle", "abominationMixedHead"], player, {
        noEscape : true,
        onWin : () => startUpperQuest08IntroBattle1Event(player),
        onLose : () => startUpperQuest08IntroBattleLosingEvent(player)
    });

    return true;
};

window.startUpperQuest08IntroBattle1Event = function(player){
    startScene([
        {
            type: "text",
            value: [
                "당신이 융합 흉물을 쓰러뜨리자마자, 기다렸다는 듯이 다른 흉물들이 지친 당신에게 달려들었다. 그들은 당신이 지쳐서 보이는 틈을 노리고 덤벼들었다. 더 많은 흉물들이 당신에게 달려들려고 했지만, 그 순간 총성이 들렸다. 당신은 총성만 듣고서도 그 사람이 누군지 알 수 있었다."
            ]
        },
        {
            type: "effect",
            run: (player) => {
                startBattle(["whiteAbomination1", "whiteAbomination2", "whiteAbomination3"], player, {
                    noEscape: true,
                    onWin: () => startUpperQuest08IntroBattle2Event(player),
                    onLose: () => startUpperQuest08IntroBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startUpperQuest08IntroBattle2Event = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 간신히 흉물들을 쓰러뜨렸지만 흉물들은 공격에 대비한 사람들만 노리지 않았다. 그것들은 어떻게든 당신들의 틈을 비집고 들어가 민간인들을 공격했다. 하류도시 사람들의 비명 소리가 울려 퍼졌다. 쉘터 쪽에서 아이들의 비명 소리가 들려와 당신은 고개를 돌렸다. 시온이 흉물들을 막아내주고 있긴 했지만 혼자서 쉘터의 모든 아이들을 지키기에는 무리였다. 에이든은 당신을 힐끗 보더니 백색 군인들 중 몇 명을 쉘터로 보냈다." +
                "<br><br>\"당신이 지키고자 하는 건, 저도 지키겠습니다.\"<br><br>" +
                "백색 군인들은 명령에 따라 쉘터의 아이들을 지켜주었다. 당신은 흉물들에게 끌려가는 민간인들을 보았다. 백색 군단이 있는데도 지키지 못하는 사람들이 있다. 당신의 예상보다 흉물들은 더욱 더 빠르고 악랄하게 진화하고 있었다." +
                "<br>당신은 흉물들이 울타리처럼 둘러진 백색 성벽을 건드리지 않는 것을 보았다. 하지만 백흉물들은 그 성벽에 관심을 보였다. 그것들은 성벽에 머리를 기대더니 곧 이빨을 드러내고 성벽을 갉아먹기 시작했다. 아가가가각, 성벽을 갉아먹던 백흉물들이 움직임을 멈췄다. 곧이어 그들은 끔찍한 비명을 지르더니 이리저리 몸을 파닥거리다가 그대로 메말라 죽어버렸다." +
                "<br><br>\"상류도시의 성벽은 선조들이 남긴 유산입니다. 아무리 진화했다고 해도, 흉물의 세포 조직이 있는 한 그들은 백색 성벽을 건드릴 수 없습니다.\"<br><br>" +
                "에이든이 흉물의 공격을 막으며 당신에게 작게 말해주었다. 당신은 나머지 백흉물들이 백색 성벽을 응시하는 것을 보았다. 마치 누군가에게 보여주듯이 그들은 성벽을 천천히 훑어보았다. 그리고 흉물들은 명령이라도 받은 것처럼, 다 같이 관문 밖으로 후퇴했다."
            ]
        },
        {
            type : "text",
            value : [
                "전투에 이긴 걸까. 흉물들은 물러나긴 했지만 결과는 처참했다. 누군가는 자신의 엄마를, 누군가는 자신의 아빠를, 누군가는 자신의 아들을, 그리고 또 누군가는 자신의 딸을 찾았다. 잃은 것이 너무 많았다." +
                "<br><br>당신은 총알을 장전하던 에릭이 멈칫하는 것을 보았다. 그는 고개를 들더니 마을 입구 바깥을 응시했다. 당신은 그의 눈동자가 희미하게 흔들리는 것을 보았다. 마을 입구 바깥을 응시하던 녹안은 곧 평정심을 되찾았다. 그는 도망가는 흉물들에게 총을 쐈다. 도망가던 흉물들은 괴기한 소리와 함께 도망치지 못하고 땅바닥에 널브러졌다."
            ]
        }
    ], player, {
        onEnd : () => 
        {
            player.flags.upper_route_quest_08_intro_attack = true;
            player.flags.upper_route_quest_08_intro_attack_day = getCurrentDay(player);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.startUpperQuest08IntroBattleLosingEvent = function(player){
    startScene([      
        {
            type : "text",
            value : [
                "당신은 흉물의 공격을 버티지 못하고 쓰러졌다. 쓰러지는 당신의 위로 흉물들이 달려든다. 하지만 당신에게 올라타기도 전에 그것들은 몸통에 구멍이 뚫린 채로 풀썩 떨어졌다. 에릭이다. 당신의 시야가 점점 어두워진다. 당신은 누군가가 당신을 방패 안으로 숨겨주는 것을 느꼈다. <br>...에이든이다."
            ]
        },
        {
            type : "text",
            value : [
                "당신이 다시 일어났을 때 하류도시는 엉망이었다. 길바닥이 깨진 것도 모자라서 몇몇 민가는 이미 무너진 지 오래였다. 누군가는 자식을 찾고, 누군가는 부모를 찾고, 누군가는 연인을 찾았다. 그래도 몇몇은 백색 군인 때문에 그나마 살아남았다는 소리를 했다. 당신은 에이든의 품에서 일어났다. 방패를 높이 쳐들고 경계하고 있던 에이든이 당신을 내려다보았다." +
                "<br><br>\"괜찮습니까?\"<br><br>" +
                "당신은 고개를 끄덕였다. 당신은 쓰러져 있는 동안 백색 군단의 보호를 받았다. 당신은 에릭을 보았다. 에릭은 이미 하류도시 관문 밖으로 향하고 있었다."
            ]
        }
    ], player, {
        onEnd : () => 
        {
            player.flags.upper_route_quest_08_intro_attack = true;
            player.flags.upper_route_quest_08_intro_attack_day = getCurrentDay(player);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.EVENTS.push({
    id : "upper_route_quest_08_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_08_intro_attack_day + 1),

    action : (player) => {
        player.flags.paleGivesYouPower = true;
        player.flags.paleGivesYouPower_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "영광의 거리를 걷고 있는 당신의 주변으로 하얀 꽃들이 피어올랐다. 황금색의 도로가 바로 하얀 꽃들로 뒤덮였다. 당신은 주변을 둘러보았다. 창백이다. 소라와 똑닮은 그것은, 하얀 꽃잎들로 흘러내리는 자신의 얼굴을 자꾸만 쓸어올리며 당신을 바라보고 있었다. 당신과 시선이 마주치자 그는 손으로 얼굴을 가렸다. 1초, 2초, 3초.... 다시 손을 내렸을 때 그의 얼굴은 어떻게든 형태를 유지하고 있었다." +
                    "<br><br>\"{playerName}...\"<br><br>" +
                    "그는 당신에게 다가왔다. 그리고 망설이더니 당신에게 손을 뻗었다. 하얀 꽃잎들이 당신에게 날아든다." +
                    "<br><br>\"ㅁ...ㅇ...\"<br><br>" +
                    "그는 다시 목소리를 가다듬었다. 목에 집중하자 다시 얼굴에서 하얀 꽃잎들이 흘러내린다. 창백은 얼굴을 가린 채 떨리는 목소리로 말했다." +
                    "<br><br>\"널... 믿...어.\"<br><br>" +
                    "하얀 꽃잎들이 당신의 주변을 맴돈다. 이상한 기분이 든다. 당신은 눈을 깜박였다."
                ]
            },
            {
                type : "text",
                value : [
                    "\"상류도시의 영웅, 괜찮습니까?\"<br><br>" +
                    "눈을 뜬 당신의 앞에는 아카시아의 은색 눈이 보였다. 그의 긴 흑발이 당신의 뺨 위로 길게 늘어뜨려 있었다." +
                    "<br><br>\"갑자기 쓰러지셔서 걱정했습니다.\"<br><br>" +
                    "꿈인가? 아니면.... 그 순간 당신의 머릿속으로 처음 보는 장면이 흘러들어왔다."
                ]
            },
            {
                type : "text",
                value : [
                    "당신은 처음에 당신의 앞에 있는 사람이 누구인지 알아보지 못했다. 아카시아랑 닮은 여성이 침대에 누워있었다." +
                    "<br><br>\"나 다음에는 네 차례가 올 거란다...\"<br><br>" +
                    "여성은 당신의 손을 잡았다. 그리고 무슨 일이 있어도 자신이 죽기 전에 발렌과 아이를 가져야 한다고 말했다." +
                    "<br><br>\"미안하구나.... 내가.... 네 남동생을 낳았어야 했는데.\"<br><br>" +
                    "당신은 여성의 손을 맞잡아주었다." +
                    "<br><br>\"괜찮아요, 어머니. 제가 무슨 일이 있어도 책임을 지고 백색 도시를 지킬 테니까요.\"<br><br>" +
                    "어린 아카시아의 목소리다. 그의 목소리는 또렷했다. 그 목소리를 듣고 나서야 여성은 안도하며 눈을 감았다." +
                    "<br>...그는 아직 살아있다. 당신은 뒤에서 들린 인기척에 고개를 돌렸다. 그리고 당신은 발렌을 보았다. 지금보다 훨씬 어린 발렌은 미소를 지으며 문지방 너머에 서 있었다" +
                    "<br><br>\"너는 도구가 아니야, 아카시아.\"<br><br>" +
                    "\"....\"<br><br>" +
                    "\"적어도 난 네가 도구가 되는 걸 보고 싶지 않아. 그러니까....\"<br><br>" +
                    "발렌은 당신에게 손을 내밀었다." +
                    "<br><br>\"나랑 같이 방법을 찾아보자. 기한은 네 어머니가 돌아가시기 전까지.\"<br><br>" +
                    "짧은 정적, 그리고 당신은 눈시울이 뜨거워지는 것을 느꼈다. 당신은 결국 어머니의 손을 놓았다."
                ]
            },
            {
                type : "text",
                value : [
                    "\"상류도시의 영웅.\"<br><br>" +
                    "당신은 다시 눈을 떴다. 아카시아는 당신의 이마를 손가락으로 톡톡 쳤다." +
                    "<br><br>\"...괜찮은 거 맞습니까?\"<br><br>" +
                    "아카시아는 스트레스가 너무 과했던 거 아니냐고 물으며 당신의 손에 2000원을 쥐어주었다. 그는 극장에 가서 극이라도 한 편 보면서 쉬라고 말했다. 그는 당신의 표정을 보며 고개를 갸웃거리더니 손에 4000원을 더 쥐어주었다." +
                    "<br><br>\"3편 정도 보면 기분이 나아질지도 모릅니다.\"<br><br>" +
                    "당신은 멍하니 당신의 손에 쥐어진 6000원을 응시했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    passTime(player, 5);
                    changeGold(player, 6000);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_08_intro_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.paleGivesYouPower_day + 3),

    action : (player) => {
        player.flags.upper_route_quest_08_intro_03 = true;
        player.flags.act3_quest_08_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 발렌의 집무실에서 들려오는 소리를 들었다. 백흉물들이 무리를 지어 군대를 형성하고 있다고 한다. 그리고 발렌은 그들의 군대 형성을 용납할 생각이 없었다. 지도를 손가락으로 짚으며 백흉물들이 포집되어 있는 곳을 짚던 그는 집단을 하나하나씩 격파해나가는 것이 좋겠다고 말했다." +
                    "<br><br>\"그리고 그건.... 상류도시의 영웅님도 도와주실 거라 믿습니다.\"<br><br>" +
                    "언제부터 알고 있었던 걸까. 그 목소리와 함께 집무실의 문이 열렸다. 발렌은 책상을 짚고 있던 손을 놓고 다시 바로 섰다. 그는 당신을 바라보며 미소를 지었다." +
                    "<br><br>\"반란군은 지금 세력이 많이 약화되어 움직이지 못할 겁니다. 지금이 기회입니다.\"<br><br>" +
                    "그는 당신에게 다가왔다." +
                    "<br><br>\"토벌을 마치면 영광의 자리는 당신에게 드리겠습니다. 저는 오른쪽의 부대를 처리할 테니 상류도시의 영웅님은 왼쪽의 부대를 처리해주시면 됩니다.\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 발렌도 직접 전투 현장에 나가는 거냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"절 걱정해주시는 겁니까, 아니면 저는 현장에 나가있을 사람이 아니라고 생각하는 겁니까.\"<br><br>" +
                                    "발렌은 자신의 마법검 손잡이를 손가락으로 톡 건드리더니 자신은 싸움을 싫어하지만 싸움이 걸려왔을 때 그 싸움을 피하는 사람은 아니라고 말했다. 그는 당신의 어깨를 가볍게 두드렸다." +
                                    "<br><br>\"그럼 믿고 있겠습니다, 상류도시의 영웅. 자세한 위치는 정리해서 주점으로 보내놓겠습니다.\""
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
                                    "발렌은 미소를 지었다." +
                                    "<br><br>\"바로 수긍해주시다니, 역시 상류도시의 영웅답군요. 언제나처럼 좋은 결과를 기대하고 있겠습니다.\"<br><br>" +
                                    "그는 당신의 어깨를 가볍게 두드리더니 자세한 위치는 정리해서 주점으로 보내놓겠다고 말했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("valen", "dominance", 3);
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
    id : "upper_route_quest_08_after_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.act3_quest_08_boss_end,

    action : (player) => {
        player.flags.upper_route_quest_08_after_01 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 마을 입구에서 발렌을 보았다. 발렌의 백색 제복은 평소와 다르게 한쪽이 검붉은색으로 물들어 있었다. 발렌은 당신을 보더니 미소를 지었다. 남들에게는 안 보일지 몰라도 당신에게는 보였다. 그의 미소는 날카로웠다." +
                    "<br><br>\"왼쪽 부대를 완벽하게 처리해주셨다고 들었습니다. 당신이 제 옆에 있어주셔서 다행입니다.\"<br><br>" +
                    "당신은 백색 군인들의 옷과 무기에 단순히 흉물의 애액이 묻어 있는 게 아니라는 걸 인지했다. 발렌은 당신의 시선을 쫓더니 고개를 까닥였다." +
                    "<br><br>\"반란군입니다. 저희가 백흉물 군단을 치는 동안 뒤에서 습격했습니다.\"<br><br>" +
                    "발렌은 잠시 말을 멈췄다." +
                    "<br><br>\"몇 명이 목숨을 잃었습니다. <span class='log-valen'>물론 그들은 전멸했지만.</span>\"<br><br>" +
                    "그는 목숨을 버리면서까지 잘못된 신념을 고집하는 자들을 이해해줄 여유는 없다고 말했다. 그는 당신의 몸 상태를 살피듯 위아래로 훑어보았다." +
                    "<br><br>\"그럼 쉬십시오, 상류도시의 영웅. 오늘의 영광은 그대의 것이니, 부디 마음껏 누리시길.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_08_after_betray",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_prepareToBetray &&
        player.flags?.upper_route_quest_08_after_01 &&
        player.flags?.act3_quest_08_done,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신이 길을 걷는데, 누군가가 갑자기 당신의 팔을 잡아당겼다. 당신은 본능적으로 반격 태세를 취했지만 상대방은 당신을 공격할 생각이 없다는 듯 당신의 팔을 놓고 두 손을 들어보였다. 그제야 당신은 상대방의 얼굴을 확인할 수 있었다." +
                    "<br><br><span class='log-danger'>반란군 기지에서 당신이 살려줬던 그 남자다.</span><br><br>" +
                    "\"...아직 너를 믿는 건 아니지만 우리는 도박을 하기로 했어.\"<br><br>" +
                    "그는 당신을 올려다보았다." +
                    "<br><br>\"그때 내가 했던 제안 기억하나? <br><br> ...상류도시가 아니라 하류도시를 위해 우리와 함께 일하겠어?\"<br><br>" +
                    "<span class='log-danger'>돌이킬 수 없는 선택입니다.</span>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그의 제안을 받아들였다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 제안을 받아들이자 그는 놀란 듯했다. 제안을 하면서도 속으로는 당신이 이 제안을 받아들이지 않을 거라고 생각했었던 모양이다. 그는 고개를 끄덕이더니 네가 박쥐만은 아니길 바란다고 말했다." +
                                    "<br><br>\"다음 번에 다시 연락을 할 테니 기다리고 있어.\"<br><br>" +
                                    "당신을 바라보는 그의 시선은 동료를 바라보는 시선은 아니었다. 그는 어둠 속으로 사라졌다. 그리고 그 순간 당신은 누군가의 집요한 시선을 느꼈다. 당신은 고개를 돌렸다." +
                                    "<br><br><span class='log-valen'>에이든이다.<br><br>" +
                                    "\"...당신의 선택은 잘 알겠습니다.\"<br><br>" +
                                    "그 말을 마지막으로 그는 당신의 시야에서 신기루처럼 사라졌다. 기척을 숨기는 데 능한 사람이다. 또 어디서 당신을 보고 있을지 모른다. 그리고 당신은 한 가지 사실은 확신할 수 있었다." +
                                    "<br><br>당신의 배신은 곧 발렌의 귀에 들어갈 것이다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.act3_uppercity_route = false;
                                    player.flags.uppercityHero = false;
                                    player.flags.act3_neutral_route = true;
                                    player.flags.upper_route_quest_08_after_betray_day = getCurrentDay(player);
                                    changeNPCEmotion("valen", "affection", -100);
                                    changeNPCEmotion("akasia", "affection", -100);
                                    changeNPCEmotion("akasia", "rage", 40);
                                    changeNPCEmotion("aiden", "affection", -100);
                                    changeNPCEmotion("aiden", "rage", 40);
                                    savePlayer(player);                                    
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 고개를 저었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 고개를 젓는 순간과 함께 반란군의 입에서 피가 주르륵 흘러내렸다. 그는 믿을 수 없다는 듯이 아래를 내려다보았다. 뾰족한 랜스의 끝이 그의 심장을 관통해서 나와 있었다." +
                                    "<br><br>\"...쥐새끼를 처리하지 않으셨다는 건 안타까운 일이지만, 그래도 감언이설에 넘어가지는 않으셔서 다행입니다.\"<br><br>" +
                                    "에이든이 랜스를 뽑자, 반란군은 마지막으로 피를 토하더니 그대로 바닥으로 쓰러졌다. 그의 금색 눈이 반란군의 시체를 감정없이 내려다 보았다." +
                                    "<br><br>\"당신과 적이 되지 않아서 기쁩니다.\"<br><br>" +
                                    "그는 고개를 숙이더니 아무렇지도 않게 반란군의 시체를 들고 어둠 속으로 걸어가버렸다. 시체까지 들었으면서, 그의 인기척은 한순간에 사라져 버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("valen", "affection", -15);
                                    changeNPCEmotion("akasia", "affection", -10);
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
    id : "upper_route_quest_08_after_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "richTownStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_08_after_01,

    action : (player) => {
        player.flags.upper_route_quest_08_after_03 = true;
        player.flags.upper_route_quest_08_after_03_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"상류도시의 영웅이다!\"<br><br>" +
                    "어디선가 환호성이 들려왔다. 당신은 고개를 돌렸다. 상류도시 사람들 중 몇몇이 당신을 보며 박수를 치고 있었다. 그들 중 몇몇은 당신에게 다가와 자신들은 반란군 때문에 가족을 잃었다고 말했다. 반란군 때문에 연인을 잃은 자들도 있었다. 그들은 무슨 일이 있어도 반란군은 용서하면 안 된다고 입을 모아서 말했다." +
                    "<br><br>\"우리는 발렌님께 당신의 출신을 바꿔달라고 요청을 드릴까 합니다.\"<br><br>" +
                    "그들은 당신은 하류도시 출신이면 안 된다고 말했다. 그들은 당신은 하류도시 출신이기에는 너무 고귀하고 아름답다고도 말했다. <br><br>...비꼬는 것이 아니었다. 그들은 진심으로 그렇게 믿고 있었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_09_intro_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.common_route_quest_08_after_luke_02 &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_08_after_03_day + 2),

    action : (player) => {
        player.flags.upper_route_quest_09_intro_01 = true;
        player.flags.upper_route_quest_09_intro_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "천국의 성이 평소보다 더 분주해보인다. 상류도시의 귀족들은 여전히 부채로 입을 가리고 잡담을 하고 있었지만 오늘의 잡담은 평소와 주제가 달랐다. \"반란군 토벌도 아닌데 이렇게 많은 백색 군단이 움직이는 건 처음 아닌가요?\" 그들은 지금 세상이 어떻게 돌아가는지를 모르겠다며 불안해했다." +
                    "<br><br>\"불안해하실 필요 없습니다.\"<br><br>" +
                    "발렌이다. 그의 목소리는 크지 않았지만 모든 사람들의 시선이 그에게 집중됐다. 발렌은 천사같은 미소를 지으며 이번에야말로 상류도시를 지킬 수 있는 방안에 가까워지는 것뿐이라고 말했다." +
                    "<br><br>\"제가 있는 한, 상류도시는 절대로 쓰러지지 않습니다.\"<br><br>" +
                    "그의 시선은 마지막으로 당신을 향했다." +
                    "<br><br>\"저는 제 목숨을 바쳐서라도 상류도시를 지킬 것이니까요.\""
                ]
            },
            {
                type : "text",
                value : [
                    "사람들의 동요를 가라앉힌 후 발렌은 당신에게 걸어왔다. 그는 당신에게 이번에야말로 당신의 힘이 필요하다고 말했다." +
                    "<br><br>\"창백을 얻을 겁니다.\"<br><br>" +
                    "...창백? 그는 지금 알고 말하는 걸까? 당신의 표정에 발렌은 미소를 지었다." +
                    "<br><br>\"아무나 선택하셔도 됩니다. 다만, 그 '아무나'는 저희의 편이 되어야 합니다. 믿고 있겠습니다, 상류도시의 영웅.\"<br><br>" +
                    "그는 때가 되면 당신에게 한 번 더 연락을 주겠다고 말했다. 그는 당신의 손등에 입술을 맞춘 후 다른 쪽으로 걸어갔다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_09_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_09_intro_01 &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_09_intro_01_day + 3),

    action : (player) => {
        player.flags.upper_route_quest_09_intro_02 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 걷고 있는 당신의 앞으로 에이든이 걸어왔다." +
                    "<br><br>\"모든 준비를 마쳤습니다, 상류도시의 영웅. 당신이 소라에게 특별한 관심을 받고 있다는 건 압니다. <br><br>저희 대신 소라의 상점에 들어가주시겠습니까? 저희는 상점 앞에서 대기하고 있겠습니다.\"<br><br>" +
                    "...불길한 예감이 든다." +
                    "<br><br><span class='log-danger'>소라의 상점에 가면 돌이킬 수 없습니다. 진행하고 있던 퀘스트가 있다면 완료해주십시오.</span>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_09_intro_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shop" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_09_intro_02,

    action : (player) => {
        player.flags.act3_quest_09_intro_03 = true;
        player.flags.act3_quest_09_unlock = true;
        player.flags.closeSoraShop = true;
        player.location = "townStreet";
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 상점에 들어가려고 했지만 상점은 처음으로 문이 닫혀 있었다. 당신이 어렸을 때부터 상점이 닫혀있던 적은 단 한 번도 없었다. 하류도시 사람들이 웅성거리며 상점 주변을 둘러쌌다. 늙은 노인이 고개를 갸웃거리며 말했다, \"내 생애 이 상점이 닫힌 건 처음 보는 것 같은데?\". 에이든은 인상을 쓰더니 당신을 뒤로 반 걸음 물러나게 하고 문을 두드렸다. 하지만 여전히 어떤 인기척도 느껴지지 않았다. 에이든은 랜스를 들더니 그대로 상점 문을 밀고 들어갔다." +
                    "<br><br>소라는 없었다. 상황을 빠르게 파악한 에이든은 소라가 어디 갔을지는 예상이 된다고 말했다." +
                    "<br><br>\"...눈치 하나는 기가 막히게 빠르군요. 창백을 제거하러 가다니.\"<br><br>" +
                    "그는 중얼거리듯이 말하더니 소라가 있을 곳은 하얀꽃 무덤 근처라고 말했다. 그는 주점에 자세한 위치를 올려놓겠다고 말했다. 그는 백색 군단을 이끌고 먼저 하류도시를 나섰다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_09_after_04",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.act3_quest_09_after_03 &&
        getCurrentDay(player) >= (player.flags.act3_quest_09_after_02_day + 5),

    action : (player) => {
        player.flags.upper_route_quest_09_after_04 = true;
        player.flags.upper_route_quest_09_after_04_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"...상류도시의 영웅.\"<br><br>" +
                    "영광의 거리에서 만난 발렌은 여전히 미소를 짓고 있었지만 평소보다 표정이 어두워 보였다. 발렌은 당신의 안부를 물으며 당신의 옆에서 걸었다." +
                    "<br><br>\"....\"<br><br>" +
                    "간단한 안부 인사가 끝난 후 답지 않게 침묵이 길어졌다. 힐끗 곁눈질해서 본 발렌은 정면을 응시한 채 생각에 잠겨 있었다." +
                    "<br><br>\"아카시아가 한 번 쓰러졌다는 건 알고 계시겠죠. 그 후로 한 번 더 쓰러졌습니다.\"<br><br>" +
                    "발렌은 여전히 당신을 바라보고 있지 않다." +
                    "<br><br>\"아카시아의 아버지와 어머니는 일찍 돌아가셨습니다. 그리고 전... 아카시아마저 그들처럼 일찍 보내고 싶지 않습니다.\"<br><br>" + 
                    "이제야 발렌이 당신을 돌아보았다. 그의 푸른색 눈동자에는 날것의 감정이 단 하나도 느껴지지 않았다." +
                    "<br><br>\"아카시아의 죽음을 지연시킬 수 있는 것이 있습니다. 준비가 되면, 당신에게 알려드리겠습니다.\"<br><br>" +
                    "발렌은 몸을 숙이더니 당신과 눈높이를 맞추었다. 그의 푸른색 눈동자엔 당신만이 담겨 있다." +
                    "<br><br>\"가시기 전에 드릴 말씀이 있습니다, {valenTitle}. 당신이 아니었다면 반란군들이 이때를 틈타서 저희를 공격했겠죠. <br> ...감사합니다, 진심으로.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_10_intro_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_09_after_04 &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_09_after_04_day + 4),

    action : (player) => {
        player.flags.upper_route_quest_10_intro_01 = true;
        player.flags.upper_route_quest_10_intro_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"상류도시의 영웅.\"<br><br>" +
                    "에이든이다. 그는 짧게 당신에게 경례를 올린 후 다가왔다." +
                    "<br><br>\"발렌님께서 당신을 부르십니다. 시간이 되실 때 천국의 성으로 와주시길 바랍니다.\"<br><br>" +
                    "에이든은 잠시 머뭇거리더니 시선을 내리깔며 말을 이었다." +
                    "<br><br>\"발렌님께서 요 근래에 잠을 못 주무셨습니다. 당신이라면... 발렌님께 저보다 더 도움이 되실 수도 있지 않을까 하는 생각에...\"<br><br>" +
                    "답지 않게 그의 말은 두서가 없었다. 에이든은 내일 발렌이 병원에 들를 일정이 있다고 말하다가 고개를 저었다." +
                    "<br><br>\"죄송합니다. 잊어주셔도 됩니다.\"<br><br>" +
                    "그는 천국의 성에서 발렌이 기다리고 있을 거라는 말을 마지막으로 인사한 후 당신에게서 멀어졌다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_10_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_10_intro_01,

    action : (player) => {
        player.flags.upper_route_quest_10_intro_02 = true;
        player.flags.act3_quest_10_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"오셨습니까.\"<br><br>" +
                    "당신이 천국의 성에 도착하자마자 발렌은 당신을 돌아보았다. 그는 평소와 같이 천사같은 미소를 짓고 있었지만 에이든의 말 때문일까, 안색이 묘하게 평소와는 달라 보였다." +
                    "<br><br>\"예전에 아카시아의 조상들을 묻었던 곳이 있습니다. 대격변이 일어나면서 그 위치를 찾지 못하고 있었는데 드디어 찾았습니다.\"<br><br>" +
                    "그는 그곳에 자신이 찾는 창백한 꽃이 있다고 말했다. 당신이라면 금방 자신이 찾는 꽃이 무엇인지 알아차릴 수 있을 거라고 말하며, 발렌은 주점에 당신만의 의뢰로 올려놓겠다고 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 발렌에게 아카시아를 이렇게까지 아낄 줄은 몰랐다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"저는 상류도시의 모두를 아낍니다.\"<br><br>" +
                                    "발렌은 미소를 짓더니 손가락으로 당신의 심장 쪽을 가볍게 콕 찔렀다." +
                                    "<br><br>\"물론 당신도요. 느껴지지 않는 건가요, <span class='log-valen'>상류도시의 영웅?</span>\"<br><br>"
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 발렌에게 좀 쉬어야 하는 거 아니냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "발렌은 당신의 말에 짧게 웃었다." +
                                    "<br><br>\"제게 시간은 무한하지 않으니까요.\"<br><br>" +
                                    "그는 걱정해줘서 고맙다고 말하며 당신을 믿고 있겠다고 말했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("valen", "affection", 2);
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
    id : "upper_route_quest_10_intro_02_valen",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "royalHospital" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.upper_route_quest_10_intro_01 &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_10_intro_01_day + 1),

    action : (player) => {
        player.flags.akasiaHospitalWithValen = true;
        passTime(player, 40);
        changeNPCEmotion("valen", "affection", 3);
        changeNPCEmotion("akasia", "affection", 5);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "병원에 들어선 당신은 어디로 가야 할지 몰라 방황하고 있었다. 당신이 방황하고 있자 병원에서 일하는 사람이 다가오더니 발렌은 이쪽으로 오시면 된다고 안내했다. 당신이 당황하자 그는 라파엘이 미리 언질해두었다고 말했다. 당신은 그를 쫓아 깊은 곳까지 들어갔다. 가장 안쪽에 있는 병실 문을 열고 들어서자 발렌과 아카시아가 있었다. 침대 위에 누워있던 아카시아가 몸을 일으켜 침대 등받이에 허리를 기댔다. 발렌은 아카시아보다 늦게 당신을 돌아보았다." +
                    "<br><br>\"...에이든입니까?\"<br><br>" +
                    "발렌은 낮게 한숨을 쉬더니 어쩔 수 없다는 듯 고개를 저었다. 당신은 아카시아를 보았다. 그의 팔에는 주사바늘 여러 개가 꽂혀 있었다. 아니, 팔뿐만 아니라 다리에도." +
                    "<br><br>\"걱정 마십시오. 마법으로 흉터는 안 남으니까요.\"<br><br>" +
                    "당신의 시선을 눈치챈 아카시아는 아무 일도 아니라는 듯이 평탄한 어조로 말했다." +
                    "<br><br>\"걱정보다는.... 당신의 이야기를 더 듣고 싶습니다. 제가 이곳에 있는 동안 당신이 지금까지 무슨 일을 했었는지, 그리고 바깥 세상에는 무슨 일이 벌어지고 있는지. 전부요.\"<br><br>" +
                    "...당신은 아카시아에게 많은 이야기를 해주었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_10_after_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.act3_quest_10_done,

    action : (player) => {
        player.flags.upper_route_quest_10_after_01 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"영웅님.\"<br><br>" +
                    "시온이다. 그는 기다리고 있었다는 듯이 당신에게 다가왔다." +
                    "<br><br>\"당신이 무사하셔서 다행이에요. 저한테... 묻고 싶으신 게 많죠?\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 시온도 무사해서 다행이라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...영웅님.\"<br><br>" +
                                    "시온은 감격하여 눈물이 그렁그렁한 얼굴로 당신을 바라보았다. 그는 자신은 그때부터 영웅님 때문에 괜찮았던 거라고 말하며, 그때부터 지금까지 자신이 존재할 수 있었던 이유는 당신 때문이라고 말했다." +
                                    "<br><br>\"제가 거기에 있었던 이유는.... 발렌에게 이미 들었기 때문이었어요.\"<br><br>" +
                                    "그는 발렌이 당신이 위험한 곳에 있으니 당신을 지키고 싶다면 따라가라고 귀띔해주었다고 말해주었다. 당신이 놀라자 시온은 자신은 당신을 위해서라면 뭐든지 할 수 있다고 말했다." +
                                    "<br><br>\"필요하다면 발렌의 구두도 닦을 수 있어요... 물론 영웅님의 발을 핥는 게 더 즐겁겠지만.\"<br><br>" +
                                    "그는 미소를 지으며 앞으로도 자신은 당신의 옆에 머무를 거라고 말했다." +
                                    "<br><br>\"아참, 발렌이 당신이 천국의 성으로 와줬으면 좋겠다는 말을 했어요. 당신이 반란군의 편이 아닌 건 다행이지만 그래도 상류도시를 너무 믿지는 마세요. 너무 믿으면 다치기 쉬우니까요.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sion", "affection", 3);
                                    changeNPCEmotion("sion", "dominance", -3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 시온에게 왜 거기에 있었는지 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...저는 발렌의 밑에서 일하고 있어요.\"<br><br>" +
                                    "영웅님은 자꾸만 멀어지니까.... 시온은 당신의 뺨에 손을 뻗었다. 저한테는 방법이 그것밖에 없었어요. 그는 자신이 발렌의 이상론을 따르는 건 아니라고 말했다. 그저 현실을 택한 것뿐이라고 말했다." +
                                    "<br><br>\"영웅님을 위해서라도 저는 멍청하면 안 되거든요.\"<br><br>" +
                                    "그는 당신이 할 수 없는 일은 자신이 할 거라고 말했다." +
                                    "<br><br>\"아참, 발렌이 당신이 천국의 성으로 와줬으면 좋겠다는 말을 했어요. 당신이 반란군의 편이 아닌 건 다행이지만 그래도 상류도시를 너무 믿지는 마세요. 너무 믿으면 다치기 쉬우니까요.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sion", "affection", -1);
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
    id : "upper_route_quest_10_after_02_seedAlive",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.paleWhiteFlowerSeedAlive &&
        player.flags?.upper_route_quest_10_after_01,

    action : (player) => {
        player.flags.upper_route_quest_10_after_02 = true;
        player.flags.upper_route_quest_10_after_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "천국의 성에 도착하자 발렌이 당신을 맞이했다. 발렌은 당신에게 창백한 꽃을 얻어왔는지 물었고, 당신은 그가 찾던 꽃은 시들었지만 씨앗은 시들지 않았다고 말했다." +
                    "<br><br>\"...감사합니다.\"<br><br>" +
                    "발렌은 당신에게서 씨앗을 받아들며 당신의 수고를 헛되게 만들지 않겠다고 말했다. 그는 씨앗을 마법 용기에 조심스럽게 담은 후, 당신의 손등에 입술을 맞췄다." +
                    "<br><br>\"당신 같은 사람이 제 옆에 있어줘서 다행입니다, 상류도시의 영웅. 그리고 이건 제가 드리는 소정의 선물입니다, 제 감사함을 다 담아낼 수는 없지만.\"<br><br>" +
                    "...당신을 바라보는 발렌의 시선이 전보다 훨씬 더 부드러워진 것 같다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("valen", "affection", 5);
                    changeNPCEmotion("valen", "rage", -10);
                    changeGold(player, 100000000);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_10_after_02_seedDie",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.act3_uppercity_route &&
        player.flags?.paleWhiteFlowerSeedDie &&
        player.flags?.upper_route_quest_10_after_01,

    action : (player) => {
        player.flags.upper_route_quest_10_after_02 = true;
        player.flags.upper_route_quest_10_after_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "천국의 성에 도착하자 발렌이 당신을 맞이했다. 발렌은 당신에게 창백한 꽃을 얻어왔는지 물었고, 당신은 아쉽게도 꽃은 전부 시들어버렸다고 말했다. 발렌은 당신의 이야기를 듣는 동안 내내 말이 없었다. 그는 당신이 이야기를 마칠 때까지 미소를 잃지 않았지만, 동공은 점점 더 어두워졌다." +
                    "<br><br>\"...기적을 바랐는데, 언제나 기적은 제 편이 아니군요.\"<br><br>" +
                    "발렌은 당신에게 수고했다고 말하며, 당신이 해준 일은 마음에 기억해두겠다고 말했다." +
                    "<br><br>\"당신이 할 일을 마쳤으니, 저도 제가 해야 할 일을 해야겠습니다. 상류도시의 영웅, 그러면 저는 이만.\"<br><br>" +
                    "...발렌의 눈동자는 더 이상 흔들리지 않는다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_10_after_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "richTownEntrance" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_10_after_02_day + 7) &&
        player.flags?.upper_route_quest_10_after_02,

    action : (player) => {
        player.flags.upper_route_quest_10_after_03 = true;
        player.flags.upper_route_quest_10_after_03_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "아무 생각 없이 걷던 당신은 순간, 상류도시를 감싸고 있던 백색 벽이 갈색으로 변하는 것을 보았다. 당신은 발걸음을 멈췄고, 지나가던 상류도시 귀족들 중 몇몇도 발걸음을 멈췄지만 아무리 눈을 깜박여도 백색 벽은 여전히 백색이었다. 마치 당신들이 잘못 봤다는 듯이." +
                    "<br><br>\"...보셨습니까.\"<br><br>" +
                    "당신의 옆으로 에이든이 걸어왔다. 그의 금색 눈동자는 백색 벽을 뚫어지게 바라보고 있었다." +
                    "<br><br>\"발렌 님은 상류도시를 지키기 위해 무슨 일이든 할 것입니다.\"<br><br>" +
                    "상류도시의 귀족들이 에이든을 인지하고 고개를 까닥인다. 에이든도 그들을 향해 경례를 한 후 천천히 사람들의 시야 바깥으로 이동해갔다." +
                    "<br><br>\"그리고 저는 그런 발렌님을 끝까지 지킬 것이고요.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "upper_route_quest_11_intro_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_uppercity_route &&
        getCurrentDay(player) >= (player.flags.upper_route_quest_10_after_03_day + 3) &&
        player.flags?.upper_route_quest_10_after_03,

    action : (player) => {
        player.flags.common_route_quest_11_intro_01 = true;
        player.flags.common_route_quest_11_intro_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 걸어가는 당신의 앞으로 백색복을 입은 전령이 한 명 다가왔다. 그는 발렌님이 상류도시의 영웅인 당신은 알 권리가 있다고 말했다고 하며 쪽지 한 장을 내밀었다. 당신은 발렌의 쪽지를 읽었다." +
                    "<br><br>[상류도시의 영웅에게]<br><br>" +
                    "[당신에게 알려야 할까 말아야 할까 고민을 많이 했습니다. 하지만 지금까지 당신이 제게 해주신 것에 감사한 바, 적어도 당신에게는 알려야겠다고 생각했습니다.]<br><br>" +
                    "[아카시아가 쓰러진 이후, 저는 아카시아가 한 번 더 쓰러질 수도 있다는 생각을 했습니다. 아카시아의 죽음을 막는 것도 중요하지만, 아카시아가 죽었을 때 이 도시를 유지할 수 있는 방법을 찾는 것이 제게는 더 우선입니다. 창백한 꽃이 생명력을 기반하여 힘을 유지하는 것을 아시고 계시겠지요.]<br><br>" +
                    "[숙주는 죽었지만, 흉물이 미약하게나마 살아있는 시체는 거의 움직이지 못합니다. 저는 이것을 이용해서 흉물이나 백흉물의 생명력으로도 창백한 꽃의 생명력을 유지할 수 있는지 알아볼 생각입니다.]<br><br>" +
                    "[위험한 일이라는 건 압니다. 하지만 필요한 일입니다.]<br><br>" +
                    "[당신에게는 미리 말씀드리고 싶었습니다. 오늘도 좋은 하루 보내시길.]<br><br>" +
                    "[당신을 애정하는, 발렌.]"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});