window.EVENTS.push({
    id : "soraAndLuke_01",
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
                    "길을 가고 있는 당신의 앞으로 길게 뻗은 그림자가 나타났다. 그림자가 너무 길어서 순간 당신은 놀랐다. 하지만 그림자의 주인은 소라였다. 그는 당신을 보더니 환하게 웃으며 당신에게 한걸음 한걸음 다가왔다." +
                    "<br><br>\"오늘 시간 있...\"<br><br>" +
                    "\"없어.\"<br><br>" +
                    "대체 어디서 나타난 걸까. 당신 대신 루크가 대답하며 당신을 제쪽으로 잡아당겼다. 소라의 금안이 위험하게 가늘어졌다. 소라가 다가오려고 하자 루크는 입에 담배를 물었다. 하얀꽃의 달콤하지만 매캐한 것이 섞인 냄새가 나기 시작한다." +
                    "<br><br>\"{soraTitle}, 내쪽으로 올 거지?\"<br><br>" +
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
                                    "당신은 루크의 품에서 빠져나왔다. 루크는 당신을 붙잡지는 않았다. 그저 당신이 소라에게 가는 것을 지켜보고 있을 뿐이다, 멍하니." +
                                    "<br><br>\"씨발.\"<br><br>" +
                                    "소라는 당신이 자신에게 가까이 오자마자 와락 끌어안았다. 루크는 욕을 내뱉더니 그대로 뒤로 돌아가버렸다. 소라는 당신을 끌어안은 채 당신이 자신에게 올 줄 알았다고 속삭였다." +
                                    "<br><br>\"소라가 좋아하는 만큼, {soraTitle}도 소라를 좋아하잖아? 그러니 당연한 거야.\"<br><br>" +
                                    "소라는 당신을 안고 있던 팔을 풀었다. 그리고 당신에게 손깍지를 낀 채 거리 이곳저곳을 돌아다니며 가게에 대한 얘기부터 시작해서 여러 가지 얘기를 했다. 특히 그는 하얀꽃에 대해 말할 때 루크의 담배에서 하얀꽃의 달콤한 냄새가 나지 않냐고 물었다." +
                                    "<br><br>\"상류도시에 가면 루크는 사형일걸?\"<br><br>" +
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
                                    "당신이 그의 팔을 꽉 붙잡자 루크도 당신의 어깨를 더 꽈악 붙잡아왔다. 그는 으르렁거리는 목소리로 당신은 이미 선택을 했으니 이제 물러나라고 말했다." +
                                    "<br><br>\"아니? 널 선택할 리가 없잖아? 소라보다 예쁘지도 않고, 소라보다 강하지도 않고, 소라보다 상냥하지도 않은 너를 선택한다고?\"<br><br>" +
                                    "소라의 표정이 무섭다. 그는 루크를 향해 말하면서도 금안은 당신을 똑바로 주시하고 있었다. 루크는 당신을 놓아주지 않겠다는 듯 손에 더 힘을 주더니 그대로 당신을 제 뒤로 숨겼다." +
                                    "<br>소라의 발걸음 소리가 뚝 멈췄다.<br><br>" +
                                    "\"{soraTitle}. 루크는 네게 해를 끼칠 수 있는 사람이라면 모를까, 너를 지켜줄 수는 없는 사람이야.<br>오늘은 내가 봐줄게. 소라는 널 사랑하니까.\"<br><br>" +
                                    "\"지랄을 하네. 안 꺼져?\"<br><br>" +
                                    "정적. 그리고 다시 발걸음 소리. 소라가 멀어지고 나서야 루크는 낮게 한숨을 쉬며 당신을 풀어주었다." +
                                    "<br><br>\"야. 쟤랑 너무 친하게 지내지마. 썅년인 거 같으니까.\"<br><br>" +
                                    "그는 에릭이 소라를 계속 지켜보고 있다는 사실을 알려주며 에릭이 주시하고 있는 사람이라면 친해져봤자 좋을 게 없다고 말했다." +
                                    "<br><br>\"그리고 나도 걔가 싫어. 기분이 나쁘거든.\"<br><br>" +
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
    id : "soraAndLuke_01",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        (
            hasNpcRelationship("luke", "lover") ||
            hasNpcRelationship("luke", "spouse")
        ) &&
        (
            hasNpcRelationship("sora", "lover") ||
            hasNpcRelationship("sora", "spouse")
        ) &&
        !player.flags?.soraDie &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"{lukeTitle}.\"<br><br>" +
                    "순찰을 돌고 있었던 건지 경비병들과 함께 골목을 돌고 있던 루크는 당신을 보자 다른 사람들을 물렀다. 경비병들 몇 명이 훈훈한 표정으로 당신과 루크를 번갈아보았다. 그 중 몇 명은 가기 전에 당신에게 루크를 받아줄 사람은 너밖에 없으니 제발 좀 받아달라는 소리를 하고 갔다. \"안 꺼져?\", 그들은 으르렁거리는 루크를 보고서도 낄낄거리기 바빴다." +
                    "<br><br>\"하, 진짜...\"<br><br>" +
                    "루크는 어이없다는 듯이 그들이 간 방향을 바라보다가 다시 당신을 보았다." +
                    "<br><br>\"왜. 뭐.\"<br><br>" +
                    "그는 신경질적으로 라이터를 딸깍거리다가 당신 쪽으로 고개를 숙였다. 그리고 평소처럼, 그는 당신의 머리를 제 손으로 꾹꾹 눌렀다. 한번 더 꾹꾹이를 하려는 순간, 누군가의 손이 루크의 손을 잡았다." +
                    "<br><br>\"소라의 {soraTitle}에게 손대지 마.\"<br><br>" +
                    "그러더니 소라는 당신을 제쪽으로 끌어당겼다. 하지만 루크도 소라가 당신을 끌고 가게 내버려두지 않았다. 그는 당신의 다른쪽 팔을 잡으며 \"내가 얘랑 뭘 하든 무슨 상관이야.\"라고 말했다. 루크의 목소리가 평소보다 낮다." +
                    "<br><br>\"무슨 상관이냐니. {playerName}, 소라꺼 하기로 했는 걸.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 자신은 소라의 것이 아니라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "소라는 눈을 동그랗게 뜨고 당신을 바라보았다. 그러더니 베시시 웃으며 왜 그런 농담을 치냐고 물었다." +
                                    "<br><br>\"우리 이미 서약까지 나눴잖아, 진실의 키스. 기억이 안 나면 여기서 한번 더 할까?\"<br><br>" +
                                    "소라의 입술이 당신에게로 내려온다. 그 순간 루크가 소라를 밀쳐냈다. 분명 넘어질 정도로 세게 밀쳤지만, 소라는 당신에게서 떨어지기만 했을 뿐 넘어지지는 않았다. 소라는 무표정으로 루크와 당신을 번갈아보았다." +
                                    "<br><br>\"아. 정말... 성가시네.\"<br><br>" +
                                    "차가운 목소리, 그 목소리는 소라의 것으로는 들리지 않았다. 하지만 그것도 잠시 소라는 웃으며 당신에게 쑥스러워서 그러는 거면 오늘은 봐주겠다고 말했다. 루크는 당신을 더 끌어안으며 소라에게 꺼지라고 말했다." +
                                    "<br>소라가 멀어진 후에야 루크는 당신을 놓아주었다. 그는 당신은 왜 항상 남이 안 하는 행동을 하는 거냐며 짜증을 냈다. 그는 당신과 함께 길거리를 돌다가 그나마 안전한 곳이라고 생각되는 곳에서 당신과 헤어졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("luke", "affection", 3);
                                    changeNPCEmotion("sora", "affection", -1);
                                    changeNPCEmotion("sora", "rage", 3);
                                    changeNPCEmotion("luke", "rage", -3);
                                    passTime(player, 10);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 소라 쪽으로 몸을 기울였다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "루크는 당신의 반응을 소라보다 먼저 알아차렸다. 그는 말없이 당신과 소라를 번갈아보다가 그대로 발걸음을 돌렸다." +
                                    "<br><br>\"씨발.\"<br><br>" +
                                    "그는 가다가 한 시민의 멱살을 잡더니 오늘은 네 몸수색이나 해야겠다고 말하며 그를 골목 구석으로 질질 끌고 갔다. 마지막으로 자안이 당신을 스쳐지나가긴 했지만 그뿐이었다. 루크는 그대로 멀어져버렸다. 소라는 당신의 손가락 사이로 손깍지를 끼며 웃었다." +
                                    "<br><br>\"소라는 소라꺼밖에 안 봐. 루크처럼 다른 사람의 몸에 손대지 않아.<br>소라에게는 1순위 말고 다른 순위는 아예 존재하지도 않거든.\"<br><br>" +
                                    "소라는 당신의 팔짱을 낀 채 골목골목을 돌아다니며 보통 커플이 나눌 법한 대화를 당신과 나눴다. 그는 자신의 일상을 공유하더니 당신의 일상도 공유받고 싶다는 듯 눈을 반짝거렸다. 당신은 그와 함께 즐거운 시간을 보냈다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "affection", 5);
                                    changeNPCEmotion("luke", "affection", -8);
                                    changeNPCEmotion("sora", "rage", -3);
                                    passTime(player, 10);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 난 두 송이의 꽃을 원한다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 루크와 소라가 모두 굳었다." +
                                    "<br><br>\"씨발, 뭐?\"<br><br>" +
                                    "루크는 당신이 그런 말을 한 게 믿기지 않는지 다시 한번 당신에게 물었다. 그에 비해 소라는 고개를 기울이더니 당신이 원한다면 그정도는 들어줄 수 있다고 말했다." +
                                    "<br><br>\"아주 조금은 허락해줄게... 하지만 소라가 항상 1위여야 해?\"<br><br>" +
                                    "소라의 말에 루크는 더 어이없다는 표정을 지었다. 소라는 당신의 귀에 대고 속삭였다, \"봤지? 난 쟤랑 다르게 속도 넓어!\". 루크는 기가 차다는 듯이 웃다가 먼저 당신에게서 등을 돌렸다. 루크가 가고 나서 소라는 당신과 이런저런 이야기를 나누며 즐거운 시간을 보냈다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("luke", "affection", -2);
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
        NPC_DATA["matin"].emotion.affection < 70 &&
        NPC_DATA["matin"].emotion.affection > 20 &&
        NPC_DATA["sora"].emotion.affection > 30 &&
        !player.flags?.soraDie &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "상점에 들른 당신은 마틴이 소라에게서 식료품을 받아가는 것을 보았다. 당신이 상점 문을 열고 들어오자 마틴에게서 돈을 받고 있던 소라는 한 팔로 붕붕 당신에게 인사를 해보였다." +
                    "<br><br>\"어서와! 보고 싶었어!\"<br><br>" +
                    "마틴은 당신을 힐끗 보긴 했지만 아무 말도 하지 않았다. 그는 그저 한번 더 상품의 개수를 확인할 뿐이었다. 소라는 아무렇지도 않게 당신의 손을 붙잡으며 오늘 하루는 어땠냐고 물었다. 마틴이 뭘 하고 있든 그의 눈에는 당신밖에 안 보이는 거 같다." +
                    "<br><br>\"소라. 식용유값이 너무 올랐다.\"<br><br>" +
                    "\"요새 마물이 많잖아. 습격당하는 상인이 많아서 그런지 조미료값이 좀 올랐더라고.\"<br><br>" +
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
                                    "당신의 말에 소라는 토라진 듯 뺨을 부풀렸다. 그는 당신의 가슴에 자신의 머리를 콩콩 박으며 왜 자신의 마음을 몰라주는 거냐고 말했다." +
                                    "<br><br>\"소라한테만 착하면 돼, 응? 너무 착해서 탈이라니까.\"<br><br>" +
                                    "그러더니 소라는 마틴을 흘겨보았다." +
                                    "<br><br>\"소라를 사랑하는 {soraTitle} 때문에 해주는 거야.\"<br><br>" +
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
                                    "당신의 말에 마틴은 인상을 찌푸렸다." +
                                    "<br><br>\"아니. 아무리 그래도 이 가격은 너무 높다.\"<br><br>" +
                                    "소라는 당신이 자신의 편을 들자 눈을 동그랗게 떴다가 헤헤 웃었다. 그러더니 그는 기분이 좋아졌으니 원래 가격으로 그냥 하자고 말했다. 그 말에 마틴의 인상이 구겨졌다." +
                                    "<br><br>\"그게 뭔 뜻이야?\"<br><br>" +
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
        NPC_DATA["matin"].emotion.affection < 70 &&
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
                                    changeNPCEmotion("matin", "affection", -3);
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

window.EVENTS.push({
    id : "soraAndMatin_03",
    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        NPC_DATA["matin"].emotion.affection >= 70 &&
        !player.flags?.soraDie &&
        !player.flags?.ericDie &&
        player.flags?.soraAndMatin_day !== getCurrentDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        player.flags.soraAndMatin_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "상점에 들어온 당신은 소라와 마틴이 얘기를 나누고 있는 모습을 보았다. 마틴은 당신과 시선이 마주치자 고개만 살짝 까닥였다. 그런 마틴의 반응에 소라의 눈이 반달 모양으로 접혔다." +
                    "<br><br>\"뭐야? 둘이 엄청 친해졌네?\"<br><br>" +
                    "소라는 빙긋 웃으며 마틴에게 식자재가 담긴 상자를 내밀었다. 마틴은 상자의 크기를 보더니 양이 너무 작아진 것 아니냐고 물었다. 소라는 뺨을 부풀리며 요새 교역상들이 많이 죽어서, 수요보다 공급이 훨씬 부족한 상황이라고 말했다." +
                    "<br><br>\"그건 소라도 어쩔 수 없어~\"<br><br>" +
                    "소라는 당신을 보더니 하지만 당신이 마틴의 앞에서 자신에게 뽀뽀라도 해준다면, 편의를 조금은 봐줄 수도 있다고 말했다. 농담처럼 말하긴 했지만 '농담'이라는 말은 하지 않았다. 마틴의 표정이 굳었다." +
                    "<br><br>\"필요없어.\"<br><br>" +
                    "\"으응? 진짜? 에릭한테 내려면 좀 빡빡하지 않아?\"<br><br>" +
                    "소라는 당신에게서 시선을 떼지 않고 있다...."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 소라에게 가서 뽀뽀했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 소라에게 다가가자 소라의 미소가 미묘해졌다. 즐거워하는 것 같기도 했고, 화가 난 것 같기도 했다. 소라는 고개를 들더니 입을 벌렸다. 뽀뽀가 아니라 키스를 요구하고 있었다. 하지만 당신의 입술이 소라의 입술에 닿기 전에 마틴의 손이 당신의 입을 막았다." +
                                    "<br><br>\"...하지 마.\"<br><br>" +
                                    "마틴은 당신을 뒤로 밀어냈다. 그러더니 소라에게 돈을 지불한 후 상점을 나가버렸다. 소라는 팔랑팔랑 손을 흔들어 마틴을 보낸 뒤 당신을 쳐다보았다." +
                                    "<br><br>\"네게 마틴이 소중해졌나봐... 소라, 약간 질투나려고 하는데.\"<br><br>" +
                                    "소라는 미소를 지으며 꽃받침을 했다. 그리고 애교스러운 표정으로 당신을 올려다보았다." +
                                    "<br><br>\"너무 질투나니까, 다음 번에는 조건 없이도 키스해줘야 해, 알겠지?\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("matin", "affection", -2);
                                    changeNPCEmotion("matin", "rage", 10);
                                    changeNPCEmotion("sora", "dominance", 5);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 마틴에게 돈이 필요하면 말하라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...안 필요해.\"<br><br>" +
                                    "마틴은 단호하게 대답했다. 그러더니 소라의 앞으로 꽤나 많은 돈을 내놓았다. 소라는 돈의 액수를 대충 세보더니 조금 놀란 표정을 지었다." +
                                    "<br><br>\"계산 잘못한 건... 아닌 것 같네?\"<br><br>" +
                                    "\"얘로 그런 장난 치지 마.\"<br><br>" +
                                    "마틴의 말에 소라는 눈을 동그랗게 떴다가도 파하하 웃어보였다. 아아, 부럽다, {soraTitle}, 다른 사람들한테도 사랑을 듬뿍 받고 있네." +
                                    "<br><br>\"하지만 소라가 1위야. 마틴은 내가 봐줘서 2위로 하자.\"<br><br>" +
                                    "마틴은 소라를 똑바로 응시했다." +
                                    "<br><br>\"1위는 네가 정하는 게 아니야.\"<br><br>" +
                                    "마틴은 당신을 힐끗 보더니 그대로 상점을 나가버렸다. 소라는 웃는 얼굴 그대로 마틴이 나간 상점 문을 응시하다가 당신을 돌아보았다." +
                                    "<br><br>\"...마틴에게 우리 {soraTitle}가 많이 소중해졌나봐... 재밌네.\"<br><br>" +
                                    "소라는 여전히 웃고 있었지만, 전혀 즐거워 보이지 않았다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "dominance", -3);
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
    id : "soraAndMatin_04",
    condition : (player) =>
        player.justMoved &&
        player.location === "tavern" &&
        (hasNpcRelationship("matin", "lover") || hasNpcRelationship("matin", "spouse") ) &&
        !player.flags?.soraDie &&
        player.flags?.soraAndMatin_day !== getCurrentDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        player.flags.soraAndMatin_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "마틴의 주점에서 밥을 먹고 있던 소라가 고개를 들었다. 그는 당신을 보더니 휘휘 손을 흔들어보였다." +
                    "<br><br>\"여기 앉아!\"<br><br>" +
                    "소라는 당신이 자신의 옆에 앉자 만족스러운 미소를 지으며 마틴에게 주문을 했다. 마틴은 소라의 주문을 듣더니 그 주문은 당신을 위한 주문이냐고 물었다. 소라는 까르르 웃으며 마틴은 눈치도 빠르다고 대꾸했다. 마틴은 소라에게 대꾸하지 않았다. 요리를 끝낸 그가 내민 건 소라가 주문한 음식이 아니었다." +
                    "<br><br>\"걔는 그것보다 이거 좋아해.\"<br><br>" +
                    "소라는 마틴이 내민 요리와 당신을 번갈아 보았다. 소라의 미소가 조금 희미해졌다." +
                    "<br><br>\"둘이 많이 친해졌나 보네...? 무슨 사이야?\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 마틴과 연인 사이라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 소라의 표정이 굳었다. 더 이상 소라의 얼굴에서는 미소를 찾아볼 수가 없었다. 마틴은 소라를 힐끗 보더니 자기도 모르게 망치를 집어 들었다. 그가 긴장했을 때 나오는 습관이었다." +
                                    "<br><br>\"...장난이지?\"<br><br>" +
                                    "\"장난 아니야.\"<br><br>" +
                                    "마틴은 당신에게 눈짓을 해보였다. 그는 당신이 자신에게 다가오자 곧바로 당신을 자신의 등 뒤로 숨겼다. 그의 목덜미에는 식은땀이 맺혀 있었다. 소라는 이제 무표정으로 당신과 마틴을 번갈아보았다." +
                                    "<br><br>\"아닌데. <span class='log-pale'>소라가 1위여야 하는데.<br><br>소라에게 대체 뭐가 부족했던 거지.</span>\"<br><br>" +
                                    "마틴의 뒤에 있는 당신을 똑바로 쳐다보며 중얼거리던 소라는 고개를 숙였다. 그러더니 그는 말없이 일어나서 주점을 나갔다. <br>...당신의 등뒤로 식은땀이 흘렀다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "rage", 10);
                                    changeNPCEmotion("matin", "affection", 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 마틴은 좋은 친구라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 마틴의 표정이 굳었다. 그는 딱딱한 얼굴로 당신을 쳐다보았다. 그의 검은 눈동자에 불신이 서렸다." +
                                    "<br>하지만 결국 그는 아무 말도 하지 않았다. 당신의 앞에 요리를 내려놓은 후 그는 다른 요리를 하러 갔다. 당신을 쳐다보지도 않고." +
                                    "<br>당신과 마틴을 번갈아 바라보던 소라는 만족스럽다는 듯이 웃었다." +
                                    "<br><br>\"봐. 소라는 언제나 1위라니까. 그렇지?\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sora", "affection", 3);
                                    changeNPCEmotion("matin", "affection", -20);
                                    changeNPCEmotion("matin", "rage", 10);
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
    id : "dericAndKain_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "nobleSquare" &&
        player.flags?.dericAndKain_day !== getCurrentDay(player) &&
        NPC_DATA["kain"].emotion.affection > 10 &&
        NPC_DATA["deric"].emotion.affection > 10 &&
        Math.random() < 0.09,

    action : (player) => {
        player.flags.dericAndKain_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "사교회장에 들어선 당신은 데릭과 카인이 함께 있는 것을 발견했다. 분위기가 심상치 않다...." +
                    "<br><br>둘 다 잘 차려입긴 했지만 분위기가 너무 험악해서 몇몇 귀족들이 서로 수군거리는 것이 보인다. 데릭의 욕은 없고 전부 카인에 대한 욕이다. 그들은 카인이 또 분위기를 흐렸다고 쑥덕거렸다.",
                    "<br>데릭은 그들이 카인에게 들리도록 말하고 있다는 걸 알면서도 모르는 척 미소만 지었다. 카인의 표정이 점점 썩어가는 게 보인다...."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 데릭에게 어른이면 어른답게 굴라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 주변의 분위기가 싸해졌다. 데릭은 웃는 얼굴로 당신을 바라보고 있었지만 그의 녹안은 전혀 웃고 있지 않았다." +
                                    "<br><br>\"하류도시의 영웅이 아직 상류도시에 적응을 못해서 그런 겁니다. 출신 때문에 모자란 점이라면 저희가 이해해줘야죠.\"<br><br>" +
                                    "그는 당신의 어깨를 가볍게 잡았다." +
                                    "<br><br>\"다만 네 명성에 먹칠할 행동은 삼가는 게 좋겠구나.\"<br><br>" +
                                    "그 순간 카인이 당신의 어깨를 제쪽으로 끌어당겼다. 순간 중심을 잡지 못한 당신은 그대로 카인의 품에 안겼다." +
                                    "<br><br>\"뭐래. 명성에 먹칠은 무슨.<br><br>존나 멋있는데.\"<br><br>" +
                                    "카인은 당신의 손을 잡더니 그대로 다른 쪽으로 걸어가버렸다. 당신의 뒤로 데릭의 시선이 느껴진다...."
                                ]
                            },
                            {
                                type : "text",
                                value : [
                                    "데릭과 다른 귀족들에게서 떨어진 카인은 당신을 돌아보았다." +
                                    "<br><br>\"다른 귀족들이 이제 네 욕도 하겠다. 욕하면... 나한테 말해. 내가 지랄견으로도 유명하긴 하거든.\"<br><br>" +
                                    "그는 벨보이에게서 샴페인 두 잔을 가져왔다. 그는 한 잔을 당신에게 준 후 건배를 하자는 듯 잔을 내밀었다." +
                                    "<br><br>\"...위하여.\"<br><br>" +
                                    "뭘 위하여라고 말해야 할지는 모르겠다며 그는 중얼거리더니 멋대로 당신의 잔에 자신의 잔을 부딪힌 후 샴페인을 마셨다. 당신과 카인은 꽤 오랜 시간 동안 서로의 근황에 대해 이야기를 나누었다. 카인의 기분이 좋아보인다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("deric", "affection", -2);
                                    changeNPCEmotion("deric", "rage", 3);
                                    changeNPCEmotion("deric", "dominance", -5);
                                    changeNPCEmotion("kain", "affection", 5);
                                    changeNPCEmotion("kain", "rage", -4);
                                    changeAlcohol(player, 20);
                                    passTime(player, 15);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 카인에게 또 뭔 짓을 했냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "카인은 당신이 자신을 공격하자 바로 인상을 굳혔다. 그는 데릭에게서 시선을 떼더니 당신을 노려보며 마치 말을 짓이기듯이 으르렁거리며 입술을 뗐다." +
                                    "<br><br>\"네가 뭔 상관...\"<br><br>" +
                                    "\"우리 {dericTitle}, 여기에서 만나다니. 행운의 여신이 오늘은 내 손을 들어준 모양이구나.\"<br><br>" +
                                    "데릭은 자연스럽게 당신을 자신의 옆으로 끌어당겼다. 카인은 자연스럽게 데릭의 옆자리에서 밀려났다." +
                                    "<br><br>\"...오늘은 이만 가봐도 좋아.\"<br><br>" +
                                    "데릭의 차가운 눈빛이 카인을 쏘아본다. 카인은 당신과 데릭을 번갈아 노려보다가 그대로 자리를 떴다."
                                ]
                            },
                            {
                                type : "text",
                                value : [
                                    "당신은 데릭의 옆에서 귀족들과 이야기를 나누었다. 몇몇 귀족들은 하류도시의 영웅인 당신을 얻은 데릭을 부러워했고, 몇몇 귀족들은 데릭의 옆에 있는 당신을 부러워했다. 그들의 대화는 점점 당신이 흥미를 느끼지 못하는 분야로까지 넘어갔다." +
                                    " 데릭은 당신이 피곤해할 거라는 걸 알았는지 대화를 중간에 유연하게 끊더니 당신을 구석으로 데려갔다." +
                                    "<br><br>\"너는 정말 갑자기 나타나서 내 기분을 좋아지게 만드는 구나.\"<br><br>" +
                                    "데릭은 당신의 이마 위로 가볍게 입술을 묻었다가 떨어뜨렸다. 그는 가는 길에 과자라도 사먹으라고 당신의 손에 돈을 쥐어주었다. 귀족들에게로 다시 향하는 그의 발걸음은 평소보다 가벼워보였다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("kain", "affection", -1);
                                    changeNPCEmotion("kain", "rage", 5);
                                    changeNPCEmotion("deric", "dominance", 5);
                                    changeNPCEmotion("deric", "affection", 3);
                                    changeNPCEmotion("deric", "rage", -2);
                                    changeGold(player, 1000);
                                    passTime(player, 15);
                                }
                            }
                        ]
                    },
                    {
                        text : "둘 다 너무 유치하다. 이 판에는 안 끼는 게 좋겠다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 두 사람의 일에 관여하지 않기로 했다. 슬그머니 자리를 피했건만, 두 사람의 시선이 순간 당신에게로 닿는 것이 느껴졌다." +
                                    "<br><br>당신은 재빨리 그 자리를 벗어났다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("kain", "affection", -1);
                                    changeNPCEmotion("deric", "affection", -1);
                                    changeNPCEmotion("kain", "rage", 1);
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
    id : "dericAndKain_02",
    condition : (player) =>
        player.justMoved &&
        player.location === "theater" &&
        player.flags?.dericAndKain_day !== getCurrentDay(player) &&
        (hasNpcRelationship("kain", "lover") ||
        hasNpcRelationship("kain", "spouse") ) &&
        !hasNpcRelationship("deric", "lover") &&
        !hasNpcRelationship("deric", "spouse") &&
        NPC_DATA["deric"].emotion.affection >= 50 &&
        Math.random() < 0.09,

    action : (player) => {
        player.flags.dericAndKain_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신이 극장에 들어서자마자 무대의상을 입고 마이크 확인 중이었던 카인은 성큼성큼 당신에게로 걸어왔다. 그러더니 그는 VIP 티켓을 내밀며 가장 앞좌석으로 자리 잡아놨으니 오늘은 공연을 보고 가라고 말했다." +
                    "<br><br>\"이 기회 놓치지 마라? VIP석에서 보는 거 몇몇 상류도시 귀족들도 꿈도 못 꿀 일이야.\"<br><br>" +
                    "그는 혹시라도 당신이 그냥 가버릴까 걱정이 됐는지 당신을 VIP석까지 직접 데려가서 앉혔다. 그는 무대를 기대하라고 말한 뒤 바로 무대 뒤로 사라져버렸다. 당신은 푹신한 VIP석에 앉아 공연이 시작되는 걸 기다렸다."
                ]
            },
            {
                type : "text",
                value : [
                    "\"아가?\"<br><br>" +
                    "익숙한 목소리에 당신은 옆을 올려다보았다. 데릭이다. 그는 당신이 여기 앉아있을 줄은 몰랐는지 눈을 깜박이더니 곧 웃으며 당신의 옆자리에 앉았다." +
                    "<br><br>\"그 녀석과 많이 친해졌구나. 나쁜 물이 들면 안 될 텐데.\"<br><br>" +
                    "그는 당신의 손등을 손가락으로 쓰다듬으며 말했다. 공연이 시작됐는데도 데릭은 당신의 손을 놓지 않았다. 당신이 조금이라도 손을 움직이면 그는 안 된다는 듯 더 세게 당신의 손을 잡았다." +
                    "<br><br>그리고 드디어, 무대에 카인이 나왔다." +
                    "<br><br><br>노래를 부르려던 카인의 주황색 눈동자가 당신과 마주쳤다. 그의 시선은 곧 데릭이 잡고 있는 당신의 손으로 미끄러져 내려갔다." +
                    "<br><br>반주가 시작되었지만 카인은 노래를 부르지 않았다. 그는 데릭이 잡고 있는 당신의 손을 내려다보다가 마이크를 집어던지더니 그대로 무대 아래로 내려왔다." +
                    "<br><br>\"그 손 놔.\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 데릭의 손을 뿌리쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 데릭의 손을 뿌리치자 카인은 그대로 당신의 손을 붙잡았다." +
                                    "<br><br>\"얜 내 애인이야. 네가 함부로 할 사람이 아니라고.\"<br><br>" +
                                    "카인의 말에 데릭의 얼굴에서 미소가 서늘하게 걷혔다. 그는 자기도 모르게 손을 올리려다가 주변 사람들의 시선을 의식하고 멈추었다." +
                                    "<br><br>\"네 애인? 그래서 네가 할 수 있는 게 있나? 아니, 네가 지킬 수 있었던가?\"<br><br>" +
                                    "\"얘는 지킬 거야.\"<br><br>" +
                                    "카인은 당신의 손을 세게 잡았다. 데릭을 똑바로 노려보며 그는 한 번 더 말했다." +
                                    "<br><br>\"무슨 일이 있어도 지킬 거야. 얘만큼은.<br><br>...가자.\"" +
                                    "<br><br>당신은 카인과 함께 공연을 나갔다. 사람들이 뒤에서 카인을 욕하는 소리가 들렸지만 카인은 신경 쓰지 않았다." +
                                    "<br><br>\"아까 한 말 진심이야. 내가 너는... 무슨 일이 있어도 지킬 거야.\"" +
                                    "<br><br>카인은 당신을 바라보다가 시선을 돌렸다. 당신은 그와 조금 더 같이 있다가 헤어졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("deric", "affection", -5);
                                    changeNPCEmotion("deric", "rage", 5);
                                    changeNPCEmotion("deric", "dominance", -8);
                                    changeNPCEmotion("kain", "affection", 2);
                                    changeNPCEmotion("kain", "rage", -1);
                                    changeNPCEmotion("kain", "dominance", 1);
                                    passTime(player, 8);
                                    savePlayer(player);
                                }   
                            }
                        ]
                    },
                    {
                        text : "당신은 카인에게 무대 중간에 이러면 안 된다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...그럼 네가 바로 앞에서 다른 사람 손을 잡고 있는데.\"<br><br>" +
                                    "카인은 입술을 악물었다. 그는 울지 않았다. 어떻게든 눈물을 참아내고 있었다." +
                                    "<br><br>\"내가 가만히 있어?\"<br><br>" +
                                    "\"그야 아가는, 네가 아가를 못 지켜준다는 걸 아니까. 나랑은 다르게.\"<br><br>" +
                                    "데릭은 당신과 맞잡은 손을 들어보이며 미소를 지었다." +
                                    "<br><br>\"네가 돈이 있니, 명예가 있니, 아니면.... 가문이 있니.\"<br><br>" +
                                    "카인은 데릭의 말에 아무 말도 하지 못했다. 그는 데릭의 말에도 상처를 입었지만, 그보다는 데릭의 손을 놓지 않는 당신의 행동에 상처를 입은 듯했다. 카인은 그대로 나가버렸고 무대는 조용해졌다." +
                                    "<br>데릭은 아무렇지도 않게 지배인을 부르더니 다른 가수로 교체했다. 곧 다른 가수가 나와서 노래를 부르기 시작했다. 당신은 데릭과 함께 마지막까지 공연을 감상했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("kain", "affection", -10);
                                    changeNPCEmotion("kain", "rage", 15);
                                    changeNPCEmotion("deric", "dominance", 5);
                                    changeNPCEmotion("deric", "affection", 2);
                                    changeNPCEmotion("deric", "rage", -5);
                                    passTime(player, 30);
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
    id : "dericAndEric_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "gloryStreet" &&
        !player.flags?.ericDie &&
        getTimePeriod(player) === "dawn" &&
        player.flags?.dericAndEric_day !== getCurrentDay(player) &&
        NPC_DATA["deric"].emotion.affection > 10 &&
        Math.random() < 0.07,

    action : (player) => {
        player.flags.dericAndEric_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene([
            {
                type : "text",
                value : [
                    "영광의 거리를 걷던 당신은 에릭이 데릭을 부축하며 걸어오는 모습을 보았다. 데릭은 에릭의 목에 팔을 두른 채로 무어라 떠벌떠벌 말하고 있었고 에릭의 표정은.... 읽을 수가 없었다." +
                    " 혼자 떠들어대던 데릭은 그대로 푹 고개를 숙였다. 데릭이 말을 멈추고 나서야 에릭은 데릭을 힐끗 내려다보았다. <br><br>...두 사람은 그대로 쌍둥이 저택으로 들어가버렸다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "sionAndMatin_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "tavern" &&
        getCurrentDay(player) >= (player.flags.yuri_rebel_story_01_after_seen_day + 1) &&
        player.flags?.sionAndMatin_day !== getCurrentDay(player) &&
        NPC_DATA["matin"].emotion.affection >= 70 &&
        Math.random() < 0.09,

    action : (player) => {
        player.flags.sionAndMatin_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"영웅님.\"<br><br>" +
                    "당신이 주점에 들어서자마자 당신을 반긴 사람은 시온이었다. 그는 당신이 요새 주점에 많이 들르는 걸 알고 있다며 웃었다." +
                    "<br><br>\"퀘스트 때문에 자주 들르시는 건 알지만, 아무래도 영웅님이시다 보니까 다른 사람과 엮인 소문도 많이 들리더라고요.\"<br><br>" +
                    "그는 힐끗 마틴 쪽을 보더니 다시 당신에게로 시선을 돌렸다. 그는 방긋 웃으며 자신도 요리를 해왔다고 말했다." +
                    "<br><br>\"쉘터에서 만들었어요. 영웅님을 위해.... 여기서 먹어도 되죠?\"<br><br>" +
                    "\"안돼.\"<br><br>" +
                    "마틴과 시온의 시선이 부딪혔다." +
                    "<br><br>\"남의 음식점에 자기 요리...\"<br><br>" +
                    "\"아, 역시! 그럼 쉘터에 가서 같이 먹어요, 영웅님!\"" +
                    "<br><br>마틴의 말이 끝나기도 전에 시온은 그의 말을 가로채며 당신을 반짝반짝거리는 눈으로 올려다보았다. 그의 요리는 정성스럽게 만들어진 것처럼 보이긴 했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 고개를 저었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 고개를 젓자 시온의 표정이 무너졌다. 그는 촉촉한 눈동자로 당신을 올려다보았다." +
                                    "<br><br>\"저 정말 열심히 만들었는데....\"<br><br>" +
                                    "그는 천천히 시선을 돌려 마틴을 보았다. 당신을 바라볼 때의 시선과는 다르다. 마틴을 바라보는 그의 눈에는 살기가 서려 있었다." +
                                    "<br><br>\"그럼 다음번에는 먹어주세요. 알겠죠?\"<br><br>" +
                                    "시온은 다시 당신에게로 고개를 돌렸다. 당신과 시선이 마주친 그는 금방이라도 울 것 같은 얼굴이 되어버리더니 그대로 급하게 주점을 나가버렸다." +
                                    "<br><br>\"...미친 새끼.\"<br><br>" +
                                    "마틴은 낮게 한숨을 쉬더니 당신에게 자신이 끓인 수프를 내밀었다. 방금 만든 요리인지 따듯하다...."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("matin", "affection", 2);
                                    changeNPCEmotion("sion", "affection", -1);
                                    changeNPCEmotion("sion", "rage", 5)
                                    changeStamina(player, 15);
                                    changeHP(player, 30);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 고개를 끄덕였다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 고개를 끄덕이자 시온은 세상을 다 가진 듯한 표정을 지었다. 만약 그에게 강아지 꼬리가 있었다면 지금쯤 세차게 흔들리고 있었을 테다. 그는 당신의 팔을 붙잡더니 지금 바로 쉘터에 가자고 말했다." +
                                    "<br><br>\"음식은 따듯할 때 먹어야 해요, 영웅님. 아마 그쪽도 아시겠지만.\"<br><br>" +
                                    "의기양양한 얼굴로 마틴을 한번 쳐다본 후 시온은 당신을 이끌고 쉘터로 향했다. 당신이 주점을 나갈 때까지도 마틴은 아무 말도 하지 않았다." +
                                    "<br>쉘터에 도착한 당신에게 시온은 쑥스러워하며 자신의 요리를 대접했다. 맛은 마틴의 요리에 미치지 못했지만, 정성을 들였다는 것만큼은 분명했다. 당신의 반응에 시온은 더 노력하겠다고 말하며 주먹을 불끈 쥐었다. 그의 요리에는 사랑이 넘쳤다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("matin", "affection", -5);
                                    changeNPCEmotion("sion", "affection", 5);
                                    changeStamina(player, 10);
                                    changeHP(player, 20);
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
    id : "sionAndMatin_02",
    condition : (player) =>
        player.justMoved &&
        player.location === "darkStreet" &&
        getCurrentDay(player) >= (player.flags.yuri_rebel_story_01_after_seen_day + 1) &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        player.flags?.sionAndMatin_day !== getCurrentDay(player) &&
        NPC_DATA["matin"].emotion.affection >= 70 &&
        Math.random() < 0.1,

    action : (player) => {
        player.flags.sionAndMatin_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 마틴과 어두운 골목에서 만났다. 오늘도 그는 연어가 든 봉지를 들고 있었다. 마틴은 말없이 당신의 옆에서 걸아갔다. 그는 당신의 이야기를 들으며 몇 번 고개를 까닥였다." +
                    "<br><br>\"영웅님!\"<br><br>" +
                    "시온이다. 그는 당신과 마틴을 번갈아보더니 슬쩍 당신의 옆에 섰다." +
                    "<br><br>\"영웅님, 이 골목은 너무 위험해요. 제가 옆에서 지켜드릴게요.\"<br><br>" +
                    "시온의 살기 어린 시선에도 마틴은 물러나지 않고 묵묵히 당신의 옆을 지켰다. 당신은 두 사람 사이에 낀 채 걸어갔다. 분위기가 굉장히 불편해졌다...." +
                    "<br><br>\"근데 마틴 형은 요새 주점 일 안 바빠요? 고양이 밥도 줘야 하고, 공동묘지에도 가야 하고, 영웅님 졸졸 쫓아다니기도 해야 하고.... 주점이 잘 안 되나 봐요?\"<br><br>" +
                    "\"...얘는 입 바쁜 사람 안 좋아하는데.\"<br><br>" +
                    "\"시끄러워\", \"닥쳐\" 같은 말이 아니었다.<br><br>...마틴은 시온의 시선을 피하지 않았다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 말 많은 사람은 별로 안 좋아한다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 시온이 우뚝 멈춰 섰다. 그는 조용히 당신과 마틴을 번갈아보았다. 당신은 순간 시온의 손이 대검의 손잡이에 닿았다가 떨어지는 것을 보았다." +
                                    "<br><br>\"....\"<br><br>" +
                                    "마틴은 당신을 자신의 뒤로 뺐다. 마틴의 행동에 시온은 기가 차다는 듯이 웃었다." +
                                    "<br><br>\"당신이 지켜준 거라고 생각해요? 주제 파악도 못하네... 당신은 영웅님 때문에 몇 번이고 산 거야.\"<br><br>" +
                                    "시온은 대검의 손잡이를 놓고 다른 방향으로 걸어갔다. 모퉁이를 도는 순간, 오늘도 그의 발걸음 소리는 들리지 않았다. 당신과 마틴이 다시 걷기 시작하고 나서야 일정한 거리를 둔 발소리가 뒤따라왔다. 아무리 걸어도 멀어지지 않는 소리였다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    changeNPCEmotion("matin", "affection", 2);
                                    changeNPCEmotion("sion", "affection", -3);
                                    changeNPCEmotion("sion", "rage", 10);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 말 많은 사람을 안 좋아하지는 않는다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...내가 너에 대해 모르는 게 많았네, {playerName}.\"<br><br>" +
                                    "짧은 정적 후에 마틴은 그 말을 씹어 뱉듯 내뱉었다. 그러더니 그는 발걸음을 멈추고 당신의 옆에서 떨어졌다. 당신과 시선이 마주치자 마틴은 고개를 돌려버렸다." +
                                    "<br><br>\"네 기사님이랑 가.\"<br><br>" +
                                    "\"안 그래도 영웅님은 제가 지켜드릴 거예요. 당신과 다르게 저는 영웅님을 보호해드릴 수 있거든요. 당신은 당신 몸이나 잘 챙기지 그래요?\"<br><br>" +
                                    "시온은 당신의 팔짱을 끼며 웃었다. 당신이 다른 말을 하기도 전에 마틴은 그대로 골목길 너머로 사라져버렸다... 시온은 당신에게 팔짱을 낀 채 재잘재잘 떠들었다. 평소보다 기분이 더 좋아보인다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    changeNPCEmotion("matin", "affection", -8);
                                    changeNPCEmotion("sion", "affection", 5);
                                    changeNPCEmotion("matin", "rage", 10);
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
    id : "sionAndKain_01",
    condition : (player) =>
        player.justMoved &&
        (player.location === "richTownStreet" || player.location === "gloryStreet") &&
        getCurrentDay(player) >= (player.flags.yuri_rebel_story_01_after_seen_day + 1) &&
        player.flags?.sionAndKain_day !== getCurrentDay(player) &&
        player.flags?.sion_uppercity &&
        NPC_DATA["kain"].emotion.affection >= 50 &&
        Math.random() < 0.09,

    action : (player) => {
        player.flags.sionAndKain_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신을 발견한 카인이 당신에게 걸어왔다. 카인이 당신에게 말을 걸려는 순간, 누군가 불쑥 두 사람의 사이로 끼어들었다. 시온이다." +
                    "<br><br>\"영웅님, 제가 요새 괜찮은 가수를 한 명 찾았는데요, 한 번 같이 가서 보실래요?\"<br><br>" +
                    "\"...뭐?\"<br><br>" +
                    "카인은 기가 차다는 듯이 시온을 바라보다가 그의 어깨를 옆으로 밀쳤다. 하지만 시온은 당신의 앞에서 물러나지 않았다. 그는 단단히 당신의 앞을 지켰다. 시온은 고개를 한쪽으로 기울이며 카인을 올려다보았다." +
                    "<br><br>\"하실 말씀이라도?\"<br><br>" +
                    "\"괜찮은 가수 이 지랄. 씨발, 여기에 나보다 나은 가수가 어딨어.\"<br><br>" +
                    "\"어라, 본인도 알고 있잖아요? 요즘은 예전만큼 찾는 사람이 없던데. 거울도 못 보는 가수라니 마음이 아프네요.\"<br><br>" +
                    "\"...이새끼가, 네가 뭘 안다고.\"<br><br>" +
                    "...분위기가 점점 살벌해진다...."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 시온에게 카인한테 사과하라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...제가요?\"<br><br>" +
                                    "시온은 이해가 안 간다는 듯 당신과 카인을 번갈아보았다. 그러더니 그는 카인을 옆으로 밀치고 당신의 손을 붙잡았다." +
                                    "<br><br>\"영웅님은 너무 착하셔서 못 보고 있는 거예요. 카인은.... 당신에게 도움이 될 수 없어요. 오히려 당신을 나락까지 떨어뜨린다면 모를까.<br><br>그는 언젠가 당신을 해칠 거예요. 저는 영웅님이 아파하는 모습을 보고 싶지 않아요.\"<br><br>" +
                                    "탁. 이번엔 카인이 시온을 옆으로 밀쳤다. 시온은 몇 걸음 당신에게서 물러났다." +
                                    "<br><br>\"뭐래, 씨발, 내 눈엔 네가 더 또라이로 보이거든?\"<br><br>" +
                                    "\"영웅님, 잘 생각해보세요. 그에게 남은 게 뭐가 있죠? 그림자 명성? 데릭이 없으면 무너질 부와 지위? 그것도 아니면.... 반반한 얼굴? 하지만 그마저도 누구보다 뛰어나지는 못한...\"<br><br>" +
                                    "카인의 손이 시온의 뺨을 향해 날아갔다. 당신이 막을 새도 없었다. 시온은 일부러 그에게 맞아준 후 고개를 돌린 채 당신을 바라보았다." +
                                    "<br><br>\"봤죠. 이 폭력은 언젠가 영웅님에게도 쏟아질 거예요.\"<br><br>" +
                                    "카인의 호흡이 순간 멎었다. 그의 눈은 흔들리고 있었다. 시온은 비릿한 미소를 짓더니 그대로 당신과 카인을 남기고 가버렸다. 시온이 사라진 후에도 카인은 한동안 아무 말도 하지 못했다." +
                                    "<br>...당신은 말이 없어진 카인의 옆에 있어주었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    changeStamina(player, -15);
                                    changeNPCEmotion("kain", "affection", 5);
                                    changeNPCEmotion("kain", "rage", -5);
                                    changeNPCEmotion("sion", "affection", -3);
                                    changeNPCEmotion("sion", "rage", 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 카인에게 너무 열내지는 말라고 했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"내가 잘못했다고? 이새끼가 먼저 시비 걸었는데?\"<br><br>" +
                                    "오히려 카인의 화를 더 돋운 것 같다. 그는 당신의 어깨를 세게 잡으며 정말로 자신이 잘못한 거라 생각하냐고 물었다. 어깨가 아파서 당신이 인상을 찌푸리자 시온의 표정도 살벌해졌다. 그는 카인의 손을 쳐내더니 그대로 그를 밀쳤다." +
                                    "<br><br>\"영웅님한테 뭐하는 짓이에요.\"<br><br>" +
                                    "시온은 뒤로 넘어진 카인을 서늘한 표정으로 내려다보았다. 카인은 더 이상 참지 않았다. 그는 자신보다 시온이 세다는 걸 알면서도 그대로 달려들었다. 시온의 머리채가 그의 손에 잡혔다. 시온은 쌍욕을 내뱉더니 카인을 그대로 뒤로 밀쳐냈다. 카인은 또 넘어졌지만 달려드는 걸 멈추지 않았다. 이성을 잃은 것 같았다." +
                                    "<br><br>\"광견병이라더니 진짜 광... 악!\"<br><br>" +
                                    "카인에게 물린 시온의 팔에 피가 번졌다. 소란이 더 커지고, 결국 백색 군인들이 나타나서 그들의 싸움을 중재했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    changeStamina(player, -15);
                                    changeNPCEmotion("kain", "affection", -5);
                                    changeNPCEmotion("kain", "rage", 10);
                                    changeNPCEmotion("sion", "dominance", 4);
                                    changeNPCEmotion("sion", "affection", 3);
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