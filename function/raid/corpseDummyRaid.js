function initCorpseDummyRaid(player){
    player.corpseDummyRaid = player.corpseDummyRaid || {
        active : false,
        progress : 0,
        maxProgress : 12
    };
}

window.startCorpseDummyRaid = function(player){
    player.corpseDummyRaid = {
        active: true,
        progress: 0,
        maxProgress: getRandomCorpseDummyRaidMaxProgress(),
        middleEventCount: 0,
        middleEventDone: false,
        sanctuaryFound: false
    };

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "실험실은 일방향 통로에 좌우로 방이 다닥다닥 붙어 있었다. 그 모습은 마치 병원처럼 보이기도 했고 감옥처럼 보이기도 했다. 방안에는 흰색 침대 위로 인간이 한 명씩 누워 있었다. 피부는 썩지 않았지만 살아있는 것처럼은 보이지 않았다. 그들은 마치 시체처럼 미동이 없었다, 입에 거대한 호스를 꽂은 채로." +
                "<br><br>아니.<br><br>" +
                "자세히 보니 미동은 있었다.<br><br>시체 안에서의 미동이.<br><br>당신은 가장 끝을 향해 발걸음을 옮겼다." +
                "<br><br>...방금, 시체가 움직이지 않았나?"
        }
    ], player, {
        onEnd: () => advanceCorpseDummyRaid(player)
    });
};

function advanceCorpseDummyRaid(player){
    initAct3Quest09Raid(player);

    const raid = player.corpseDummyRaid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        startCorpseDummyRaidBoss(player);
        return;
    }

    raid.progress++;

    passTime(player, 5);

    const middleEventPoints = [2, 4, 6, 9];
    
    if (
        raid.middleEventCount < middleEventPoints.length &&
        raid.progress === middleEventPoints[raid.middleEventCount]
    ){
        const eventIndex = raid.middleEventCount;
        raid.middleEventCount++;
        savePlayer(player);
        
        startCorpseDummyRaidMiddleEvent(player, eventIndex);
        return;
    }

    savePlayer(player);

    startCorpseDummyRaidRandomEvent(player);
}

function startCorpseDummyRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "corpseDummyRaid_a", weight: 30 },
        { id: "corpseDummyRaid_b", weight: 30 },
        { id: "corpseDummyRaid_c", weight: 30 },
        { id: "corpseDummyRaid_d", weight: 10 },
        { id: "corpseDummyRaid_e", weight: 5 },
        { id: "corpseDummyRaid_f", weight: 10 }
    ]);

    if (eventId === "corpseDummyRaid_a"){
        showSingleTextScene(
            "복도를 지나는 당신의 앞으로 갑자기 시체가 세 구 쿵쿵 떨어졌다. 그러더니 그것들은 움직이기 시작했다.",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse1", "experimentAboCorpse1", "experimentAboCorpse1"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_b"){
        showSingleTextScene(
            "복도를 지나가는 당신의 앞으로 좌에 있던 문이 벌컥 열렸다. 시체에서 뿜어나온 촉수가 스르르 움직이는 것이 보인다. 당신이 그냥 지나가려고 하자 시체에서 뻗어나온 백흉물 촉수가 당신의 앞길을 날카롭게 막았다. 싸울 수밖에 없을 것 같다...!",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse1", "experimentAboCorpse2", "experimentAboCorpse1"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_c"){
        showSingleTextScene(
            "복도를 지나가는 당신의 앞으로 우에 있던 문이 벌컥 열렸다. 시체에서 뿜어나온 촉수가 스르르 움직이는 것이 보인다. 당신이 그냥 지나가려고 하자 시체에서 뻗어나온 백흉물 촉수가 당신의 앞길을 날카롭게 막았다. 싸울 수밖에 없을 것 같다...!",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse1", "experimentAboCorpse2", "experimentAboCorpse3"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_d"){
        showSingleTextScene(
            "복도를 지나는 당신의 앞으로 꾸물거리는 것이 휙 스치고 지나갔다. 당신은 고개를 돌렸다. 당신의 시야에는 꿈틀거리는 백흉물들이 있었다. 당신의 온기에 반응한 그것들이 당신에게 달려든다!",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse3", "experimentAboCorpse3", "experimentAboCorpse3", "experimentAboCorpse3", "experimentAboCorpse3"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_e"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 달콤한 냄새가 훅 풍기는 방의 앞에서 멈췄다. 달콤한 냄새로 가득한 방은 희뿌연해서 방 안의 형체가 잘 보이지도 않았다." +
                    "<br><br>...시체의 입에 꽂혀있던 호스에 틈이 생긴 모양이다. 그 틈에서 달콤한 연기가 뿜어나오고 있었다. 당신은 그 연기를 당신도 모르게 들이마셨다." +
                    "<br>...? 어쩐지 생명력이 솟아오르는 것 같다! 당신의 피부가 순간 흉물의 피부로 보였던 것만 제외하면. 당신은 흉물의 피부로 보였던 팔을 자기도 모르게 긁으며 앞으로 나아갔다."
            },
            {
                type: "effect",
                run: (player) => {
                    changeTrauma(player, 5);
                    changeHP(player, 100);
                    changeStamina(player, 100);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showCorpseDummyRaidChoice(player)
        });
        return;
    }
}

function getRandomCorpseDummyRaidMaxProgress(){
    return 10 + Math.floor(Math.random() * 3); // 10~12
}

window.corpseDummyRaid_leave = function(player){
    player.corpseDummyRaid.active = false;
    player.flags.act3_quest_12_failed = true;

    if (player.quest?.active?.id === "act3_quest_12"){
        player.quest.active = null;
    }

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "당신은 더 이상 진행할 수 없었다. 어쩌면 당신은 태세를 정비하고 다시 그 실험실에 들어가려고 했던 걸지도 모른다. 하지만 당신이 숨을 돌리며 뒤를 돌았을 때, 실험실은 백색 군단이 장악하고 있었다.<br><br>" +
                "<strong style='color:red; font-size:1.4rem'>당신은 아무 것도 알아낼 수 없었다.</strong>"
        }
    ], player, {
        onEnd : () => {
            player.location = "deepForest_act3";
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

function startCorpseDummyRaidMiddleEvent(player, eventIndex){
    const middleEvents = [
        [
            {
                type : "text",
                value : [
                    "복도를 지나가던 당신은 바닥에 떨어져 있는 쪽지를 읽었다. 쪽지의 끝부분은 변색된 검붉은색 피로 젖어 있었다." +
                    "<br><br>[누군가 이 쪽지를 발견한다면 제발 이 쪽지를 제 누이에게 전해주세요]<br><br>" +
                    "[누나, 누나에게 마지막으로 한 말은 진심이 아니었어. 누나가 나에게 얼마나 잘해줬는지 알아. 난 그저 누나만 열심히 일하는데 나는 누나를 전혀 도와주지 못하는 것 같아서, 내가 한심하게 느껴져서 누나에게 화풀이를 한 것뿐이야.]<br><br>" +
                    "[내가 설사 돌아가지 못한다고 하더라도, 누나가 많이 슬퍼하지는 않았으면 좋겠어. 나 때문에 혼인도 미루고 있었던 걸 알아. 누나, 미안해. 그리고 사랑해.]<br><br>" +
                    "[누나가 앞으로는 더 행복해지길 바라. 그게 내 마지막 소원이야.]<br><br>" +
                    "[-재스퍼]<br><br>" 
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "편지를 가져간다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "재스퍼는 아마 죽었을 것이다. 하지만 당신은 이 편지를 가져가기로 했다. 당신은 편지를 챙겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    addItem(player, ITEMS.misc.jasperLetter);
                                }
                            }
                        ]
                    },
                    {
                        text : "편지를 두고 간다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 재스퍼가 누구인지 모른다. 그리고 어차피 재스퍼가 죽었을 거라고 생각한다. 당신은 편지를 그냥 지나쳤다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        [
            {
                type : "text",
                value : [
                    "누군가의 목소리가 들렸다. 당신은 고개를 돌렸다. 하얀 가운을 입은 사람이 시체 앞에서 중얼거리며 시체의 반응을 기록하고 있었다. 당신의 인기척에도 그는 당신을 인지하지 못하고 있다. 그는 시체에 달콤한 냄새가 나는 하얀 액을 뚝뚝 떨어뜨렸다." +
                    "<br><br>\"그때처럼 부작용이 나지 않게...\"<br><br>" +
                    "당신이 조금 더 가까이 오자, 그는 드디어 당신의 존재를 눈치채고 제자리에서 펄쩍 뛰었다. 생각보다 나이가 많은 사람이다. 그는 당신과 당신의 무기를 번갈아서 바라보더니 활짝 웃으며 또 힘을 위해서 온 거냐고 물었다." +
                    "<br><br>\"걱정마렴, 너는 내 유일한 성공작이니까...\"<br><br>" +
                    "당신에게 다가오던 그의 얼굴이 새하얗게 질렸다." +
                    "<br><br>\"아니야, 아니야, 넌 그가 아니야!\"<br><br>" +
                    "당신이 어떤 행동을 취하기도 전에 그는 그대로 도망가버렸다. 큰 소리를 내며 달려가는 그는 고개를 들고 천장에 무어라 중얼거리고 있었다." +
                    "<br><br>...시체들은 그를 공격하지 않고 있다."
                ]
            }
        ],
        [
            {
                type : "text",
                value : [
                    "복도를 지나가던 당신은 열린 문 틈 사이로 침대에 기대어 앉아있는 하얀 가운을 입은 시체를 발견했다. 아까 큰 소리를 내며 줄행랑치던 그 사람은 아니었다. 당신은 무전기를 잡았다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "1번을 눌러본다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "1번을 누르자 지지직거리는 소리와 함께 누군가의 녹음된 목소리가 들렸다." +
                                    "<br><br>[무슨 일이 일어난 거지?]<br><br>" +
                                    "[....]<br><br>" +
                                    "[...최선을 다해주었다. 다음 실험은 그런 점들까지 고려해서 실패하지 않도록 만들겠다. 발렌 님께는 따로 보고를 드리지, 네 가문은 발렌 님이 살아있는 한 영원토록 꺼지지 않을 것이다. 백색 도시를 위해서.]" +
                                    "<br><br>당신은 다른 것도 듣고 싶었지만, 무전기는 파지직 소리와 함께 꺼져 버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "2번을 눌러본다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "2번을 누르자 지지직거리는 소리와 함께 누군가의 녹음된 목소리가 들렸다." +
                                    "<br><br>[...네가 힘든 건 알아. 하지만 네가 조금만 힘들면 우리 가족이 다 살 수 있잖아.]" +
                                    "<br><br>[....]<br><br>" +
                                    "[발렌 님이 직접 약속하신 거라고. 당연히 너는 소중해. 하지만.... 이대로 가다가는 우리 가문은 단 한 발자국도 천국으로 가는 길의 바닥을 밟을 수 없을 거야.]<br><br>" +
                                    "[....]<br><br>" +
                                    "[나도 사랑해, 내 동생. 우리 집에서 너라도 똑똑해서 다행이야.]" +
                                    "<br><br>당신은 다른 것도 듣고 싶었지만, 무전기는 파지직 소리와 함께 꺼져 버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 무전기에 신경쓰지 않기로 했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 무전기를 신경쓰지 않기로 했다. 무전기를 다시 시체의 가운 주머니에 꽂아넣은 당신은 다시 앞으로 나아갔다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        [
            {
                type : "text",
                value : [
                    "큰 소리를 내며 달려가던 그 연구원을 당신은 드디어 따라잡았다. 가까이에서 들여다본 그는 피부가 이미 반쯤은 시체처럼 썩어 있었다. 그는 당신에게 당신도 힘을 필요로 하냐고 물었다." +
                    "<br><br>\"첫 번째 성공작이 있으면 두 번째 성공작도 있을 수 있는 게 당연하잖아?\"<br><br>" +
                    "그는 자신의 첫 번쨰 성공작은 신음 소리조차 내지 않던 아이였다고 말했다. 핏줄에서부터 검붉게 물들어 꿈틀꿈틀거리면서도 눈 하나 깜박하지 않았던 작은 아이였지, 그는 횡설수설하다가 당신의 팔을 덥썩 잡았다. 주사기를 당신의 팔에 들이밀며 그는 히죽히죽 웃었다." +
                    "<br><br>\"오로지 걱정하는 건 제 형이었어. 처음이자 마지막으로 내뱉은 말이 제 형에게 말하지 말라는 거였으니까.\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 연구원의 팔을 뿌리치고 벽으로 밀쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "벽으로 밀쳐진 연구원은 괴롭다는 듯 비명을 질렀다." +
                                    "<br><br>\"힘을 원하지 않는 거야? 힘이 있다면 뭐든 할 수 있어. 그래서, 그래서 그 아이도 흉물의 피를 받아들인 거고 발렌 님도 실험을 계속하는 거라고!\"<br><br>" +
                                    "그는 잠시 숨을 멈췄다." +
                                    "<br><br>\"발렌 님께 충성을 맹세하지 않는 거야? 그러면, 그러면... 발렌 님이 죽여버릴 거야. 나의 존재를 알고 있다는 것만으로도 너는...! <br><br><span class='log-danger'> 처단당할 거야!</span>\"<br><br>" +
                                    "그는 재밌다는 듯이 웃더니 버튼을 누르고 그대로 도망가버렸다. 당신이 손을 뻗었지만, 열렸던 문은 당신이 손을 제대로 뻗기도 전에 다시 닫혀버렸다. 당신에게 남은 건 광기 어린 웃음소리 뿐이었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.ericsDoctorAlive = true;
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그대로 그 주사바늘로 연구원의 목을 찔러 죽여버렸다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "주사바늘이 목을 찢자 연구원은 찢어질 듯한 비명을 지르며 양팔을 이리저리 휘둘렀다. 하지만 당신은 멈추지 않았다." +
                                    "<br><br>\"그 아이가! 찾아오지 않고 있는데! 이제 찾아올 때가 됐는데! 찾아왔는데 내가 없으면...\"<br><br>" +
                                    "연구원의 일그러진 입가가 호선을 그렸다." +
                                    "<br><br>\"...어떻게 될까?\"<br><br>" +
                                    "...당신은 그를 죽였다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.ericsDoctorDead = true;
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    ];

    const scene = middleEvents[eventIndex];

    if (!scene){
        showCorpseDummyRaidChoice(player);
        return;
    }

    startScene(scene, player, {
        onEnd : () => showCorpseDummyRaidChoice(player)
    });
}

function startCorpseDummyRaidBoss(player){
    startScene([
        {
            type : "text",
            value :
                "마지막 방에 도달했을 때, 당신은 거대한 흰색 꽃줄기 하나를 보았다. 그리고 그 거대한 흰색 꽃줄기 위에는 당신이 처음 보는 하얀색 꽃이 흐드러지게 피어올라 있었다. 당신이 지금까지 봤던 어떤 꽃들보다도 거대하고 아름다웠지만, 꽃줄기는 아직 살아있는 사람의 몸에 꽂혀 있었다. <br><br>...아니, 정확히 말하면 사람들과 살아있다고 볼 수 없는 사람들의 뭉터기가." +
                "<br><br>아직 살아있는 사람들이 당신을 보고 고통스럽게 절규했다. 어딘가에 붙어있는 입술이 당신을 향해 애원한다." +
                "<br><br>\"제발, 죽여줘...\"<br><br>" +
                "그들은 어그러진 발음으로 당신에게 애원했다. 당신이 다가오자 아직 결합되지 않은 시체들이 뚝뚝 떨어졌다. 그들은 마치 군대처럼 진을 형성하고 있었다. 당신의 머릿속에 순간 오염된 고블린들이 스쳐 지나갔다. <br><br>...그들도 인간처럼 군대를 형성했었다."
        }
    ], player, {
        onEnd : () => {
            startBattle(["experimentAboCorpse3", "experimentAboCorpse3", "experimentAboCorpse2", "experimentAboCorpse2", "experimentAboCorpse1", "experimentAboCorpse1"], player, {
                noEscape : true,

                onWin : () => {
                    endCorpseDummyRaidWin(player);
                },
                onLose : () => {
                    endCorpseDummyRaidLose(player);
                }
            });
        }
    });
}

function showCorpseDummyRaidChoice(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 마지막 방으로 계속 나아가고 있다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "계속 전진한다",
                    action: "continueCorpseDummyRaid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restCorpseDummyRaid"
                },
                {
                    text: "퇴각한다",
                    action: "CorpseDummyRaid_leave"
                }
            ]
        }
    ], player);
}

window.restCorpseDummyRaid = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 잠깐 멈춰서서 숨을 돌렸다."
        },
        {
            type: "effect",
            run: (player) => {
                passTime(player, 30);
                changeHP(player, 150);
                changeStamina(player, 150);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => showCorpseDummyRaidChoice(player)
    });
};

window.continueCorpseDummyRaid = function(player){
    advanceCorpseDummyRaid(player);
};

function endCorpseDummyRaidWin(player){
    player.corpseDummyRaid.active = false;
    player.flags.act3_quest_12_boss_end = true;
    addQuestProgress(player);

    startScene([
        {
            type : "text",
            value : 
                "시체더미들이 쓰러지고 당신은 당신의 앞에 있는 거대한 하얀꽃을 보았다. 이 거대한 하얀꽃이라면, 흉물들에게서 도시를 지킬 수 있을 것이다. 당신의 시선이 꽃줄기에 꽂혀있는 사람 무더기로 향했다. 죽은 자들은 말이 없었지만, 아직 죽지 못한 자들은 절망의 신음 소리를 내며 꿈틀거리고 있었다."
        },
        {
            type : "choice",
            choices : [
                {
                    text : "당신은 죽지 못한 자들을 죽여주었다.",
                    scene : [
                        {
                            type : "text",
                            value : [
                                "당신이 죽음을 선사해주자, 그들은 당신의 자비에 감사한다고 기어들어가는 목소리로 말했다. 그들은 당신에게 진심으로 감사하고 있다. 그들이 죽자, 거대한 하얀꽃은 맥동하더니 그대로 시들어버렸다. 거대한 하얀꽃의 달콤한 향기가 당신의 몸을 맴돈다." +
                                "<br><br>...어쩐지 당신은 강해진 기분이 들었다. 당신은 연구소를 나왔다."
                            ]
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                player.flags.act3_quest_12_killWhiteFlower = true;
                                increasePlayerMaxHp(player, 15);
                                player.location = "deepForest_act3"
                                savePlayer(player);
                            }
                        }
                    ]
                },
                {
                    text : "당신은 죽지 못한 자들을 죽이지 않았다.",
                    scene : [
                        {
                            type : "text",
                            value : [
                                "이 거대한 꽃은 도시를 지켜줄 것이다. 당신은 그들에게서 고개를 돌렸다." +
                                "<br><br>그들이 괴로워하는 동안, 더 많은 사람들이 살 수 있다. 당신은 연구소를 나왔다."
                            ]
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                player.flags.act3_quest_12_notkillWhiteFlower = true;
                                player.location = "deepForest_act3"
                                savePlayer(player);
                            }
                        }
                    ]
                }
            ]
        }
    ])
}

function endCorpseDummyRaidLose(player){
    gameOver(
        player,
        "당신은 시체 더미에 졌다. 그 순간, 거대한 하얀 꽃이 맥동하면서 당신마저 살덩이 중 하나로 결합시키기 시작했다. 당신은 결합되지 않기 위해 발버둥을 쳤지만, 힘이 빠진 몸으로는 그 끔찍한 향에 저항할 수 없었다. 당신의 몸에서 힘이 풀렸다. 당신의 살과, 누군가의 살이 결합되기 시작한다." +
        "<br><br>...당신의 숨이 붙어있는 동안, 거대한 꽃은 상류 도시를 지켜줄 것이다."
    )
}