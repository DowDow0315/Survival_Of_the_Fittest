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
        player.flags.act3_quest_03_unlock = true;
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
                    "<br><br>\"진실을 위해, 부탁드리겠습니다. 의뢰서는 주점에 올려놓겠습니다. 마틴에게 말해 당신에게만 보일 수 있게 하겠습니다.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});