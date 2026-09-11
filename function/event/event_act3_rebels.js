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

window.EVENTS.push({
    id : "rebel_route_abominationAttack",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_01_done_day + 2) &&
        !player.flags?.rebel_route_abominationAttack,

    action : (player) => {
        player.flags.rebel_route_abominationAttack = true;
        player.flags.act3_quest_02_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"젠장, 이럴 거면 대체 너네들은 왜 필요한 거야!\"<br><br>" +
                    "일렁이는 소란에 당신은 고개를 돌렸다. 마을 사람들이 경비병들과 경계병들을 둘러싸고 들끓는 감정을 쏟아내고 있었다. 의아해하는 당신에게 옆에 있던 쉘터의 아이가 속닥거렸다. 그는 당신이 없는 동안 흉물들이 마을 입구를 공격한 적이 있었다고 말했다." +
                    "<br><br>\"그때 엄청 많이 끌려갔었거든요... 유리 형이 절대 쉘터 밖으로 나가지 말라고 했던 날.... 전 유리 형의 표정이 그렇게 무서워질 수 있다는 걸 처음 알았어요.\"<br><br>" +
                    "그들의 소란은 멈추지 않았다. 경비병들은 욕을 했고, 경계병들은 묵묵히 그들의 비난을 받아냈다. 아니, 어쩌면 무시하고 있는 걸지도 모르겠다. 경계병들 중 한 명이 당신을 보더니 당신 쪽으로 걸어왔다." +
                    "<br><br>\"하류도시의 영웅.\"<br><br>" +
                    "모두의 시선이 당신에게 몰렸다. 그는 당신에게 까닥 고개 인사를 하더니 주점에 이에 관해 퀘스트를 붙여놨는데 당신이 이 일을 도와줬으면 한다고 말했다." +
                    "<br><br>\"...우리들도 몇 번 도전해봤지만 살아돌아온 자들이 없어서. 흉물 소굴은 뒤틀린 깊은숲에 있다. 염치없지만 부탁한다.\"<br><br>" +
                    "<br><br>모두가 당신을 지켜보고 있는 느낌이 든다. 당신의 옆에 있던 쉘터의 아이가 한 발자국 당신에게서 떨어졌다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_rebelRequest_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "darkStreet" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_02_done_rebels_come_day + 3) &&
        !player.flags?.rebel_route_rebelRequest_01,

    action : (player) => {
        player.flags.rebel_route_rebelRequest_01 = true;
        player.flags.act3_quest_03_rebels_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신이 빈민가 거리로 나오자 누군가 휘파람을 불었다. 당신은 휘파람 소리가 들리는 쪽으로 걸어갔다. 반란군이다." +
                    "<br><br>\"와줘서 감사합니다, 하류도시의 영웅. 당신이 있어서 우리가 얼마나 희망을 얻는지 모릅니다.\"<br><br>",
                    "그들은 주변을 살피더니 당신의 힘을 믿고 부탁을 하나 해도 되겠냐고 물었다. 그들은 당신이 사라졌었던 일주일 동안, 백색 군단은 흉물 토벌보다 반란군 제압에 더 많은 힘을 쏟았다고 말했다." +
                    "<br><br>\"하류도시의 사람들이 너무 많이 죽었습니다. 우리는 결코 그들을 용서할 수 없습니다. 그리고... 저희는 무슨 일이 있어도 그들이 제 가족들을 어디로 데려갔는지 알아내고 말 것입니다. 그러려면 하류도시의 영웅, 당신의 힘이 필요합니다.\"<br><br>" +
                    "그들은 백색 군단 사람들 중에서는 당신의 얼굴을 모르는 사람들이 많다고 말했다. 그러니 가면을 쓰고 접근하면 당신의 정체를 들키지 않을 거라고 말했다. 그들은 당신에게 복면을 내밀었다." +
                    "<br><br>\"당신이 백색 군단 세력을 치는 동안, 저희는 실험실의 위치를 찾을 것입니다.\"<br><br>" +
                    "\"최근 제 가족이 끌려간 실험실 말입니다.\"<br><br>" +
                    "당신이 아는 얼굴이 모습을 드러냈다. 저번 반란군 진압 때 당신이 살려줬던 그 남자다." +
                    "<br><br>\"진실을 위해, 부탁드리겠습니다. 그들의 근거지는 깊은숲에 있습니다. 의뢰서는 주점에 올려놓겠습니다. 마틴에게 말해 당신에게만 보일 수 있게 하겠습니다.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_04_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_03_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_03_done_day + 2) &&
        !player.flags?.rebel_route_quest_04_intro,

    action : (player) => {
        player.flags.rebel_route_quest_04_intro = true;
        player.flags.act3_quest_04_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 옹기종기 모여있다. 처음 보는 몇몇의 사람들이 쉘터의 아이들과 놀아주고 있는 것이 보인다. 그들은 당신이 들어오는 것을 보자마자 자세를 바로 했다." +
                    "<br><br>\"하류도시의 영웅, 당신이 그들의 세력을 약화시킨 덕분에 저희가 원하던 정보를 얻을 수 있었습니다.\"<br><br>" +
                    "더 놀아달라는 아이들을 달랜 후 반란군들은 당신의 방으로 당신과 함께 들어갔다." +
                    "<br><br>\"...최근 제 가족이 끌려간 곳을 찾아냈습니다. 비밀리에 계속 실험을 하고 있었던 모양인데 이유는 모르겠지만 지금 그 연구소는 폐쇄되었습니다.\"<br><br>" +
                    "남자는 잠시 고개를 숙였다가 다시 들었다.<br><br>" +
                    "\"하얀꽃 마물 중에 자신의 인격을 유지하는 개체도 있다고 들었습니다. 전 그들을 마물로 보지 않습니다. 그들은.... 고칠 수 있는 인간입니다. 잠깐 아픈 것뿐입니다.\"<br><br>" +
                    "남자는 당신에게 여자의 사진을 내밀었다." +
                    "<br><br>\"이름은 마리입니다. 제... 하나뿐인 딸이죠. 혹시라도 보시게 된다면, 어떤 모습이어도 괜찮으니까 아빠는 마리를 기다리고 있다고 전해주십시오.\"<br><br>" +
                    "당신은 그래서 연구소는 어디에 있는지 물었다. 그들은 지도를 펴더니 한 곳을 가리켰다." +
                    "길거리다.<br><br>" +
                    "<br><br>\"하류도시의 지하에 만들었을 줄은 저희도 몰랐습니다.\"<br><br>\"하류도시를 대체 뭐라고 생각하는 거야.\"<br><br>\"가능하다면 그곳에 갇힌 사람들을 구해주십시오. 그리고 더는 이런 일이 벌어지지 않도록 연구소를 없애주십시오.\"" +
                    "그는 주점에 의뢰를 올려놓을 테니 준비가 됐을 때 의뢰를 받아 가달라고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_04_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_03_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_03_done_day + 2) &&
        !player.flags?.rebel_route_quest_04_intro,

    action : (player) => {
        player.flags.rebel_route_quest_04_intro = true;
        player.flags.act3_quest_04_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 옹기종기 모여있다. 처음 보는 몇몇의 사람들이 쉘터의 아이들과 놀아주고 있는 것이 보인다. 그들은 당신이 들어오는 것을 보자마자 자세를 바로 했다." +
                    "<br><br>\"하류도시의 영웅, 당신이 그들의 세력을 약화시킨 덕분에 저희가 원하던 정보를 얻을 수 있었습니다.\"<br><br>" +
                    "더 놀아달라는 아이들을 달랜 후 반란군들은 당신의 방으로 당신과 함께 들어갔다." +
                    "<br><br>\"...최근 제 가족이 끌려간 곳을 찾아냈습니다. 비밀리에 계속 실험을 하고 있었던 모양인데 이유는 모르겠지만 지금 그 연구소는 폐쇄되었습니다.\"<br><br>" +
                    "남자는 잠시 고개를 숙였다가 다시 들었다.<br><br>" +
                    "\"하얀꽃 마물 중에 자신의 인격을 유지하는 개체도 있다고 들었습니다. 전 그들을 마물로 보지 않습니다. 그들은.... 고칠 수 있는 인간입니다. 잠깐 아픈 것뿐입니다.\"<br><br>" +
                    "남자는 당신에게 여자의 사진을 내밀었다." +
                    "<br><br>\"이름은 마리입니다. 제... 하나뿐인 딸이죠. 혹시라도 보시게 된다면, 어떤 모습이어도 괜찮으니까 아빠는 마리를 기다리고 있다고 전해주십시오.\"<br><br>" +
                    "당신은 그래서 연구소는 어디에 있는지 물었다. 그들은 지도를 펴더니 한 곳을 가리켰다." +
                    "길거리다.<br><br>" +
                    "<br><br>\"하류도시의 지하에 만들었을 줄은 저희도 몰랐습니다.\"<br><br>\"하류도시를 대체 뭐라고 생각하는 거야.\"<br><br>\"가능하다면 그곳에 갇힌 사람들을 구해주십시오. 그리고 더는 이런 일이 벌어지지 않도록 연구소를 없애주십시오.\"" +
                    "그는 주점에 의뢰를 올려놓을 테니 준비가 됐을 때 의뢰를 받아 가달라고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_04_after",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_04_done &&
        !player.flags?.rebel_route_quest_04_after,

    action : (player) => {
        player.flags.rebel_route_quest_04_after_day = getCurrentDay(player);
        player.flags.rebel_route_quest_04_after = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"하류도시의 영웅.\"<br><br>",
                    "당신이 연구소를 소각시키면서 길거리에까지 불이 붙은 모양이다. 하류도시 사람들은 여기저기서 불을 끄려고 노력하고 있었다. 반란군들은 골목 구석에 숨은 채 당신에게 무엇을 찾았냐고 물었다." +
                    "<br><br>\"마리는 찾았습니까.\"<br><br>" +
                    "\"지금은 그걸 물을 때가 아닙니다. 어떤 실험을 했는지가 중요합니다.\"<br><br>" +
                    "다른 반란군의 재촉에 남자는 애원하듯 말했다.<br><br>" +
                    "\"그냥 딱 한 마디면 되니까.\"<br><br>" +
                    "그는 살아있기만 하면 된다고 중얼거리듯이 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 마리는 죽었다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "무거운 정적이 흘렀다.",
                                    "<br><br>\"...그럴 수가.\"<br><br>" +
                                    "그는 비틀거리더니 잠시 혼자만의 시간이 필요하다고 말하며 발걸음을 옮겼다. 다른 동료들이 안쓰러운 눈으로 그를 바라보았다." +
                                    "<br><br>하지만 그들에게는 각자 찾아야만 하는 가족들이 있었다. 그들은 앞으로 나아가기로 했다. 당신이 하얀 꽃과 흉물을 인간에게 동시에 투입하고 있는 실험에 대해서 말하자 그들의 표정은 점점 일그러졌다. 사람에게 어떻게 그런 짓을 할 수 있냐며, 반란군들 중 한 명이 벽을 세게 쳤다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 마리가 연구소를 빠져나간 것 같다고 거짓말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "마리 아버지의 눈이 크게 뜨였다. 그는 몇 번이고 당신의 말을 되뇌더니, 마침내 환하게 웃었다.<br><br>" +
                                    "\"우리가 뭐랬어. 딸아이는 살아있을 거라고 했잖아!\"<br><br>\"자, 그럼 이제 본론으로 들어가서...\"<br><br>" +
                                    "주변이 불타고 있는데도 그들은 마치 전쟁에서 승전보를 울린 것처럼 굴었다. 당신은 그들에게 실험에 대해 말해주었다. 하얀 꽃과 흉물을 동시에 인간에게 투입하고 있다는 말에 그들의 눈이 분노로 타올랐다." +
                                    "<br><br>\"...어떻게든 구해내야 해.\"<br><br>" +
                                    "\"이 실험을 모두에게 알려야 해. 발렌의 가면을 벗겨내자.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.mariFatherHope = true;
                                    savePlayer(player);
                                    return true;
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type : "text",
                value : [
                    "<br><br>\"이봐요! 거기서 쑥덕거리지만 말고 불 좀 꺼줘요!\"<br><br>" +
                    "거세지는 불길에 하류도시의 사람들이 도움을 청했다. 반란군들 중 몇 명은 불을 끄러 갔지만, 많은 사람들은 움직이지 않았다. 그들은 서로 시선을 교환하더니 당신은 정말로 하류도시의 영웅이라고 말했다." +
                    "<br><br>\"앞으로도 연락드리겠습니다, 하류도시의 영웅.<br>정말 감사합니다.\"<br><br>" +
                    "그들은 순식간에 어둠으로 숨어들었다. 불에 타던 거리가 아주 조금이나마 진정이 되었다. 하류도시 사람들 중 몇 명이 울음을 터뜨렸다." +
                    "<br><br>...한순간의 불로 삶의 터전을 잃은 사람들이 너무 많다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_04_findingMari",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_rebel_route &&
        player.flags?.rebel_route_quest_04_after &&
        player.flags?.mariFatherHope &&
        getCurrentDay(player) >= (player.flags.act3_quest_04_done_day + 30) &&
        !player.flags?.rebel_route_quest_04_findingMari,

    action : (player) => {
        player.flags.rebel_route_quest_04_findingMari = true;
        addItem(player, ITEMS.consumable.fullPotion);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 마을 입구에서 마리의 아버지를 보았다. 그는 더 이상 반란군 제복을 입고 있지 않았다. 당신과 시선이 마주치자 그는 고개를 숙여보였다." +
                    "<br><br>\"저는 이제, 마리를 찾는 데 전념하려고 합니다. 많은 생각을 해보았지만, 저는 우선 제 딸을 찾아야겠습니다.\"<br><br>" +
                    "그는 마리를 찾고 나면 다시 반란군 세력으로 돌아올 거라고 말했다. 그는 당신의 손에 수혈팩 하나를 쥐어주며 다시 한번 감사하다고 말했다." +
                    "<br><br>그리고 그는, 마을 입구를 나섰다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_04_after_paleDream",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_04_done_day + 3) &&
        player.flags?.rebel_route_quest_04_after &&
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
    id : "rebel_route_quest_05_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_04_after_day + 3),

    action : (player) => {
        player.flags.rebel_route_quest_05_intro_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 도착하자 반란군들이 당신의 방에 모여있었다. 당신이 오자마자 그들은 당신에게 예의를 갖춰 고개를 숙였다." +
                    "<br><br>\"하류도시의 영웅, 발렌은 실험을 멈출 생각이 없는 것 같습니다.\"<br><br>" +
                    "\"상류도시 그 돌대가리들은 이번 길거리에서 일어난 실험이 발렌의 명령을 거역하고 상류도시 몇몇이 강행한 거라고 믿고 있어.\"<br><br>" +
                    "그런 돌대가리들은 죽어도 된다며 반란군들 중 한 명이 과격하게 말했다. 문밖에서 엿듣고 있던 쉘터의 아이가 화들짝 놀라더니 굳은 얼굴로 상류도시에 사는 사람들이라고 다 죽이면 안 된다고 말했다." +
                    "<br><br>\"우리 오빠도 거기에 있단 말이야. 니콜라이 오빠가 우리 오빠 거기서 잘 있다고 해줬어.\"<br><br>"+
                    "\"잘 있다고? 그러면 네 오빠도 이미 상류도시에 물들어버린 괴물새끼인 거다.\"<br><br>" +
                    "그런 괴물 새끼라면 죽어도 된다고 말하는 사람의 입을 다른 반란군이 막았다. 다른 반란군들이 아이를 달래려고 했지만 아이는 이미 눈물이 그렁그렁했다." +
                    "<br><br>\"우리 오빠는 괴물이 아냐!\"<br><br>" +
                    "아이는 힘껏 반란군을 노려보더니 그대로 달려나갔다. 반란군들 중 몇 명이 당신에게 고개 숙여 사과했다." +
                    "<br><br>\"죄송합니다, 이새끼가 최근에 가족을 잃어서....\"<br><br>" +
                    "그는 쉘터의 아이들이 주변에 있는지 살핀 후에 문을 닫았다. 그는 발렌이 에릭을 흉물 소굴들로 보내고 있다고 말했다. 에릭이 흉물 소굴 쪽으로 움직인 건 분명 무슨 이유가 있는 거라고 말하며, 그는 더 많은 정보가 모이면 당신에게 위치를 전달해주겠다고 말했다." +
                    "<br><br>\"아, 그리고... 요새 쉘터 주변에 백색 군인들이 많은 것 같습니다. 조심하시는 게 좋을 것 같습니다, 하류도시의 영웅님.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_05_start",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_05_intro_day + 3),

    action : (player) => {
        player.flags.act3_quest_05_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 지나는 당신의 옆으로 반란군 한 명이 슬쩍 스쳐지나가며 말했다." +
                    "<br><br>\"에릭이 현재 쫓고 있는 흉물 소굴의 둥지 몇 개를 알아냈습니다. 나머지는 저희 반란군들이 갈 테니, 하류도시의 영웅 님은 폐야에 있는 흉물 소굴에 가주시길 바랍니다.\"<br><br>" +
                    "그는 정확한 위치는 주점의 퀘스트에 올려놓겠다고 말했다.<br><br>" +
                    "\"...상류도시가 무엇을 찾고 있든, 절대로 그들에게는 넘겨주면 안 됩니다. 언제나처럼 믿고 있겠습니다, 하류도시의 영웅님.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_05_after",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_05_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_05_done_day + 1),

    action : (player) => {
        player.location = "townStreet";
        player.flags.rebel_route_quest_05_after = true;
        player.flags.rebel_route_quest_05_after_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 도착한 당신을 반란군들이 맞이했다. 그들은 그 안에서 무엇을 봤냐고 물었고, 당신은 그들에게 동굴에서 봤던 것들에 대해 얘기했다. 특히 에르윈의 얘기가 나왔을 때 그들의 표정이 굳었다. 그들은 아렌에게는 더 이상 남은 가족이 없다고 말하며, 무슨 일이 있어도 에르윈은 더 이상 누구에게도 뺏길 수 없다고 말했다." +
                    "<br><br>\"...그나저나 하얀 꽃잎을 먹는 백흉물이라.... 하얀 꽃 마물의 특성을 이어받게 될까봐 두렵습니다.\"<br><br>" +
                    "\"애초에 흉물에 대적하기 위해 흉물을 이용하자는 생각은 어떤 똥통 대가리에서 나온 거야?\"<br><br>" +
                    "그들은 이 이상의 실험은 계속되면 안 된다고 말했다." +
                    "<br><br>\"그러려면 발렌을....\"<br><br>" +
                    "그 순간 멀리서 땅을 뒤흔드는 광음이 터졌다. 쉘터의 벽이 낮게 떨리고 천장에서 먼지가 우수수 떨어졌다. 갑작스러운 소리에 쉘터의 어린아이들이 비명을 질렀고, 반란군들과 당신은 황급히 길거리로 뛰쳐나갔다."
                ]
            },
            {
                type : "text",
                value : [
                    "길거리로 나왔지만 눈에 띄는 것은 아무것도 없었다. 사람들은 어안이 벙벙한 얼굴로 주변을 둘러보았다. 다만 어디선가 날아온 것인지, 하얀 꽃잎 하나가 길바닥 위로 천천히 떨어졌다." +
                    "<br><br>\"...이 광음이 아무 것도 아닐 리가 없어.\"<br><br>" +
                    "반란군들이 당신을 바라보았다." +
                    "<br><br>\"저희는 앞으로 이 광음에 대해서 알아보겠습니다. 하류도시의 영웅님도 뭔가 찾게 된다면 저희에게 알려주시길 바랍니다.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_05_after_abominationAttack",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        player.flags?.rebel_route_quest_05_after &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_05_after_day + 4),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길거리를 지나던 당신은 경계병이 경비병을 부축하고 가는 것을 보았다. 경비병은 흉물에 오염된 듯 정신을 못 차리고 있었다. 경계병은 쌍욕을 하며 흉물 녀석들은 가만두지 않을 거라고 으르렁거렸다. 그 순간, 당신은 부축당하고 있던 경비병의 몸이 기괴하게 꺾이는 것을 보았다." +
                    "<br><br>\"대체 뭐...\"<br><br>" +
                    "말이 끝나기도 전에 경비병의 입에서 나온 흉물이 경계병의 얼굴을 꿀꺽 삼켜버렸다. 길거리 여기저기에서 비명 소리가 들린다. 경비병은 삐걱거리며 경계병의 머리를 흉물로 먹은 채 주변을 둘러보았다. 흉물 촉수가 여기저기로 뻗어나간다." +
                    "<br><br>\"이런, 씨발, 지금 뭐 하는 거야? 포위해!\"<br><br>" +
                    "순찰을 돌고 오는 길이었는지 루크가 명령하는 소리가 들렸다. 그는 언제나처럼 그들의 가장 앞에 있었다. 경비병들과 경계병들은 힘을 합쳐서 공격했고 흉물은 결국 경계병을 뱉어냈다. 경계병의 얼굴은 검붉게 들끓고 있었다. 다른 경계병 한 명이 그를 부축하며 먼저 막사로 돌아가겠다고 말했다." +
                    "<br><br>경계병의 얼굴에서 솟아오른 촉수가 그를 삼키기 전까지.<br><br>" +
                    "비명소리가 더 커진다. 경비병과 경계병이 흉물을 죽이기도 전에 흉물은 금방 다른 숙주들을 찾아서 삼켜버렸다. 당신은 무기를 쥐었다."
                ]
            },
            {
                type : "effect",
                run : "startRebelQuest05AfterBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startRebelQuest05AfterBattle = function(player){

    startBattle(["abominatedSoldier1", "abominatedSoldier1"], player, {
        noEscape : true,
        onWin : () => startRebelQuest05AfterBattle1Event(player),
        onLose : () => startRebelQuest05AfterBattleLosingEvent(player)
    });

    return true;
};

window.startRebelQuest05AfterBattle1Event = function(player){
    startScene([
        {
            type: "text",
            value: [
                "당신은 흉물을 쓰러뜨렸지만, 금세 다른 오염된 사람들에게 둘러싸였다. 당신은 당신의 무기를 다시금 쥐었다. 옆에서 백색 군단이 대열을 유지하며 오염된 개체들을 제압하는 것이 보인다."
            ]
        },
        {
            type: "effect",
            run: (player) => {
                startBattle(["abominatedSoldier1", "abominatedSoldier1", "abominatedSoldier2"], player, {
                    noEscape: true,
                    onWin: () => startRebelQuest05AfterBattle2Event(player),
                    onLose: () => startRebelQuest05AfterBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startRebelQuest05AfterBattle2Event = function(player){
    startScene([
        {
            type : "text",
            value : [
                "흉물들을 이기고 돌아보니, 길거리에는 시체들만 가득했다. 백색 군단은 당신을 보긴 했지만, 아무런 인사도 없이 그대로 자신의 대열로 돌아갔다. 루크는 오염되지 않은 부상병들을 살피며 욕을 내뱉었다." +
                "<br><br>\"그 상처!\"<br><br>" +
                "마을 사람들 중 누군가가 루크의 상처를 가리켰다. 많은 사람들이 루크의 밴드로 가려지지 않은 검붉은 자국을 보았다.<br><br>" +
                "\"저새끼도 변하는 거 아냐?\"<br><br>\"마을에서 내쫓아야 하는 거 아냐?\"<br><br>" +
                "여기저기서 웅성거리는 소리가 들린다. 경비병들 중 몇 명이 부상 입은 몸을 이끌고 루크의 앞에 서서 말도 안 되는 소리 하지 말라고 말했다. 그들은 루크는 이 상처를 입은 뒤로도 오랫동안 아무런 변화를 보이지 않았고, 여기서 마을밖으로 내쫓는 것은 죽으라는 소리나 다름없다는 말을 했다. 분위기가 점점 사나워진다." +
                "<br><br>\"씨발, 날 여기서 쫓아낸다고? 어디 한 번 해보든가.\"<br><br>" +
                "어디 한 번 힘으로 날 끌어낼 수 있으면 끌어내봐라. 루크의 당당한 태도에 웅성거리는 소리들이 조금 수그러들었다. 백색 군단은 루크의 태도에 혀를 차긴 했지만 별 말은 하지 않았다. 그들은 루크의 통솔력이 그나마 하류도시 체제를 유지하고 있다는 걸 알고 있었다. 상황은 일단락되었지만 어수선한 분위기는 쉽사리 가라앉지 않았다."
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

window.startRebelQuest05AfterBattleLosingEvent = function(player){
    startScene([      
        {
            type : "text",
            value : [
                "당신은 흉물의 공격을 버티지 못했다. 당신이 쓰러지자 흉물들은 당신을 좋은 숙주라고 생각했는지 한번에 당신에게 달려들었다." +
                "<br><br>그 순간, 누군가 당신을 끌어안았다.<br><br>" +
                "...소라." +
                "<br><br>일순간 흉물들은 소라에게 다가오지 못했다. 무언가를 감지한 듯 그들은 서로를 바라보았고 소라는 그 틈을 타서 당신을 질질 구석으로 끌고 갔다. 뒤에서 사람들의 비명 소리가 들린다. 하지만 소라는 당신의 귀를 막으며, 당신에게만 들릴 목소리로 속삭였다." +
                "<br><br>\"괜찮아. 내가 너를 지켜줄 테니까.\""
            ]
        },
        {
            type : "text",
            value : [
                "당신은 의식을 잃었다가 다시 눈을 떴다. 길거리의 분위기가 어수선하다. 사람들은 흉물에 오염되었던 시체를 건드리는 것도 두려워했다. 불태워버려! 어딘가에서 사나운 목소리가 울렸고, 사나운 목소리에 맞서서 울음 소리가 울렸다." +
                "<br><br>\"내 가족이야! 내 가족이라고! 적어도 장례식 정도는...\"<br><br>" +
                "사람들끼리 싸우기 시작한다. 당신은 비틀거리면서 자리에서 일어났다. 하류도시에 잔류한 백색 군인들은 상류도시에 남은 병력보다 훨씬 적었다. 그들 중 몇몇은 당장 상류도시로 돌아가고 싶다며 인상을 찌푸렸다."
            ]
        }
    ], player, {
        onEnd : () => 
        {
            player.flags.abominationsTownStreetAttack = true;
            player.flags.abominationsTownStreetAttackSora = true;
            player.flags.abominationsTownStreetAttack_day = getCurrentDay(player);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.EVENTS.push({
    id : "common_route_quest_06_mimicAbominationRumor",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.abominationsTownStreetAttack &&
        getCurrentDay(player) >= (player.flags.abominationsTownStreetAttack_day + 7),

    action : (player) => {
        player.flags.common_route_quest_06_mimicAbominationRumor = true;
        player.flags.common_route_quest_06_mimicAbominationRumor_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"...그 소식 들었어? 사라진 아들 목소리가 들린다면서 나간 사람, 아직도 안 들어왔대.\"<br><br>" +
                    "\"저번에 죽은 아내 목소리 들린다면서 나간 사람도 못 돌아오지 않았어?\"<br><br>" +
                    "웅성거리던 사람들 사이로 한 명이 정처 없이 마을 입구 밖으로 나서는 모습이 보인다. 마을 입구를 지키고 있던 경계병이 그 사람을 막아섰다. 경계병이 어디로 가는 거냐고 묻자, 그는 딸이 자신을 불렀다고 대답했다." +
                    "<br><br>\"네 딸은 저번에 죽었잖아! 우리 모두가 봤다고!\"<br><br>" +
                    "\"아니야, 분명 들렸어!\"<br><br>" +
                    "말다툼 끝에 경계병은 욕설을 내뱉으며 무기를 챙겼다. 그는 딸의 목소리가 들렸다는 곳까지만 함께 가주겠다며 남자의 뒤를 따라 마을 밖으로 나섰다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_06_mimicAbominationRumor_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.common_route_quest_06_mimicAbominationRumor &&
        getCurrentDay(player) >= (player.flags.common_route_quest_06_mimicAbominationRumor_day + 7),

    action : (player) => {
        player.flags.common_route_quest_06_mimicAbominationRumor_02 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"...그자식 아직도 안 돌아왔어.\"<br><br>" +
                    "\"안 돌아온 게 아니라 못 돌아온 거지.\"<br><br>" +
                    "그들은 딸의 목소리가 들린다고 했던 사람을 따라갔던 경계병에 대해 이야기를 나누고 있는 듯했다. 그들은 막사로 향하고 있다." +
                    "<br><br>\"...요새 저절로 사라지는 사람들이 많은 것 같아.\"<br><br>" +
                    "\"씨발, 그때도 그러지 않았었냐? 고블린동굴 포로 수색하러 갔을 때, 자발적으로 하얀 꽃 마물을 쫓아갔던 흔적이....\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_06_mimicAbominationRumor_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "barracks" &&
        player.flags?.common_route_quest_06_mimicAbominationRumor_02,

    action : (player) => {
        player.flags.common_route_quest_06_mimicAbominationRumor_03 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "막사에 들어오자 경비병들 몇 명이 루크의 주변에 모여있는 것이 보였다. 그들은 루크의 검붉은 상처를 살피며 정말로 괜찮은 거냐고 물었다. \"이상하게 줄어들었다가 다시 늘어난단 말이야...\", 그들 중 한 명이 루크의 뺨을 만지러 하자 루크는 그의 손을 쳐냈다." +
                    "<br><br>\"미쳤냐.\"<br><br>" +
                    "루크는 욕설을 내뱉더니 그래서 경계병 수색은 어떻게 됐냐고 물었다. 경비병들은 고개를 저었다." +
                    "<br><br>\"씨발...\"<br><br>" +
                    "루크는 막대사탕을 씹으며 생각에 잠겼다. 그는 짜증 섞인 목소리로 백색 군단은 아무 말도 하지 않냐고 물었다." +
                    "<br><br>\"스스로 없어진 걸 어떻게 실종으로 보냐고 하던데...\"<br><br>" +
                    "\"하.... 씨발. 그새끼들 뭔가 아는 것 같은데.\"<br><br>" +
                    "당신을 눈치챈 경비병이 재빨리 문을 닫았다. 닫힌 문 너머로 웅얼거리는 소리들만 들려온다...." 
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_06_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        player.flags?.abominationsTownStreetAttack &&
        getCurrentDay(player) >= (player.flags.abominationsTownStreetAttack_day + 4),

    action : (player) => {
        player.flags.act3_quest_06_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 어린 아이가 당신을 불렀다. 그는 우물쭈물하더니 당신에게 제 형을 찾아줄 수 있겠냐고 물었다." +
                    "<br><br>\"금방 돌아오겠다고 했는데 지금 일주일째 안 돌아오고 있어....\"<br><br>" +
                    "그는 형은 깊은 숲 너머까지 나가지 않았을 거라고 말했다. 그는 주점에 퀘스트를 올려놓을 테니 최대한 빨리 찾아달라고 말했다." +
                    "<br><br>\"...마음은 이해하지만, 그런 사소한 것까지 영웅님이 짊어지다가는 금방 지치실 거예요.\"<br><br>" +
                    "아이를 달래고 나오는 길에, 시온이 문에 기대어 서있었다. 그는 차가운 눈으로 아이의 뒷모습을 바라보다가 다시 당신을 보았다. 그의 장밋빛 눈동자에는 걱정이 서려 있었다." +
                    "<br><br>\"무리하지 마세요, 영웅님. 아무리 영웅님이라 하더라도 모두를 구할 수는 없는 법이니까요.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_06_after",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_06_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_06_done_day + 2),

    action : (player) => {
        player.flags.rebel_route_quest_06_after = true;
        player.location = "richTownEntrance";
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "<span class='log-danger'>쿵</span><br><br>" +
                    "일순간 천국으로 가는 길 쪽에서 큰소리가 났다. 상류도시의 거리를 거닐던 사람들이 어안이 벙벙한 표정으로 주변을 둘러보다가 천국으로 가는 길 쪽으로 시선을 돌렸다. 당신은 천국으로 가는 길로 향하려고 했지만 백색 군인들이 당신을 막았다. 당신이 백색 군인의 제압에 밀려 뒤로 휘청이는 순간, 누군가 당신의 허리를 잡아주었다.<br><br>" +
                    "...누구?"+
                    "<br><br>그는 당신을 이끌고 상류도시 관문으로 향했다. 상류도시 입구를 벗어난 후에야 그는 당신을 똑바로 바라보았다. 완전히 다른 머리색이지만 당신은 호박색 눈동자만큼은 알아차릴 수 있었다." +
                    "<br><br>유리.<br><br>" +
                    "그는 평소 입는 옷과 다르게 상당히 귀족적인 옷을 입고 있었다. 검지를 제 입가에 올리더니 유리는 쉘터에 오면 더 설명해주겠다고 말했다." +
                    "<br><br>\"...너무 급했어.\"<br><br>" +
                    "그는 중얼거리더니 자신은 먼저 쉘터에 가있겠다고 말했다. 그리고 그는 지하철로 향했다. 당신은 그의 뒷모습을 바라보았다." +
                    "<br><br>...그는 마치 상류도시의 귀족 같았다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_06_after_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        player.flags?.rebel_route_quest_06_after,

    action : (player) => {
        player.flags.act3_rebel_quest_07_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 도착한 당신은 유리의 방으로 향했다. 유리의 방에는 이미 반란군들이 모여 있었다." +
                    "<br><br>\"...상류도시를 직접적으로 건드렸으니 그들은 분명 움직일 거야.\"<br><br>" +
                    "유리는 관자놀이를 꾹꾹 누르며 말했다. 그는 반란군 세력에 들어갈 생각은 여전히 없지만, 당신이 휘말려서 위험에 처하는 것을 가만히 두고 볼 수는 없다고 말했다. 유리의 따스한 눈동자가 당신의 얼굴에 닿았다가 떨어진다.<br><br>" +
                    "\"전면전은 안 돼. 우리의 세력이 그들의 세력을 이길 수 있을 리가 없잖아.\"<br><br>" +
                    "\"그렇지만...!\"<br><br>" +
                    "\"...다같이 한날 한시에 죽고 싶은 거라면 그렇게 해도 돼.\"<br><br>" +
                    "유리의 목소리는 단호했다. 그의 시선이 다시 당신에게 닿았다가 떨어졌다.<br><br>" +
                    "\"...또 소중한 사람을 잃게 되는 건 사양이야.\"<br><br>" +
                    "\"수장... 아니, 유리, 하나만 알아줘. 우리가 벌인 짓이 아니야. 우리들의 세력은 많고, 우리보다 과격한 세력들도 많아. 나는 그들이 직접적인 테러 방식을 사용할 줄은 정말 몰랐어.\"<br><br>" +
                    "유리는 고개를 끄덕였다. 그는 백색 군단은 분명 정확히 목표를 노려서 올 것이라고 말했다. 이번에 테러를 일으킨 반란군 세력이 목적일 것이다. 유리는 자신이 그쪽으로 가겠다고 말했다." +
                    "<br><br>\"도망치는 거라서 누구보다도 자신이 있으니까. 최대한 많은 사람들을 구해볼게. 어차피 너네는 이 틈을 이용해서 상류도시에서 연구자료를 빼올 생각인 거잖아. 아마 원래는 하류도시의 영웅을 내가 가려는 곳에 보낼 생각이었겠지. 그러면 시선이 다 그쪽으로 쏠릴 테니까.\"<br><br>" +
                    "정곡을 찔렸는지 반란군 세력은 잠시 말이 없었다. 유리는 당신을 바라보았다." +
                    "<br><br>\"...너는 연구자료를 빼오도록 해. 네가 하려고 했던 일은 내가 할 테니까.\"<br><br>" +
                    "유리는 당신의 표정을 살피더니 웃었다." +
                    "<br><br>\"걱정하지 마. 난... 지금까지도 안 잡힌 사람이니까.\"<br><br>" +
                    "반란군 세력은 연구자료를 빼올 정확한 위치는 마틴에게 따로 말해서 의뢰로 올려놓겠다고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "act3_quest_07_nikolai",
    priority : true,
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "richTownEntrance" &&
        player.flags?.act3_rebel_route &&
        !player.flags?.nikolaiDie &&
        player.flags?.act3_quest_07_rebel_boss_end,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "상류도시 입구로 향하며 당신은 길게 숨을 내쉬었다. 이제 알아낸 것을 토대로 주점으로 돌아가 보고만 하면 될 것 같다. 당신이 홀로 걸음을 옮기려는 순간, 익숙한 웃음소리가 들렸다." +
                    "<br><br>\"안녕, 자기.\"<br><br>" +
                    "니콜라이다. 당신은 주변을 둘러보았다. 사람들의 시야에서 가려진 곳이다." +
                    "<br><br>\"나도 이러고 싶지는 않은데... 미안해?\"<br><br>" +
                    "니콜라이는 평소처럼 웃고 있었지만 그의 손에는 채찍이 아니라 마체테가 들려 있었다." +
                    "<br><br>\"대신 자기가 날 죽이게 된다고 하더라도, 자기를 원망하지는 않을게.\"<br><br>" +
                    "니콜라이의 분홍색 눈동자가 가늘게 휘었다. 그와의 싸움을 피할 수는 없을 것 같다!" 
                ]
            },
            {
                type : "effect",
                run : "startAct3QuestAfterNikolaiBattle"
            }
        ], player);
    }
});

window.startAct3QuestAfterNikolaiBattle = function(player){

    startBattle("nikolai_machete", player, {
        noEscape : true,
        onWin : () => startAct3QuestAfterNikolaiWinEvent(player),
        onSkipDefeat : () => startAct3QuestAfterNikolaiLosingEvent(player)
    });
    return true;
};

window.startAct3QuestAfterNikolaiWinEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 니콜라이를 이겼다. 니콜라이의 마체테가 바닥으로 툭 떨어졌다. 니콜라이는 바닥에 누운 채 멍하니 하늘을 바라보다가 미소를 지었다. 무기를 쥔 당신이 다가오는데도 그의 미소는 그치지 않았다. 그는 당신의 얼굴을 보기보다는 하늘을 올려다보았다." +
                "<br><br>\"...약속대로 원망하지는 않을게, 자기.\"<br><br>"
            ]
        },
        {
            type : "choice",
            choices : [
                {
                    text : "니콜라이를 죽인다.",
                    scene : [
                        {
                            type : "text",
                            value : [
                                "당신은 니콜라이의 심장에 당신의 무기를 찔러넣었다. 니콜라이는 마지막까지 미소를 잃지 않았다. 그는 하늘을 바라보며 그저 웃었다." +
                                "<br><br>\"그래도 마지막까지... 열심히 했으니까....<br><br> 건강해야 해, 타티아나.\"<br><br>" +
                                "그는 죽을 때까지 단 한 번도 당신에게 시선을 두지 않았다. 당신은 차갑게 식어가는 그의 시체를 뒤로 하고 걸어갔다."
                            ]
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                changeTrauma(player, 10);
                                player.flags.nikolaiDie = true;
                                savePlayer(player);
                            }
                        }
                    ]
                },
                {
                    text : "니콜라이를 죽이지 않는다.",
                    scene : [
                        {
                            type : "text",
                            value : [
                                "당신은 니콜라이를 죽이지 않았다. 니콜라이는 당신에게 죄책감 느낄 필요 없다고 말했다." +
                                "<br><br>\"자기, 나는 차라리 죽는 게 낫거든, 임무 실패하는 것보다는.\"<br><br>" +
                                "그럼에도 당신이 움직이지 않자 니콜라이는 작게 한숨을 쉬었다. 그는 벌떡 일어나더니 다시 미소를 지으며 당신은 정말 사랑스럽고도 착한 사람이라고 말했다." +
                                "<br><br>\"자, 그럼 난... 변명을 준비해서 가야겠는걸.\"<br><br>" +
                                "그는 당신에게 윙크를 하더니 팔랑팔랑 상류도시 쪽으로 걸어가버렸다."
                            ]
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                player.flags.act3QuestNikolaiMercy = true;
                                changeNPCEmotion("nikolai", "affection", 1);
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
};

window.startAct3QuestAfterNikolaiLosingEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "니콜라이가 당신의 가슴을 발로 밟았다. 그의 마체테가 당신의 목 위까지 내려온다. 니콜라이의 분홍색 눈동자가 당신을 내려다본다. 여전히 웃음기 가득한 얼굴로 그는 당신을 내려다보고 있었다." +
                "<br><br>\"....\"<br><br>" +
                "그는 마체테를 높이 들어 올렸다. 그러나 잠시 후, 웃으며 고개를 저었다." +
                "<br><br>\"못하겠다.\"<br><br>" +
                "그는 변명이나 생각해야겠다고 말하며 당신의 가슴에서 발을 다시 뗐다. 그리고 당신이 뭐라 하기도 전에 팔랑팔랑 손인사와 함께 상류도시 쪽으로 멀어져갔다." +
                "<br><br>니콜라이는 당신을 죽이지 않았다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.flags.act3QuestNikolaisMercy = true;
                changeTrauma(player, 3);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.EVENTS.push({
    id : "rebel_route_quest_07_after",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_07_done,

    action : (player) => {
        player.flags.rebel_route_quest_07_after_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 돌아오자 분위기가 어수선했다. 쉘터의 아이들 중 몇 명은 호기심이 어린 얼굴을 하고 있었고 몇 명은 당신이 오자마자 당신에게 달려들며 두려움을 호소했다. 쉘터에는 다친 사람들이 앓는 소리를 내며 누워 있었다. 다친 사람들 중에서는 당신보다 어린 사람들도 있었고, 당신보다 훨씬 나이가 많은 사람들도 있었다." +
                    "<br><br>\"무사해서 다행이야.\"<br><br>" +
                    "유리다. 그는 다친 사람의 상처에 약을 발라주며 당신을 믿고 있었다고 말했다. 그가 테러를 일으킨 반란군들을 몇 명 구해온 모양이다. 시온은 마음에 안 든다는 얼굴로 쉘터의 벽에 기대어 서있었다." +
                    "<br><br>\"반란군들을 쉘터에 데려와서 치료해도 돼요?\"<br><br>" +
                    "\"...시온.\"<br><br>" +
                    "\"쉘터가 위험해지면 어쩌려고요? 이러다가 영웅님이 쉴 수 있는 곳까지 무너져버리면 어떡하실 건데요?<br> 유리 형이 착한 사람이라는 건 알아요. 하지만 누구도 내버려두지 못하는 유리 형의 그 상냥함 때문에, 정작 지켜야 할 사람들이 다치게 된다면...\"<br><br>" +
                    "시온은 당신을 바라보았다." +
                    "<br><br>\"제가 사랑하는 사람이 다치게 된다면, 저는 유리 형을 가만두지 않을 거예요.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 시온에게 그만하라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...지금은 그만할게요. 하지만, 저는 정말 당신이 유리 형 때문에 다치게 된다면.\"<br><br>" +
                                    "시온은 유리를 노려보았다. 그러더니 그대로 쉘터 밖으로 나가버렸다." +
                                    "<br><br>\"절대로 유리 형을 용서하지 않을 거예요.\"<br><br>" +
                                    "시온이 나가자 유리는 한숨을 쉬었다. 그는 시온의 말에도 일리가 있다고 말했다." +
                                    "<br><br>\"하지만 살릴 수 있는 사람을 저버리는 건... 인간의 도리가 아니잖아.\"<br><br>" +
                                    "시온의 말을 인정하면서도 그는 자신의 의견을 굽힐 생각은 없는 것 같았다. 그는 부상자 치료를 계속했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sion", "affection", -5);
                                    changeNPCEmotion("yuri", "affection", 3);
                                    changeNPCEmotion("sion", "dominance", 5);
                                    player.flags.rebel_route_quest_07_sided_with_yuri = true;
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 유리에게 쉘터의 아이들 생각은 한 거냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...안 했을 리가 없잖아.\"<br><br>" +
                                    "유리의 목소리는 단호하면서도 잔잔했다. 그는 부상자 한 명을 치료한 후 바로 다음 부상자로 넘어갔다." +
                                    "<br><br>\"하지만 우리에게 목숨을 저울질할 수 있는 권리가 있을까? 물론 난 쉘터의 아이들과 너는 무슨 일이 있어도 지킬 거야. 하지만 그들을 지키기 위해 구할 수 있는 목숨을 저버리는 건.... <br> 스스로가 용납할 수가 없어.\""+
                                    "<br><br>시온은 어이가 없다는 듯 팔짱을 꼈다." +
                                    "<br><br>\"모두를 구할 수는 없어요, 유리 형. 이 세상이 형이 읽는 책처럼 동화같은 세상일 리가 없잖아요.\"<br><br>" +
                                    "\"...네가 그걸 나보다 더 잘 안다고 생각하니?\"<br><br>" +
                                    "유리는 시온을 쳐다보지도 않고 말했다." +
                                    "<br><br>\"너는 그저 나보다 포기가 빠른 것뿐이야, 시온.\"<br><br>" +
                                    "분위기가 무겁다... 유리는 부상자 치료를 계속했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sion", "affection", 5);
                                    changeNPCEmotion("yuri", "affection", -2);
                                    player.flags.rebel_route_quest_07_sided_with_sion = true;
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
    id : "rebel_route_quest_07_after_shelter_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_07_after_day + 7),

    action : (player) => {
        player.flags.rebel_route_quest_07_after_shelter_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리에 벽보 하나가 크게 붙어 있다. 사람들이 벽보 주변에 웅성웅성 모여 있었다. 그들은 당신을 보자 더 수군거리기 시작했다. 당신은 벽보를 보았다." +
                    "<br><br>[반란군 동조자 색출]<br><br>" +
                    "[하류도시에 반란군을 치료해준 자들은 반란군과 동일하여 취급한다.]<br>[그리고 반란군을 치료해준 자들을 돕는 자들도 처벌을 피할 수는 없을 것이다]" +
                    "<br><br>[만약 하류도시 전체가 이 사상에 동조하게 된다면, 상류도시는 더 이상 백색 군단을 보내지 않을 것이다.]<br><br>"
                ]
            },
            {
                type : "text",
                value : [
                    "<span class='log-danger'>\"쉘터에서 반란군을 치료해주지 않았어?\"</span><br><br>" +
                    "쉘터의 아이에게 돈을 받고 음식을 나눠주던 상인이 그 말에 흠칫하더니 다시 아이에게 돈을 돌려주었다. 아이는 당황하여 상인을 올려다보았다. 먹을 것을 달라는 아이에게 상인은 다른 상인에게 가서 사라고 말했다. 아이는 주변을 둘러보았다. 상인들은 서로의 눈치를 살피더니 모두 아이의 시선을 피해버렸다." +
                    "<br><br>\"잠깐, 어딜 가는 거야!\"<br><br>" +
                    "당신은 외침이 들려온 쪽으로 시선을 돌렸다. 백색 군단들 중 몇 부대가 철수하고 있었다. 하류도시 사람들은 이대로 자신들을 두고 가면 어떡하냐고 매달렸지만 백색 군단은 상부의 명령이라는 말만 반복하며 가차없이 떠나버렸다." +
                    "<br><br>\"하류도시가 계속 반란군들을 숨겨준다면, 모든 백색 군단이 퇴각할 겁니다.\"<br><br>" +
                    "에이든의 서늘한 목소리에 하류도시 사람들의 소란이 더 커졌다. 몇몇은 그놈의 쉘터가 문제라며 쉘터에 공격성을 드러냈다. 거리에 있던 쉘터의 몇몇 아이들이 위협을 느끼고 쉘터에 도망치듯이 들어가버렸다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_07_after_shelter_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "tavern" &&
        player.flags?.act3_rebel_route &&
        player.flags?.rebel_route_quest_07_after_shelter_01,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "주점에 들어서자 성난 사람들이 마틴에게 왜 쉘터의 아이들에게 밥을 주냐고 따지고 있었다. 마틴은 무표정으로 그들을 바라보더니 자신은 그저 돈을 낸 사람에게 밥을 주는 것이라고 말했다." +
                    "<br><br>\"젠장, 이거 상류도시가 알기 전에 우리가 먼저 고발해야 하는 거 아냐?\"<br><br>" +
                    "고발이라는 말에 마틴은 인상을 찌푸리긴 했지만 쉘터의 아이들을 쫓아내지는 않았다. 쉘터의 아이들은 고개를 푹 숙이고 눈치를 보며 마틴의 요리를 먹었다.",
                    "<br><br>\"젠장, 그만 처먹어!\"<br><br>",
                    "다른 놈이 쉘터의 아이를 쫓아내려고 다가오자 마틴은 들고 있던 프라이팬으로 그들의 앞을 가로막았다. 뜨겁게 달구어진 프라이팬에 열을 내던 사람들이 몸을 움츠렸다." +
                    "<br><br>\"여긴 내 주점이야. 주점 규칙에 날 엿먹이지 말라는 것이 있었을 텐데? <br><br> 신고는 알아서 해. 하지만 내 손님을 쫓아내는 건 나뿐이야.\"<br><br>" +
                    "사람들의 기세가 수그러들자 마틴은 후라이팬을 내려놓았다. 당신은 그의 목을 감싸고 있는 옷깃이 흐트러져 있는 것을 보았다. 그리고 목 주변에 남은 붉은 손자국.... 마틴은 당신을 보더니 다른 사람들은 신경 쓰지 말고 앉으라는 듯 고개를 까닥였다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_07_after_shelter_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        player.flags?.rebel_route_quest_07_after_shelter_01,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"우리 어떻게 되는 거야...?\"<br><br>" +
                    "쉘터에 들어서자 한 아이가 울음을 터뜨렸다. 그는 돈을 내고 뭐라도 사려고 했지만 아무도 우리에게는 물건을 팔지 않는다고 울먹였다. 당신이 쉘터에 들어오자 아이들이 당신의 주변으로 몰려들었다." +
                    "<br><br>\"우리 괜찮은 거야...?\"<br><br>\"우린 이제 어떻게 해야 해?\"<br><br>" +
                    "그들은 당신의 대답을 기다리고 있다...."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 사람들이 겁을 먹어서 그러니 괜찮을 거라고 대답해주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"겁을 먹어서...? 겁을 먹어서 우리를 공격하는 거야?\"<br><br>" +
                                    "당신의 말을 이해한 아이들도 있지만, 당신의 말을 이해하지 못한 아이들도 있는 모양이었다. 아이들의 웅성거림이 더 커졌다..."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 5);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 당신이 어떻게든 해주겠다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"정말...?\"<br><br>" +
                                    "아이들은 그나마 당신의 말에 위안을 얻은 모양이었다. 하지만 몇몇 아이들은 당신에게 너무 의지하면 시온 형이 화낼 거라고 말하며 불안해했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 이제부터 정신 똑바로 차려야 한다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "아이들은 당신의 말에 더 불안해졌다. 몇몇 아이들이 자기보다 어린 아이들을 달래며 당신을 곱지 않은 시선으로 노려보았다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("yuri", "affection", -5);
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
    id : "rebel_route_quest_07_after_shelter_04",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_07_after_shelter_01_day + 14),

    action : (player) => {
        player.flags.rebel_route_quest_07_after_shelter_04 = true;
        player.flags.rebel_route_quest_07_after_shelter_04_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 들어서자 유리가 식량을 체크하고 있는 모습이 보였다. 당신이 유리에게 다가서자 유리는 신경 쓰지 않아도 괜찮다는 듯 고개를 저어 보였다." +
                    "<br><br>\"내가 벌인 일이니까 내가 어떻게든 할게.\"<br><br>" +
                    "굳이 그가 쓰던 수첩을 확인하지 않아도, 당신은 눈대중으로도 쉘터에 식량이 부족하다는 건 알 수 있었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 유리에게 당신도 식량 모으는 것을 도와주겠다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "유리는 당신의 말에 놀란 듯 눈을 깜박였다. 그는 당신의 말에도 주저하며, 이건 자신이 벌인 일이고 당신에게는 부담을 주고 싶지 않다고 말했다. 당신이 물러서지 않자, 유리는 어쩔 수 없다는 듯이 미소를 지으며 고개를 저었다." +
                                    "<br><br>\"넌 정말 고집불통이구나.... 고마워. 쉘터를 위해서, 그리고 날 위해서 이렇게까지 해줘서.\"<br><br>" +
                                    "유리는 필요한 식량의 개수를 쉘터의 박스에 적어놓겠다고 말했다. 당신은 고개를 끄덕였다." +
                                    "<br><br><span class='log-warning'>앞으로 당신은 한 달을 주기로 지정된 식량을 채워넣어야 합니다.</span>"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    startShelterFoodSupply(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 고개를 끄덕였다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"응. 피곤할 텐데 들어가서 쉬어.\"<br><br>" +
                                    "유리가 구출한 반란군들을 쉘터에서 치료하는 바람에 생긴 일이다. 당신은 당신 먹고 살기에도 바쁘다. 당신은 유리에게서 등을 돌렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.rebel_route_quest_07_after_shelter_04_refuse = true;
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
    id : "rebel_route_quest_07_after_shelter_05",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_07_after_shelter_04_day + 1),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신은 길거리에서 시온과 다른 사람이 시비가 붙은 것을 보았다. 시온은 금방이라도 대검을 뽑아들 것처럼 손을 대검 손잡이에 두고 있었다." +
                    "<br><br>\"당신들 때문에 쉘터의 상황이 힘들어졌어요. 그러면 조금이라도 보태줘야 하는 거 아닌가요?\"<br><br>" +
                    "\"우리는 지금 우리 챙기기에도 바쁘다니까, 꼬마야. 네가 아직 잘 몰라서 그러는데...\"<br><br>" +
                    "\"하. 반란군이라고 해봤자 저희에게는 도적떼와 다름이 없네요. 일만 벌여놓고 책임을 안 지는 걸 어른이라 할 수 있나요? 하긴, 하류도시에는 그런 어른들 따위 한 명도 본 적 없지만.\"<br><br>" +
                    "시온은 더 이상 상대할 가치도 없다는 듯이 고개를 돌렸다." +
                    "<br><br>\"그래요. 우리는 또 우리가 해결해야 하겠죠. 언제나 그래왔던 것처럼.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_08_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_07_after_shelter_01_day + 5),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"...저게 뭐지?\"<br><br>" +
                    "보초를 서고 있었던 경계병이 무언가 보이는지 인상을 찌푸리면서 고개를 더 앞으로 내뺐다. 뭔가 땅이 울리는 것 같은 느낌이 든다. 당신은 고개를 들었다." +
                    "<br>흙먼지들이 높게 솟아올랐다가 다시 가라앉았다. 그리고 그 흙먼지들 사이로 당신은 흉물들을 보았다. 그들은 군대처럼 체계적으로 무리 지어 있었다. 경계병은 흉물들의 대열을 보고서도 못 믿겠는지 눈을 깜박이다가 다시 고개를 저었다." +
                    "<br><br>\"습격이다, 습격!!\"<br><br>" +
                    "당신은 그저 동그랬던 흉물들이 점점 모습을 변화시키는 것을 보았다. 몇 놈들은 늑대로 변했고, 몇 놈들은 사슴으로 변했다. 그리고 그들은 전부 하류도시의 마을 입구를 향해 달려왔다. 흉물을 막아서려고 했던 백색 군단이 멈칫했다." +
                    "<br><br>\"...네? 후퇴 말입니까? 하지만...\"<br><br>" +
                    "에이든은 주저했지만 결국 상부의 명령에 따라 나머지 백색 군인들에게도 후퇴를 지시했다. 지하철로 사라져가는 백색 군인들을 보며 하류도시 사람들은 절망에 빠져 소리를 질렀다. \"우리를 버리는 거냐\"부터 시작해서 그들은 반란군들 때문에 우리가 버림을 받은 거라고 울부짖었다. 당신은 유리를 보았다. 유리는 쉘터의 아이들은 전부 쉘터에 피신시킨 후 무기를 들고 하류도시 마을 입구로 걸어가고 있었다." +
                    "<br><br>그는 아이들을 위해, 그리고 당신을 위해 마을 입구에서 물러날 생각이 없다."
                ]
            },
            {
                type : "text",
                value : [
                    "도망치는 경비병들도 많았지만, 루크는 도망치지 않는 경비병들을 모아 하류도시 마을 입구를 사수했다. 하류도시의 몇몇 민간인들도 어떻게든 무기를 들고 마을 입구에 섰다. 그들은 뒤에 남은 가족들을 지켜야 한다는 결의로 가득했다." +
                    "<br><br><strong>으아아악</strong>" +
                    "<br><br>거대 융합 흉물에 사람들이 추풍낙엽으로 쓰러져 갔다. 거대 융합 흉물이 당신을 향해 뻗어온다. 당신은 무기를 쥐었다."
                ]
            },
            {
                type : "effect",
                run : "startRebelQuest08IntroBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startRebelQuest08IntroBattle = function(player){

    startBattle(["abominationMixedArms", "abominationMixedArms", "abominationMixedMiddle", "abominationMixedHead"], player, {
        noEscape : true,
        onWin : () => startRebelQuest08IntroBattle1Event(player),
        onLose : () => startRebelQuest08IntroBattleLosingEvent(player)
    });

    return true;
};

window.startRebelQuest08IntroBattle1Event = function(player){
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
                    onWin: () => startRebelQuest08IntroBattle2Event(player),
                    onLose: () => startRebelQuest08IntroBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startRebelQuest08IntroBattle2Event = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 간신히 흉물들을 해치웠으나, 흉물들은 싸우는 사람들만 노리지 않았다. 그것들은 틈을 노리고 비집고 들어가 하류도시 관문을 통과해 싸우지도 못하는 사람들에게 달려들었다. 당신은 고개를 돌렸다. 다행히 쉘터의 앞은 시온이 막아서고 있었다. 흉물들은 고개를 처들더니 명령이라도 받은 듯 곧바로 쉘터가 아닌 다른 민간 집에 쳐들어가기 시작했다. 여기저기서 비명 소리가 울려퍼진다." +
                "<br><br>흉물들 중 몇몇이 울타리처럼 둘러져 있는 백색 성벽에 몸을 부딪혔다가 곧 몸을 다시 돌려 하류도시 사람들을 낚아챘다. 하지만 백흉물 중 몇몇은 백색 성벽에도 관심을 보였다. 그것들은 아주 조심스럽게 백색 성벽에 머리를 기댔다. 그러더니 갉아먹으려는 듯 이를 드러내고 성벽을 긁기 시작했다." +
                "<br><br><strong>키이이이익!</strong><br><br>" +
                "그것들은 성벽을 긁어먹다가 극심한 괴로움에 시달리며 길바닥에서 파닥거리다가 말라 죽어버렸다. 나머지 백흉물들이 백색 성벽을 응시했다. 마치 누군가에게 보여주듯이 그들은 성벽을 천천히 훑어보았다. 그리고 흉물들은 명령이라도 받은 것처럼, 다같이 관문 밖으로 후퇴했다." +
                "<br><br>흉물들을 쫓던 에릭은 순간 멈칫했다. 그리고 그는 고개를 돌렸다." +
                "<br>...고개를 돌려 성벽 관문 밖을 바라보는 그의 녹색 시선은 답지 않게 순간 흔들렸었다. 하지만 그것도 잠시, 그는 무표정으로 총을 쐈다. 도망가려던 흉물들 몇몇이 비명 소리와 함께 죽어갔다." +
                "<br><br>당신은 주변을 둘러보았다. 하류도시는 엉망이었다. 누군가는 자식을 찾고, 누군가는 부모를 찾고, 누군가는 연인을 찾았다. 그들은 상류도시의 백색 군단을 욕하다가도, 백색 군단을 물러나게 한 반란군들을 욕했다. 몇몇 이들은 화풀이하듯이 쉘터의 벽을 차기도 했다." +
                "<br><br>그리고 당신은 살아남았다, 오늘도."
            ]
        }
    ], player, {
        onEnd : () => 
        {
            player.flags.rebel_route_quest_08_intro_attack = true;
            player.flags.rebel_route_quest_08_intro_attack_day = getCurrentDay(player);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.startRebelQuest08IntroBattleLosingEvent = function(player){
    startScene([      
        {
            type : "text",
            value : [
                "당신은 흉물의 공격을 버티지 못하고 쓰러졌다. 쓰러지는 당신의 위로 흉물들이 달려든다. 하지만 당신에게 올라타기도 전에 그것들은 몸통에 구멍이 뚫린 채로 풀썩 떨어졌다. 에릭이다. 당신의 시야가 점점 어두워진다. 당신은 그대로 정신을 잃었다."
            ]
        },
        {
            type : "text",
            value : [
                "당신이 다시 일어났을 때 하류도시는 엉망이었다. 길바닥이 깨진 것도 모자라서 몇몇 민가들은 이미 무너진 지 오래였다. 누군가는 자식을 찾고, 누군가는 부모를 찾고, 누군가는 연인을 찾았다. 그들은 상류도시의 백색 군단을 욕하다가도, 백색 군단을 물러나게 한 반란군들을 욕했다. 몇몇 이들은 화풀이하듯이 쉘터의 벽을 차기도 했다. 당신은 비틀거리면서 자리에서 일어났다." +
                "<br><br>다행히, 당신이 기절해있는 동안 흉물들은 당신의 몸을 건드리지 않았다. 당신은 에릭을 보았다. 에릭은 이미 하류도시 관문 밖으로 향하고 있었다."
            ]
        }
    ], player, {
        onEnd : () => 
        {
            player.flags.rebel_route_quest_08_intro_attack = true;
            player.flags.rebel_route_quest_08_intro_attack_day = getCurrentDay(player);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.EVENTS.push({
    id : "rebel_route_quest_08_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_08_intro_attack_day + 1),

    action : (player) => {
        player.flags.paleGivesYouPower = true;
        player.flags.paleGivesYouPower_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 들어온 당신의 주변으로 하얀 꽃들이 하늘하늘 피어올랐다. 당신은 주변을 둘러보았다. 창백이다. 소라와 똑닮은 그것은, 하얀 꽃잎들로 흘러내리는 자신의 얼굴을 자꾸만 쓸어올리며 당신을 바라보고 있었다. 당신과 시선이 마주치자 그는 손으로 얼굴을 가렸다. 1초, 2초, 3초.... 다시 손을 내렸을 때 그의 얼굴은 어떻게든 형태를 유지하고 있었다." +
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
                    "유리의 목소리가 들린다. 당신은 눈을 깜박였다." +
                    "<br><br>당신은 또 쉘터에서 갑자기 잠에 들었던 모양이다. 유리는 요새 무리한 거 아니냐며 걱정스러운 표정을 지었다. 그 순간, 당신의 머릿속으로 처음 보는 장면이 흘러 들어왔다."
                ]
            },
            {
                type : "text",
                value : [
                    "누구의 시선인지는 아직 알 수 없다. 당신은 붉은색 머리의 어린 소년을 보았다. 5살은 됐을까? 그는 자고 있었다. 당신은 그의 머리카락을 부드럽게 쓸어넘겼다." +
                    "<br><br>\"제가 하류도시로 갈게요.\"<br><br>" +
                    "유리의 앳된 목소리다." +
                    "<br><br>\"그러니까 제 동생을 상류도시에 남겨주세요, 아버지.\"<br><br>" +
                    "당신은 붉은색 머리의 어린 소년의 이마에 당신의 이마를 댔다. 그리고 속삭인다.<br><br>" +
                    "<span class='log-yuri'>\"언젠가 다시 찾아올게.... 카인.\"</span><br><br>"
                ]
            },
            {
                type : "text",
                value : [
                    "\"...{playerName}?\"<br><br>" +
                    "유리가 당신의 어깨를 가볍게 흔들었다. 당신의 시야가 돌아왔다." +
                    "<br><br>\"너... 오늘은 쉬어. 안 쉬는 건 안 돼.\"<br><br>" +
                    "유리는 단호했다. 그는 당신의 손을 이끌고 당신의 침실로 갔다. 당신이 괜찮다고 해도 유리는 당신을 쉬기 전까지는 방밖으로 내보낼 생각이 없다... 결국 당신은 강제로 쉬었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, -10);
                    changeHP(player, 100);
                    changeStamina(player, 100);
                    passTime(player, 50);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_08_intro_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.paleGivesYouPower_day + 3),

    action : (player) => {
        player.flags.rebel_route_quest_08_intro_03 = true;
        player.flags.act3_quest_08_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"젠장, 그자식들.... 마치 군대를 형성하는 것처럼 부대가 나뉘어져 있어.\"<br><br>" +
                    "당신은 경비병들이 거칠게 욕을 하며 땅을 발로 차는 소리를 들었다. 골목 사이에서 그들의 대화를 엿듣고 있던 반란군들 중 한 명이 당신 쪽으로 고개를 돌렸다." +
                    "<br><br>\"백흉물이 제대로 진을 형성하여 다시 하류도시를 공격하기 전에 저희가 먼저 쳐야합니다. 백색 군단은 저희를 도와줄 생각은 하지 않고 있으니까요.\"<br><br>" +
                    "하류도시를 지키는 자들은 백색 군단이 아니라 반란군이라는 걸 보여줘야 한다며 그는 주먹을 쥐었다. 그는 그러려면 당신의 도움이 필요하다고 말하며 이미 위치는 어느 정도 지도에 표시해놨다고 말했다." +
                    "<br><br>\"하류도시의 영웅님은 왼쪽 부대를 무찔러주십시오. 오른쪽 부대는 저희가 어떻게든 하겠습니다.\"<br><br>" +
                    "그는 자료를 정리한 후 주점에 의뢰로 올려놓겠다고 말했다. 인기척이 들리자 그는 바로 어둠 속으로 사라져버렸다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_08_after_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_08_boss_end,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"...하류도시의 영웅.\"<br><br>" +
                    "발렌이다. 백색 군인들이 당신을 경계하며 무기를 겨누었다. 발렌은 차갑게 미소를 짓더니 괜찮다는 듯 그들에게 손을 들어보였다." +
                    "<br><br>\"당신 때문에 백흉물의 왼쪽 부대를 물리칠 수 있었습니다. 감사의 인사를 전하죠.\"<br><br>" +
                    "당신은 그의 검이 피와 검붉은 애액으로 물들어 있는 것을 보았다." +
                    "<br><br>\"...저는 당신을 인정합니다. 당신은 도시를 위해 필요한 사람입니다.<br><br>" +
                    "<span class='log-valen'>그러니 끝까지 하류도시를 지켜주시길 바랍니다.\"</span><br><br>" +
                    "발렌은 당신에게 어떠한 위해도 가하지 않고 지나갔다. 몇몇 백색 군인들이 당신을 노려보긴 했지만 그뿐, 그들은 발렌의 명령 없이는 당신을 건드리지 않았다. 발렌의 옆에서 걷고 있던 에이든과 당신의 시선이 마주쳤다. 하늘색 머리카락 아래로 드러난 그의 금안은, 당신을 주시했다.<br><br>" +
                    "당신은 어쩐지, 그 눈동자를 예전에도 몇 번 본 것 같다는 생각이 들었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_08_after_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_rebel_route &&
        player.flags?.act3_quest_08_boss_end,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"...하류도시의 영웅.\"<br><br>" +
                    "반란군들 사이에서 몇 번 본 적 있었던 젊은 얼굴이다. 그는 고통스러운 얼굴로 옆구리를 쥔 채 당신을 바라보았다." +
                    "<br><br>\"하류도시의 영웅님이 왼쪽 부대를 치는 동안 어떻게 알았는지 발렌의 군대가... 그가 직접 행차할 줄은 몰랐습니다. 저희는....\"<br><br>" +
                    "그는 입술을 깨물었다. 그는 백흉물들과 전투를 벌이던 중, 뒤에서 백색 군단이 치고 올라왔다고 말했다. 사방에서 적이 들이닥치는 바람에 대열을 정비할 틈조차 없었다며 그는 이를 악물었다." +
                    "<br><br>\"...여기로 도망간 것 같은데.\"<br><br>" +
                    "경계병의 목소리다. 반란군은 어깨를 흠칫 떨더니 당신에게는 항상 감사한 마음뿐이라고 말했다. 어디로 도망갈 거냐는 물음에 그는 쉘터로는 가지 않을 것이라고 대꾸했다." +
                    "<br><br>\"쉘터에 더는 피해를 주지 않을 겁니다.... 적어도 저는. 하류도시의 영웅님, 언제나 건강하시길 바랍니다.\"<br><br>" +
                    "그는 당신을 뒤로 하고 어둠 속으로 몸을 숨겼다. 당신은 발걸음을 옮겼다. 몇 걸음 옮기지도 않았는데 \"찾았다!\"라는 소리와 함께 무언가가 넘어지는 소리가 났다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

//에르윈
window.EVENTS.push({
    id : "common_route_quest_08_after_abominated_erwin",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.abominatedErwin &&
        player.flags?.act3_quest_08_done,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길거리로 나오는 순간, 당신은 비명 소리를 들었다. 당신은 고개를 들었다. 백흉물은 전부 물러났다고 생각했는데, 흉물 하나가 마을 입구에서부터 길거리까지 기어오고 있었다. 경계병, 경비병, 백색 군인들이 흉물을 막으려고 했지만 그 흉물은 찔려서 피부가 찢어져도 검붉은 꽃잎들로 흩어졌다가 다시 원상태로 돌아왔다." +
                    "<br>그것은 누군가를 부르고 있었다. 웃으면서, 혹은 울면서." +
                    "<br><br>아렌.<br><br>" +
                    "그것은 당신을 알아보지 못하고 있다. 흉물에 잠식된 에르윈이 당신을 공격해온다!"
                ]
            },
            {
                type : "effect",
                run : "startAbominatedErwinBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startAbominatedErwinBattle = function(player){
    startBattle("erwin2", player, {
        noEscape : true,
        onWin : () => startAbominatedErwinWinEvent(player),
        onLose : () => startAbomniantedErwinLosingEvent(player)
    });
    return true;
};

window.startAbominatedErwinWinEvent = function(player){
    startScene([      
        {
            type : "text",
            value : [
                "당신은 흉물에 오염된 에르윈을 쓰러뜨렸다. 흉물에 오염된 에르윈은 마지막까지 당신을 쳐다보지 않았다. 그것은 누군가를 찾듯이 쓰러지는 순간까지도 시선을 이리저리 돌렸다. 흉물이 쓰러졌다. 갑자기 찾아온 정적 속에서 누군가가 환호를 질렀다. 쓰러뜨렸어, 우리는 죽지 않았어, 누군가의 환호가 울리자 다른 사람들도 전염된 것처럼 환호성을 지르기 시작했다." +
                "<br>안도 속에서 경계병들과 경비병들은 흉물로 오염된 에르윈의 시체를 치웠다. 그를 알아본 존재들만이 어둠 속에서 눈물을 삼켰을 뿐이다."
            ]
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

function startAbomniantedErwinLosingEvent(player){
    gameOver(
        player,
        "당신은 흉물에 오염된 에르윈의 공격을 이겨내지 못했다. 진짜 에르윈과 다르게, 그것은 당신을 진심으로 죽이려고 들었다. 지친 당신이 틈을 보이는 순간, 검붉은색 촉수가 당신의 심장을 꿰뚫었다. 마지막 숨결이 목에 걸렸다. 거칠게, 느리게, 그리고... 영원히 오지 않는." +
        "<br><br>...당신의 눈앞이 흐려졌다. 흉물에 오염된 에르윈에 몰살당하는 하류도시 마을 사람들을 마지막으로 당신의 시야는 감겼다. 영원히."
    );
}

window.EVENTS.push({
    id : "common_route_quest_08_after_luke_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "darkStreet" &&
        player.flags?.act3_quest_08_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_08_done_day + 2),

    action : (player) => {
        player.flags.common_route_quest_08_after_luke_01 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "빈민가 거리를 지나던 당신은 루크의 목소리에 걸음을 멈추었다." +
                    "<br><br>\"들끓는 상처가 더 번지지는 않고 있지만... 지금 너한테 달라붙어 있는 흉물이 죽은 건 아니라니까. 네가 말하는 방안이 뭔지는 몰라도 해결책이 아니라는 건 확실해.\"<br><br>" +
                    "\"씨발.\"<br><br>" +
                    "당장 퍼지면 흉물에 먹힐 텐데 씨발, 그럼 내가 어떻게 할까? 루크는 낮은 목소리로 짜증을 내며 돌부리를 툭 걷어찼다. 루크와 친해보이는 약 상인은 낮게 한숨을 쉬었다." +
                    "<br><br>\"네가 생각이 많은 건 알겠다. 네 그 달콤한 담배 냄새가 아주 몸에 배었네.\"<br><br>" +
                    "\"...신경 꺼.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_08_after_luke_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shop" &&
        player.flags?.common_route_quest_08_after_luke_01,

    action : (player) => {
        player.flags.common_route_quest_08_after_luke_02 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "상점에 들어왔을 때 소라는 백색 군인 중 한 명과 이야기를 나누고 있었다. 그는 당신이 상점에 들어오자마자 이야기를 나누던 중에도 활짝 웃으며 손을 흔들었다. 백색 군인은 당신을 보더니 그대로 상점에서 나갔다. 소라는 당신에게 달려와 상점까지는 무슨 일이냐고 물었다. 역시 내가 보고 싶어서 온 거지? 소라는 까르르 웃으며 당신의 손에 손깍지를 꼈다." +
                    "<br><br>\"...소라는 {soraTitle}랑 함께 있는 시간이 좋아.\"<br><br>" +
                    "그는 웃었다." +
                    "<br><br>\"너와 함께 있는 이 순간이 영원했으면 좋겠어....\"<br><br>" +
                    "소라의 손이 다정하게 당신의 머리카락을 어루만졌다." +
                    "<br><br><span class='log-sora'>\"...너무 사랑해서, 두렵기도 해.\"</span><br><br>" +
                    "당신이 그를 올려다보자 소라는 마치 자기는 아무 말도 안 했다는 듯이 평소처럼 웃어보였다. 그는 당신에게 너무 예쁘게 웃지 말라고 하며, 그러다가 자신에게 납치당한다고 키득거리며 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

//다시 반란군 루트로 돌아오기
window.EVENTS.push({
    id : "rebel_route_quest_08_after_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.act3_rebel_route &&
        getCurrentDay(player) >= (player.flags.act3_quest_08_done_day + 4),

    action : (player) => {
        player.flags.rebel_route_quest_08_after_03 = true;
        player.flags.rebel_route_quest_08_after_03_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "반란군들은 익숙하게 쉘터에 모여 있었다. 그들 중에서는 과격한 반란군들도 많았다. 몇몇은 아예 상류도시가 없어져버렸으면 좋겠다는 말을 했다." +
                    "<br><br>\"그것보다는 상류도시의 성벽이 더 중요한 것 같습니다. 이상할 정도로 흉물들이 그 성벽은 건드리지 않던데 만약에 그 성벽을 하류도시 주변에 두를 수 있다면... 지금보다는 하류도시가 피해를 덜 입을 수도 있습니다.\"<br><br>" +
                    "\"아니. 아예 그들도 똑같이 당해봐야 해. 하류도시 사람들이 상류도시로 들어가고, 상류도시 사람들이 하류도시 사람들처럼 나와서 사는 거지.\"<br><br>" +
                    "지금까지 우리가 당해왔으니 상류도시 사람들도 당해야 한다면서 몇몇이 목소리를 높였다. 그 의견에 찬성하는 사람들은 꽤 많았다." +
                    "<br><br>\"난 내 딸만 찾을 수 있으면 됐어.\"<br><br>" +
                    "\"우리 모두의 가족들만 다시 돌아올 수 있으면 돼...\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 다 됐고, 쉘터에서 반란군들이 모이는 건 자제하는 게 좋을 것 같다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 그들은 불편한 표정을 지었다. 그들도 자신들이 쉘터에 악영향을 끼치고 있다는 건 알고 있었다." +
                                    "<br><br>\"죄송합니다. 하지만 안전하게 모일 곳은 여기밖에 없어서...\"<br><br>" +
                                    "\"쉘터의 아이들을 위해서라도 상류도시를 빨리 무너뜨려야 합니다.\"<br><br>" +
                                    "당신의 머릿속에 반란군과 백색 군단의 화력 차이가 스쳐 지나갔다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 상류도시 사람들도 위협을 느껴보아야 한다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 많은 사람들이 동조했다. 그들은 상류도시 사람들의 머리에는 똥밖에 안 들어가있다고 말하면서 현실을 보게 만들어야 한다고 주장했다." +
                                    "<br><br>\"그리고 우리가 지금까지 당한 게 있는데....\"<br><br>" +
                                    "\"우리가 당하는 동안 그들은 뭐했지? 조롱이나 하고 있지 않았나?\"<br><br>" +
                                    "분위기가 점점 험악해진다. 반란군들 중 몇 명이 우리는 그들과 똑같은 사람이 되면 안 된다고, 우리는 복수가 주목적이 아니라 진실을 밝혀내고 싶은 거라고 반박하긴 했지만 그들의 반박은 들끓는 증오에 묻혀 버렸다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 그러면 우리도 상류도시 사람들과 똑같은 사람이 되는 거 아니냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"우리가 상류도시 사람들과 똑같은 사람이 되는 거라뇨.\"<br><br>" +
                                    "반란군이 당신에게 차갑게 쏘아붙였다. 그는 우리는 인간을 대상으로 하는 실험은 하지 않았다고 말했다." +
                                    "<br><br>\"애초에 그들이 그런 실험만 안 했어도....\"<br><br>" +
                                    "\"어떻게 내 오빠를 끌고 간 사람들과 내가 같다고 말할 수 있어요...!\"<br><br>" +
                                    "일렁이는 분노 속, 반란군들 중 몇 명이 분위기를 가라앉히기 위해 노력했다. 그들은 다시는 자신들과 상류도시 사람들을 비교하지 말라고 부탁했다."
                                ]
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
    id : "rebel_route_quest_09_intro_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route ) &&
        player.flags?.common_route_quest_08_after_luke_02 &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_08_after_03_day + 2),

    action : (player) => {
        player.flags.rebel_route_quest_09_intro_01 = true;
        player.flags.rebel_route_quest_09_intro_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 걷는 당신의 귀로 쑥덕이는 소리가 들렸다." +
                    "<br><br>\"이번에 대군단이 하얀 꽃무덤으로 향한다는데.\"<br><br>" +
                    "\"폐야가 아니라?\"<br><br>" +
                    "\"백색 군단이 움직이는 거니까 뭔가 이유가 있겠지.\"<br><br>" +
                    "하류도시 사람들 중 몇몇은 꽃 마물보다는 흉물을 처리해줬으면 좋겠다고 쑥덕거렸다. 그래도 꽃들은 마을까지 들어와서 우리를 죽이려 한 적은 없잖아. 야, 흉물이나 꽃 마물이나 똑같은 놈들이지. 여기저기서 계속 수군거리는 소리가 들려온다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_09_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        ( player.location === "shelter" || player.location === "goldenShelter" ) &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route ) &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_09_intro_01_day + 3),

    action : (player) => {
        player.flags.rebel_route_quest_09_intro_02 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 잠에 들었다가 가슴 위로 느껴지는 무게감에 눈을 떴다. 누군가 당신의 위에 앉아있었다." +
                    "<br>백발에 금안.... 꽃잎으로 부서지지 않는 미소, 소라.<br>" +
                    "당신은 멍하니 소라를 올려다보았다. 무슨 행동을 하려고 해도, 무슨 말을 하려고 해도, 당신은 아무것도 할 수 없었다. 마치 가위에 눌린 것처럼 당신은 새끼 손가락 하나조차 움직일 수 없다. 소라는 그대로 당신에게 키스를 했다." +
                    "<br><br>\"소라를, 어떤 소라라도 사랑해줄래? <span class='log-sora'>아니, 사랑할 거야.</span>\"<br><br>" +
                    "소라의 손가락이 당신의 입술을 꾹 누른다." +
                    "<br><br><span class='log-sora'>\"소라는 언제나 소라니까. 특히 너를 향한 마음은, 언제나 똑같으니까.\"</span>"
                ]
            },
            {
                type : "text",
                value : [
                    "시야가 어두워졌다가 다시 밝아졌다. 방금 그건 꿈이었을까?" +
                    "<br>...불길한 예감이 든다." +
                    "<br><br><span class='log-danger'>소라의 상점에 가면 돌이킬 수 없습니다. 진행하고 있던 퀘스트가 있다면 완료해주십시오.</span>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_09_intro_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shop" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route ) &&
        player.flags?.rebel_route_quest_09_intro_02,

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
                    "당신은 급하게 상점으로 향했다. 하지만 이미 상점은 백색 군단이 점령하고 있었다. 당신은 벽 뒤로 몸을 숨긴 채 그들의 대화를 들었다. 백색 군인들은 소라가 없어지자 당황했고, 그들의 중심에 서 있는 에이든은 잠시 생각에 잠기더니 고개를 끄덕였다. 그는 소라가 어디로 도망갔는지 알고 있는 눈치였다. 그는 너무 늦어버리기 전에 소라를 찾으러 가야 한다고 말했다." +
                    "<br><br>\"늦어버린다니, 그게 무슨 뜻...?\"<br><br>" +
                    "\"우리에게 선택이 한 가지만 남기 전에.\"<br><br>" +
                    "에이든은 백색 군단을 이끌고 하류도시 바깥으로 나갔다." +
                    "<br><br>\"하류도시의 영웅.\"<br><br>" +
                    "반란군들 중 한 명이 당신을 불렀다. 그들은 이미 백색 군단의 선두를 뒤쫓고 있다고 말했다. 그들은 백색 군단의 위치를 파악한 후 주점에 대략적인 위치를 표시한 지도를 올려놓겠다고 말했다." +
                    "<br><br>\"이번에도 부탁드립니다. 상류도시가 대체 뭘 하려고 하는지는 모르겠지만 막아야만 합니다.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "act3_quest_09_intro_04",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_quest_09_intro_03 &&
        player.flags?.act3_quest_09_unlock,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신은 루크를 보았다. 그는 자신의 팔을 움켜잡고 있었다. 고통스러운지 그의 얼굴은 창백했다. 그는 쌍욕을 내뱉더니 그대로 마을 입구 밖으로 나갔다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_09_after_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.act3_quest_09_done &&
        getCurrentDay(player) >= (player.flags.act3_quest_09_done_day + 7),

    action : (player) => {
        player.flags.act3_quest_09_after_01 = true;
        player.flags.act3_quest_09_after_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "마을 입구에서 사람들이 아우성치는 것이 보인다. 그들은 모두 누군가의 이름을 부르며, 그들이 살아있다고 주장했다. 경비병과 경계병은 마을 입구 밖으로 나가려는 사람들을 막아서며 가만히 있으라고 윽박질렀다. 하지만 사람들의 아우성은 통제할 수 없었다." +
                    "<br><br>\"다들 반란군이 되려는 거냐!\"<br><br>" +
                    "한번에 어딘가로 가려는 사람들의 동향에 몇몇 경비병들과 경계병들은 그들이 반란분자일 수도 있다는 생각을 한 것 같다. 반란군이라는 단어에도 사람들은 멈추지 않았다." +
                    "<br><br>\"내 딸이 나를 기다리고 있다고!\"<br><br>\"내 아들은 아직 살아있어!\"<br><br>\"어머니께서 날 부르셨어!\"<br><br>" +
                    "경비병, 경계병들이 시민들을 막을수록 시민들의 폭력 수위는 올라갔다. 으악, 결국 몇 명은 신음 소리를 흘리며 뒤로 물러났다. 독기가 가득 서린 채로 경계병들이 시민들에게 달려들었다." +
                    "<br><br><br><br><span class='log-valen'>\"보내십시오.\"</span><br><br><br><br>" +
                    "시민들을 제압하려고 했던 경계병들의 움직임이 멈췄다. 경계병들과 함께 시민들을 무차별적으로 진압하려고 했던 경비병들의 움직임도 멈췄다. 그들의 움직임이 멈추자 시민들은 썰물처럼 마을 밖으로 빠져나갔다." +
                    "<br><br>\"원래 저희는 마을을 지키는 거지, 마을 밖으로 나가는 사람들까지 지키지는 않지 않았습니까.\"<br><br>" +
                    "에이든은 차가운 표정으로 사라지는 마을 사람들의 뒷모습을 바라보았다. 백색 군인들이었다면 마을 입구 밖으로 나가는 시민들을 막을 수 있었을지도 모른다." +
                    "<br><br>...하지만 그들은 막지 않았다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_09_after_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "richTownStreet" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.act3_quest_09_after_01 &&
        getCurrentDay(player) >= (player.flags.act3_quest_09_after_01_day + 7),

    action : (player) => {
        player.flags.act3_quest_09_after_02 = true;
        player.flags.act3_quest_09_after_02_day = getCurrentDay(player);
        savePlayer(player);
        startScene([
            {
                type : "text",
                value : [
                    "\"...그 소문 들었어? 아카시아 님이 공식 석상에서 쓰러지셨잖아.\"<br><br>" +
                    "\"하루도 지나지 않아서 일어나셨잖아. 큰일은 아니겠지.\"<br><br>" +
                    "상류도시 귀족들이 떠들다가 당신의 인기척이 느껴지자 싹 입을 닫았다. 그들은 서로의 눈치를 살피더니 헛기침을 하면서 각자 다른 길을 갔다." +
                    "<br><br>그리고 문득, 당신은 뒤에서 소름끼치는 시선을 느꼈다.<br><br>" +
                    "고개를 돌리자 라파엘이 서 있었다. 동공이 보이지 않는 그의 하얀색 눈동자는 당신이 아니라 흩어진 귀족들을 훑고 있었다. 당신과 시선이 마주친 그는 평소와 같은 따뜻한 미소를 지어 보이며 요새 힘든 일은 없냐고 물었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 힘든 일은 없다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...그러십니까.\"<br><br>" +
                                    "그는 당신의 표정을 천천히 살피더니 당신에게는 지금까지 많은 일이 있었던 것 같다고 말했다." +
                                    "<br><br>\"당신이 강한 사람이라 정말로 괜찮다면 상관이 없지만.... 괜찮은 척하는 거라면.\"<br><br>" +
                                    "라파엘은 당신을 응시했다. 그의 하얀 눈동자는 당신을 흔들림 없이 담고 있다." +
                                    "<br><br>\"제 마음이 아파질 것 같군요.\"<br><br>" +
                                    "라파엘은 상담을 하고 싶다면 언제라도 병원을 두드려 달라고 말한 후 걸어갔다. "
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("raphael", "affection", -1);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 최근에 있었던 힘든 일에 대해 말해주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "라파엘은 당신의 이야기를 관심 있게 들어주었다. 당신의 이야기가 끝나자 라파엘은 이런 이야기는 길거리가 아니라 아늑한 방에서 들었으면 더 좋았을 것 같다는 이야기를 했다." +
                                    "<br><br>\"언젠가 당신이 병원에 찾아와 더 많은 이야기를 들려주시길 기다리겠습니다. 당신도 알다시피, 제 병원은 누구에게나 열려 있으니까요.\"<br><br>" +
                                    "라파엘은 당신에게 인사를 한 후 병원 쪽으로 사라졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("raphael", "affection", 5);
                                    player.flags.talkToRaphael = true;
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
    id : "common_route_quest_09_after_03_rapahel",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "royalHospital" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.act3_quest_09_after_02 &&
        player.flags?.talkToRaphael,

    action : (player) => {
        player.flags.act3_quest_09_after_03 = true;
        savePlayer(player);
        startScene([
            {
                type : "text",
                value : [
                    "당신은 라파엘의 뒤를 따라 병원에 들어섰다. 라파엘은 병원을 찾아준 사람들에게 하나하나 인사를 하면서 복도의 더 깊은 곳으로 발걸음을 옮겼다. 그는 복도의 마지막 방 앞에서 발걸음을 멈추더니 붉은색 점을 밟았다. 끼이익, 소리와 함께 아래가 열렸다. 당신은 설마 이런 곳에 지하실이 있을 줄은 상상도 하지 못했다." +
                    "<br><br>\"...{playerName}.\"<br><br>" +
                    "라파엘이 당신을 돌아보았다. 그는 인자한 미소를 지어보이며 궁금증이 너무 많은 고양이에게는 변이 생기는 법이라고 말했다." +
                    "<br><br>\"이 지하는 어린 양이 볼 만한 곳이 아닙니다. 아카시아 님이 궁금하신 거겠죠. 그분은 원래 쓰러지실 운명이었습니다.\"<br><br>" +
                    "라파엘이 붉은색 점을 밟자 다시 지하의 문이 닫혔다." +
                    "<br><br>\"물론 아직 완전히 쓰러지신 건 아니지만. 저는 환자에게 최선을 다할 생각입니다.\"<br><br>" +
                    "...당신이 붉은색 점을 응시하고 있자 라파엘은 웃으며 이건 자신이 밟아야만 움직이는 문이라고 말했다." +
                    "<br><br>\"자, 이제 돌아갑시다. 말을 잘 듣는 착한 양에게 보여주는 선물은 여기까지입니다.\"<br><br>" +
                    "당신은 라파엘의 손에 떠밀려 다시 돌아가야만 했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_09_after_03_raphaelNo",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "royalHospital" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.act3_quest_09_after_02 &&
        !player.flags?.talkToRaphael,

    action : (player) => {
        player.flags.act3_quest_09_after_03 = true;
        savePlayer(player);
        startScene([
            {
                type : "text",
                value : [
                    "\"....\"<br><br>" +
                    "당신은 라파엘의 뒤를 쫓았다. 라파엘은 당신을 돌아보지도 않았지만, 당신의 예상보다 빠르게 환자들 사이에 섞여들었다. 당신은 그를 끝까지 쫓아가려고 했지만 결국 그를 놓치고 말았다." +
                    "<br><br>\"진료 일정이 없으면 나가주십시오.\"<br><br>" +
                    "병원 경비병이 인상을 쓰더니 당신을 병원 입구 쪽으로 밀어버렸다. 당신은 결국 아무것도 알아낼 수 없었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_09_after_03_raphael",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "royalHospital" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.act3_quest_09_after_02 &&
        player.flags?.talkToRaphael,

    action : (player) => {
        player.flags.act3_quest_09_after_03 = true;
        savePlayer(player);
        startScene([
            {
                type : "text",
                value : [
                    "당신은 라파엘의 뒤를 따라 병원에 들어섰다. 라파엘은 병원을 찾아준 사람들에게 하나하나 인사를 하면서 복도의 더 깊은 곳으로 발걸음을 옮겼다. 그는 복도의 마지막 방 앞에서 발걸음을 멈추더니 붉은색 점을 밟았다. 끼이익, 소리와 함께 아래가 열렸다. 당신은 설마 이런 곳에 지하실이 있을 줄은 상상도 하지 못했다." +
                    "<br><br>\"...{playerName}.\"<br><br>" +
                    "라파엘이 당신을 돌아보았다. 그는 인자한 미소를 지어보이며 궁금증이 너무 많은 고양이에게는 변이 생기는 법이라고 말했다." +
                    "<br><br>\"이 지하는 어린 양이 볼 만한 곳이 아닙니다. 아카시아 님이 궁금하신 거겠죠. 그분은 원래 쓰러지실 운명이었습니다.\"<br><br>" +
                    "라파엘이 붉은색 점을 밟자 다시 지하의 문이 닫혔다." +
                    "<br><br>\"물론 아직 완전히 쓰러지신 건 아니지만. 저는 환자에게 최선을 다할 생각입니다.\"<br><br>" +
                    "...당신이 붉은색 점을 응시하고 있자 라파엘은 웃으며 이건 자신이 밟아야만 움직이는 문이라고 말했다." +
                    "<br><br>\"자, 이제 돌아갑시다. 말을 잘 듣는 착한 양에게 보여주는 선물은 여기까지입니다.\"<br><br>" +
                    "당신은 라파엘의 손에 떠밀려 다시 돌아가야만 했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_route_quest_09_after_04",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        ( player.flags?.act3_rebel_route || player.flags?.act3_neutral_route ) &&
        player.flags?.act3_quest_09_after_03 &&
        getCurrentDay(player) >= (player.flags.act3_quest_09_after_02_day + 10),

    action : (player) => {
        player.flags.rebel_route_quest_09_after_04 = true;
        player.flags.rebel_route_quest_09_after_04_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 들어오자 반란군들이 모여 있었다. 그들이 당신이 오자마자 당신과 함께 유리의 방으로 들어간 후 문을 닫았다. 그들은 엿듣고 있는 쉘터의 아이들이 있나 없나 기척을 살핀 후 작은 목소리로 속삭였다." +
                    "<br><br>\"아카시아가 또 쓰러졌다고 합니다. 현재 상류도시에 공식적으로 밝히지는 않았습니다.\"<br><br>" +
                    "\"소란이 일어날까봐 그러는 거겠지. 발렌의 시선이 아카시아에게 가있는 동안 우리는 아카시아의 것을 파야 해.\"<br><br>" +
                    "그들은 아카시아가 쓰러진 게 우연이 아닐 거라고 말했다." +
                    "<br><br>\"아카시아는 상류도시를 세운 설립자 가문으로 언제나 의문점이 많았죠. 지금이야말로 밝힐 때입니다. 준비가 다 된 후 다시 한번 연락드리겠습니다, 하류도시의 영웅. 당신을 믿고 있습니다.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});