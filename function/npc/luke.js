function processLukeText(text, player){
    return text.replaceAll("{lukeTitle}", getLukeTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getLukeTitle(player){
    if (NPC_DATA["luke"].emotion.affection > 80) return "내 또라이";
    else if(NPC_DATA["luke"].emotion.affection > 50) return "멍청한 새끼";
    return "쓰레기";
}

registerActions("luke", {
    //처음 이벤트
    firstMeeting_defiant: (player) => {
        changeEmotion("luke", "affection", 5);
        changeHP(player, -10);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "m", 5)
        );
        changeSensitivity(player, "mSensitivity", 5);
        startScene(NPC_DATA["luke"].scenes.luke_firstMeeting_defiant, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_neutral: (player) => {
        changeEmotion("luke", "lust", 10);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "m", 10)
        );
        changeSensitivity(player, "mSensitivity", 10);
        startScene(NPC_DATA["luke"].scenes.luke_firstMeeting_neutral, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_submissive: (player) => {
        changeEmotion("luke", "lust", 15);
        changeEmotion("luke", "affection", 5);
        changeHP(player, -5);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "m", 15)
        );
        changeSensitivity(player, "mSensitivity", 20);
        addBodyFluid(player, "m", 15);
        startScene(NPC_DATA["luke"].scenes.luke_firstMeeting_submissive, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    //막사대화로그
    giveFood : (player) => {
        openGiveFoodMenu(player, "luke");
    },

    talk_after_death : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신은 루크가 서 있던 자리를 지켜보았다." +
                    "<br><br>...루크는 더 이상 없다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    },

    talk : (player) => {
        const intro = isLukeNoSmoking(player)
        ? "루크는 벽에 기대어 서있다. 입에 하얀색 막대기가 물려있어서 뭔가 하고 봤더니 담배가 아니라 막대사탕이었다. 그의 손에는 라이터만 들려 있었다. 그는 무의식적으로 라이터 뚜껑을 딸깍거리고 있다."
        : "루크는 벽에 기대어 서있다. 입가에 걸린 담배 끝에서 연기가 가늘게 피어오르고 있었다. 무슨 생각을 하고 있는 건지 그의 자안은 허공을 응시하고 있었다.";
        startScene([
            {
                type: "text",
                value: intro
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "luke_smallTalk" },
                    { text: "다른 얘기를 한다", action: "luke_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 3);
        const affection = NPC_DATA["luke"].emotion.affection || 0;
        const rage = NPC_DATA["luke"].emotion.rage || 0;
        const dominance = NPC_DATA["luke"].emotion.dominance || 0;

        const noSmoking = player.flags?.luke_told_stop_smoking && affection > 50;

        const onEnd = () => {
            startScene(getLocationScene(player), player);
        };

        if (rage >= 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "루크는 당신이 다가오자 욕을 내뱉었다. <br><br>\"꺼져.\"<br><br>자안에 서린 살기를 보니 더 가까이 가면 안 될 거 같다.",
                        noSmoking
                        ? "루크가 담배를 피고 있다. 당신이 쳐다보자 루크는 그럼 자기가 네 말만 듣고 금연을 할 줄 알았냐며 살기를 드러냈다."
                        : "루크는 담배연기를 길게 내뱉으며 당신을 노려보았다. <br><br>\"안 꺼져?\"<br><br>지금은 말을 걸어도 소용이 없을 거 같다."
                    ])
                }
            ], player, { onEnd });
            return;
        }

        if (affection > 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom(
                        noSmoking
                        ? [
                            "루크는 벽에 기대어 라이터를 딸깍거리다가 당신이 다가오자 손짓을 멈췄다. 그의 입술에는 여전히 담배가 물려있었다.",
                            "루크는 막대사탕을 빨다가 그걸 그대로 당신의 입에 집어넣었다. 당신이 그를 올려다보자 그는 재밌다는 듯 낄낄 웃었다.",
                            "쉘터 얘기를 듣던 그는 당신에게 그래도 쉘터에서 살고 있는 게 나은 거라고 말했다. <br><br>\"빈민가 거리는 더 비참해.\"",
                            "당신을 옆에 두고 루크는 많은 말을 하지는 않는다. 하지만 어쩐지 당신은 그 정적이 불편하지는 않았다. 당신의 질문에는 대답해주기 때문에 그런 걸까?",
                            "\"씨발, 새벽에 돌아다니고 지랄이네.\"<br><br>그는 당신의 머리를 꾹 눌렀다. 손길은 거칠었지만 아프지는 않았다. 그는 당신의 머리를 꾸욱꾸욱 눌렀다.",
                            "루크는 당신의 옆에서 사망자 명단을 정리했다. 출생자 명단의 수보다 사망자 명단의 수가 훨씬 많았다.<br>그는 숫자마저 삐뚤삐뚤 쓰고 있었다.",
                            "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다."
                        ]
                        : [
                            "그는 담배를 피다가 당신쪽으로 후 불었다. 콜록, 콜록, 당신이 괴로워하자 루크는 입꼬리를 올렸다.<br><br>\"눈물 맺히는 거 존나 꼴리네.\"",
                            "그는 담배를 피다가 당신에게도 담배를 내밀었다. <br><br>\"피고 싶냐? 너무 뚫어지게 보는데.\"<br><br>그는 담배를 당신에게 내밀었다.",
                            "쉩터 얘기를 듣던 그는 당신에게 그래도 쉘터에서 살고 있는 게 나은 거라고 말했다. <br><br>\"빈민가 거리는 더 비참해.\"",
                            "당신을 옆에 두고 루크는 많은 말을 하지는 않는다. 하지만 어쩐지 당신은 그 정적이 불편하지는 않았다. 당신의 질문에는 대답해주기 때문에 그런 걸까?",
                            "\"씨발, 새벽에 돌아다니고 지랄이네.\"<br><br>그는 당신의 머리를 꾹 눌렀다. 손길은 거칠었지만 아프지는 않았다. 그는 당신의 머리를 꾸욱꾸욱 눌렀다.",
                            "루크는 당신의 옆에서 사망자 명단을 정리했다. 출생자 명단의 수보다 사망자 명단의 수가 훨씬 많았다.<br>그는 숫자마저 삐뚤삐뚤 쓰고 있었다.",
                            "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다."
                        ]
                    )
                }
            ], player, { onEnd});
            return;
        }

        if (dominance > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom(
                        noSmoking
                        ? [
                            "그는 당신이 가까이 오자 그대로 당신의 허리를 우악스럽게 잡아 끌었다. <br><br>\"존나 달콤해 보이네.\"<br><br>그의 입술이 당신의 입술로 가깝게 내려온다. 당신은 당신도 모르게 눈을 감았다. 하지만 입술에 닿는 감촉은 없었다. 그는 당신을 놓아주면서 실실 쪼갰다. <br><br>\"쫄기는.\"",
                            "당신은 그에게 어떤 맛 사탕을 제일 좋아하냐고 물었다. <br><br>\"...딱히 없어.\"<br><br>그는 사탕을 입으로 굴리며 말했다.",
                            "당신은 그에게 왜 담배를 끊었냐고 물었다. <br><br>\"내가 끊었다고?\"<br><br>그는 당신의 머리를 꾹 눌렀다.<br><br>\"병신. 지금만 안 피는 거야.\"",
                            "당신을 위아래로 훑어보던 루크가 인상을 찌푸렸다. 당신의 상처를 발견한 모양이다. <br><br>\"칠칠맞기는.\"<br><br>그는 당신에게서 고개를 돌렸다.",
                            "\"내 밑으로 들어와.\"<br><br>그는 당신을 위아래로 훑으며 말했다. <br><br>\"제복 입으면 존나 야할 거 같은데.\"<br><br>그는 여전히 당신의 몸을 위아래로 훑어내리고 있다.",
                            "루크는 당신의 옆에서 사망자 명단을 정리했다. 출생자 명단의 수보다 사망자 명단의 수가 훨씬 많았다.<br>그는 숫자마저 삐뚤삐뚤 쓰고 있었다.",
                            "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다."
                        ]
                        : [
                            "그는 당신이 가까이 오자 그대로 당신의 허리를 우악스럽게 잡아 끌었다. <br><br>\"존나 달콤해 보이네.\"<br><br>그의 입술이 당신의 입술로 가깝게 내려온다. 당신은 당신도 모르게 눈을 감았다. 하지만 입술에 닿는 감촉은 없었다. 그는 당신을 놓아주면서 실실 쪼갰다. <br><br>\"쫄기는.\"",
                            "당신을 위아래로 훑어보던 루크가 인상을 찌푸렸다. 당신의 상처를 발견한 모양이다. <br><br>\"칠칠맞기는.\"<br><br>그는 당신에게서 고개를 돌렸다.",
                            "\"내 밑으로 들어와.\"<br><br>그는 당신을 위아래로 훑으며 말했다. <br><br>\"제복 입으면 존나 야할 거 같은데.\"<br><br>그는 여전히 당신의 몸을 위아래로 훑어내리고 있다.",
                            "담배연기에 당신이 인상을 찌푸리자 루크는 비릿하게 웃었다. 그는 일부러 고개를 틀어 담배 연기를 당신에게 보냈다.",
                            "루크는 당신의 옆에서 사망자 명단을 정리했다. 출생자 명단의 수보다 사망자 명단의 수가 훨씬 많았다.<br>그는 숫자마저 삐뚤삐뚤 쓰고 있었다.",
                            "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다."
                        ]
                    )
                }
            ], player, { onEnd });
            return;
        }

        if (affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom(
                        noSmoking
                        ? [
                            "그는 에릭에게 돈은 얼마 정도 내냐고 물었다. 당신이 대답하자 그는 눈알을 굴렸다. 당신이 너도 에릭에게 돈을 내냐고 묻자 루크는 픽 웃었다. <br><br>\"그럼 안 내겠냐. 근데 경비병은 좀 깎아줘.\"",
                            "당신이 왜 경비비병들에게 존댓말을 강요하지 않냐고 묻자 루크는 시큰둥하게 대답했다. <br><br>\"그딴 게 뭐가 중요해.\"",
                            "루크는 당신이 쉘터에 대해 얘기하는 걸 좋아하는 거 같다. 그는 쉘터에 대해 이야기를 하는 당신의 말을 끊은 적이 없다.",
                            "루크는 라이터를 딸깍거리면서 당신에게 사탕 좋아하냐고 물었다. <br><br>\"난 막대사탕 좋아해.\"<br><br>그는 입에 있던 사탕을 꺠물며 말했다.",
                            "루크는 당신의 옆에서 사망자 명단을 정리했다. 출생자 명단의 수보다 사망자 명단의 수가 훨씬 많았다.<br>그는 숫자마저 삐뚤삐뚤 쓰고 있었다.",
                            "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다."
                        ]
                        : [
                            "그는 에릭에게 돈은 얼마 정도 내냐고 물었다. 당신이 대답하자 그는 눈알을 굴렸다. 당신이 너도 에릭에게 돈을 내냐고 묻자 루크는 픽 웃었다. <br><br>\"그럼 안 내겠냐. 근데 경비병은 좀 깎아줘.\"",
                            "당신이 왜 경비비병들에게 존댓말을 강요하지 않냐고 묻자 루크는 시큰둥하게 대답했다. <br><br>\"그딴 게 뭐가 중요해.\"",
                            "루크는 당신이 쉘터에 대해 얘기하는 걸 좋아하는 거 같다. 그는 쉘터에 대해 이야기를 하는 당신의 말을 끊은 적이 없다.",
                            "그는 가만히 당신의 옆에 있다가 담배연기를 후 뿜었다. 무슨 일 있냐는 당신의 물음에 그는 남 챙기기 전에 네 앞가림이나 잘하라고 말했다.",
                            "루크는 당신의 옆에서 사망자 명단을 정리했다. 출생자 명단의 수보다 사망자 명단의 수가 훨씬 많았다.<br>그는 숫자마저 삐뚤삐뚤 쓰고 있었다.",
                            "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다."
                        ]
                    )
                }
            ], player, { onEnd });
            return;
        }

        startScene([
            {
                type : "text",
                value : pickRandom(
                    noSmoking
                    ? [
                        "사탕을 아작아작 씹어먹는 것을 보아 그의 기분이 안 좋아보인다. 당신은 그에게 괜찮냐고 물었고 그는 그 말에 짜증을 냈다. <br><br>\"네 일이나 신경써, 씨발.\"",
                        "루크는 사탕을 입안에서 굴리며 당신을 보았다. <br><br>\"씨발, 왜?\"<br><br>할 말이 있으면 하라는 듯이 그는 턱짓을 해보였다.",
                        "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다."
                    ]
                    : [
                        "그는 당신의 옆에서 경비병 순찰을 정비했다. 표가 빼곡하다. 그리고 그의 글씨는 삐뚤삐뚤 개판이다.",
                        "그는 당신이 와도 당신을 거들떠도 보지 않고 담배를 피웠다. 새벽밤, 담뱃불만이 어렴풋이 피어올랐다."
                    ]
                )
            }
        ], player, { onEnd });
        return;
    },

    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "luke_giveFood"
        });

        if (player.flags?.bandit_luke_followed && !player.flags?.luke_banditFollowTalk_seen){
            choices.push({
                text: "그웰에 대해 묻는다.",
                scene: NPC_DATA.luke.scenes.luke_banditFollowTalk
            });
        }

        if (player.flags?.bandit_luke_followed && !player.flags?.luke_banditFollowTalk2_seen){
            choices.push({
                text: "단검에 대해 묻는다.",
                scene: NPC_DATA.luke.scenes.luke_banditFollowTalk2
            });
        }

        if (player.flags?.luke_firstLove_seen && !player.flags?.luke_cigarette_01_seen){
            choices.push({
                text: "루크가 담배를 어떻게 피게 됐는지 묻는다.",
                scene: NPC_DATA.luke.scenes.luke_cigarette_01
            });
        }

        if (player.flags?.common_route_quest_06_mimicAbominationRumor_03 && !player.flags?.luke_ask_about_hisCheek){
            choices.push({
                text: "루크에게 뺨은 괜찮냐고 묻는다.",
                scene: NPC_DATA.luke.scenes.luke_ask_about_hisCheek
            });
        }

        choices.push({ text: "돌아간다", action: "luke_talk" });

        startScene([
            {
                type : "text",
                value : "무엇에 대해 물어볼까."
            },
            {
                type : "choice",
                choices
            }
        ], player);
    },


    //스토리 이벤트
    undercity_03_barrack_event(player){
        startScene(
            NPC_DATA["luke"].scenes.undercity_03_barrack_event,
            player,
            {
                onEnd : () => finishUndercity03BarrackEvent(player)
            }
        );
    },

    barrack_mock_fight: (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신이 한번 더 비웃자 루크는 잠시 말이 없었다. 그러더니 그는 폭소했다. 감히, 네가, 날, 비웃어? 웃음 소리가 끝나기도 전에 그의 주먹이 당신의 시야를 가득 채운다."
                ]
            }
        ], player, {
            onEnd : () => startLukeBarrackFight(player)
        });
    },


    //반복이벤트
    normalEncounter: (player) => {
        startScene(NPC_DATA["luke"].scenes.luke_normalEncounter, player, {
            onEnd: () => startScene(getLocationScene(player), player)
            });
    },

    normalEncounter_submissive: (player) => {
        runScene(
            NPC_DATA["luke"].scenes.luke_normalEncounter_submissive,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    },
    normalCheck: (player) => {
        startScene(NPC_DATA["luke"].scenes.luke_normalCheck, player, {
            onEnd: () => startScene(getLocationScene(player), player)
            });
    },
    normalCheck_submissive: (player) => {
        runLukeNormalCheckSubmissive(player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    patrol_event: (player) => {
        const patrolEvents = [
            ...NPC_DATA["luke"].scenes.luke_patrol_events
        ];
        
        const canUseUnsmoke =
        player.flags?.luke_told_stop_smoking &&
        NPC_DATA["luke"].emotion.affection > 50;
        
        if (canUseUnsmoke) {
            patrolEvents.push(
                ...NPC_DATA["luke"].scenes.luke_patrol_unsmoke_events
            );
        } else {
            patrolEvents.push(
                ...NPC_DATA["luke"].scenes.luke_patrol_smoke_events
            );
        }
        
        const scene = patrolEvents[Math.floor(Math.random() * patrolEvents.length)];
        startScene(scene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    missing_player_event_answer_sayYes: (player) => {
        const isMale = player.gender === "male";
        
        const scene = isMale
        ? NPC_DATA["luke"].scenes.luke_missing_player_event_sayYes_male
        : NPC_DATA["luke"].scenes.luke_missing_player_event_sayYes_female;
        
        startScene(scene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    patience_limit_accept: (player) => {
        const scene = player.gender === "male"
        ? NPC_DATA["luke"].scenes.luke_patience_limit_accept_male
        : NPC_DATA["luke"].scenes.luke_patience_limit_accept_female;
        startScene(scene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },
    
    patience_limit_refuse: (player) => {
        const luke = NPC_DATA["luke"].emotion;
        const forceScene = player.gender === "male"
        ? NPC_DATA["luke"].scenes.luke_patience_limit_force_male
        : NPC_DATA["luke"].scenes.luke_patience_limit_force_female;
        
        const forceCondition =
        luke.fear > 60 ||
        luke.dominance > luke.affection;
        
        if (forceCondition) {
            startScene(forceScene, player, {
                onEnd: () => startScene(getLocationScene(player), player)
            });
            return;
        }
        
        if (luke.affection > 70) {
            startScene(
                NPC_DATA["luke"].scenes.luke_patience_limit_respect,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }
        
        const playerStr = player.stats?.str || 0;
        
        if (playerStr >= 15) {
            startScene(
                NPC_DATA["luke"].scenes.luke_patience_limit_escape,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }
        
        startScene(forceScene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    cooking_event_01_refuse: (player) => {
        const luke = NPC_DATA["luke"].emotion;        
        
        if (luke.dominance > 50) {
            startScene(
                NPC_DATA["luke"].scenes.luke_cooking_event_01_refuse_no,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }

        startScene(NPC_DATA["luke"].scenes.luke_cooking_event_01_refuse_yes, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });       
    }
})

registerGiftActions("luke");

window.luke_normalEncounter_runFailByGender = function(player, options){
    const affection = NPC_DATA["luke"].emotion.affection || 0;
    const isMale = player.gender === "male";

    let scene;

    if (affection > 40){
        scene = isMale
            ? NPC_DATA["luke"].scenes.luke_normalEncounter_fail_male_highAffection
            : NPC_DATA["luke"].scenes.luke_normalEncounter_fail_female_highAffection;

        runScene(scene, player, options);
        return true;
    }

    const effects = isMale
        ? [
            { target: "player", key: "hp", amount: -35 },
            { target: "player", key: "stamina", amount: -40 },
            { target: "player", key: "trauma", amount: 10 },
            { target: "sensitivity", key: "aSensitivity", amount: 30 },
            { "target" : "fluid", "key" : "a", "amount" : 25},
            { target: "sensitivity", key: "mSensitivity", amount: 20 },
            { "target" : "fluid", "key" : "m", "amount" : 25},
            { target: "npc", npc: "luke", key: "lust", amount: 15 },
            { target: "npc", npc: "luke", key: "fear", amount: 10 },
            { target: "npc", npc: "luke", key: "dominance", amount: 10 },
            { target: "time", amount: 40 }
        ]
        : [
            { target: "player", key: "hp", amount: -35 },
            { target: "player", key: "stamina", amount: -40 },
            { target: "player", key: "trauma", amount: 10 },
            { target: "sensitivity", key: "cSensitivity", amount: 30 },
            { target : "fluid", key : "c", amount : 25},
            { target: "sensitivity", key: "mSensitivity", amount: 20 },
            { target : "fluid", key : "m", amount : 25},
            { target: "sensitivity", key: "aSensitivity", amount: 30 },
            { target : "fluid", key : "a", amount : 25},
            { target: "npc", npc: "luke", key: "lust", amount: 15 },
            { target: "npc", npc: "luke", key: "fear", amount: 15 },
            { target: "npc", npc: "luke", key: "dominance", amount: 10 },
            { target: "time", amount: 40 }
        ];

    effects.forEach(effect => applyEffect(effect, player));

    scene = isMale
        ? NPC_DATA["luke"].scenes.luke_normalEncounter_fail_male
        : NPC_DATA["luke"].scenes.luke_normalEncounter_fail_female;

    startScene(scene, player, options);
    return true;
};

window.runLukeNormalCheckDexFail = function(player){
    const isMale = player.gender === "male";

    const effects = isMale
        ? [
            { target: "time", amount: 3 },
            { target: "npc", npc:"luke", key: "lust", amount: 10 },
            { target: "npc", npc:"luke", key: "dominance", amount: 3 },
            { target: "player", key: "arousal", amount: 8 },
            { target: "sensitivity", key: "aSensitivity", amount: 3 }
        ]
        : [
            { target: "time", amount: 3 },
            { target: "npc", npc:"luke", key: "lust", amount: 15 },
            { target: "npc", npc:"luke", key: "dominance", amount: 3 },
            { target: "player", key: "arousal", amount: 12 },
            { target: "sensitivity", key: "cSensitivity", amount: 5 },
            { target: "sensitivity", key: "aSensitivity", amount: 3 }
        ];

    effects.forEach(effect => applyEffect(effect, player));
};

window.runLukeNormalCheckSubmissive = function(player, options){
    const isMale = player.gender === "male";

    if (isMale){
        const effects = [
            { target: "time", amount: 6 },
            { target: "player", key: "arousal", amount: 15 },
            { target: "sensitivity", key: "aSensitivity", amount: 6 },
            { target: "npc", npc: "luke", key: "dominance", amount: 5 }
        ];

        effects.forEach(effect => applyEffect(effect, player));

        startScene(
            NPC_DATA["luke"].scenes.luke_normalCheck_submissive_male,
            player,
            options
        );

        return true;
    }

    const effects = [
        { target: "time", amount: 6 },
        { target: "player", key: "arousal", amount: 20 },
        { target: "sensitivity", key: "cSensitivity", amount: 6 },
        { target: "sensitivity", key: "aSensitivity", amount: 6 },
        { target: "npc", npc: "luke", key: "dominance", amount: 5 }
    ];

    effects.forEach(effect => applyEffect(effect, player));

    startScene(
        NPC_DATA["luke"].scenes.luke_normalCheck_submissive_female,
        player,
        options
    );

    return true;
};

window.startLukeBarrackFight = function(player){
    startBattle("luke", player, {
        noEscape: true,

        onWin: () => {
            startScene(NPC_DATA["luke"].scenes.undercity_03_barrack_fight_win, player, {
                onEnd: () => finishUndercity03BarrackEvent(player)
            });
        },

        onSkipDefeat: () => {
            startScene(NPC_DATA["luke"].scenes.undercity_03_barrack_fight_lose, player, {
                onEnd: () => finishUndercity03BarrackEvent(player)
            });
        }
    });

    return true;
};

window.finishUndercity03BarrackEvent = function(player){
    player.location = "barracks";

    player.flags = player.flags || {};
    player.flags.undercity_03_luke_barrack_event_seen = true;
    player.flags.undercity_story_03_unlocked = true;

    savePlayer(player);

    startScene(getLocationScene(player), player);
};

window.setLukeStopSmokingFlag = function(player){
    player.flags = player.flags || {};
    player.flags.luke_told_stop_smoking = true;
    savePlayer(player);
};

function isLukeNoSmoking(player){
    return player.flags?.luke_told_stop_smoking &&
           NPC_DATA["luke"].emotion.affection > 50;
}

window.enterLukeInner = function(player){
    enterDungeon(player, lukeInner);
    return true;
};

//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.luke = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startLukeChocoChocoGift(player, item, grade);
        return;
    }
};

function startLukeChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "대체 어디서 나타난 건지, 빈민가 거리를 지나가던 당신의 뒤로 루크의 팔이 뻗어왔다. 그는 당신의 어깨를 잡더니 당신의 주머니를 뒤지기 시작했다. 당신의 수제 초콜릿 하나를 꺼낸 루크는 킥킥 웃으며 당신의 허락도 없이 초콜릿을 먹었다." +
                    "<br><br>\"왜, 씨발? 어차피 나 주려고 만든 거 아냐?\"<br><br>" +
                    "당신의 초콜릿을 음미하던 루크는 놀랍다는 듯 당신을 내려다보았다." +
                    "<br><br>\"...오, 존맛.\"<br><br>" +
                    "그러더니 그는 자기가 가고 나면 주머니를 확인해보라고 말했다. 루크는 남은 초콜릿을 먹으며 멀어져갔다. 당신은 그의 뒷모습을 바라보다가 문득 주머니에 손을 넣었다. 어라, 주머니 안에는 어느새 초콜릿 사탕 하나가 들어 있었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "luke");
                    player.location = "darkStreet";
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    if (grade === "normal"){
        startScene([
            {
                type : "text",
                value : [
                    "대체 어디서 나타난 건지, 빈민가 거리를 지나가던 당신의 뒤로 루크의 팔이 뻗어왔다. 그는 당신의 어깨를 잡더니 당신의 주머니를 뒤지기 시작했다. 당신의 수제 초콜릿 하나를 꺼낸 루크는 킥킥 웃으며 당신의 허락도 없이 초콜릿을 먹었다." +
                    "<br><br>\"왜, 씨발? 어차피 나 주려고 만든 거 아냐?\"<br><br>" +
                    "당신의 초콜릿을 음미하던 루크는 당신의 표정을 보더니 당신의 머리를 꾹꾹 눌렀다." +
                    "<br><br>\"아니야? 그래도 상관없어.\"<br><br>" +
                    "그러더니 그는 자기가 가고 나면 주머니를 확인해보라고 말했다. 루크는 남은 초콜릿을 먹으며 멀어져갔다. 당신은 그의 뒷모습을 바라보다가 문득 주머니에 손을 넣었다. 어라, 주머니 안에는 어느새 초콜릿 사탕 하나가 들어 있었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "luke");
                    player.location = "darkStreet";
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    if (grade === "bad"){
        startScene([
            {
                type : "text",
                value : [
                    "대체 어디서 나타난 건지, 빈민가 거리를 지나가던 당신의 뒤로 루크의 팔이 뻗어왔다. 그는 당신의 어깨를 잡더니 당신의 주머니를 뒤지기 시작했다. 당신의 수제 초콜릿 하나를 꺼낸 루크는 킥킥 웃으며 당신의 허락도 없이 초콜릿을 먹었다." +
                    "<br><br>\"왜, 씨발? 어차피 나 주려고 만든 거 아냐?\"<br><br>" +
                    "당신의 초콜릿을 음미하던 루크는 놀랍다는 듯 당신을 내려다보았다." +
                    "<br><br>\"...뭔 맛이야, 이거. 이거 나 빼고 먹어주는 사람이 있겠냐?\"<br><br>" +
                    "그러더니 그는 자기가 가고 나면 주머니를 확인해보라고 말했다. 루크는 남은 초콜릿을 먹으며 멀어져갔다. 당신은 그의 뒷모습을 바라보다가 문득 주머니에 손을 넣었다. 어라, 주머니 안에는 어느새 초콜릿 사탕 하나가 들어 있었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "luke");
                    player.location = "darkStreet";
                    savePlayer(player);
                }
            }
        ], player);
        return;
    }
}

//연말 이벤트
window.YEAR_END_HANDLERS.luke = function(player){

    startScene([
        {
            type : "text",
            value : [
                "루크는 당신의 방에 들어서자마자 당신의 입술을 자신의 입술로 눌러버렸다. 갑작스러운 키스에 페이스를 잃은 당신은 키스가 길어지자 숨을 헐떡거리기 시작했다. 거칠게 숨을 몰아내쉬는 당신을 가늘게 뜬 눈으로 바라보던 루크는 낮게 웃었다. 결국 기침을 하며 떨어진 당신은 루크를 올려다보았다." +
                "<br><br>\"뭐, 씨발, 이런 거 하고 싶었던 거 아니야?\"<br><br>" +
                "그는 당신의 머리를 제 손으로 꾹꾹 누르며 장난스럽게 웃었다. 그는 아무렇지도 않게 당신의 침대를 차지하더니 자신의 옆자리를 툭툭 쳤다. 당신이 다가오자 루크는 그대로 팔을 잡아끌어 당신을 제 무릎 위에 앉혔다. 그의 턱이 당신의 정수리를 누른다." +
                "<br><br>\"날도 날이니까 소원 하나 들어주리?\"<br><br>" +
                "당신이 고개를 들려고 하자 루크는 턱에 힘을 주며 당신이 고개를 들지 못하게 했다." +
                "<br><br>\"말해봐. 한번 들어는 줄게.\"<br><br>" +
                "키득거리는 웃음, 그리고 당신의 몸에 자꾸만 겹쳐지는 그의 그림자, 그는 오늘 밤 당신을 놓아줄 생각이 없는 것 같다." 
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "luke")
    });
};
window.YEAR_END_LETTER_HANDLERS.luke = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "루크에게서 온 편지다.<br><br><br>" +
                "<span class='log-luke'>[어제 네 집 앞까지 갔는데 내가 깽판치려다가 말았다. ㅋㅋㅋ이 값은 나중에 톡톡히 받아낼 테니까 기억하고 있어라?]</span><br><br>" +
                "<span class='log-luke'>[값 치르기 싫다고?]</span><br><br>" +
                "<span class='log-luke'>[네게 거부권이 언제부터 있었다고?]</span><br><br>" +
                "<span class='log-luke'>[입술 간수나 잘 해. 다음 번에 나 만나면 부르틀 대로 부르틀 테니까.]</span><br><br>"
            ]
        }
    ], player, {
        onEnd : next
    });
};

//버섯이벤트
window.MUSHROOM_ROMANCE_HANDLERS.luke = function(player, next){
    const mushroomType =
        getMushroomRomanceType();

    if (mushroomType === "tasty"){
        startScene([
            {
                type : "text",
                value : [
                    "\"...뭐야?\"<br><br>" +
                    "루크는 주변을 둘러보더니 여기가 어디냐고 물었다. 당신이 설명을 해주자 루크는 어이없다는 듯이 낄낄 웃으며 당신은 아직도 애니메이션을 믿냐고 물었다. 버섯맨이 있는 건 알지만 머쉬룸킹덤은 만화에서나 나오는 거 아니냐고 그는 낄낄거렸다." +
                    "<br><br>\"이 버섯을 먹으라고.\"<br><br>" +
                    "그는 아무렇지도 않게 버섯을 먹었다. \"오, 맛있는데?\", 그는 씹고 뜯고 맛보고 즐기고 씹고 뜯고 맛보고 즐기고~ 그대로 당신에게 키스했다. 버섯의 맛이 당신의 입안에 맴돈다. 맛있긴 하다...!" +
                    "<br><br>어디선가 박수소리가 들렸다. 버섯맨들은 루크의 저돌성에 감격한 모양이다. 버섯버섯...! 키스가 끝나자 당신의 눈앞이 번쩍였다. 루크의 어이없어 하는 소리와 함께 당신은 하얀 빛에 삼켜졌다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("luke", "affection", 3);
                    changeSensitivity("player", "mSensitivity", 7);
                    changeStamina(player, 10);
                    passTime(player, 20);
                }
            }
        ], player, {
            onEnd : next
        });
        return;
    }

    if (mushroomType === "poison"){
        startScene([
            {
                type : "text",
                value : [
                    "\"응?\"<br><br>" +
                    "루크는 주변을 둘러보며 사태 파악을 했다. 안내문을 확인한 그는 버섯을 돌리며 자신이 얼마나 보고 싶었으면 이런 쇼까지 하는 거냐며 낄낄 웃어댔다. 당신이 아무리 아니라고 말해도 그는 당신을 계속 놀렸다." +
                    "<br><br>\"어쨌든 이거 먹....\"<br><br>" +
                    "루크가 잠시 말을 멈췄다. 그러더니 그는 아무 말 없이 버섯을 거의 다 먹고 손톱보다 더 적은 부분만 당신의 입에 넣어주었다." +
                    "<br><br>\"너 나한테 빚진 거다?\"<br><br>" +
                    "당신은 루크의 이마 위로 식은땀이 송골송골 맺힌 것을 보았다. 당신이 식은땀을 닦아주자 루크는 웃으며 아무리 그래도 빚은 안 깎아줄 거라고 장난을 쳤다." +
                    "<br><br>\"곧 찾아갈 테니까 입술 닦고 기다려라?\"<br><br>" +
                    "눈앞에 빛이 번쩍이자 루크는 평소와 똑같은 목소리로 당신에게 웃으며 말했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeHP(player, -5);
                    changeNPCEmotion("luke", "affection", 1);
                    changeNPCEmotion("luke", "dominance", 10);
                    passTime(player, 20);
                }
            }
        ], player, {
            onEnd : next
        });
        return;
    }

    startScene([
        {
            type : "text",
            value : [
                "\"...오.\"<br><br>" +
                "입술 모양의 버섯을 보며 루크는 이 버섯에 입술을 묻으면 볼 만할 것 같다고 낄낄거렸다. 그는 입꼬리 쪽을 한번 맛보더니 씩 웃으며 나머지는 당신이 다 먹으라고 말했다. 그리고 그는 당신의 뒷목을 잡아 고정한 뒤 그 입술 모양의 버섯을 당신의 입술에 비벼왔다. 당신은 어쩔 수 없이 입술 모양의 버섯을 먹었다." +
                "<br><br>...점점 몸이 뜨거워진다. 루크는 당신이 이 버섯을 대신 먹어줬으니 빚은 갚겠다고 말하며 손을 아래로 내렸다. 그의 손가락이 당신의 구멍을 파고든다. 당신이 다리를 오므리려고 하자 그는 장난스럽게 혀를 차며 다시 벌려버렸다." +
                "<br><br>\"왜 그래, {lukeTitle}? 너무 좋아서 쑥스러워?\"<br><br>" +
                "발정이 난 당신은 평소보다 더 많이 그의 손가락에 반응했고, 더 많이 가버렸다.... 버섯들의 환호성과 함께 당신은 늘어진 채로 하얀 빛에 안겨졌다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeArousal(player, 100);
                changeNPCEmotion("luke", "lust", 25);
                changeNPCEmotion("luke", "dominance", 10);
                changeSensitivity("player", "mSensitivity", 4);
                changeSensitivity("player", "cSensitivity", 7);
                changeSensitivity("player", "aSensitivity", 7);
                passTime(player, 55);
            }
        }
    ], player, {
        onEnd : next
    });
};