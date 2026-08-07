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
                    "<br><br>\"...그나저나 하얀 꽃잎을 먹는 백색 흉물이라.... 하얀 꽃 마물의 특성을 이어받게 될까봐 두렵습니다.\"<br><br>" +
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


//에르윈