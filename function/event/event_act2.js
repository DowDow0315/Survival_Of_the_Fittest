window.EVENTS.push({
    id : "uppercity_valen_messenger_event",
    once : true,

    condition : (player) =>
        player.location === "richTownStreet" &&
        player.flags?.uppercity_first_entry_event_seen &&
        getCurrentDay(player) >= (player.flags.uppercity_first_entry_event_seen_day + 1) &&
        !player.quest?.active,

    action : (player) => {
        player.flags.uppercity_valen_messenger_event_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"{playerName}님?\"<br><br>",
                    "당신이 거리를 걷고 있을 때, 뒤에서 당신의 이름을 부르는 누군가의 목소리가 들렸다. 백색 제복을 깔끔하게 차려입은 남자는 당신에게 다가오더니 깍듯하게 고개를 숙여 인사를 했다. 처음 받아보는 대접에 당신은 잠시 머뭇거렸다. 당신의 머뭇거림에도 개의치 않고 남자는 품안에서 봉인된 서신을 꺼내 당신에게 그 서신을 보여주었다.",
                    "<br><br><br><br><span class='log-valen'>{playerName}</span><br><br>",
                    "당신이 지금까지 한 일들에 대해 깊은 감명을 받았습니다.",
                    "<br>하류도시에서 많은 일들을 해온 당신과 한번 이야기를 나누고 싶습니다.",
                    "<br>저는 천국의 성에 있습니다.",
                    "<br>시간이 나실 때, 한번 들러주시길 바랍니다.",
                    "<br><br><br><span class='log-valen'>당신의 만남을 고대하는, 발렌</span><br><br><br><br>",
                    "서신에 남은 우아한 필기체, 백색 제복을 입은 남자는 당신에게 고개를 숙여 보였다.",
                    "<br>할 말이 남은 건지, 남자는 서신을 다 읽고서도 당신의 앞에 서있었다. 당신과 눈이 마주치자 남자는 정중한 목소리로 발렌 님께는 언제 가실 예정이냐고 물었다",
                    "<br><br>\"상류도시에서는 '한번 들러주시길 바랍니다'는 빠른 시일 내에 와달라는 뜻입니다.\"<br><br>",
                    "말을 끝내고 그는 돌아서 사라져버렸다. 자신의 일은 끝냈다는 듯, 한치의 미련도 없이."

                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.uppercity_valen_invitation_received = true;
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "uppercity_heaven_road_first_event",
    once : true,

    condition : (player) =>
        player.location === "heavenRoad" &&
        player.flags?.uppercity_valen_invitation_received &&
        !player.flags?.uppercity_heaven_road_first_event_seen &&
        !player.quest?.active,

    action : (player) => {
        player.flags.uppercity_heaven_road_first_event_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 서신에 적힌 곳으로 가기 위해 발걸음을 옮겼다. 온통 금색으로 된 영광의 거리를 지나자 이번에는 백색의 거리가 나타났다. 백색 제복을 입은 사람들이 거리에 한치의 흐트러짐도 없이 일렬로 서있었다. 몇몇은 당신에게 그저 고개만 숙였지만, 몇몇은 사나운 시선으로 당신을 노려보다가 고개를 돌렸다.",
                    " 당신은 천국으로 가는 길을 걸어갔다. 눈이 부실 정도로 깨끗한 거리. 당신은 문득 자신이 상류도시에 처음 들어왔을 때를 떠올렸다. 하지만 이곳은 부유한 거리나 영광의 거리보다도 더 비현실적으로 느껴졌다. 당신은 계속 걸었다.",
                    "<br><br>\"엄마, 난 커서 발렌님 같은 사람이 될 거야!\"<br><br>",
                    "<br><br>\"그래. 착한 아이가 되면 될 수 있을 거야.\"<br><br>",
                    "아이의 머리를 쓰다듬는 부모는 자랑스러운 미소를 짓고 있었다. <br>...당신은 계속 걸었다.",
                    "<br><br>그리고 마침내,<br>당신은 천국으로 가는 길의 끝에 다다랐다. 거대한 백색의 성, 햇빛을 받아 백색인데도 황금빛으로 빛나는 첨탑, 천사상을 연상시키는 조각들,<br><br>사람들은 그곳을 천국의 성이라고 불렀다. <br><br>발렌이 머무르는 곳.<br><br>당신은 거대한 성문 앞에 멈춰섰다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});