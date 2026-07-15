window.EVENTS.push({
    id : "soraDisapprovesLuke_01",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        (
            hasNpcRelationship("luke", "lover") ||
            hasNpcRelationship("luke", "spouse")
        ) &&
        !player.flags?.soraDie &&
        Math.random() < 0.06,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길을 가고 있는 당신의 앞으로 길게 뻗은 그림자가 나타났다. 그림자가 너무 길어서 순간 당신은 놀랐다. 하지만 그림자의 주인은 소라였다. 그는 당신을 보더니 환하게 웃으며 당신에게 한걸음 한걸음 다가왔다.",
                    "<br><br>\"오늘 시간 있...\"<br><br>",
                    "\"없어.\"<br><br>",
                    "대체 어디서 나타난 걸까. 당신 대신 루크가 대답하며 당신을 제쪽으로 잡아당겼다. 소라의 금안이 위험하게 가늘어졌다. 소라가 다가오려고 하자 루크는 입에 담배를 물었다. 하얀꽃의 달콤하지만 매캐한 것이 섞인 냄새가 나기 시작한다.",
                    "<br><br>\"{soraTitle}, 내쪽으로 올 거지?\"<br><br>",
                    "소라는 당연하다는 듯이 당신에게 손을 내밀었다. 당신의 뒤에서 루크가 말없이 당신의 어깨를 더 끌어안아온다.<br><br>두 사람 모두 물러날 기미가 보이지 않는다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 루크의 품에서 빠져나와 소라에게 갔다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 루크의 품에서 빠져나왔다. 루크는 당신을 붙잡지는 않았다. 그저 당신이 소라에게 가는 것을 지켜보고 있을 뿐이다, 멍하니.",
                                    "<br><br>\"씨발.\"<br><br>",
                                    "소라는 당신이 자신에게 가까이 오자마자 와락 끌어안았다. 루크는 욕을 내뱉더니 그대로 뒤로 돌아가버렸다. 소라는 당신을 끌어안은 채 당신이 자신에게 올 줄 알았다고 속삭였다.",
                                    "<br><br>\"소라가 좋아하는 만큼, {soraTitle}도 소라를 좋아하잖아? 그러니 당연한 거야.\"<br><br>",
                                    "소라는 당신을 안고 있던 팔을 풀었다. 그리고 당신에게 손깍지를 낀 채 거리 이곳저곳을 돌아다니며 가게에 대한 얘기부터 시작해서 여러 가지 얘기를 했다. 특히 그는 하얀꽃에 대해 말할 때 루크의 담배에서 하얀꽃의 달콤한 냄새가 나지 않냐고 물었다.",
                                    "<br><br>\"상류도시에 가면 루크는 사형일걸?\"<br><br>",
                                    "까르르, 아무렇지도 않게 사형이란 말을 입에 담은 소라는 당신에게 그러니 그와 너무 가깝게 지내지는 말라고 말했다. 네가 그녀석 때문에 다치면 안 되니까, 소라는 당신의 손등을 살살 쓸었다. 몇 분을 더 돌아다닌 후 소라는 아쉬움이 가득한 얼굴로 당신의 손을 놓아주었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "affection", 10);
                                    changeNPCEmotion("luke", "affection", -10);
                                    changeNPCEmotion("luke", "rage", 10);
                                    passTime(player, 10);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 당신의 어깨를 붙잡고 있는 루크의 팔을 꽈악 잡았다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 그의 팔을 꽉 붙잡자 루크도 당신의 어깨를 더 꽈악 붙잡아왔다. 그는 으르렁거리는 목소리로 당신은 이미 선택을 했으니 이제 물러나라고 말했다.",
                                    "<br><br>\"아니? 널 선택할 리가 없잖아? 소라보다 예쁘지도 않고, 소라보다 강하지도 않고, 소라보다 상냥하지도 않은 너를 선택한다고?\"<br><br>",
                                    "소라의 표정이 무섭다. 그는 루크를 향해 말하면서도 금안은 당신을 똑바로 주시하고 있었다. 루크는 당신을 놓아주지 않겠다는 듯 손에 더 힘을 주더니 그대로 당신을 제 뒤로 숨겼다.",
                                    "<br>소라의 발걸음 소리가 뚝 멈췄다.<br><br>",
                                    "\"{soraTitle}. 루크는 네게 해를 끼칠 수 있는 사람이라면 모를까, 너를 지켜줄 수는 없는 사람이야.<br>오늘은 내가 봐줄게. 소라는 널 사랑하니까.\"<br><br>",
                                    "\"지랄을 하네. 안 꺼져?\"<br><br>",
                                    "정적. 그리고 다시 발걸음 소리. 소라가 멀어지고 나서야 루크는 낮게 한숨을 쉬며 당신을 풀어주었다.",
                                    "<br><br>\"야. 쟤랑 너무 친하게 지내지마. 썅년인 거 같으니까.\"<br><br>",
                                    "그는 에릭이 소라를 계속 지켜보고 있다는 사실을 알려주며 에릭이 주시하고 있는 사람이라면 친해져봤자 좋을 게 없다고 말했다.",
                                    "<br><br>\"그리고 나도 걔가 싫어. 기분이 나쁘거든.\"<br><br>",
                                    "그는 당신과 함께 거리를 몇 바퀴 돌다가 이만 가보라며 당신의 머리를 꾹 눌렀다. 평소처럼 그래도 뒤돌아보지도 않고 가려던 그가 순간 발걸음을 멈췄다. 힐끗. 한번이었지만 그는 가기 전에 당신을 뒤돌아보긴 했다. 그리고 그는 다시 가버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "affection", -10);
                                    changeNPCEmotion("luke", "affection", 10);
                                    changeNPCEmotion("sora", "rage", 10);
                                    passTime(player, 10);
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
    }
});

window.EVENTS.push({
    id : "soraAndMatin_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        NPC_DATA["matin"].emotion.affection > 20 &&
        NPC_DATA["sora"].emotion.affection > 30 &&
        !player.flags?.soraDie &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "상점에 들른 당신은 마틴이 소라에게서 식료품을 받아가는 것을 보았다. 당신이 상점 문을 열고 들어오자 마틴에게서 돈을 받고 있던 소라는 한 팔로 붕붕 당신에게 인사를 해보였다.",
                    "<br><br>\"어서와! 보고 싶었어!\"<br><br>",
                    "마틴은 당신을 힐끗 보긴 했지만 아무 말도 하지 않았다. 그는 그저 한번 더 상품의 개수를 확인할 뿐이었다. 소라는 아무렇지도 않게 당신의 손을 붙잡으며 오늘 하루는 어땠냐고 물었다. 마틴이 뭘 하고 있든 그의 눈에는 당신밖에 안 보이는 거 같다.",
                    "<br><br>\"소라. 식용유값이 너무 올랐다.\"<br><br>",
                    "\"요새 마물이 많잖아. 습격당하는 상인이 많아서 그런지 조미료값이 좀 올랐더라고.\"<br><br>",
                    "마틴은 다시 한번 숫자를 확인하더니 고개를 저으며 그걸 감안해도 너무 올랐다고 말했다. 마틴이 고개를 들자 소라는 은근하게 당신과 마틴의 거리를 벌리며 마틴과 똑같이 고개를 저었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그래도 마틴은 소라의 단골손님인데 싸게 해주는 게 어떻겠냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 소라는 토라진 듯 뺨을 부풀렸다. 그는 당신의 가슴에 자신의 머리를 콩콩 박으며 왜 자신의 마음을 몰라주는 거냐고 말했다.",
                                    "<br><br>\"소라한테만 착하면 돼, 응? 너무 착해서 탈이라니까.\"<br><br>",
                                    "그러더니 소라는 마틴을 흘겨보았다.",
                                    "<br><br>\"소라를 사랑하는 {soraTitle} 때문에 해주는 거야.\"<br><br>",
                                    "마틴은 그 말에 소라와 당신을 번갈아보았다. 그러더니 곧 그는 고개만 까닥이고 돌아섰다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "affection", -5);
                                    changeNPCEmotion("matin", "affection", 1);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 마틴에게 조미료 원가가 오른 건 소라가 어떻게 할 수 없는 거라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 마틴은 인상을 찌푸렸다.",
                                    "<br><br>\"아니. 아무리 그래도 이 가격은 너무 높다.\"<br><br>",
                                    "소라는 당신이 자신의 편을 들자 눈을 동그랗게 떴다가 헤헤 웃었다. 그러더니 그는 기분이 좋아졌으니 원래 가격으로 그냥 하자고 말했다. 그 말에 마틴의 인상이 구겨졌다.",
                                    "<br><br>\"그게 뭔 뜻이야?\"<br><br>",
                                    "소라는 이제 해결이 됐으니 가보라고 마틴에게 손짓하며 당신의 품으로 파고들었다. 소라의 머리가 당신의 가슴에 파묻힌다. 마틴은 소라와 당신을 번갈아보다가 한숨을 쉰 후 상점을 나갔다. 소라와 당신은 마틴이 나간 후 짧게나마 단둘만의 시간을 가졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "affection", 5);
                                    changeNPCEmotion("matin", "affection", -1);
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
    id : "soraAndMatin_02",
    condition : (player) =>
        player.justMoved &&
        player.location === "tavern" &&
        NPC_DATA["matin"].emotion.affection > 30 &&
        NPC_DATA["sora"].emotion.affection > 30 &&
        !player.flags?.soraDie &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "주점에 들르자 카운터에 앉아있던 소라가 벌떡 일어났다." +
                    "<br><br>\"여기 네가 올 줄 알고 기다리고 있었어!\"<br><br>" +
                    "소라는 당신에게 달려오더니 그대로 당신의 팔에 팔짱을 꼈다. 그는 요새 상점보다 주점에 더 많이 들르는 거 아니냐고 툴툴거렸다." +
                    "<br><br>\"소라는 {soraTitle} 보고 싶어서 항상 두근두근거리는데....\"<br><br>" +
                    "소라는 당신을 올려다보다가 마틴의 시선을 눈치채고 고개를 갸웃거렸다. 마틴은 다른 사람한테 무관심한 편인데 이상하네, 조용히 중얼거리던 소라는 당신의 옆구리에 더욱 달라붙었다." +
                    "<br><br>\"...여기서 해도 돼?\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 눈을 감고 소라 쪽으로 고개를 틀었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 눈을 감고 소라 쪽으로 고개를 틀자 소라의 표정이 전보다 더 환해졌다. 그는 발뒤꿈치를 들더니 그대로 당신의 목에 두 팔을 감으며 당신의 입술에 자신의 입술을 묻었다. 달콤한 냄새가 당신의 정신을 어지럽힌다." +
                                    " 어쩐지 현기증이 나서 당신은 그대로 뒤로 쓰러질 뻔했다. 그러자 소라는 당신의 목에 매달리듯이 균형을 자기 쪽으로 기울였다. 당신의 몸이 소라 쪽으로 기울어진다. 점점 더, 점점 더, 그리고 쿵. 당신이 정신을 차렸을 때 소라는 당신의 밑에서 행복하다는 듯이 웃고 있었다." +
                                    "<br>주점의 모든 사람들이 당신과 소라를 쳐다보고 있는 느낌이 든다. 몇 명은 박수까지 쳤다. 당신은 당신도 모르게 마틴 쪽으로 시선을 돌렸다. 마틴은 당신을 쳐다보고 있지도 않았다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "affection", 5);
                                    changeNPCEmotion("matin", "rage", 3);
                                    changeSensitivity(player, "mSensitivity", 5);
                                    changeArousal(
                                        player,
                                        getSensitivityArousalGain(player, "m", 5)
                                    );
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 소라를 거절했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "소라는 당신의 거절에도 방긋 웃으며 고개를 기울였다." +
                                    "<br><br>\"쑥스러워서 그래? 쑥스러워하지 않아도 되는데.\"<br><br>" +
                                    "소라는 아무렇지도 않게 당신의 가슴에 얼굴을 기댔다. 당신의 심장 박동 소리라도 듣는 줄 알았지만, 아무래도 그런 것 같지는 않았다. 소라는 당신의 가슴에 뺨을 기댄 채로 가만히 있다가 당신에게 자신을 안아줘야 하는 거 아니냐고 물었다." +
                                    "<br><br>\"보통 사람들은 여기서 마주 안아주잖아?\"<br><br>" +
                                    "삐쳤다는 듯 뺨을 부풀리는 소라의 앞으로 맥주 한 잔이 툭 내밀어졌다. 마틴이었다." +
                                    "<br><br>\"할 거면 방 잡고 해. 주점에서 물의 일으키지 말고.\"<br><br>" +
                                    "그 말을 끝으로 마틴은 다시 카운터로 돌아갔다. 소라는 맥주와 마틴을 번갈아보더니 입꼬리를 올렸다.<br>...어쩐지 웃는 게 웃는 게 아닌 거 같다.<br>소라는 갑작스럽게 당신의 뺨에 콕 뽀뽀를 하더니 환하게 웃었다." +
                                    "<br><br>\"다음 번에는 방 잡고 해야겠다, 그치?\"<br><br>" +
                                    "보고 싶은 사람 봤으니까 난 이제 갈게, 소라는 당신에게 팔을 휘휘 흔들어보이더니 주점을 나갔다. <br>...주점에 평화가 찾아왔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "rage", 1);
                                    changeNPCEmotion("matin", "affection", 1);
                                    changeNPCEmotion("matin", "rage", -1);
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