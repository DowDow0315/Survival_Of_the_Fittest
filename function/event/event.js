window.EVENTS = window.EVENTS || [];

const ENEMY_POOLS = {
    townEntrance: [
        { id: "rapistM", weight: 60 },
        { id: "rapistF", weight: 40 }
    ],
    townStreet: [
        { id: "rapistM", weight: 50 },
        { id: "rapistF", weight: 40 },
        { id: "slime", weight: 10}
    ],
    forest: [
        { id: "slime", weight: 40 },
        { id: "goblin", weight: 40 },
        { id: "rapistM", weight: 10 },
        { id: "rapistF", weight: 10 }
    ],
    deepForest: [
        { id: "goblin", weight: 70 },
        { id: "flower", weight: 10 },
        { id: "slime", weight: 10 },
        { id: "bandit1", weight: 8 },
        { id : "bandit2", weight : 2}
    ],
    graveyard : [
        { id: "skeleton", weight : 100}
    ],
    banditForest : [
        { id: "bandit1", weight: 70 },
        { id: "bandit2", weight: 30 }
    ],
    guardPost1 : [
        { id: "bandit1", weight : 5 },
        { id: "bandit2", weight : 10 },
        { id : "infectedSmall", weight : 35},
        { id : "infected", weight : 50 }
    ],
    guardPost2 : [
        { id : "infectedSmall", weight : 20 },
        { id : "bandit2", weight : 5 },
        { id : "infected", weight : 40 },
        { id : "infectedSoldier", weight : 35 }
    ]
};

const WEEK_TIME = 1680;

function getCurrentWeek(player){
    return Math.floor((Number(player?.time) || 0) / WEEK_TIME);
}

function shouldTriggerEricWeeklyPayment(player){
    if (!player || player.inBattle || player.inEvent) return false;

    const currentWeek = getCurrentWeek(player);
    if (currentWeek < 1) return false;

    const lastPaidWeek = Number.isInteger(player.lastWeeklyPaymentWeek)
        ? player.lastWeeklyPaymentWeek
        : 0;

    return lastPaidWeek < currentWeek;
}

function triggerEricWeeklyPayment(player){
    player.inEvent = true;
    player.lastWeeklyPaymentWeek = getCurrentWeek(player);
    localStorage.setItem("playerData", JSON.stringify(player));
    weeklyPayment(player);
    return true;
}

const EVENTS = [
    //npc 이벤트
    //에릭
    {
        id : "eric_victim_collect_event01",
        once : true,
        
        condition : (player) =>
            player.justMoved &&
            player.location === "townStreet" &&
            player.flags?.eric_victim_collect_event01_unlocked &&
            !player.flags?.eric_victim_collect_event01_seen,
            
        action : (player) => {
            player.flags.eric_victim_collect_event01_seen = true;
            savePlayer(player);
            
            startScene(
                NPC_DATA["eric"].scenes.eric_victim_collect_event01,
                player,
                {
                    onEnd : () => {
                        startScene(getLocationScene(player), player);
                    }
                }
            );
        }
    },

    //루크
    {
        id: "luke_firstMeeting",
        once: true,
        condition: (player) =>
            player.location === "townStreet" &&
            !player.flags.metLuke,
        
        action: (player) => {
            player.flags.metLuke = true;
            startScene(
                NPC_DATA["luke"].scenes.luke_firstMeeting,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
        }
    },
    {
        id: "luke_normalEncounter",
        condition: (player) =>
            player.justMoved &&
            player.location === "townStreet" &&
            player.flags.metLuke &&
            !player.flags.luke_softRoute &&
            Math.random() < 0.1,
            
        action: (player) => {
            ACTIONS["luke_normalEncounter"](player);
        }
    },
    {
        id : "luke_normalCheck",
        condition: (player) =>
            player.justMoved &&
            player.location === "townEntrance" &&
            player.flags.metLuke &&
            !player.flags.luke_softRoute &&
            Math.random() < 0.2,
            
        action: (player) => {
            ACTIONS["luke_normalCheck"](player);
        }
    },
    {
        id: "luke_patrol_event",
        condition : (player) =>
            player.justMoved &&
            player.flags?.undercity_story_04_done &&
            (player.location === "townEntrance" ||
            player.location === "townStreet" ||
            player.location === "darkStreet") &&
            (player.time >= 20 || player.time <= 4) &&
            NPC_DATA["luke"].emotion.affection >= 20 &&
            NPC_DATA["luke"].emotion.rage <= 50 &&
            Math.random() < 0.1,

        action : (player) => {
            ACTIONS["luke_patrol_event"](player);
        }
    },

    //소라
    {
        id: "sora_firstMeeting",
        once: true,
        condition: (player) =>
        player.location === "shop" &&
        !player.flags.metSora,
        
        action: (player) => {
            ACTIONS["sora_firstMeeting"](player);
        }
    },
    {
        id : "sora_shop_random_01",     
        condition: (player) =>
            player.justMoved &&
            player.location === "shop" &&
            NPC_DATA["sora"].emotion.affection > 30 &&
            Math.random() < 0.1,

        action : (player) => {
            startSoraShopRandomEvent01(player);
        }
    },
    {
        id: "sora_sewer_event_01",
        once: true,
        condition: (player) =>
            player.dungeon?.active &&
            player.dungeon.id === "sewer" &&
            player.flags.undercity_story_01_done &&
            !player.flags.sora_sewer_event_seen,
    
            action: (player) => {
                startSoraSewerEvent01(player);
            }
        },

    //유리
    {
        id: "yuri_firstMeeting",
        once: true,
        condition: (player) =>
        player.location === "shelter" &&
        !player.flags.metYuri,
        
        action: (player) => {
            ACTIONS["yuri_firstMeeting"](player);
        }
    },

    {
        id : "yuri_goblinShelter_event",
        once : true,
        
        condition : (player) =>
            player.location === "shelter" &&
            player.flags?.undercity_story_04_done &&
            !player.flags?.yuri_goblinShelter_event_seen &&
            (
                getTimePeriod(player) === "night" ||
                getTimePeriod(player) === "dawn"
            ),
            
        action : (player) => {
            startYuriGoblinShelterEvent(player);
        }
    },

    //마틴
    {
    id: "matin_firstMeeting",
    once: true,
    condition: (player) =>
        player.location === "tavern" &&
        !player.flags.metMatin,

    action: (player) => {
        ACTIONS["matin_firstMeeting"](player);
    }
    },
    {
        id : "matin_graveyard_event_01",
        once : true,

        condition: (player) =>
            player.location === "tavern" &&
        player.flags?.undercity_story_01_done &&
        !player.flags?.matin_graveyard_event_seen,

        action : (player) => {
            startMatinGraveyardEvent01(player);
        }
    },
    {
        id : "matin_enhance_after_event_01",
        once : true,

        condition : (player) =>
            player.justMoved &&
            player.location === "tavern" &&
            player.flags?.matinEnhancedOnce &&
            !player.flags?.matin_enhance_after_event_01_seen,

        action : (player) => {
            player.flags.matin_enhance_after_event_01_seen = true;
            savePlayer(player);

            startScene(
                NPC_DATA["matin"].scenes.matin_enhance_after_event_01,
                player,
                {
                    onEnd : () => startScene(getLocationScene(player), player)
                }
            );
        }
    },


    //니콜라이
    {
        id: "nikolai_firstMeeting",
        once: true,
        condition: (player) =>
            player.location === "gloryHole" &&
            !player.flags.metNikolai,
            
        action: (player) => {
            player.flags.metNikolai = true;
            
            startScene(
                NPC_DATA["nikolai"].scenes.nikolai_firstMeeting,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
        }
    },
    {
        id : "nikolai_customer_list_event",
        once : true,
        
        condition : (player) =>
            player.justMoved &&
            player.location === "gloryHole" &&
            player.flags?.metNikolai &&
            (player.flags?.gloryHoleTotalEarn || 0) >= 5000 &&
            NPC_DATA["nikolai"].emotion.affection >= 15 &&
            !player.flags?.nikolai_customer_list_event_seen,
            
        action : (player) => {
            player.flags.nikolai_customer_list_event_seen = true;
            savePlayer(player);
            
            startScene(
                NPC_DATA["nikolai"].scenes.nikolai_customer_list_event,
                player,
                {
                    onEnd : () => startScene(getLocationScene(player), player)
                }
            );
        }
    },
    {
        id : "nikolai_dayoff_event",
        once : true,
        
        condition : (player) =>
            player.justMoved &&
            player.location === "gloryHole" &&
            player.flags?.nikolai_customer_list_event_seen &&
            NPC_DATA["nikolai"].emotion.affection >= 30 &&
            !player.flags?.nikolai_dayoff_event_seen,
            
        action : (player) => {
            player.flags.nikolai_dayoff_event_seen = true;
            savePlayer(player);
            
            startScene(
                NPC_DATA["nikolai"].scenes.nikolai_dayoff_event,
                player,
                {
                    onEnd : () => startScene(getLocationScene(player), player)
                }
            );
        }
    },
    {
        id : "nikolai_cupcake_random_event",
        
        condition : (player) =>
            player.justMoved &&
            player.location === "gloryHole" &&
            player.flags?.nikolai_dayoff_event_seen &&
            NPC_DATA["nikolai"].emotion.affection >= 40 &&
            Math.random() < 0.05,
            
        action : (player) => {
            startScene(
                NPC_DATA["nikolai"].scenes.nikolai_cupcake_random_event,
                player,
                {
                    onEnd : () => startScene(getLocationScene(player), player)
                }
            );
        }
    },
    {
        id : "nikolai_deric_intro_event",
        once : true,
        
        condition : (player) =>
            player.justMoved &&
            player.location === "gloryHole" &&
            player.flags?.nikolai_dayoff_event_seen &&
            (player.flags?.gloryHoleTotalEarn || 0) >= 20000 &&
            NPC_DATA["nikolai"].emotion.affection >= 60 &&
            !player.flags?.nikolai_deric_intro_seen,
            
        action : (player) => {
            player.flags.nikolai_deric_intro_seen = true;
            savePlayer(player);
            
            startScene(
                NPC_DATA["nikolai"].scenes.nikolai_deric_intro_event,
                player,
                {
                    onEnd : () => startScene(getLocationScene(player), player)
                }
            );
        }
    },
    {
        id : "nikolai_sold_deric_letter",
        
        condition : (player) =>
            player.justMoved &&
            player.location === "gloryHole" &&
            player.flags?.dericLetterReceived &&
            !hasItem(player, "데릭의 친필 서신") &&
            !player.flags?.nikolai_sold_deric_letter_seen,
            
        action : (player) => {
            player.flags.nikolai_sold_deric_letter_seen = true;
            savePlayer(player);
            
            startScene(
                NPC_DATA["nikolai"].scenes.nikolai_sold_deric_letter,
                player,
                {
                    onEnd : () => startScene(getLocationScene(player), player)
                }
            );
        }
    },

    //발렌

    //메인퀘스트 관련 이벤트
    {
        id : "undercity_03_guard_missing_event_01",
        once : true,
        condition : (player) =>
            player.location === "townEntrance" &&
            player.flags?.undercity_story_02_done &&
            !player.flags?.undercity_03_guard_missing_event_01_seen,

            action : (player) => {
                player.flags.undercity_03_guard_missing_event_01_seen = true;
                savePlayer(player);

                startScene([
                    {
                        type : "text",
                        value : [
                            "마을 입구가 소란스럽다. 당신은 당신도 모르게 고개를 돌렸다. 경비병들 몇몇이 평소와 다르게 불안해하고 있는 모습이 보인다.<br><br>",
                            "\"또 하나가 없어졌대. 그 은색 손목시계 차고 다니던 녀석.\"<br>",
                            "\"또? 씨발, 고블린 새끼들 요즘 들어 더 날뛰는 거 같은데 뭔 축제라도 벌이나?\"<br>",
                            "\"고블린만 문제냐. 난 요새 하얀꽃 때문에 하수구도 가기 싫더라. 요새 마을 곳곳에 하얀 꽃이 보이는 거 같아.\"<br><br>",
                            "그 순간 한 명이 억, 하는 소리와 함께 앞으로 쓰러졌다. 루크다. 루크는 담배를 문 채 경비병들을 한심하다는 듯 내려다보았다. 그는 넘어진 경비병의 가슴을 발로 밟으며 인상을 찌푸렸다.",
                            "<br>\"병신새끼들이, 사람들 앞에서 경비병들 병신이라고 아예 광고를 내지 그러냐?\"<br>",
                            "지나가는 사람들의 시선이 집중되자 루크는 인상을 찌푸리며 꺼지라고 말했다. '너네는 뭐야, 검문이라도 받고 싶으신가?'하며 사악하게 웃는 루크에 경비병들 주변에서 웅성거리던 사람들은 재빨리 사라졌다. 한번 더 담배를 빨던 루크는 당신과 시선을 마주쳤다.",
                            "<br>\"너 요새 존나 나대는 모양인데, 지랄하다가 또 없어지지 말고 그냥 가만히 있어.\"<br>",
                            "그는 마지막으로 경비병을 한 방 더 걷어찬 후 경비병 막사로 가버렸다. 더 이야기를 듣고 싶으면 경비병 막사로 가보는 게 좋을지도 모르겠다."
                        ]
                    }
                ], player, {
                    onEnd : () => startScene(getLocationScene(player), player)
                });
            }
    },
    {
        id : "undercity_03_luke_barrack_event_01",
        once : true,
        condition : (player) =>
            player.location === "barracks" &&
            player.flags?.undercity_03_guard_missing_event_01_seen &&
            !player.flags?.undercity_03_luke_barrack_event_seen,

        action : (player) => {
            ACTIONS["luke_undercity_03_barrack_event"](player);
        }
    },
    {
        id : "eric_undercity_04_skip_event",
        once : true,
        
        condition : (player) =>
            player.location === "townStreet" &&
            player.flags?.undercity_story_04_skip_by_03 &&
            !player.flags?.eric_undercity_04_skip_seen,
            
        action : (player) => {
            player.flags.eric_undercity_04_skip_seen = true;
        savePlayer(player);
        
        startScene(
            NPC_DATA["eric"].scenes.eric_undercity_04_skip_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
    },
    {
        id : "undercity_story_05_bandit_attack",
        once : true,
        
        condition : (player) =>
            player.location === "townEntrance" &&
            player.flags?.undercity_story_04_done &&
            !player.flags?.undercity_story_05_bandit_attack_seen &&
            getCurrentDay(player) >= (player.flags.undercity_story_04_done_day + 3),
            
        action : (player) => {
            player.flags.undercity_story_05_bandit_attack_seen = true;
            savePlayer(player);
                
            startBanditAttackEvent(player);
        }
    },
    {
        id : "undercity_story_07_eric_townStreet_event",
        
        condition : (player) =>
             player.location === "townStreet" &&
             player.flags?.undercity_story_06_done &&
            !player.flags?.undercity_story_07_eric_townStreet_event_seen &&
            !player.quest?.active &&
            getCurrentDay(player) >= (player.flags.undercity_story_06_done_day + 2),
            
        action : (player) => {
            player.flags.undercity_story_07_eric_townStreet_event_seen = true;
            savePlayer(player);
            startScene([
                {
                    type : "text",
                    value : [
                        "도적떼 소탕이 끝난 후에도 하류도시 마을 사람들의 반응은 좋지 않았다. 한 번의 마을 습격이 두 번의 마을 습격으로도 이어질 수 있다, 마을 사람들의 불안은 끊기지 않았다. 그리고 그들이 불안해질수록 자신들의 지위가 흔들린다고 생각했는지 경비병들의 억압은 점점 더 심해져만 갔다." +
                        "<br><br>\"잘 지켜주지도 못하면서...\"<br><br>"+
                        "몸수색을 받던 한 사람이 중얼거렸다. 그 말소리를 들은 경비병의 표정이 일그러졌다. \"방금 뭐라고 했어?\"라고 말하며 경비병은 불만을 터뜨린 사람을 겁박하기 시작했다. \"다시 한 번 말해봐.\", 평소였다면 그 말에 마을 사람은 고개를 숙이고 저항을 멈췄을 것이다. 하지만 오늘은 달랐다. 그는 고개를 빳빳하게 들더니 너네가 우리에게 이럴 권리가 있냐고 물었다. 주변에 있던 마을 사람들도 그 말에 호응했다." +
                        "<br><br>\"우리가 너네들의 명령에 따르고 보호비를 내는 이유가 뭔데!?\"<br><br>" +
                        "경비병은 무력으로 제압하려고 했지만 여러 명의 마을 사람들이 동조하기 시작하자 움찔했다. 그는 창끝을 마을 사람들에게 겨누며 한번 더 윽박질렀다. 마을 사람들은 당연히 겁에 질렸지만, 한 명이 일어서자 다시 다들 아우성을 치기 시작했다." +
                        "<br><br><br><span style='color:red'><strong>퍼억</strong></span><br><br><br>" +
                        "하지만 그 순간 가장 목소리가 컸던 마을 사람이 명치를 부여잡더니 침을 흘리며 쓰러졌다. 한순간의 공격이었다. 에릭의 서늘한 표정에 아우성치던 마을 사람들이 움찔했다. 에릭은 쓰러진 남자의 어깨를 차더니 그대로 그의 명치를 밟았다. 그는 그에게 '반란군'이라고 말했다. 반란군, 언제 사형이 되어도 할 말이 없는 대역죄인이다. 에릭의 입에서 나온 '반란군' 단어에 마을 사람들은 사색이 되더니 천천히 흩어져갔다. 에릭의 발에 밟힌 남자는 자기는 반란군이 아니라며 울부짖었지만 에릭은 그 울부짖음마저 발로 짓밟아버렸다. 모든 사람들의 앞에서 에릭은 남자의 최후를 정해버렸다." +
                        "<br>남자를 짓밟고 있던 에릭은 당신에게로 시선을 돌렸다." +
                        "<br><br>\"경계병 제1초소를 반란군이 습격할 거라는 정보가 들어왔다.\"<br><br>" +
                        "그는 명령서를 당신에게 보여주었다." +
                        "<br><br>\"즉결 처형이다. 이 일을 해내면, 너는 상류도시에 갈 수 있게 되겠지. 할 건가?\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "명령을 받는다.",
                            action : "accept_quest_undercity_story_07"
                        },
                        {
                            text : "거절한다. <span style='color:red'>이 선택은 되돌릴 수 없다</span>",
                            scene : [
                                {
                                    type : "effect",
                                    run : (player) => {
                                        player.flags.undercity_story_07_refused = true;
                                        player.flags.yuri_recommend_route_unlocked = true;
                                        player.flags.undercity_story_07_refused_day = getCurrentDay(player);
                                        changeEmotion("eric", "affection", -5);
                                        savePlayer(player);
                                    }
                                },
                                {
                                    type : "text",
                                    value : [
                                        "당신이 거절하자 에릭은 당신을 잠시 바라보았다. 하지만 그는 더 이상 당신을 설득하지 않았다. 그저 당신의 선택을 받아들였을 뿐이다." +
                                        "<br><br>\"그래. 그럼 다른 사람을 찾지.\"<br><br>" +
                                        "그는 당신에게서 시선을 거두었다."
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
    },
    {
        id : "undercity_story_07_guardPost1_event",
        
        condition : (player) =>
            player.location === "guardPost1" &&
            player.quest?.active?.id === "undercity_story_07" &&
            !player.flags?.undercity_story_07_guardPost1_event_seen,
            
            action : (player) => {
                player.flags.undercity_story_07_guardPost1_event_seen = true;
                savePlayer(player);
                
                startScene([
                    {
                        type : "text",
                        value : [
                            "경계병 1초소에 도착했을 때, 경비병들과 반란군들은 이미 전투를 벌이고 있었다. 그리고 가장 가운데에서, 당신은 반란군 수장을 보았다. 멀리서 봐도 누가 반란군 수장인지는 알 수 있었다. 한손검을 들고 있는 그는 무리 중에서 가장 빛나고 있는 사람이었다. 그의 말 한 마디에 사람들은 다시 힘을 내어 싸웠고, 그는 망토를 두르고 있는 초소단장과 맞서고 있었다." +
                            "<br><br>\"더러운 도시의 사냥개들을 용서하지 말자!\"<br><br>" +
                            "반란군 수장은 그 말을 외치더니 그대로 초소단장의 목을 베었다. 날렵한 곡선을 그으며 초소단장의 머리를 목에서 분리한 그의 한손검에서 피가 흘뿌려졌다. 적의 수장의 목을 땄다는 소식에 반란군들의 사기가 올랐다. 여기서 사기가 더 오르면 위험하다. 당신은 반란군 수장을 막아섰다." +
                            " 반란군 수장은 경비병 옷을 입고 있지 않은 당신을 보고 인상을 찌푸렸다. 하지만 그것도 잠시, 그는 당신을 적으로 간주하고 당신의 목에 한손검을 겨누었다." +
                            "<br><br>\"우리는 아직 죽지 않았다!\"<br><br>" +
                            "전투가 시작된다...!"
                        ]
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            startBattle("rebelLeader", player, {
                                noEscape : true,
                                onWin : () => startUndercityStory07AfterBattleEvent(player),
                                onLose : () => startUndercityStory07AfterLosingBattleEvent(player)
                            });
                            return true;
                        }
                    }
                ], player);
            }
    },
    {
        id : "yuri_recommend_letter_event",
        once : true,
        
        condition : (player) =>
            player.location === "shelter" &&
            player.flags?.yuri_recommend_route_unlocked &&
            NPC_DATA["yuri"].emotion.affection >= 30 &&
            !player.quest?.active &&
            !player.flags?.yuri_recommend_letter_event_seen &&
            getCurrentDay(player) >= (player.flags.undercity_story_07_refused_day + 2),
            
        action : (player) => {
            startYuriRecommendLetterEvent(player);
        }
    },

    //랜덤습격 이벤트
    {
        id: "random_encounter",
        condition: (player) =>
        player.justMoved &&
        ENEMY_POOLS[player.location] &&
        Math.random() < Math.min(0.95, 0.4 + ((typeof getBodyFluidDebuffLevel === "function" ? getBodyFluidDebuffLevel(player) : 0) * 0.05)),
        
        action: (player) => {
        const enemyId = pickWeighted(ENEMY_POOLS[player.location]);
        startBattle(enemyId, player, { noEscape: false });
    }
    },
    
    //장소 이벤트
    {
        id: "guard_patrol_event",
        condition: (player) =>
            player.justMoved &&
            (player.location === "townEntrance" ||
            player.location === "townStreet") &&
            Math.random() < 0.3,

        action: (player) => {
            startScene([
                {
                    type: "text",
                    value: [
                            "지나가던 경비병과 당신이 시선을 마주쳤다. 경비병은 당신을 보더니 속을 알 수 없는 미소를 지으며 당신에게 다가왔다.<br>",
                            "\"어이, 너. 수상한데 이리로 와봐.\"<br>",
                            "경비병은 지휘봉으로 자신의 손바닥을 위협적으로 딱딱 치며 말했다. 그는 당신이 도망칠 수 없을 거라 보고 다가오고 있다."
                        ]
                },
                {type: "choice",
                    choices : [
                        {
                            text: "당신은 경비병이 다가오기 전에 빠르게 도망쳤다.",
                            stat: "dex",
                            difficulty : 10,
                            success: [
                                 {type: "text",
                                    value: [
                                    "당신이 도망칠 거라고는 생각도 못했던 경비병은 그대로 달음박질하는 당신을 놓쳤다. 뒤에서 욕지거리가 들려왔지만 당신은 이미 경비병의 시야를 벗어난 후였다."
                                ]
                            }
                            ],
                            fail: [
                                {
                                    type: "text",
                                    value: [
                                    "당신이 도망치려고 하자, 경비병은 눈을 번뜩이고 당신의 팔을 향해 손을 뻗어왔다.",
                                    "<br>\"쥐새끼같은 놈이, 도망칠 수 있을 거라 생각한 거냐.\"",
                                    "<br>더 이상 당신의 저항은 통하지 않는다. 경비병은 당신을 억압한 채 당신의 옷안으로 손을 집어넣었다.",
                                    "<br>\"너같은 쥐새끼놈은 하나하나 다 조사해봐야해.\"",
                                    "<br>당신이 말릴 새도 없이 그의 손가락은 당신의 성기를 훑고 구멍 안을 쑤셨다. 고통으로 당신의 눈가에 눈물이 찔끔 고였다. 몇 번이고 당신의 구멍을 쑤시던 경비병은 당신의 고통 어린 표정에 만족했는지, 손가락을 털며 오늘은 이정도로 봐줄 테니 이만 가보라고 말했다."
                                    ],
                                },
                                {
                                    type: "effect",
                                    run: (player) => {
                                    changeHP(player, -5);
                                    changeArousal(
                                        player,
                                        getSensitivityArousalGain(player, "a", 5)
                                    );
                                    changeArousal(
                                        player,
                                        getSensitivityArousalGain(player, "c", 5)
                                    );
                                    changeSensitivity(player, "cSensitivity", 3);
                                    changeSensitivity(player, "aSensitivity", 3);
                                    }
                                }
                            ]
                        },
                        {
                            text: "당신은 경비병에게 미소를 지으며 자신의 결백을 주장했다.",
                            stat: "charm",
                            difficulty: 8,
                            success: [
                                {
                                    type: "text",
                                    value: [
                                        "당신의 미소에 순간 경비병은 말을 잃었다. 그는 당신을 위아래로 훑어보다가 이내 정신을 차린 듯 고개를 털었다. 경비병은 가라는 듯이 당신에게 손짓을 해보인 후 물러났다. 그는 다른 사람들을 조사하러 간 모양이다."
                                    ]
                                }
                            ],
                            fail : [
                                {
                                    type: "text",
                                    value: [
                                        "딩신의 미소에도 경비병은 눈썹 한쪽만 올릴 뿐, 당신의 말은 믿지 않았다. 그가 당신의 몸을 조사하기 시작한다. 옷 위로 느껴지는 그의 손길이 점점 거칠어지는 게 느껴진다. 당신은 그의 손길에 아파서 인상을 찌푸렸다.",
                                        "당신이 인상을 찌푸리자 경비병은 의뭉스러운 미소를 지으며 본격적인 조사를 시작하지도 않았는데 앙탈부리지 말라고 했다. 가슴을 훑던 그의 손이 거칠게 당신의 성기를 옷위로 움켜잡았다. 당신은 고통스러워했다.",
                                        "<br>\"이상은 없는 거 같군.\"",
                                        "<br>경비병은 만족한 듯 당신에게서 손을 뗐다. 그러더니 이제 가보라는 듯 당신에게 손짓을 해보였다. 걸어가는 당신의 뒤로 경비병의 음흉한 시선이 느껴진다."
                                    ]
                                },
                                {
                                    type: "effect",
                                    run: (player) => {
                                    changeArousal(player, 10);
                                    changeSensitivity(player, "bSensitivity", 3);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ], player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        }
    },
    {
        id : "streets_whiteflower_event01",
        condition: (player) =>
            player.justMoved &&
            (player.location === "darkStreet" ||
            player.location === "townStreet") &&
            Math.random() < 0.2,

        action :  (player) => {
            startScene([
                {
                    type : "text",
                    value : [
                        "거리를 걷던 중 당신은 누군가가 당신에게 다가오는 것을 보았다. 그는 공허한 얼굴로 마약을 중얼거리고 있었다. 순식간에 당신과 거리를 좁힌 그는 당신의 팔을 세게 붙잡으며 마약을 내놓으라고 말했다.",
                        "마약을 달라고 협박을 하거나, 마약을 달라고 빌거나, 일관성없이 울다가 웃는 걸 반복하던 남자는 당신의 주머니를 뒤지려고 했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그에게 마약을 주었다.",
                            action : "giveDrugToBeggar"
                        },
                        {
                            text : "당신은 그에게 마약을 주지 않았다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "마약을 안 주는 당신에게 그는 화가 났다. 그가 그대로 당신을 덮쳐온다...!"
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        startBattle("begger", player, {
                                            noEscape : false,
                                            onWin : () => startScene(getLocationScene(player), player),
                                            onEscape : () => startScene(getLocationScene(player), player),
                                        });
                                        return true;
                                    }
                                }
                            ]
                        }
                    ]
                }
            ], player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        }
    },
    {
        id : "streets_whiteflower_event02",
        condition: (player) =>
            player.justMoved &&
            (player.location === "darkStreet" ||
            player.location === "townStreet") &&
            Math.random() < 0.1,
        action : (player) => {
            startScene([
                {
                    type : "text",
                    value : [
                        "거리를 걷던 중 당신은 누군가가 당신에게 다가오는 것을 보았다. 그는 공허한 얼굴로 마약을 중얼거리고 있었다. 순식간에 당신과 거리를 좁힌 그는 당신의 팔을 세게 붙잡으며 마약을 내놓으라고 말했다.",
                        "거지가 당신에게 손을 뻗으려는 순간 누군가의 손이 거지의 팔을 잡아챘다. 에릭이다. 그는 거지를 내려다보며 내야 할 돈이 밀렸다고 말했다. 남자는 정신이 나가서 에릭이 지금 무슨 말을 하고 있는지도 모르고 있는 거 같았다. 횡설수설하는 거지를 내려다보던 에릭은 가차없이 그의 배에 주먹을 꽂아넣었다.",
                        "억, 하는 소리와 함께 거지의 몸이 반으로 접어졌다. 에릭은 그대로 거지의 목덜미를 잡고 질질 끌고 갔다. 어쩐지, 당신은 그 거지를 다시는 못 볼 거 같은 생각이 들었다."
                    ]
                }
            ], player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        } 
    },
    {
        id: "shelter_money_event_01",
        condition: (player) =>
            player.justMoved &&
            player.location === "shelter" &&
            Math.random() < 0.1,

        action: (player) => {
            startScene([
                {
                    type: "text",
                    value: [
                            "쉘터에 도착하자마자 한 아이가 돈을 빠르게 세고 있는 것이 보인다. 돈을 몇 번이고 세는 걸 보니 에릭한테 바칠 돈이 조금 부족한 모양이다. 한 아이가 옆에서 유리에게 도움을 요청하는 것이 어떻겠냐고 물었다. 그러자 아이는 고개를 저었다.<br>",
                            "\"유리는 저번에도 도와줬어. 도와달라고 하면 또 도와주겠지만 더 부담을 주고 싶지는 않아.\"<br>",
                            "\"넌 지금 그게 중요해? 그러다가 에릭한테 끌려가면....\"<br>",
                            "아이들의 시선이 순간 당신에게 닿았지만, 아이들은 금방 당신에게서 시선을 돌려버렸다. 그들은 당신에게 도움을 요청할 생각이 없다."
                        ]
                },
                {type: "choice",
                    choices : [
                        {
                            text : "당신은 아이에게 다가가서 500원을 내밀었다.",
                            scene : [
                                {
                                    type: "effect",
                                    run : (player) => {
                                        if (player.gold < 500){
                                            showSingleTextScene("도와주고 싶은 마음은 굴뚝같지만 돈이 부족하다.", player);
                                            return true;
                                        }
                                        changeGold(player, -500);
                                        changeTrauma(player, -10);
                                    }
                                },
                                {
                                    type : "text",
                                    value : [
                                        "당신이 내민 돈에 아이들은 눈을 크게 떴다. 특히 돈을 받은 아이는 믿을 수 없다는 표정으로 당신을 올려다보았다.<br>",
                                        "\"...왜? 대체 왜...? 이렇게나 많이...?\"<br>",
                                        "아이의 눈에 눈물이 고였다. 아이는 씩씩하게 눈물을 닦더니 당신에게 고맙다고 말했다. 그는 언젠가는 자기도 당신처럼 아이들을 도와줄 거라고 말했다. '고마워'라는 단어가 당신의 마음속에 깊이 남는다."
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 아이에게 다가가서 100원을 내밀었다.",
                            scene : [
                                {
                                    type : "effect",
                                    run : (player) => {
                                        if (player.gold < 100){
                                            showSingleTextScene("당신은 도와주고 싶은 마음은 굴뚝같았지만 돈이 부족했다", player);
                                            return true;
                                    }
                                    changeGold(player, -100);
                                    changeTrauma(player, -5);
                                    }
                                },
                                {
                                    type : "text",
                                    value : [
                                        "당신이 내민 돈에 아이들은 충격에 빠져 당신을 바라보았다. 돈을 받은 아이는 중얼거리더니 고개를 푹 숙였다.<br>",
                                        "\"대체 왜...?\"<br>",
                                        "아이는 당신에게 도움을 받을 수 있을 거란 생각을 못했던 모양이다. 그는 슥슥 팔로 문질러 눈물을 닦더니 나중에 자신도 당신같이 남을 도와주는 사람이 되겠다고 말했다. '고마워'라고 말하는 목소리가 당신의 가슴에 울린다."
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 아이를 무시했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신은 아이를 무시했고, 아이들도 당신을 쳐다보지 않았다. 당신의 뒤로 그들의 목소리가 들린다.<br>",
                                        "\"너 진심이야? 제발... 난 널 잃고 싶지 않아.\"<br>",
                                        "\"도망다니면 돼. 나 도망은 선수잖아.\"<br>",
                                        "떨리지 않는 목소리 뒤로 아이의 주먹이 떨리는 게 느껴진다. 당신도, 아이들도 모두 알고 있다. 그렇게 사라진 아이들이 이 도시에는 많다는 것을."
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ], player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        }
    },
    {
        id : "shelter_savedChildren_event1",
        condition : (player) =>
            player.justMoved &&
            player.location === "shelter" &&
            player.flags?.undercity_story_04_done &&
            Math.random() < 0.2,

        action : (player) => {
            startScene([
                {
                    type : "text",
                    value : [
                        "쉘터 안쪽에서 아이들이 뛰어다니는 소리가 들린다. 당신은 자기도 모르게 시선을 돌렸다. 당신이 구출했던 아이들이다. 한 아이가 당신에게 달려왔다. 그 아이는 당신의 손을 잡더니 당신도 술래잡기를 같이 하자고 말했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 아이들의 술래잡기 놀이에 어울려주었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신은 아이들과 함께 놀아주었다. 아이들은 까르르 웃으며 당신의 주변을 돌았다. 한 아이가 \"날 잡아봐요!\"하더니 그대로 후다닥 도망가버렸다. 당신은 아이를 뒤쫓았다.",
                                        "당신은 아이들과 놀면서 어쩐지 마음이 편안해졌다. 바깥세계와는 다른 세계에 있는 느낌, 당신에게 잡힌 아이가 까르르 웃었다. 술래잡기가 끝난 후 아이들은 당신에게 손을 흔들었다.",
                                        "...당신이 지킨 미소다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeTrauma(player, -10);
                                        passTime(player, 10);
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
                                        "당신이 고개를 젓자 아이들은 슬픈 표정을 짓긴 했지만 더 강요하지는 않았다. 당신은 자리를 옮기기 전에 술래잡기를 하고 있는 아이들을 돌아보았다. 언제 슬픈 표정을 지었냐는 듯, 아이들은 자기들끼리 즐겁게 놀고 있다.",
                                        "...당신이 지킨 미소다. 당신이 아니었다면 아이들에게 이런 순간은 찾아오지 않았을 것이다. 당신은 어쩐지 마음이 두근거렸다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeTrauma(player, -3);
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
    },
    {
        id : "shelter_savedChildren_event2",
        condition : (player) =>
            player.justMoved &&
            player.location === "shelter" &&
            player.flags?.undercity_story_04_done &&
            Math.random() < 0.2,

        action : (player) => {
            startScene([
                {
                    type : "text",
                    value : [
                        "쉘터에 들어오자 유리의 노래가 들려온다. 당신은 어렸을 때부터 들어온 그 노래에 귀를 기울이며 조심스럽게 노래가 들려오는 방향으로 향했다. 열린 문틈 사이로 유리가 한 아이를 안고 있는 것이 보인다. 그는 울고 있는 아이를 끌어안은 채 계속 노래를 불러주고 있었다. 아이는 당신이 구출해준 아이들 중 한 명이었다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 유리의 옆에 앉아 같이 노래를 불렀다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신은 유리의 옆에서 같이 노래를 불렀다. 유리의 품에 안겨있던 아이가 빼꼼 그의 품에서 고개를 내밀었다. 유리는 아이의 머리를 쓰다듬어주며 당신을 바라보았다. 노래는 계속된다. 입술을 오물거리던 아이는 두 사람의 품에 안겨있다는 것에 용기를 얻었는지 조금씩, 조금씩, 당신과 유리의 노래를 따라부르기 시작했다.",
                                        "아이의 노래는 음정이고 박자고 맞는 건 없었지만 듣는 사람에게 미소를 불러일으키는 미소였다. 다른 사람들을 몰라도 적어도 당신과 유리에게는. 노래가 끝나고 아이는 유리의 품에서 새근새근 잠에 들었다. 유리는 일어나는 당신을 올려다보며 말했다.",
                                        "<br>\"고마워, {yuriTitle}.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeTrauma(player, -10);
                                        changeEmotion("yuri", "affection", 2);
                                        passTime(player, 10);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 조용히 문을 닫고 나갔다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "문을 닫고 나간 당신의 뒤로 유리의 노랫소리가 계속 들린다. 저 노래를 듣다보면, 언젠가는 아이도 그의 품에서 잠이 들 수 있겠지. 당신은 발걸음을 옮겼다."
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
    }
];

window.EVENTS = EVENTS;

function checkAllEvents(player){
    if (!player || player.inBattle) return false;
    updateLukeUndercityAbsence(player);

    // 에릭 수금 이벤트는 1주(1680 time) 경과 후 최우선순위 이벤트. 주당 1회만 발생
    if (shouldTriggerEricWeeklyPayment(player)){
        return triggerEricWeeklyPayment(player);
    }

    const shuffled = [...EVENTS].sort(() => Math.random() - 0.5);

    for (const event of shuffled){
        if (event.once && player.flags[event.id]) continue;

        if (event.condition(player)){
            event.action(player);

            if (event.once){
                player.flags[event.id] = true;
                localStorage.setItem("playerData", JSON.stringify(player));
            }

            return true;
        }
    }
    return false;
}

window.giveDrugToBeggar = function(player){
    if (countItem(player, "drug") <= 0){
        startScene([
            {
                type : "text",
                value : [
                    "당신은 주머니를 뒤졌지만 그에게 줄 마약은 없었다. 기대에 차서 당신을 바라보던 거지는 당신의 손에 아무 것도 들려있지 않자 분노했다.",
                    "<br>\"감히 네가 날 모욕해!\"<br>",
                    "거지가 당신에게 달려든다...!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startBattle("begger", player, {
                        noEscape : false,
                        onWin : () => startScene(getLocationScene(player), player),
                        onEscape : () => startScene(getLocationScene(player), player)
                    });
                    return true;
                }
            }
        ], player);
        return;
    }

    removeItemByKey(player, "drug");

    startScene([
        {
            type : "text",
            value : [
                "그는 당신이 마약을 주자 허겁지겁 그것을 먹었다. 입에 삼킨 그는 곧 황홀한 표정을 짓더니 가벼운 발걸음으로 당신에게서 멀어져갔다. <br>\"하얀꽃... 하얀꽃님...\""
            ]
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.startBanditAttackEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "마을입구에 도착하자마자 당신은 비명소리를 들었다. 여기저기서 사람들이 도적떼에게 죽거나 머리채를 잡혀 끌려가고 있었다. 물론 그들의 1차적인 목적은 돈이었다. 그래서 돈이 있어보이는 놈들에게 먼저 칼을 휘두르긴 했지만, 어린아이나 거지라고 해서 그들의 눈을 피해갈 수는 없었다. 경비병들은 마을 입구에서 도적떼들을 상대하고 있는 것이 보였으나 갑작스러운 습격에 그들도 당황한 것처럼 보였다.",
                "<br><br>\"젠장, 지원은!?\"<br>\"요청은 보냈어!\"<br>\"루크는!?\"<br>\"금방 온... 끄아악!\"",
                "<br><br>아수라장 속에서 당신은 경비병의 팔이 잘려나가는 것을 보았다. 그대로 경비병의 가슴에 단검이 파고들려고 할 때, 루크가 너클로 단검을 튕겨냈다.",
                "<br><br>\"씨발새끼들이...\"<br><br>",
                "루크가 오면서 경비병들은 그나마 정신을 차린 듯했다. 그들의 어수선했던 대열이 다시 정비된다. 루크는 팔이 잘린 경비병은 뒤로 물러나게 했다. <br><br>\"씨발, 넌 꺼져. 남은 개새끼들은 후퇴하면 뒤질 준비하고.\"<br><br>도적떼가 들끓는다는 이야기는 익히 들어왔다. 행상인 습격 사건도 드문 일은 아니었다. 하지만 도적들이 마을을 직접 습격한 것은 처음이었다. <br>그 순간, 한 도적이 당신을 발견했는지 그대로 달려들었다.",
                "<br><br><div style='color:red'>전투를 피할 수는 없을 것 같다...!</div>"
            ]
        },
        {
            type : "effect",
            run : "startBanditAttackBattle1"
        }
    ], player);
};

window.startBanditAttackBattle1 = function(player){
    startBattle("bandit1", player, {
        noEscape : true,
        onWin : () => startBanditAttackBattle2(player),
        onLose : () => startBanditAttackDefeatEvent(player)
    });
    return true;
};

window.startBanditAttackBattle2 = function(player){
    startBattle("bandit2", player, {
        noEscape : true,
        onWin : () => startBanditAttackBattleEnd(player),
        onLose : () => startBanditAttackDefeatEvent(player)
    });
};

window.startBanditAttackBattleEnd = function(player){
    player.flags.undercity_story_05_unlocked = true;
    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                "당신이 도적을 쓰러뜨렸을 때, 경비병단도 마을을 습격한 도적떼를 어느 정도 소탕한 후였다.<br><br>",
                "\"도망을 가? 씨발, 다 잡아 좆쳐!\"<br><br>",
                "저 멀리로 멀어지는 루크의 목소리가 들린다. 도적떼 습격이 끝난 후 남은 사람들의 눈동자에 두려움이 비쳤다. 당신은 발에 치인 도적의 시체를 내려다보았다.",
                "<br>...아이였다. 어린 아이."
            ]
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
}

window.startBanditAttackDefeatEvent = function(player){
    player.flags.undercity_story_05_unlocked = true;
    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                "당신은 도적의 공격을 버티지 못하고 바닥에 쓰러졌다. 흐려지는 시야 너머로 비명과 고함, 쇠붙이가 부딪히는 소리가 뒤섞였다. 도적은 당신에게 달려들더니 당신의 소지품을 뒤지기 시작했다. 그 순간 경비병이 당신의 위에 있던 도적을 공격했다. 끄아악 소리와 함께 도적의 귀가 당신의 옆에 툭 떨어졌다. 당신은 잠시 정신을 잃었다.",
                "<br>당신이 다시 눈을 떴을 때 마을 입구에는 피와 부서진 짐, 그리고 돌아오지 못한 사람들의 흔적만이 남아 있었다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                player.status.hp = 1;
                changeTrauma(player, 1);
                changeGold(player, -500);
                passTime(player, 10);

                updateStatusUI(player);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.startUndercityStory07AfterBattleEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "반란군 수장은 당신의 앞에 쓰러졌다. 그는 기회만 온다면 일어날 거라는 듯이 한쪽 무릎만 꿇은 채 당신을 노려보았다." +
                "<br><br>\"도시의 사냥개 따위에게 목숨을 구걸할 생각은 없다.\"<br><br>" +
                "그는 고개를 빳빳하게 들고 있었다. 당신이 무기를 그의 목에 겨누자 그는 조용히 '에르윈'이라는 이름을 입에 담았다. 그의 의지는 아직 꺾이지 않았다." +
                "<br>이제 남은 것은 처형뿐이다."
            ]
        },
        {
            type : "choice",
            choices : [
                {
                    text : "그를 처형하지 않는다.",
                    action : "undercity_story_07_eric_execution"
                },
                {
                    text : "그를 처형한다.",
                    action : "undercity_story_07_player_execution"
                }
            ]
        }
    ], player);
};

window.startUndercityStory07AfterLosingBattleEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "반란군 수장은 쓰러진 당신을 내려다보며 한손검을 다시 바로들었다." +
                "<br><br>\"무지는 죄다.\"<br><br>" +
                "그는 경비병의 옷을 입지 않은 당신이 도시의 사냥개가 아닐 수도 있다고 생각하는 거 같다. 하지만 당신을 바라보는 그의 시선은 차가웠다." +
                "<br><br>\"네가 지금 도시의 사냥개가 아니더라도, 언젠가 너같은 놈이 도시의 사냥개가 된다고 생각하니 끔찍하군.\"<br><br>" +
                "...이제 남은 것은 당신의 처형뿐이다."
            ]
        },
        {
            type : "choice",
            choices : [
                {
                    text : "당신은 반란군 수장을 올려다보았다.",
                    action : "undercity_story_07_rebel_execution"
                }
            ]
        }
    ], player);
};

window.undercity_story_07_eric_execution = function(player){
    startUndercityStory07EricExecutionEvent(player);
};
window.undercity_story_07_player_execution = function(player){
    startUndercityStory07PlayerExecutionEvent(player);
};
window.undercity_story_07_rebel_execution = function(player){
    startUndercityStory07RebelExecutionEvent(player);
};

function finishUndercityStory07(player){
    player.flags = player.flags || {};
    player.quest.completed = player.quest.completed || [];
    player.flags.undercity_story_07_done = true;
    player.flags.undercity_story_07_done_day = getCurrentDay(player);

    if (!player.quest.completed.includes("undercity_story_07")){
        player.quest.completed.push("undercity_story_07");
    }

    player.quest.active = null;
    changeGold(player, 1500);
    savePlayer(player);
};

window.startUndercityStory07EricExecutionEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 그의 목을 벨 수 없었다. 당신이 동작을 멈추자 반란군 수장은 놀란 듯 당신을 올려다보았다." +
                "<br><br>\"...의구심을 품은 건가. 만약 네가 허락한다면 내가....\"<br><br>" +
                "그의 말이 끝나기도 전에 그의 머리가 바닥으로 떨어졌다. 눈을 감지 못한 얼굴이 데굴데굴, 딱 3번 정도 굴렀다. 에릭은 자신의 발치에서 멈춘 그의 머리를 손에 들었다." +
                "<br><br>\"잘했다, {ericTitle}.\"<br><br>" +
                "그는 당신에게 훈장을 내밀었다. 그의 손에 묻은 피로 훈장이 붉어졌다.... <br>당신은 에릭에게서 훈장을 받았다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeEmotion("eric", "affection", 3);
                finishUndercityStory07(player);
                addItem(player, ITEMS.misc.honorMedal);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.startUndercityStory07PlayerExecutionEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 그의 목을 벴다. 데구르르, 바닥에 떨어진 그의 머리, 그는 죽을 때까지 눈을 감지 않았다. 반란군 수장이 죽자 반란군들의 기세가 꺾였다. 비명소리? 아니, 비명소리는 안 들리는 거 같다. 그저 생명의 소리가 소리없이 사라질 뿐이다. 경비병들은 함성을 지르며 이겼다고 말했다." +
                " 그리고 에릭은 함성 소리 사이에 있는 당신을 향해 걸어왔다. 승리의 축가 속에서, 에릭은 당신에게 훈장을 내밀었다. 피 몇 방울 묻어있는, 붉은 훈장을." +
                "<br><br>\"이 훈장으로 상류도시에 갈 수 있다.\"<br><br>" +
                "그는 무표정으로 당신이 훈장을 받는 모습을 지켜보다가 마지막 한 마디를 덧붙였다." +
                "<br><br>\"잘했다, {ericTitle}.\""
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeEmotion("eric", "affection", 5);
                finishUndercityStory07(player);
                addItem(player, ITEMS.misc.honorMedal);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};

window.startUndercityStory07RebelExecutionEvent = function(player){
    startScene([
        {
            type : "text",
            value : [
                "반란군 수장이 당신의 목을 치려는 순간, 눈을 깜박였을 때 당신의 앞에는 에릭이 있었다. 그는 무표정으로 반란군 수장을 패기 시작했다. 그저 주먹만으로. 옆구리에 걸려있는 총마저 빼지 않는 그의 모습에 주변 사람들은 압도당했다. 정신을 못 차리는 반란군 수장의 목을 들어올리더니 에릭은 가지고 있던 단도로 그의 목을 그어버렸다. 반란군 수장의 얼굴이 퍽, 하고 길가에 널려있던 돌에 부딪혔다. 에릭은 차가운 시선으로 그 머리를 응시하다가 그 머리를 손에 들었다." +
                " 반란군 기세가 꺾이고, 경비병 기세가 올라갔다. <br>\"죽여라!\" <br>광란. 상대방을 죽이기 위한 광기가 하늘을 찢는다. 그 광기 속에서 에릭은, 얼굴에 어떤 감정도 담지 않았다. 그는 그저 당신에게 다가와서 당신을 일으켰을 뿐이다." +
                "<br><br>\"수고했다, {ericTitle}.\"<br><br>" +
                "그는 당신에게 뭔가를 먹였다. 움직이지 않던 당신의 발이 조금씩 움직였다. 그는 간신히 서게 된 당신을 내려놓더니 당신의 가슴에 훈장을 꽂아넣었다." +
                "<br><br>\"그걸로 상류도시에 갈 수 있을 거다.\"<br><br>" +
                "그는 당신의 실패에 대해서 묻지 않았다. 그는 그대로 광기 속으로 사라져버렸다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeEmotion("eric", "affection", 1);
                changeEmotion("eric", "dominance", 5);
                changeEmotion("eric", "fear", 3);
                finishUndercityStory07(player);
                addItem(player, ITEMS.misc.honorMedal);
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
};