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
                    "\"그래. 착한 아이가 되면 될 수 있을 거야.\"<br><br>",
                    "아이의 머리를 쓰다듬는 부모는 자랑스러운 미소를 짓고 있었다. <br>...당신은 계속 걸었다.",
                    "<br>그리고 마침내,<br>당신은 천국으로 가는 길의 끝에 다다랐다. 거대한 백색의 성, 햇빛을 받아 백색인데도 황금빛으로 빛나는 첨탑, 천사상을 연상시키는 조각들,<br><br>사람들은 그곳을 천국의 성이라고 불렀다. <br><br>발렌이 머무르는 곳.<br><br>당신은 거대한 성문 앞에 멈춰섰다."
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
    
    startScene(NPC_DATA["valen"].scenes.uppercity_valen_first_meeting_event, player, {
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
                "<br><br>박수가 터졌다. <br>처음에는 조심스럽게, 그리고 곧, 거리 전체를 덮을 정도로 크게. <br>몇몇은 당신에게 조롱의 시선을 보냈고, 몇몇은 당신에게 관심 어린 시선을 보냈다. 그들이 당신에게 어떤 시선을 보냈든, 당신은 본능적으로 느낄 수 있었다.",
                "<br><br><span class='log-danger'>그들은 당신을 같은 인간으로 생각하고 있지 않다.</span><br><br>",
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
                " 백색 제복을 입은 군인들, 그리고 발렌이 하류도시의 거리에 등장하자 하류도시의 사람들은 어쩔 줄을 몰라했다. 몇몇은 겁을 먹어 뒷걸음질을 쳤고, 몇몇은 발렌에게 더 다가왔다. 하류도시를 지키는 경비병들마저 발렌의 출현에 당황한 듯 싶었다. <br>발렌의 앞에서는 그들도 하류도시의 시민들과 다를 것이 없었다. 발렌은 모두를 스치듯이 바라보더니 미소를 지었다.",
                "<br><br>\"여러분.\"",
                "<br><br>발렌의 목소리는 모든 사람들의 시선을 사로잡았다. 그는 당신을 앞으로 이끌었다. 모두의 앞에 당신은 서있다. 당신의 얼굴을 아는 몇몇 이들이 시선을 교환하며 조용히 쑥덕였다.",
                "<br><br>\"오늘은 하류도시의 영웅을 소개하러 왔습니다. 이 사람은, 상류도시에 올라와서 상류도시의 사람들에게도 인정을 받은 사람입니다.\"",
                "<br><br>하류도시 사람들의 시선이 당신에게 꽂혔다. 상류도시에서의 반응과는 달랐다. 박수보다 먼저 떨어진 정적. 하지만 발렌은 개의치 않았다.",
                "<br><br>\"사람은 혼자서는 버틸 수 없습니다. 하지만 누군가가 먼저 걸어간다면 우리는 그 뒤를 따라갈 수 있습니다.<br>그리고 이 사람은 여러분의 앞에서 걸어갈 겁니다. <br>하류도시에서 상류도시로, 그리고 상류도시에서 하류도시로.\"",
                "<br><br>\"그럼 우리도 정말로, 정말로 상류도시에 갈 수 있나요?\"<br><br>",
                "군중들 중 한 명이 용기를 내어 물었다. 발렌의 미소는 그치지 않는다. 그는 그에게 다가가더니 손을 내밀었다. 질문을 던진 자는 발렌의 미소를 마주하며 멍하니 그의 손을 잡았다.",
                "<br><br>\"물론이죠. 우리는 노력하는 하류도시의 사람들을 환영합니다.\""
            ]
        },
        {
            type : "text",
            value : [
                "발렌이 그의 손을 잡아주자 사람들의 분위기가 바뀌었다. 어떻게든 상류도시에 가고 싶다는 열망, 그리고 당신을 보면서 가지게 된 희망, 발렌은 그들의 시선을 훑어보았다. 그의 미소는 옅어지지도, 진해지지도 않았다.",
                "<br>연설이 끝난 후 그는 모든 사람들의 앞에서 당신에게 명령서를 꺼내보였다. 그는 당신이 이 명령서를 받을 수밖에 없다는 걸 알고 있다.",
                "<br><br>\"부탁드리고 싶은 일이 있습니다.\"<br><br>",
                "그 명령서를 받지 않으면 비록 가짜일지라도 하류도시 사람들의 희망은 어제보다 더 산산조각날 테니까. 당신은 희망을 잃은 하류도시 사람들의 끝이 얼마나 비참해지는지 알고 있다. 그리고 사람이 생각보다 넘으면 안 되는 선을 쉽게 넘는다는 사실도 당신은 알고 있다.",
                "<br>무엇보다도, 명령서를 받지 않으면 당신에게 무슨 일이 생길지 당신은 상상하고 싶지도 않았다.",
                "<br><br>\"경계병 제2초소 근처의 외곽 연구시설에 문제가 생겼습니다. 그곳의 중심부에 들어가 파란색 버튼을 하나 눌러주셨으면 합니다.\"<br><br>",
                "그는 당신에게 명령서를 쥐어준 후 말을 계속했다.",
                "<br><br>\"자세한 내용은 안에 적어두었습니다. 앞으로도 필요한 일이 있으면 하류도시의 주점에 의뢰서를 올려두겠습니다. 당신은 하류도시에 머무르고 있으니까요. 물론, 당신이 아니더라도 많은 사람들이 그 의뢰를 받을 수 있게 해놓겠습니다. <br><span class='log-valen'>모두에게 기회는 공평해야 하니까요.</span>\"<br><br>",
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
        onEnd : () => {
            player.location = "tavern";
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
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

window.EVENTS.push({
    id : "shelter_attack",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.uppercity_story_01_done &&
        getCurrentDay(player) >= player.flags.uppercity_story_01_done_day + 3 &&
        !player.flags?.slaverCampShelter_attack_event_seen &&
        !player.quest?.active,

    action : (player) => {
        player.flags.slaverCampShelter_attack_event_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신이 쉘터에 들어가는 순간, 여기저기서 아이들의 비명소리가 들리기 시작했다. 한 아이가 인신매매상에게서 도망치다가 그대로 당신의 품에 안겼다. 당신의 품에 안겨서 아이는 살려달라고 필사적으로 애원했다." +
                    "<br>제압봉으로 제압당한 아이들, 전기충격기에 의해 쓰러진 아이들, 그리고 짐승처럼 올가미에 질질 끌려가는 아이들... 당신의 품에 있던 아이가 컥컥거리며 올가미에서 벗어나려고 했다." +
                    "<br>그 순간, 쇠로 된 올가미가 단칼에 잘렸다. 유리였다. 이제 쉘터에 돌아온 그는 쌍검을 쥐고 아이들을 끌고 가려고 하는 인신매매상에게 달려들었다." +
                    " 하지만 유리는 혼자였고 인신매매상은 여럿이었다. 당신과 유리는 최선을 다했지만 모든 아이들을 구출할 수는 없었다." +
                    "<br>아이들이 엉엉 울며 유리와 당신에게 안겨왔다. 쉘터마저 안전하지 않다는 인식이 아이들을 절망에 빠지게 했다." +
                    "<br><br>\"쉬이. 괜찮아. 오빠가... 어떻게든 데려올게.\"<br><br>" +
                    "유리는 자신에게 안긴 아이들을 달래주며 약속했다."
                ]
            },
            {
                type : "text",
                value : [
                    "아이들을 달래준 후, 모두를 방으로 돌려보낸 유리는 거실 청소를 시작했다. 모든 것이 엉망이었다. 거실 바닥에 묻은 핏자국을 걸레로 지우며 유리는 입술을 악물었다." +
                    "<br><br>\"...{playerName}. 무리한 부탁이라는 건 아는데.... <br>나랑 같이 가주지 않을래?\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 고개를 끄덕였다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 고개를 끄덕이자 유리는 안도하는 표정을 지으면서도 미안하다는 듯이 입술을 일그러뜨렸다." +
                                    "<br><br>\"...고마워. 진심으로.\"<br><br>" +
                                    "그는 인신매매단의 흔적은 자신이 찾아오겠다고 말했다. <br><br>\"아이들을 잡아간 인신매매단의 임시 거처를 찾으면, 쉘터로 돌아올게.\"<br><br>" +
                                    "그는 마지막으로 당신에게 고맙다는 듯 고개를 끄덕여보인 후 혼자 밖으로 나갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("yuri", "affection", 5);
                                    player.flags.slaverCampShelter_attack_accepted = true;
                                    player.flags.slaverCampShelter_attack_accepted_day = getCurrentDay(player);                  
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
                                    "당신이 고개를 젓자, 유리는 이해한다는 듯이 고개를 끄덕였다. 인신매매단을 토벌하러 간다는 건 목숨을 거는 것과 마찬가지라는 걸 유리도 당연히 알고 있다." +
                                    "<br><br>\"미안. 너무 무리한 걸 물었지...? 내가 알아서 해볼게.\"<br><br>" +
                                    "그는 중얼거리며 자신의 쌍검을 꽉 잡았다. 혼자서라도 어떻게든 할 모양인 거 같다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("yuri", "affection", -3);
                                    player.flags.slaverCampShelter_attack_refused = true;
                                    player.flags.slaverCampShelter_attack_refused_day = getCurrentDay(player);                  
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
    id : "shelter_attack_yuri_memo",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "shelter" &&
        player.flags?.slaverCampShelter_attack_accepted &&
        getCurrentDay(player) >= player.flags.slaverCampShelter_attack_accepted_day + 2 &&
        !player.flags?.shelter_attack_yuri_memo_seen &&
        !player.quest?.active,

    action : (player) => {
        player.flags.shelter_attack_yuri_memo_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 오자 편지가 하나 당신의 침대 위에 놓여있었다. 유리의 깔끔한 글씨체다." +
                    "<br><br><span class='log-yuri'>경계병 제2초소에서 내가 남겨놓은 흔적을 따라와줘. 미안해. 그리고 항상 고마워.</span>"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    acceptQuest(player, "rebel_story_01");
                    return true;
                }
            }
        ], player);
    }
});

window.EVENTS.push({
    id : "uppercity_story_02_intro",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "tavern" &&
        player.flags?.uppercity_story_01_done &&
        getCurrentDay(player) >= player.flags.uppercity_story_01_done_day + 3 &&
        !player.flags?.valenwantstokillErwin_event_seen &&
        !player.quest?.active,

    action : (player) => {
        player.flags.valenwantstokillErwin_event_seen = true;
        player.flags.uppercity_story_02_quest_unlocked = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 주점에 들어섰다. 평소의 주점보다 더 어수선한 분위기, 그리고 당신은 2초도 지나지 않아 그 이유를 깨달을 수 있었다." +
                    "<br>아카시아가 주점 의자에 앉아있었다. 그는 마틴이 내어준 음식을 먹으며 고개를 끄덕였다." +
                    "<br><br>\"기대 이상으로 맛있군요. 하류도시의 음식이라고는 생각도 들지 않을 정도로.\"<br><br>" +
                    "발렌에 이어서 아카시아까지 하류도시에 행차하다니, 하류도시의 사람들은 웅성거리며 서로의 눈치를 보고 있었다. 경비병들마저도 아카시아에게는 쉽사리 접근을 못하고 있었다. 아카시아는 우아하게 마지막 숟가락질까지 끝내더니 당신을 돌아보았다." +
                    "<br><br>\"....\"<br><br>" +
                    "당신을 평가하는 듯한 차가운 시선. 그의 시선 앞에서 당당하게 어깨를 펼 수 있는 사람은 과연 몇이나 될까. 아카시아는 자리에서 일어나 당신에게 걸어왔다." +
                    "<br><br>\"당신에게 부탁할 것이 있어서 직접 찾아왔습니다, 하류도시의 영웅.<br>하얀꽃무덤을 아시는지요?\"<br><br>" +
                    "하얀꽃무덤. 폐야. 두 곳 모두 인간의 마지막 방위선이라고 불리는 경계병 제3초소 너머에 있는 곳이다. 그곳에서 살아돌아온 사람은 없다고 들었다.<br><br>" +
                    "\"그 하얀꽃무덤에서 결국 한 마물이 내려왔다고 합니다. 경계병 제3초소 근처에서 몸을 숨기고 있지요. 아직은 적극적인 공격을 하지 않지만...\"<br><br>" +
                    "아카시아의 차가운 시선은 한시도 당신에게서 떨어지지 않고 있다." +
                    "<br><br>\"그것이 언제 공격할지는 모르는 법이니까요.\""
                ]
            },
            {
                type : "text",
                value : [
                    "아카시아가 한 걸음 더 당신에게 다가왔다." +
                    "<br><br>\"물론...\"<br><br>" +
                    "그는 당신을 직접적으로 건드리지는 않았다. 하지만 거리가 너무 가까웠다. 그의 차가운 숨결이 당신의 뺨위로 느껴진다." +
                    "<br><br>\"그저 의뢰를 주려고 온 건 아닙니다. 당신을 한번 더 확인해보고 싶었을 뿐.<br><br>이번에도 완벽하게 해내신다면.... 개인적으로도 당신의 공을 치하하고 싶군요.\"<br><br>" +
                    "아카시아는 다시 당신에게서 반 걸음 물러났다." +
                    "<br><br>\"의뢰는 주점 게시판에 붙여놓겠습니다. 기대하고 있겠습니다, 하류도시의 영웅.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "uppercity_story_02_done_after_event",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.uppercity_story_02_done &&
        getCurrentDay(player) >= player.flags.uppercity_story_02_done_day + 2 &&
        !player.flags?.uppercity_story_02_done_after_event_seen,

    action : (player) => {
        player.flags.uppercity_story_02_done_after_event_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 걷던 당신에게 하얀색 옷을 입은 전령 한 명이 다가왔다." +
                    "<br><br>\"하류도시의 영웅님, 발렌님께서 부르십니다. 천국의 성으로 오시면 됩니다.\"<br><br>" +
                    "전령은 잠시 말을 멈췄다." +
                    "<br><br><span class='log-valen'>\"...당신의 행동에 책임을 질 준비는 되셨냐고도, 여쭤보시라고 했습니다.\"</span>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "uppercity_story_03_intro_event_notKillErwin",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.uppercity_story_02_notKillErwin &&
        !player.flags?.uppercity_story_03_intro_event_notKillErwin_seen,

    action : (player) => {
        player.flags.uppercity_story_03_intro_event_notKillErwin_seen = true;
        player.flags.uppercity_story_03_quest_unlocked = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "천국의 성에 도착하자 보인 모습은 발렌이 다른 군사에게 명령을 내리고 있는 모습이었다. 당신의 인기척에 그는 손짓으로 군사를 물렸다." +
                    "<br><br>\"하류도시의 영웅, 당신이 마물의 흔적을 추격한 끝에, 하얀꽃성지에서 내려온 마물을 죽일 수 있었습니다.<br><span class='log-pale'>마지막까지 당신이 제 부탁을 들어줬으면 더 좋았을 텐데 말이죠.</span>\"<br><br>" +
                    "발렌의 옆에 서있던 아카시아는 전보다 더 차가운 시선으로 당신을 바라보고 있었다. 아카시아와 다르게 발렌은 입가에서 미소를 잃지 않았다." +
                    "<br><br>\"괜찮습니다. 누군가에게 자신의 이념을 강요하는 것보다 무의미한 일은 없다는 걸 저는 이미 알고 있으니까요.\"<br><br>" +
                    "발렌은 여전히 웃고 있었다. 모두의 앞에서, 그는 하류도시의 영웅과 원만하게 대화를 나누고 있는 것으로 보일 테다." +
                    "<br><br>\"마물은 당신이 처리한 것으로 공표했습니다.\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 경계병들은 이미 당신이 마물을 죽이지 않았다는 걸 알고 있다고 대꾸했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"경계병들이요? 그들은 어차피 살아서 도시에 돌아오지 못할 텐데요.\"<br><br>" +
                                    "...발렌의 천사같은 미소는 지워지지 않는다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 그에게 왜 이렇게까지 자신을 하류도시의 영웅으로 만드려고 하는 거냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 발렌은 소리없이 웃었다." +
                                    "<br><br>\"글쎄요, '사람들을 위해서'라고 제가 대답한다고 해도 당신은 믿지 않으시겠죠?\"<br><br>" +
                                    "이미 발렌은 당신을 신뢰하고 있지 않다."
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type : "text",
                value : [
                    "발렌은 하류도시의 영웅에게 주고 싶은 의뢰가 하나 더 있다고 말했다." +
                    "<br><br>\"언제나처럼 주점에 올려놓겠습니다. 받을지 말지는 당신에게 달려있지만.... 당신이 하지 않으면 영광에 눈이 먼 하류도시의 사람들이 하나하나 시체가 되어서 돌아올 수도 있겠죠. 아.<br>시체로라도 돌아오면 다행일지도 모르겠습니다.\"<br><br>" +
                    "발렌은 당신에게 한 걸음 더 가까이 다가오더니 고개를 숙였다. 그의 입이 당신의 귀 바로 옆에서 속삭인다." +
                    "<br><br>\"하류도시의 영웅은 쉘터에 살고 있다고 했죠...? 당신을 하류도시의 영웅으로 만들기 전부터 저는 쉘터에 관심이 많았답니다.\"<br><br>" +
                    "그는 자신의 얘기는 끝났다는 듯 다시 당신에게서 한 발자국 멀어졌다. 그는 자연스럽게 손수건으로 자신의 손을 닦으며 당신에게 잘 부탁한다고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "uppercity_story_03_intro_event_killErwin",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.uppercity_story_02_killErwin &&
        !player.flags?.uppercity_story_03_intro_event_killErwin_seen,

    action : (player) => {
        player.flags.uppercity_story_03_intro_event_killErwin_seen = true;
        player.flags.uppercity_story_03_quest_unlocked = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"하류도시의 영웅.\"<br><br>" +
                    "당신이 천국의 성에 들어오자마자 발렌은 명령을 내리고 있던 군사를 손짓으로 물리고 당신을 웃는 얼굴로 맞이했다. 발렌의 옆에 있던 아카시아도 당신에게 고개를 까닥여보였다. 아카시아의 은빛 눈동자는 전과 다르게 위압적으로 느껴지지 않았다." +
                    "<br><br>\"기다리고 있었습니다. 고명한 당신에게 하나 더 부탁드릴 것이 있습니다.\"<br><br>" +
                    "그는 당신에게 미소를 지어보이며 말을 이었다. 그는 100년 전의 연구소들 중 아직 남아있는 연구소들이 있는데, 그중 가장 없애야 할 연구소를 드디어 찾았다고 말했다. '가장 없애야 할 연구소'라는 말에 당신이 의아해하자 발렌은 모든 일의 발단은 거기서부터 시작된 거라고 말해주었다." +
                    "<br><br>\"이 연구는 아주 오래 전부터 이어졌던 연구입니다. 마물에 대항하여, 우리도 마물을 만들어야겠다는 생각으로 해왔던 실험이었죠.\"<br><br>" +
                    "다른 사람들에게는 들리지 않을 목소리로 그는 작게 소근소근 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 여전히 그런 실험들을 이어가고 있냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"지금은 명시적으로 금지되어 있습니다. 인간을 대상으로 한 실험이기에, 소문이 새어나갔을 때 상류도시 사람들 중에서도 많은 사람들이 반발했었습니다. 그래서 지금은 하얀꽃을 소지하고 있는 것만으로도 사형을 받을 수 있습니다.\"<br><br>" +
                                    "발렌은 당신에게 한 걸음 더 다가오더니 고개를 숙이고 작은 목소리로 한 마디를 덧붙였다." +
                                    "<br><br>\"그렇지만, 여전히 우리는 마물의 습격을 받고 있죠. 경계병 제3초소가 언제 무너질지 모릅니다.<br>...당신이라면, 어떤 선택을 했을까요.\"<br><br>"
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 알겠다고 대답했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "아무 것도 묻지 않고 고개를 끄덕이는 당신에 발렌은 미소를 지었다." +
                                    "<br><br>\"당신은 정말... 꽃같은 사람이군요.\"<br><br>" +
                                    "그는 점점 당신이 좋아지는 거 같아서 걱정이라고 농담하듯이 가볍게 말했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("valen", "affection", 4);
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: "text",
                value : [
                    "\"언제나처럼 의뢰는 주점에 올려놓겠습니다. 잘 부탁드립니다, 하류도시의 영웅.\"<br><br>" +
                    "발렌은 우아하게 당신에게 인사를 했다. 발렌의 말이 끝나자 옆에 있던 아카시아가 당신에게 다가왔다. 발렌은 아카시아가 당신에게 따로 개인적인 접촉을 하는데도 별 다른 반응을 하지 않았다." +
                    "<br><br>\"개인적으로도 당신의 공을 치하하고 싶다고 했던 말을 기억하시나요. 저녁에 공연장에서 기다리고 있겠습니다, 하류도시의 영웅.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});