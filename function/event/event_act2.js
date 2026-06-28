window.EVENTS.push({
    id : "uppercity_valen_messenger_event",
    priority : true,
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
    priority : true,
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
            },
            {
                type : "effect",
                run : (player) => {
                    player.location = "heavenPalace";
                    savePlayer(player);
                }
            },
            {
                type : "effect",
                run : "start_uppercity_valen_first_meeting_event"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.start_uppercity_valen_first_meeting_event = function(player) {
    player.flags.uppercity_valen_first_meeting_event_seen = true;
    savePlayer(player);
    
    startScene(VALEN.uppercity_valen_first_meeting_event, player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });

    return true;
};

window.give_silver_dagger = function(player) {
    player.flags = player.flags || {};
    if (!player.flags.valen_silver_dagger_received) {
        addItem(player, ITEMS.weapon.silverDagger);
        player.flags.valen_silver_dagger_received = true;
    }
    savePlayer(player);
};

window.game_over_valen_refused = function(player) {
    gameOver(player, "당신은 발렌에게 끝까지 굽히지 않았다.");
    return true;
};

window.undercity_hero_declare = function(player) {
    player.flags = player.flags || {};

    player.flags.uppercity_hero_event_seen = true;
    player.flags.uppercity_hero_event_day = getCurrentDay(player);

    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                "발렌은 자연스럽게 당신을 밖으로 이끌었다. 다시 당신의 시야에 들어온 백색의 천국의 성.... 복도에 서있던 모든 사람들이 당신을 바라본다. 그리고, 당신이 아닌 발렌에게 고개를 숙인다. 당신은 발렌과 함께 발렌이 이끄는 대로 걸어나갔다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.location = "richTownStreet";
                savePlayer(player);
            }
        },
        {
            type : "text",
            value : [
                "얼마 지나지 않아 당신은 다시 부유한 거리에 서 있었다.",
                "<br><br>하지만 이번에는 혼자가 아니었다.",
                "<br><br>발렌이 당신의 곁에 있었다.",
                "<br><br>그 사실 하나만으로도 거리의 분위기는 달라졌다. 사람들은 걸음을 멈췄고, 대화는 순식간에 속삭임으로 변했다. 누군가의 \"발렌 님이다\"라는 말 하나로 모두의 시선이 당신들에게 집중되었다. 정확히 말하면 발렌과, 그 발렌의 옆에 서있는 당신에게.",
                "<br>발렌은 그들의 시선 앞에서도 익숙하게 행동했다. 그의 우아한 손짓은 물처럼 유려했다.",
                "<br><br>\"여러분.\"",
                "<br><br>그의 목소리는 크지 않았다. 하지만 이상하게도 모두가 그의 말을 들었다.",
                "<br><br>\"오늘 저는 한 사람을 소개하려 합니다.\"",
                "<br><br>발렌은 부드럽게 당신의 손을 잡았다. 그러더니 당신의 손을 잡은 제 손을 위로 올려보이며 미소를 지었다.",
                "<br><br>\"하류도시에서 온 사람.<br>하지만 포기하지 않고 결국에는 이곳에 도달한 사람.<br>그리고 많은 사람들에게 희망이 되어줄 사람.\"",
                "<br><br>하류도시라는 말에 사람들 몇몇이 웅성거렸다. 하지만 발렌은 당신을 향한 따가운 시선을 느꼈으면서도 말을 멈추지 않았다.",
                "<br><br>\"이 사람이 바로, 하류도시의 영웅입니다.\"",
                "<br><br>박수가 터졌다. 처음에는 조심스럽게, 그리고 곧, 거리 전체를 덮을 정도로 크게. 몇몇은 당신에게 조롱의 시선을 보냈고, 몇몇은 당신에게 관심 어린 시선을 보냈다. 그들이 당신에게 어떤 시선을 보냈든, 당신은 본능적으로 느낄 수 있었다. 그들은 당신을 같은 인간으로 생각하고 있지 않다.",
                " 유일하게 당신을 같은 인간으로 보는 건 귀족들의 노예들뿐이다. 그들은 당신을 열망 어린 시선으로, 질투 어린 시선으로, 혹은 구원자를 보는 듯한 시선으로 당신을 올려다보았다. 노예들 중 몇몇은 당신을 더 가까이에서 보기 위해 움직이다가 그대로 넘어져버렸다.",
                "<br>박수 소리는 발렌이 손을 다시 들어보일 때까지 멈추지 않았다. 그들은 당신과 발렌을 바라보고 있다.",
                "<br>...상류도시 사람들의 시선은 당신보다 발렌에게 더 오래 머물렀다. 마치 당신이 영웅이라서 박수치는 것이 아니라, 발렌이 영웅이라고 말했기 때문에 박수치는 것처럼."
            ]
        },
        {
            type : "text",
            value : [
                "박수 소리가 끝나자 발렌은 당신을 다시 아래로 이끌었다.",
                "<br><br>\"잘해주셨습니다. 역시 당신은 무대 위에서 빛이 나는 군요.\"<br><br>",
                "발렌은 미소를 지었다. 당신과 발렌은 지하철을 타지 않았다. 당신은 그의 손을 잡고 그의 전용 헬기에 올랐다. 헬기가 출발하고, 당신은 상류도시를 내려다보았다.",
                "<br><br>\"아름답지요?\"<br><br>",
                "발렌은 당신의 옆에서 상류도시를 내려다보면서 말했다. 지금까지 그가 당신에게 지어보였던 미소와는 느낌이 다른 미소였다. 발렌은 상류도시를 내려다보며 말을 이었다.",
                "<br><br>\"<span class='log-valen'>저는 이 아름다운 도시를 끝까지 지킬 것입니다.</span><br>...당신도, 언젠가는 이 아름다움을 알아봐주셨으면 좋겠군요.\"",
                "<br><br>발렌은 상류도시가 더 이상 안 보일 때까지 쭈욱 상류도시만을 바라보았다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.location = "townStreet";
                savePlayer(player);
            }
        },
        {
            type : "text",
            value : [
                "하류도시에 도착하고, 백색 제복을 입은 군인들이 헬리콥터에서 먼저 내렸다. 발렌은 또다시 당신에게 손을 내밀었고, 당신은 그의 손을 잡고 하류도시에 발을 디뎠다. 상류도시의 향수 냄새는 사라지고 익숙한 먼지와 땀, 눅눅한 냄새가 코끝을 찔렀다.",
                " 백색 제복을 입은 군인들, 그리고 발렌이 등장하자 하류도시의 사람들은 어쩔 줄을 몰라했다. 몇몇은 겁을 먹어 뒷걸음질을 쳤고, 몇몇은 발렌에게 더 다가왔다. 하류도시를 지키는 경비병들마저 발렌의 출현에 당황한 듯 싶었다. 발렌의 앞에서는 그들도 하류도시의 시민들과 다를 것이 없었다. 발렌은 모두를 스치듯이 바라보더니 미소를 지었다.",
                "<br><br>\"여러분.\"",
                "<br><br>발렌의 목소리는 모든 사람들의 시선을 사로잡았다. 그는 당신을 앞으로 이끌었다. 모두의 앞에 당신은 서있다. 당신의 얼굴을 아는 몇몇 이들이 시선을 교환하며 조용히 쑥덕였다.",
                "<br><br>\"오늘은 하류도시의 영웅을 소개하러 왔습니다. 이 사람은, 상류도시에 올라와서 상류도시의 사람들에게도 인정을 받은 사람입니다.\"",
                "<br><br>하류도시 사람들의 시선이 당신에게 꽂혔다. 상류도시에서의 반응과는 달랐다. 박수보다 먼저 떨어진 정적. 하지만 발렌은 개의치 않았다.",
                "<br><br>\"사람은 혼자서는 버틸 수 없습니다. 하지만 누군가가 먼저 걸어간다면 우리는 그 뒤를 따라갈 수 있습니다.<br>그리고 이 사람은 여러분의 앞에서 걸어갈 겁니다. 하류도시에서 상류도시로, 그리고 상류도시에서 하류도시로.\"",
                "<br><br>\"그럼 우리도 정말로, 정말로 상류도시에 갈 수 있나요?\"<br><br>",
                "군중들 중 한 명이 용기를 내어 물었다. 발렌의 미소는 그치지 않는다. 그는 그에게 다가가더니 손을 내밀었다. 질문을 던진 자는 발렌의 미소를 마주하며 멍하니 그의 손을 잡았다.",
                "<br><br>\"물론이죠. 우리는 노력하는 하류도시의 사람들을 환영합니다.\""
            ]
        },
        {
            type : "text",
            value : [
                "발렌이 그의 손을 잡아주면서 사람들의 분위기가 바뀌었다. 어떻게든 상류도시에 가고 싶다는 열망, 그리고 당신을 보면서 가지게 된 희망, 발렌은 그들의 시선을 훑어보았다. 그의 미소는 옅어지지도, 진해지지도 않았다.",
                "<br>연설이 끝난 후 그는 모든 사람들의 앞에서 당신에게 명령서를 꺼내보였다. 그는 당신이 이 명령서를 받을 수밖에 없다는 걸 알고 있다.",
                "<br><br>\"부탁드리고 싶은 일이 있습니다.\"<br><br>",
                "그 명령서를 받지 않으면 비록 가짜일지라도 하류도시 사람들의 희망은 어제보다 더 산산조각날 테니까. 당신은 희망을 잃은 하류도시 사람들의 끝이 얼마나 비참해지는지 알고 있다. 그리고 사람이 생각보다 쉽게 넘으면 안 되는 선을 넘는다는 사실도 당신은 알고 있다.",
                "<br>무엇보다도, 명령서를 받지 않으면 당신에게 무슨 일이 생길지 당신은 상상하고 싶지도 않았다.",
                "<br><br>\"경계병2초소 근처의 외곽 연구시설에 문제가 생겼습니다. 그곳의 중심부에 들어가 파란색 버튼을 하나 눌러주셨으면 합니다.\"<br><br>",
                "그는 당신에게 명령서를 쥐어준 후 말을 계속했다.",
                "<br><br>\"자세한 내용은 안에 적어두었습니다. 앞으로도 필요한 일이 있으면 하류도시의 주점에 의뢰서를 올려두겠습니다. 당신은 하류도시에 머무르고 있으니까요. 물론, 당신이 아니더라도 많은 사람들이 그 의뢰를 받을 수 있게 해놓겠습니다. 모두에게 기회는 공평해야 하니까요.\"<br><br>",
                "당신은 방금 발렌의 그 말이 하류도시 사람들의 귀에 들어갔다는 걸 안다. 발렌은 당신의 어깨를 가볍게 두드렸다.<br><br>",
                "\"믿고 있겠습니다, 하류도시의 영웅이여.\"<br><br>",
                "그 말을 끝으로 발렌은 당신에게서 시선을 거두고 다시 상류도시로 돌아갔다. 하류도시의 길거리에는 당신과, 하류도시의 사람들만 남아있다. 몇몇은 희망을 품었고, 몇몇은 아무 일도 없었다는 듯이 자신의 삶으로 돌아갔다.",
                "<br>그리고 헬리콥터에 탄 발렌은 단 한번도 하류도시를 돌아보지 않았다."          
            ]
        },
        {
            type : "effect",
            run : "accept_quest_uppercity_story_01"
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
    return true;
};

window.accept_quest_uppercity_story_01 = function(player) {
    player.flags = player.flags || {};
    player.flags.uppercity_story_01_started = true;
    savePlayer(player);

    acceptQuest(player, "uppercity_story_01");
    return true;
};