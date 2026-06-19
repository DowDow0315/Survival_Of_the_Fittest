function processMatinText(text, player){
    return text.replaceAll("{matinTitle}", getMatinTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getMatinTitle(player){
    if (NPC_DATA["matin"].emotion.affection > 90) return "보석";
    else if(NPC_DATA["matin"].emotion.affection > 70) return "바보녀석";
    return "너";
}

registerActions("matin",{
    //처음이벤트
    firstMeeting: (player) => {
        player.flags = player.flags || {};
        player.flags.metMatin = true;
        localStorage.setItem("playerData", JSON.stringify(player));
        startScene(NPC_DATA["matin"].scenes.matin_firstMeeting, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },

    firstMeeting_defiant: (player) => {
        changeEmotion("matin", "rage", 5);
        startScene(NPC_DATA["matin"].scenes.matin_firstMeeting_defiant, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_neutral: (player) => {
        startScene(NPC_DATA["matin"].scenes.matin_firstMeeting_neutral, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_submissive: (player) => {
        changeEmotion("matin", "affection", 5);
        startScene(NPC_DATA["matin"].scenes.matin_firstMeeting_submissive, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    //개인 이벤트

    //스토리이벤트

    //주점알바 시작
    work_defiant: (player)=> {
        startScene(NPC_DATA["matin"].scenes.matin_work_defiant, player, {
            onEnd: () => startTavernWork(player)
        });
    },

    work_neutral: (player) => {
        changeEmotion("matin", "affection", 2);
        startScene(NPC_DATA["matin"].scenes.matin_work_neutral, player, {
            onEnd: () => startTavernWork(player)
        });
    },

    work_submissive : (player) => {
        changeEmotion("matin", "affection", 4);
        changeEmotion("matin", "dominance", 2);
        startScene(NPC_DATA["matin"].scenes.matin_work_submissive, player, {
            onEnd: () => startTavernWork(player)
        });
    },

    //주점대화로그
    talk: (player) => {
        if (
            player.flags?.matinLocketTaken &&
            !player.flags?.matin_graveyard_01_done &&
            !player.flags?.matin_graveyard_01_failed
        ){
            startMatinGraveyardReturnEvent(player);
            return;
        }

        startScene([
            {
                type: "text",
                value: "마틴은 당신이 자신에게 다가오는 걸 보고서도 아무 말도 하지 않았다. 그는 그저 하다만 일을 할 뿐이다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "matin_smallTalk" },
                    { text: "다른 얘기를 한다", action: "matin_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["matin"].emotion.affection || 0;
        const rage = NPC_DATA["matin"].emotion.rage || 0;
        const onEnd = () => {
            startScene(getLocationScene(player), player);
        };

        if (rage >= 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "마틴은 당신을 보자마자 표정을 굳혔다.<br><br>\"오늘은 그만. 더 건드리면 나도 참지 않아.\"",
                        "마틴은 닦던 잔을 내려놓고 당신을 노려보았다. 공기가 차갑게 가라앉는다.<br><br>\"용건 없으면 나가.\""
                    ])
                }
            ], player, { onEnd });
            return;
        }

        if (rage >= 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "마틴은 대답 대신 짧게 혀를 찼다.",
                        "당신이 말을 걸자 마틴은 한 박자 늦게 시선을 돌렸다.<br><br>\"짧게 말해.\""
                    ])
                }
            ], player, { onEnd });
            return;
        }

        if (affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "마틴은 당신이 곁에 오자 몸을 움찔거리긴 했지만 유리잔을 닦는 일은 멈추지 않았다. 당신이 그를 빤히 바라보자 그는 작게 한숨을 쉬더니 은근히 당신 쪽으로 몸을 기울였다. <br><br>\"일하는데 방해돼.\"<br><br>하지만 저리 가라는 소리는 하지 않는다.",
                        "마틴은 답지 않게 유리잔을 깨뜨릴 뻔했다. 그는 헛기침을 하더니 다시 유리잔을 닦았다. 당신은 턱을 괴고 그가 유리잔을 닦는 모습을 지켜보았다.",
                        "마틴의 귀끝이 좀 붉다. 당신은 손을 뻗어 그의 귀를 만졌다. 귀에 있는 피어싱에 당신의 손가락이 닿자 그는 움찔하긴 했지만 아무 말도 하지 않았다. 이제 붉은색이 그의 얼굴에까지 번지기 시작했다.",
                        "\"...나는 말재주가 없어. 너도 알잖아.\"<br><br>당신의 시선 집중에 그는 어쩔 줄을 모르는 거 같다. 그는 그릇을 더 박박 닦으며 당신의 시선을 피했다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "당신이 손을 뻗어 그의 귀를 만지려고 하자 마틴은 뒤로 피했다. 별 말은 안 했지만 만지지 말라고 경고하는 거 같다.",
                        "\"너...\"<br><br>마틴은 당신에게 무슨 말을 하려다가 그만두었다. 그는 한숨을 쉬며 당신에게서 시선을 돌렸다. 하지만 그후로도 마틴이 당신을 흘낏흘낏 쳐다보는 건 느껴진다.",
                        "마틴은 말없이 요리를 하고 있다. 당신이 요리에 관심을 보이자 그는 주춤하다가 숟가락을 내밀었다. 당신은 그의 요리를 받아먹었다.<br><br>\"용건 끝났으면 가. {matinTitle}.\""
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "마틴은 당신이 자신의 앞에 앉든 말든 신경쓰지 않는다. 그는 손님들 대접과 퀘스트 관리에 바쁜 모양이다.",
                        "마틴은 당신을 보더니 성가시다는 듯 인상을 찌푸렸다. <br><br>\"저리 가.\"<br><br>그는 당신을 쳐다보지도 않고 싸늘하게 말했다."
                    ])
                }
            ], player, { onEnd });
        }
    },

    otherTalk : (player) => {
        const choices = [];



        choices.push({ text: "돌아간다", action: "matin_talk" });

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
    
    //주점 장비 강화 로그
    open_matinEnhance: (player)=>{
        player.flags ??= {};
        if (!player.flags.matinEnhanceOpened){
            player.flags.matinEnhanceOpened = true;
            
            startScene([
                {
                    type:"text",
                    value: "당신은 마틴이 누군가의 무기를 강화해주는 것을 보았다. 유리잔을 닦을 때와는 다른 손길이었지만, 여전히 그의 손길은 섬세했다. 그는 당신의 시선을 눈치채고 돌아보았다." +
                           "<br><br>\"...그거 강화할 거야?\"<br><br>"+
                           "마틴은 무기나 장비를 강화하는 걸 좋아하지는 않는 기색이었다. 하지만 그는 턱짓을 하더니 임시방편이라도 필요하면 말하라고 말했다. <br><br>" +
                           "\"눈대중으로 배운 거라서 기대하지는 마.\"<br><br>"
                }
            ], player,{
                onEnd: ()=> openEnhanceMenu(player, "matin")
            });
            
            savePlayer(player);
            return;
        }
        openEnhanceMenu(player, "matin");
    },
})

function hasMatinLocket(player){
    return player.inventory.some(item =>
        item.name === ITEMS.misc.matinLocket.name
    );
}

function startMatinGraveyardReturnEvent(player){
    if (hasMatinLocket(player)){
        startScene(MATIN_GRAVEYARD_RETURN_SUCCESS, player, {
            onEnd: () => completeMatinGraveyardQuest(player)
        });
    } else {
        startScene(MATIN_GRAVEYARD_RETURN_SOLD, player, {
            onEnd: () => failMatinGraveyardQuest(player)
        });
    }
}