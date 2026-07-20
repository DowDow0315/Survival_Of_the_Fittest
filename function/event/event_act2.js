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
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
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
                    "<br><br>\"하류도시의 영웅, 당신이 마물의 흔적을 추격한 끝에, 하얀꽃성지에서 내려온 마물을 죽일 수 있었습니다.<br><span class='log-valen'>마지막까지 당신이 제 부탁을 들어줬으면 더 좋았을 텐데 말이죠.</span>\"<br><br>" +
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
                    "<br><br>\"그리고 당신을 하류도시의 영웅으로 만들기 전부터 저는 쉘터에 관심이 많았답니다. 어쩌면 당신의 행동에 따라 제가 더 관심이 많아질지도 모르겠군요.\"<br><br>" +
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
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("valen", "affection", 1);
                                }
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
                                    changeNPCEmotion("valen", "affection", 2);
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

window.EVENTS.push({
    id : "rebel_story_02_intro_event_attack",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.rebel_story_01_done &&
        getCurrentDay(player) >= (player.flags.rebel_story_01_done_day + 2),

    action : (player) => {
        player.flags.rebel_story_02_intro_event_attack_seen = true;
        player.flags.rebel_story_02_intro_event_attack_seen_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "어디선가 총소리가 났다. 상류도시에서 총소리가 나는 건 드물었기 때문에 처음에 사람들은 폭죽 소리라고 생각했다." +
                    "<br><br><span class='log-danger'><strong>꺄아악</strong></span><br><br>" +
                    "하지만 곧이어 들려오는 비명 소리에 상류도시 사람들은 뭔가 이상하다는 걸 깨달았다. 그들은 주변을 둘러보다가 피를 흘리며 쓰러지는 사람들을 본다. 그들의 동공이 점점 커졌다, 마치 피를 흘리고 죽는 사람을 처음 보는 것마냥." +
                    "<br>여기저기서 비명 소리가 들려온다." +
                    "<br><br>\"반란군이다! 반란군...!\"<br><br>" +
                    "반란군이라는 소리에 사람들은 더 혼미백산하여 질서를 잃고 뛰어다녔다. 그 순간 반란군 하나가 당신을 향해 뛰어들었다. 그는 당신을 하류도시의 영웅이 아니라 상류도시의 개라고 부르고 있었다." +
                    "<br><br>당신의 의지와는 상관없이 전투가 시작된다...!"
                ]
            },
            {
                type : "effect",
                run : "startRebelStory02IntroBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startRebelStory02IntroBattle = function(player){

    startBattle("rebels1", player, {
        noEscape : true,
        onWin : () => startRebelStory02IntroAfterBattleEvent(player),
        onLose : () => startRebelStory02IntroAfterLosingBattleEvent(player)
    });

    return true;
};

window.startRebelStory02IntroAfterBattleEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 당신을 향해 달려들던 반란군을 쓰러뜨렸다. 그가 쓰러지자 다른 반란군이 분노에 찬 함성을 지르며 당신을 공격하려 들었지만 당신을 공격하려는 순간, 그대로 입에서 피를 뿜으며 쓰러졌다." +
                "<br><br>발렌.<br><br>" +
                "그의 얼굴에 더 이상 천사같은 미소는 없었다. 그의 명령에 따라 백색 군단이 반란군들을 휩쓸기 시작했다. 분명 우세를 점하고 있었는데 제대로 훈련을 받은 백색 군단이 투입되자 그들은 하나하나 낙엽처럼 스러져내렸다." +
                " 발렌의 백색 군단은 하류도시의 경비병들과는 차원이 달랐다. 단 한 명도 전투에서 도망가지 않았고, 단 한 명도 사람을 죽이는 데 머뭇거리지 않았다." +
                "<br><br>\"젠장, 후퇴다, 후퇴...!\"<br><br>" +
                "이길 수 없다는 걸 직감한 반란군들은 후퇴하려고 했다. 하지만 그들의 후퇴 발언이 들려오는 순간, 발렌의 손에서 하늘색 칼날을 지닌 검이 소환됐다. 그리고 그는 그 검을 도망가고 있는 사람들의 심장으로 겨누었다.",
                "<br><br>한순간이었다. 검이 빛나는 순간, 도망치던 몇몇 사람들은 일직선으로 꿰뚫린 채 허공에 매달려 있었다. 검이 다시 줄어들었다. 중앙에 구멍이 뚫린 사람들이 툭툭 바닥으로 떨어졌다. 하지만 발렌은 거기서 멈추지 않았다.",
                "<br>상황은 순식간에 정리되었다. 나머지 처리는 백색 군단에게 손짓으로 명령을 내린 후, 발렌은 당신을 돌아보았다. 당신을 돌아보는 그의 얼굴에는 서늘한 미소가 걸려 있었다." +
                "<br><br><span class='log-valen'>\"그 누구도 상류도시를 건드릴 수는 없습니다.\"</span><br><br>" +
                "발렌은 백색 제복을 입은 군인들 몇몇에게 너네들은 상류도시 사람들의 상처를 우선시하라고 명령을 내렸다." +
                "<br><br>\"...잘 싸워주셨습니다.\"<br><br>" +
                "발렌은 당신을 돌아보지 않은 채 말했다.",
                "<br><br><span class='log-valen'>\"하류도시의 영웅이여.\"</span>" +
                "<br><br>...발렌은 쓰러진 반란군들에게는 단 한 번도 시선을 주지 않았다. 그의 관심은 오직 아직 살아있는 상류도시 사람들에게만 있었다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeNPCEmotion("valen", "affection", 3);
                changeNPCEmotion("valen", "fear", 10);
                changeNPCEmotion("yuri", "rage", 10);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.startRebelStory02IntroAfterLosingBattleEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 반란군의 칼을 이겨내지 못했다. 그가 당신의 목을 찌르려고 할 때, 망토를 쓴 사람이 당신의 앞으로 달려들었다. 하지만 당신은 알 수 있었다. 유리다. 망토 아래로 삐죽 튀어나온 적발, 그리고 공격을 쌍검으로 막는 자세, 그는 유리였다." +
                "<br>유리는 움직이지 못하는 당신을 안아들더니 연막탄과 함께 그 자리를 벗어났다. 당신을 놓친 반란군이 도망가는 당신들의 뒤로 손을 뻗었다. 가지마-" +
                "<br><br><br><strong><span class='log-valen'>그리고 당신은 발렌의 하늘색 눈동자와 마주쳤다</span></strong>"
            ]
        },
        {
            type : "text",
            value : [
                "당신이 다시 눈을 떴을 때 당신은 쉘터에 있었다. 당신은 당신의 몸을 내려다보았다. 상처는 말끔하게 치료되어 있었다." +
                "<br><br>\"일어났어?\"<br><br>" +
                "따듯한 양배추 수프를 가지고 온 유리가 당신의 앞에 앉았다. 그는 당신을 바라보다가 곧 시선을 내리깔았다." +
                "<br><br>\"...네가 위험한 게 싫어. 하지만 내가 싫다고 해도 너는 계속 위험한 곳으로 나가겠지.\"<br><br>" +
                "유리는 당신에게 인장이 박혀있는 반지를 하나 건넸다." +
                "<br><br>\"내 수호 반지라고 생각하고 받아줘.\"<br><br>" +
                "당신은 이 반지가 뭐냐고 물었지만 유리는 말해주지 않았다. 그는 그저 그 반지는 자신이 예전에 끼고 다니던 수호 반지일 뿐이라고 말했다." +
                "<br><br>...하지만 당신은 유리가 이런 반지를 끼고 다니는 걸 한번도 본 적이 없다. 유리는 좀 쉬라고 말한 후 자리를 떴다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.flags.rebel_story_02_valenSeesYuri = true;
                addItem(player, ITEMS.accessary.yuriRebelRing);
                changeHP(player, 100);
                changeStamina(player, 100);
                changeNPCEmotion("yuri", "affection", 2);
                changeNPCEmotion("yuri", "dominance", 10);
                changeNPCEmotion("valen", "fear", 5);
                player.location = "shelter";
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.EVENTS.push({
    id : "rebel_story_02_intro_event_before_yuri",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.rebel_story_02_intro_event_attack_seen &&
        player.flags?.uppercity_story_02_notKillErwin &&
        !player.flags.rebel_story_02_intro_valenSeesYuri &&
        !player.flags.rebel_story_02_intro_event_before_yuri,

    action : (player) => {
        player.flags.rebel_story_02_intro_event_before_yuri = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신이 길을 가고 있을 때, 뒤에서 유리가 당신의 이름을 부르는 소리가 났다. 당신은 뒤를 돌아보았다. 무슨 말을 하려는지 몇 번을 입술을 달싹거리던 유리는 결국 입을 여는 대신 당신에게 인장이 박혀있는 반지를 건넸다." +
                    " 당신은 갑자기 유리가 왜 이 반지를 주는지 모르겠어서 고개를 갸웃했다. 유리는 당신의 손에 반지를 쥐어주며 이건 자신이 예전에 끼고 다니던 수호반지일 뿐이라고 말했다. 그는 이 수호반지는 자기보다는 당신에게 필요할 거라고 말했다." +
                    "<br>...당신은 단 한번도 유리가 이런 반지를 끼고 다니는 걸 본 적이 없다." +
                    "<br><br>\"내 마음이라고 생각하고 받아줘.\"<br><br>" +
                    "유리의 호박색 눈동자는 흔들리다가 다시 마음을 다진 듯 굳어졌다. 그는 당신에게 다치지 말아달라고 부탁했다." +
                    "<br><br>\"다치게 되면 쉘터로 와. 내가 항상 쉘터에 있을 테니까.\"<br><br>" +
                    "그 말을 끝으로 유리는 돌아섰다. 당신은 문득, 그의 뒷모습이 2년 전 그때와 같다는 생각을 했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.accessary.yuriRebelRing);
                    changeHP(player, 100);
                    changeStamina(player, 100);
                    changeNPCEmotion("yuri", "affection", 2);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "rebel_story_02_valen_order",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        !player.quest?.active &&
        player.flags?.rebel_story_02_intro_event_attack_seen &&
        player.flags?.uppercity_story_02_done &&
        getCurrentDay(player) >= (player.flags.rebel_story_02_intro_event_attack_seen_day + 4),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "영광의 거리에서 백색 군단의 옷을 입은 자가 당신에게 다가왔다. 그는 지금부터 반란군을 소탕하러 갈 건데 발렌 님께서 당신의 조력을 얻어 진행할 것을 당부했다고 말했다." +
                    "<br><br>\"가시죠. 하류도시의 영웅.\"<br><br>" +
                    "그의 말이 끝나는 것과 동시에 백색 군대가 당신의 주변에 나타났다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그들과 함께 반란군을 소탕하러 갔다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 대답에 그들은 고개를 끄덕였다. 당신은 그들을 따라 반란군의 거처로 향했다. 반란군의 은신처는 놀랍게도 상류도시 입구에 있었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : "accept_rebel_story_02_and_enter"
                            }
                        ]
                    },
                    {
                        text : "당신은 싫다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...거절을 하는 겁니까? 안타깝게 되었군요.\"<br><br>" +
                                    "그 말과 동시에 사방에서 칼날이 당신에게 쏟아지기 시작했다. 당신은 최대한 싸우려고 했다. 하지만 이 많은 숫자를 상대로 혼자 싸우는 건 무리였다. 공격을 막아내던 당신은 뒤에서부터 오는 통증에 거칠게 숨을 내뱉었다." +
                                    "<br>숨을 뱉었는데, 뜨거운 뭔가가 같이 흘러내렸다. 당신은 흐려지는 시야 사이로 아래를 내려다보았다. 붉은색 피. 당신의 입은 지금 피를 쏟아내고 있다. 당신은 눈을 느리게 두어 번 깜박였다. 분명 또 통증이 느껴지는데, 그렇게 아프지는 않았다." +
                                    "<br>당신이 한번 더 눈을 깜박였을 때 시야는 이미 기울어져 있었다. 당신이 볼 수 있는 건 백색 군대의 발들뿐이었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    gameOver(player, "당신은 죽었다. 누군가가 당신의 귀에 속삭였다. <br><br>\"하류도시의 영웅은 부탁을 거절하지 않습니다.\"<br><br>앞으로도 상류도시는 찬란하게 빛날 것이다, 아마도.");
                                    return true;
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

window.accept_rebel_story_02_and_enter = function(player){
    initQuestData(player);

    player.quest.active = {
        id: "rebel_story_02",
        progress: 0
    };

    savePlayer(player);
    enterDungeon(player, "rebelsHideOut");
};

//반란스토리02 분기

window.EVENTS.push({
    id : "rebel_story_02_after_event_attack",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.rebelLeader2SparedWithRing &&
        player.flags?.rebel_story_02_done &&
        !player.flags.rebel_story_02_after_event_attack_seen &&
        getCurrentDay(player) >= (player.flags.rebel_story_02_done_day + 7),

    action : (player) => {
        player.flags.rebel_story_02_after_event_attack_seen = true;
        player.flags.rebel_story_02_after_event_attack_seen_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리에 들어선 당신은 쉘터 쪽에서 아이들의 울음 소리를 들었다. 당신의 시선이 쉘터 쪽으로 돌아갔다. 인신매매단 습격에 이어서 또, 하류도시의 아이들의 숨통을 트이게 했던 곳이 공격당하고 있었다." +
                    "<br><br>유리가 지키고자 했던 아이들이.<br><br>" +
                    "하류도시의 사람들이 쉘터 주변에 모여있다. 당신은 그들을 제치고 쉘터에 다가갔다. 백색 제복- 발렌의 군대다. 그들은 반란군이 있었다는 증거를 찾아냈다. 당신도 몇 번이고 봐왔던 그 문장," +
                    "<br><br><br><span class='log-yuri'>우리는 아직 죽지 않았다</span><br><br><br>" +
                    "그들이 찾아낸 증거에 많은 사람들은 백색 군단이 쉘터를 습격한 이유를 이해했다." +
                    "<br><br>몇몇 큰 아이들이 작은 아이들을 지키기 위해 앞으로 나섰다. 백색 군인들은 그들 모두에게 반란군을 감춰준다는 죄를 씌어버렸다."
                ]
            },
            {
                type : "text",
                value : [
                    "그들은 반란군들을 잡아간다는 명목 하에 어린 아이들 몇 명을 끌고 나갔다." +
                    "<br><br>...그리고 당신은 위화감을 느꼈다. 그들은 일부러 시간을 끌며 누군가를 기다리고 있었다." +
                    "<br><br>\"하류도시의 영웅, 발렌 님께서 그대는 이 일에 관여하지 말라고 했습니다.\"<br><br>" +
                    "당신은 뒤를 돌았다. 백색 군인들이 당신을 쳐다보고 있었다. 그들 중 몇 명은 자신의 무기를 만지작거렸다." +
                    "<br><br>\"그리고 만약 당신의 방해를 받을 시에는 당신을 무력화시키라고도 하셨었죠.\"<br><br>" +
                    "당신이 무기를 잡고 있든 말든, 그들은 당신을 공격할 생각이다. 전투가 시작된다!"
                ]
            },
            {
                type : "effect",
                run : "startRebelStory02AfterBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startRebelStory02AfterBattle = function(player){

    startBattle("whiteArmy1", player, {
        noEscape : true,
        onWin : () => startRebelStory02AfterBattle1Event(player),
        onLose : () => startRebelStory02AfterBattleLosingEvent(player)
    });

    return true;
};

window.startRebelStory02AfterBattle1Event = function(player){
    startScene([
        {
            type: "text",
            value: [
                "첫 번째 군인이 쓰러지자, 대열 뒤에 있던 또 다른 백색 군인이 앞으로 걸어 나왔다." +
                "<br><br>\"고작 한 명 쓰러뜨린 것으로 끝났다고 생각했습니까?\""
            ]
        },
        {
            type: "effect",
            run: (player) => {
                startBattle("whiteArmy1", player, {
                    noEscape: true,
                    onWin: () => startRebelStory02AfterBattle2Event(player),
                    onLose: () => startRebelStory02AfterBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startRebelStory02AfterBattle2Event = function(player){
    startScene([
        {
            type: "text",
            value: [
                "두 번째 군인마저 쓰러지자 다른 군인이 앞으로 나왔다. 그는 당신을 바라보며 자신의 쌍도끼를 꺼내 들었다." +
                "<br><br>\"당신이 설사 이 전투에서 이긴다고 해도, 바꿀 수 있는 게 있을 거라고 생각합니까?\""
            ]
        },
        {
            type: "effect",
            run: (player) => {
                startBattle("whiteArmy2", player, {
                    noEscape: true,
                    onWin: () => startRebelStory02AfterBattleAllWinEvent(player),
                    onLose: () => startRebelStory02AfterBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startRebelStory02AfterBattleAllWinEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 당신에게 달려드는 백색 군인들을 전부 해치웠다. 상류도시에서 내려온 군인들을 당신이 전부 이기자, 하류도시의 사람들은 믿기지 않는다는 얼굴로 당신을 보았다. 하류도시의 경비병들도 그건 마찬가지였다." +
                "<br>무서울 정도로 고요한 정적이었다. 하류도시 마을사람들 중 한 명이 갑자기 울음을 터뜨렸다." +
                "<br><br>\"상류도시의 명령을 거역하면 어떡해!\"<br><br>" +
                "당신의 힘에 압도당하는 것도 잠시, 걱정과 두려움이 그들 사이에 퍼졌다.<br><br>\"당신이 우리를 계속 지켜줄 거야?\"<br>\"오늘은 살았지만 내일은?\"<br>\"우린 당신만큼 강하지 않아.\"<br><br>그들은 당신을 원망했다. 아니. 사실 원망하기보다는 눈앞에 닥쳐올 미래를 두려워하고 있는 걸지도 모르겠다. 몇몇 사람들은 말리긴 했지만 이미 공포에 젖은 사람들의 기세를 누르기는 어려워보였다." +
                "<br><br>\"그만해요! 영웅님은 우리를 구해주셨다고요!\"<br><br>" +
                "시온이 당신과 아우성치는 하류도시 사람들 사이를 가로막고 섰다. 그는 두 팔을 벌리고 영웅님은 우리를 지켜준 것뿐이라고 말했다." +
                "<br><br>\"우리를? 반란군을 지켜준 거겠지!\"<br><br>" +
                "\"우리를 지켜준 거야! 상류도시가 언제 우리를 지켜준 적이 있어!?\"<br><br>" +
                "두 갈래로 나눠져 싸우는 사람들의 중심에 당신이 있다. 사람들에게 으르렁거리던 시온이 걱정 어린 눈으로 당신을 보았다. 그는 당신에게 괜찮냐고 물었다. 당신의 시야가 흐려졌다가 다시 선명해졌다. 백색 군단은 누군가에게 보고를 하더니 뒤로 물러났다." +
                "<br>...누군가를 놓쳤다는 보고다. 당신은 어쩐지 그 '누군가'가 누구인지 알 것 같았다." +
                "<br><br><br><br>백색 군단이 물러나고 쉘터의 아이들은 당신의 주변에 옹기종기 모여있었다. 몇몇 아이들은 울음을 터뜨렸고 몇몇 아이들은 그 아이들을 달래주었고, 또 몇몇 아이들은 시온처럼 당신에게 고맙다고 말했다." +
                "<br><br>...그 누구도 챙겨주지 않은 우리들을, 챙겨줘서 고마워."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.flags.rebel_story_02_after_youWinAll = true;
                changeNPCEmotion("valen", "affection", -3);
                changeNPCEmotion("valen", "rage", 10);
                changeNPCEmotion("akasia", "affection", -3);
                changeNPCEmotion("akasia", "rage", 10);
                changeNPCEmotion("yuri", "rage", -10);
                changeNPCEmotion("yuri", "affection", 10);
                changeNPCEmotion("sion", "affection", 10);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => 
        {
            player.location = "shelter";
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.startRebelStory02AfterBattleLosingEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 백색 군단의 힘을 이겨낼 수가 없었다. 하류도시의 영웅이 쓰러졌다. 당신이 쓰러지자 몇몇 시민들이 당신의 앞에 나섰다. 몇몇은 하류도시의 영웅을 살려달라고 말했고, 몇몇은 당신의 이름을 부르며 당신을 더 이상 해치지 말라고 말했다. 당신은 누군가 당신의 몸을 껴안는 걸 느꼈다." +
                "<br>시온이다. 그는 당신을 껴안으며 분노에 찬 시선으로 백색 군인을 노려보고 있었다. 그는 당신을 해치려면 자신을 먼저 죽이고 가야 할 거라고 말했다." +
                "<br><br>\"나는 절대로, 하류도시의 영웅 님을 다치게 하지 않을 거예요.\"<br><br>" +
                "그는 눈물을 뚝뚝 흘리며 당신에게 약해서 미안하다고 말했다." +
                "<br><br>\"무슨 일이 있어도 강해질게요... 그래서 아무도 지켜주지 않는 당신을, 제가 지켜줄게요...\"<br><br>" +
                "어디선가 \"찾았다!\"하는 소리가 들렸다. 백색 군단은 더 이상 당신에게 관심이 없았다. 그들은 누군가를 쫓아가고 있었다." +
                "<br>당신은 그대로, 시온의 품에서 기절하고 말았다."
            ]
        },
        {
            type : "text",
            value : [
                "당신이 다시 눈을 떴을 때 쉘터는 엉망진창이었다. 당신의 상처를 치료해주던 유리가 입술을 뗐다. 하지만 그는 아무 말도 하지 못하고 다시 입술을 다물었다." +
                "<br>당신의 상처는 유리가 말끔하게 치료해놓았다. 당신은 붕대를 감고 있는 유리의 팔을 보았다. 당신의 시선을 눈치챈 유리는 말없이 다친 팔을 뒤로 숨겼다." +
                "<br><br>\"...쉬어.\"<br><br>" +
                "그는 입술을 악물었다." +
                "<br><br>\"그리고 미안해.\""
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.flags.rebel_story_02_after_youLose = true;
                changeNPCEmotion("valen", "affection", -3);
                changeNPCEmotion("valen", "fear", 10);
                changeNPCEmotion("akasia", "affection", -3);
                changeNPCEmotion("akasia", "fear", 10);
                changeNPCEmotion("yuri", "affection", 5);
                changeNPCEmotion("sion", "affection", 5);
                changeNPCEmotion("sion", "dominance", 10);
                changeHP(player, 100);
                changeStamina(player, 100);
                passTime(player, 50);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => 
        {
            player.location = "shelter";
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

window.EVENTS.push({
    id : "rebel_story_02_after_event_uppercityPromise",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        (player.flags?.rebelLeader2KilledWithRing ||
         player.flags?.rebelLeader2KilledNoRing ) &&
        player.flags?.rebel_story_02_done &&
        !player.flags.rebel_story_02_after_event_uppercityPromise_seen &&
        getCurrentDay(player) >= (player.flags.rebel_story_02_done_day + 7),

    action : (player) => {
        player.flags.rebel_story_02_after_event_uppercityPromise_seen = true;
        player.flags.rebel_story_02_after_event_uppercityPromise_seen_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리에 있던 당신은 일렬로 늘어선 행렬을 보았다. 하류도시의 경비병들이 또 누군가의 목들을 나르고 있었다. 아니, 당신은 더 이상 '누군가'의 목이라고 말할 수 없었다. 그 목들은 당신이 소탕했던 반란군들의 것이었다. 하류도시의 경비병들 중 몇몇이 이렇게까지 해야 하냐고 불쾌한 기색을 드러냈다. 그들은 반란군들의 머리를 그저 나무꼬챙이에 매달아놓은 것이 아니었다." +
                    "<br><br>나무꼬챙이는 반란군들의 턱에서부터 정수리까지 꿰뚫고 있었다.<br><br>" +
                    "처참한 광경에 몇몇 어른들이 아이들의 눈을 가려주었다. 당신은 쉘터의 조금 큰 아이들마저 자신보다 작은 아이들의 눈을 가려주는 것을 보았다.",
                    "<br>그 순간, 누군가가 처절하게 울부짖는 소리가 들렸다.<br>",
                    "<br>\"누구를 위한 정의인가!\"<br><br>",
                    "그는 당신에게 말하고 있지 않았다. 그는 참혹한 광경에 눈을 돌려버린 하류도시 사람들에게 죽음을 각오하고 말하고 있었다. 경비병들이 그를 체포하기 위해 달려들었지만 반란군은 무기를 들고 당신만을 가리켰다.",
                    "<br><br>\"상류도시의 영웅! 네 목만큼은 내가 기필코 가져가마.\"<br><br>",
                    "누가 말릴 새도 없이 그는 당신에게로 달려들었다. 반란군의 처절한 사투가 시작된다...!"
                ]
            },
            {
                type : "effect",
                run : "startRebelStory02AfterUppercityPromiseBattle"
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.startRebelStory02AfterUppercityPromiseBattle = function(player){

    startBattle("rebels1", player, {
        noEscape : true,
        onWin : () => startRebelStory02AfterUppercityPromiseBattle1Event(player),
        onLose : () => startRebelStory02AfterUppercityPromiseBattleLosingEvent(player)
    });

    return true;
};

window.startRebelStory02AfterUppercityPromiseBattle1Event = function(player){
    startScene([
        {
            type: "text",
            value: [
                "첫 번째 반란군이 쓰러지자 숨어있었던 반란군이 당신을 제거하기 위해 튀어나왔다.<br><br>...끈질기다."
            ]
        },
        {
            type: "effect",
            run: (player) => {
                startBattle("rebels2", player, {
                    noEscape: true,
                    onWin: () => startRebelStory02AfterUppercityPromiseBattle2Event(player),
                    onLose: () => startRebelStory02AfterUppercityPromiseBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startRebelStory02AfterUppercityPromiseBattle2Event = function(player){
    startScene([
        {
            type: "text",
            value: [
                "두 번째 반란군까지 쓰러졌지만 그들은 아직 죽지 않았다. 마지막 한 명의 반란군이 목숨을 걸고 당신을 향해 달려든다."
            ]
        },
        {
            type: "effect",
            run: (player) => {
                startBattle("rebels3", player, {
                    noEscape: true,
                    onWin: () => startRebelStory02AfterUppercityPromiseBattleAllWinEvent(player),
                    onLose: () => startRebelStory02AfterUppercityPromiseBattleLosingEvent(player)
                });

                return true;
            }
        }
    ], player);
};

window.startRebelStory02AfterUppercityPromiseBattleAllWinEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 당신을 향해 달려드는 반란군들을 모두 죽여버렸다. 일순간 주변에 정적이 흘렀다." +
                "<br><br>\"역시 반란군은 없어져야 해.\"<br>\"그들은 대체 무엇을 위해 싸우는 거야?\"<br>\"저런 꼴을 당해도 싸지.\"<br><br>" +
                "어른들은 아이들에게 반란군은 되면 안 된다고 말하고, 아이들은 반란군이 되면 어떤 최후를 맞을 수 있는지 목격해버리고 말았다. 그들은 자신을 양에 비유하고, 반란군들을 늑대에 비유하며, 상류도시를 목장주로 비유했다." +
                "<br><br><span class='log-valen'>상류도시의 뜻대로.</span><br><br>" +
                "언제부터 지켜보고 있었던 걸까. 당신은 평소와 다르게 검은 망토를 두르고 있는 발렌을 보았다. 머리에 후드를 뒤집어쓰고 있었지만 당신을 바라보는 그 눈동자는 분명 하늘색이었다. 그는 당신을 스쳐지나가며 당신의 소매에 뭔가를 넣었다. 당신은 그가 가자마자 그가 준 쪽지를 확인했다." +
                "<br><br>아카시아 꽃잎이 그려져있는 쪽지 위의 활자 인쇄라도 한 듯 정갈하고 깔끔한 글씨<br><br>" +
                "<span class='log-valen'>상류도시에 한번 들러주시길. 당신에게 보여드리고 싶은 게 있습니다.</span>"
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.flags.rebel_story_02_after_uppercity_promise_invitation = true;
                changeNPCEmotion("valen", "affection", 10);
                changeNPCEmotion("akasia", "affection", 10);
                changeNPCEmotion("yuri", "rage", 10);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.startRebelStory02AfterUppercityPromiseBattleLosingEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 당신에게로 달려드는 반란군들을 이기지 못했다. 당신이 쓰러지는 찰나에 백색 제복이 당신을 감싸안았다. 당신을 감싼 누군가의 정체를 알아차리자마자 누군가가 비명을 질렀다. 당신은 붉게 물드는 백색 제복을 본 후 고개를 들었다.<br><br>발렌이었다.<br><br>" +
                "발렌은 당신을 안은 채로 반란군을 보지도 않고 그의 목을 뚫어버렸다. 가차없는 칼날이었지만 그의 잔혹성은 대두되지 않았다. 사람들은 오로지 당신을 지키려다가 난 그의 상처에만 집중하고 있었다." +
                "<br><br>\"하류도시의 사람을 위해....\"<br><br>" +
                "발렌은 당신을 부드럽게 끌어안은 채 당신의 얼굴을 더 제 품으로 끌어당겼다. 당신은 그의 얼굴을 올려다보았다. 그는 참담한 표정을 짓고 있었지만 당신과 순간적으로 마추진 시선만큼은 차가웠다." +
                "<br><br>\"여러분.<br>저는 시민들이 더 다치기 전에 반란군들을 막고 싶습니다.\"<br><br>" +
                "그의 손이 당신의 허리를 더 바짝 끌어안았다." +
                "<br><br>\"그리고 전, 시민 여러분들이 절 도와주실 거라 믿습니다.\""
            ]
        },
        {
            type : "text",
            value : [
                "짧지만 강렬한 말이 끝나자 환호는 길게 이어졌다. 발렌은 당신을 데리고 헬리콥터에 탔다." +
                "<br><br>\"잘해주셨습니다, 하류도시의 영웅.\"<br><br>" +
                "그는 피가 묻은 백색 상의를 벗더니 붕대로 상처를 지혈한 후 다른 옷으로 갈아입었다. 헬리콥터는 상류도시가 아니라 당신의 쉘터로 향하고 있었다." +
                "<br><br>\"보답으로 다음 번에 상류도시에서 대접을 해드리고 싶습니다.\"<br><br>" +
                "발렌은 쉘터를 내려다보았다. 그의 하늘색 눈동자에 붉은색 머리가 비쳤다. 그는 알 수 없는 미소를 지었다." +
                "<br><br>\"그러니 시간이 되시면 꼭 와주시길.\"<br><br>" +
                "그는 당신을 쉘터에 내려다준 후 헬리콥터를 타고 상류도시로 떠났다. 상류도시로 가는 동안, 그는 그때처럼 단 한번도 하류도시를 돌아보지 않았다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.flags.rebel_story_02_after_uppercity_promise_invitation = true;
                player.flags.rebel_story_02_valenSeesYuri = true;
                changeNPCEmotion("valen", "affection", 5);
                changeNPCEmotion("valen", "dominance", 10);
                changeNPCEmotion("akasia", "affection", 5);
                changeNPCEmotion("yuri", "rage", 10);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

//act2 마지막
window.EVENTS.push({
    id : "act_02_abomination_attack_start_rebel_route",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance" &&
        player.flags?.rebel_story_02_after_event_attack_seen &&
        getCurrentDay(player) >= (player.flags.rebel_story_02_after_event_attack_seen_day + 7) &&
        getCurrentDay(player) >= (player.flags.uppercity_story_03_done_day + 7) &&
        !player.flags?.act_02_abomination_attack_start_rebel_route_seen,

    action : (player) => {
        player.flags.act_02_abomination_attack_start_rebel_route_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "마을 입구에 들어서자마자 어디선가 비명소리가 들렸다. 당신이 고개를 돌렸을 때, 거대한 흉물이 한 명을 질질 끌고 가고 있었다. 경계선 너머에만 있다고 믿었던 흉물이 눈앞에 나타나자 사람들의 표정에 균열이 생겼다. 경비병들도 시민들과 다르지는 않았다. 몇몇은 흉물을 막아섰지만 몇몇은 자기 목숨을 살리기 위해 시민들 사이로 숨어들었다." +
                    "<br><br>\"씨발, 이게 뭔...\"<br><br>" +
                    "당신은 루크가 경비병들을 이끌고 마을 입구에서 흉물 하나를 막아내는 것을 보았다. 거대한 흉물은 그들의 공격에 꿈틀거리더니 집어삼킨 사람을 끌고 그대로 숲으로 돌아가버렸다. 루크는 자신의 뺨에 묻은 마물의 검은피를 손등으로 닦았다.",
                    "<br>경계병 하나가 마을 입구로 기어왔다. 그는 경비병단장 루크를 보더니 흉물이 경계병 제3초소를 뚫고 있다고 말했다. 그는 경계병 제3초소가 뚫리면 모든 초소가 다 뚫릴 거라고 말했다.",
                    "<br><br>\"...이미 뚫린 거 아냐? 지금...\"<br><br>" +
                    "\"미처 못 막아낸 거야.... 아직도 우리들은 싸우고 있어. 우리가 뚫리면 전부 끝이야...\"<br><br>" +
                    "경계병은 중얼거리다가 그대로 고개를 떨구었다. 그의 입에서 역겨운 냄새가 나면서 검은피가 흘러내렸다." +
                    "<br><br>\"....\"<br><br>" +
                    "루크는 그의 입에서 태어난 흉물의 새끼들을 발로 밟아죽였다. 그는 입에 담배를 물었다. 하늘을 한번 올려다보더니 그는 마을 입구로 향했다. 뒤에서 경비병들이 루크를 말리는 소리들이 들린다. 하지만 루크는 딱 한번 그들을 돌아본 후 다시 길을 나섰다.",
                    "<br><br><br><span class='log-danger'>경계병 제3초소에 도착해 이벤트를 진행할 시, 세계의 흐름이 크게 바뀝니다.</span>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "act_02_abomination_attack_start_uppercity_route",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance" &&
        player.flags.rebel_story_02_after_event_uppercityPromise_seen &&
        getCurrentDay(player) >= (player.flags.rebel_story_02_after_event_uppercityPromise_seen_day + 7) &&
        getCurrentDay(player) >= (player.flags.uppercity_story_03_done_day + 7) &&
        !player.flags?.act_02_abomination_attack_start_uppercity_route_seen,

    action : (player) => {
        player.flags.act_02_abomination_attack_start_uppercity_route_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"하류도시의 영웅.\"<br><br>" +
                    "뒤를 돌아보니 백색 군인이 다급한 목소리로 당신을 부르고 있었다." +
                    "<br><br>\"현재 경계병 제3초소가 뚫리고 있다는 연락이....\"<br><br>" +
                    "그가 말을 끝내기도 전에 그의 뒤에서 거대한 흉물이 입을 벌렸다. 백색 군인은 아슬아슬하게 거대한 흉물의 공격을 피했다. 마을 입구에 있던 시민들은 경계선 너머에만 있다고 믿었던 흉물이 눈앞에 있자 순간 멍하니 그것을 바라보기만 했다." +
                    "<br><br>\"으아아아악!\"<br><br>" +
                    "한 명이 삼켜지고 나서야 시민들은 비명을 지르며 도망가기 시작했다. 흉물의 입에 걸린 한쪽 다리는 살고 싶다는 듯이 파닥거리다가 이내 그대로 축 늘어져버렸다." +
                    "<br>당신은 루크가 욕설을 뱉는 소리를 들었다. 그는 거대 흉물에 분명 타격을 먹였지만, 거대 흉물은 형태만 조금 변했을 뿐 똑같았다. 루크의 뺨에 거대 흉물의 검은피가 묻었다. 그는 신경질적으로 손등으로 제 뺨에 묻은 검은피를 닦아냈다." +
                    "<br><br>\"경계병 제3초소가 뚫리고 있다고?\"<br><br>" +
                    "다행인지 불행인지 인간 하나를 삼킨 거대 흉물은 알아서 물러났다. 루크는 거대 흉물이 마을 입구에서 멀어져 숲으로 들어가는 것을 보고 난 후에야 당신과 백색 군인에게 시선을 돌렸다. 그는 백색 군인의 대답을 듣지도 않았다. 그는 그대로 마을 입구를 나섰다. 뒤에서 루크의 경비병들이 네가 거기를 가봤자 죽는다고 말리는 소리가 들리긴 했지만 루크는 딱 한번 그들을 돌아봤을 뿐, 자신의 걸음을 멈추지 않았다." +
                    "<br><br>\"하류도시의 영웅, 막을 수 있으면 막지만...\"<br><br>" +
                    "백색 군인은 당신을 바라보았다.",
                    "<br><br>\"못 막을 거 같으면 버리라고, 발렌 님께서 말씀하셨습니다. 행운을 빕니다.\"" +
                    "<br><br><br><span class='log-danger'>경계병 제3초소에 도착해 이벤트를 진행할 시, 세계의 흐름이 크게 바뀝니다.</span>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "act_02_abomination_attack_guardPost3",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "guardPost3" &&
        (player.flags?.act_02_abomination_attack_start_rebel_route_seen ||
         player.flags?.act_02_abomination_attack_start_uppercity_route_seen ) &&
        !player.flags?.act_02_abomination_attack_guardPost3_seen,

    action : (player) => {
        player.flags.act_02_abomination_attack_guardPost3_seen = true;
        player.flags.act3CollapseDone = true;
        applyAct3LocationChange();
        clearCollapsedAreaQuest(player);
        player.location = "townEntrance_act3";
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 경계병 제3초소로 향했다. 하지만 이미 경계병 제3초소는 무너져 있었다. 모든 바닥이 흉물들의 색깔마냥 붉었고 끈적끈적했다. 바닥 사이사이에 있는 뒤틀린 뼈들은 오래된 것처럼 보이지 않는다. 우둑우둑 소리와 함께 짓눌린 비명 소리들이 여기저기서 들린다. 흉물 하나가 고개를 들었다. 흉물의 안에는 사람 한 명이 결합되어 있었다.",
                    "<br>당신이라는 먹잇감을 발견한 흉물이 하나둘 고개를 들었다. 수가 너무 많다...! 당신은 당신도 모르는 사이에 뒷걸음질을 쳤다. 흉물 하나가 당신을 집어삼키려고 몸을 길게 늘였다. 당신이 걸음을 떼는 순간, 바닥에 있던 끈적끈적한 것이 당신의 다리를 잡아당겼다...!",
                    "<br><br>...당신은 익숙한 욕설을 들었다. 당신의 허리를 단단하게 잡은 따듯한 팔, 그리고 당신은 그대로 그와 함께 어딘가로 굴러떨어졌다. 하지만 어디로 굴러떨어지든 붉은색 바닥 위였다." +
                    "<br>흉물들은 루크에게 다가오려다가 멈칫했다. 하지만 그것도 잠시 그들은 두 먹잇감을 향해 포위를 서서히 좁혀왔다. 어떻게든 도망가려던 당신은 당신을 끌어안고 있는 루크가 정신을 잃었다는 걸 인지했다. 그의 몸은 따듯한 게 아니라 뜨거웠다. 당신은 그의 얼굴을 보았다. 그의 뺨은 염증이라도 난 듯 부글부글 끓고 있었다."
                ]
            },
            {
                type : "text",
                value : [
                    "...당신은 루크뿐만 아니라 당신도 열이 난다는 사실을 알게 되었다. 당신의 의식이 점점 흐려진다. 흐려지는 의식 사이로 당신과 루크에게로 다가오는 흉물들이 보인다...." +
                    "<br>당신은 눈을 깜박였다. 백발을 길게 늘어뜨린 여자가 당신을 내려다보고 있었다." +
                    "<br><br>...소라?<br><br>"
                ]
            },
            {
                type : "text",
                value : [
                    "당신은 언젠가 이런 일이 똑같이 있었다는 걸 기억했다. 당신은 분명 그날도 죽을 뻔했었다." +
                    "<br>경계심 많은 금안 하나, 그것이 처음부터 당신을 살리려고 했다고는 생각하지 않는다. 그것은 움직이지 못하는 당신의 주변을 그저 맴돌았었다." +
                    " 그러다가 그것은 당신에게 다가왔다. 당신이 자신에게 위험하지 않다는 것을 살피고 고개를 갸웃거리며, 그것은 당신에게 손을 뻗는다. 만약 그날 당신이 그것의 손길을 거부했다면 당신은 그날 죽었을지도 모른다. 하지만 당신은 그것의 손길을 받아들였다." +
                    "<br>그리고 그것은 자신의 손길을 거부하지 않은 당신을 눈을 깜박거리며 바라보더니 말했다." +
                    "<br><br>\"날, ㄷ, 와, ㅈ.\"<br><br>" +
                    "당신은 그것을 도와주기로 했다. 당신이 고개를 끄덕이자 그것은 울음을 터뜨렸다. 그것은 당신을 하얀꽃 무덤으로 데려갔다." +
                    "<br>환각과 환청 속에서 당신은 몸을 회복했다. 당신은 그것과 대화를 나누었고 그것은 당신과의 대화를 좋아했다. 그것은 진짜 사람과 이야기를 나누는 것은 100년만이라고 더듬더듬 말했다." +
                    "<br><br>\"ㄱ, 리, ㅇ...ㅇ...\"<br><br>" +
                    "그것은 당신의 손에 뺨을 기댔다. 그것은 당신의 온기에 눈물을 흘린다. 그리고 그것은 당신의 이름을 묻는다. 당신은 그것에게 당신의 이름을 말해주었다."
                ]
            },
            {
                type : "text",
                value : [
                    "다시 눈을 떴을 때, 당신은 그때처럼 마을 입구에 서있었다. 멍하니. 당신은 완전히 박살난 마을 입구를 응시한다." +
                    "<br><br>인간이 그어놨던 경계는 무너졌다. 숲과 깊은숲은 이미 흉물의 영억이 되어 있었고, 경계병 제3초소 너머에 있던 폐야와 하얀꽃무덤은 이제 하류도시의 바로 앞까지 밀려와 있었다." +
                    "<br><br><br>당신은 마을 입구의 앞으로 경계병 초소를 세우는 모습을 멍하니 응시했다. 나무판자와 부서진 마차로 급하게 만든 초소였다. 경계병 제3초소를 대신하기에는 너무 작고, 너무 가까웠다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});
