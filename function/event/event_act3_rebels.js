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