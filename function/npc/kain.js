function processKainText(text, player){
    return text.replaceAll("{kainTitle}", getKainTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getKainTitle(player){
    if (NPC_DATA["kain"].emotion.rage > 60) return "개자식";
    else if(NPC_DATA["kain"].emotion.affection > 80) return "나의 별";
    else if(NPC_DATA["kain"].emotion.affection > 50) return "별";
    return "그새끼꺼";
}

registerActions("kain", {
    giveFood : (player) => {
        openGiveFoodMenu(player, "kain");
    },

    talk: (player) => {
        if (!isKainAvailable(player)){
            showSingleTextScene(
                "카인은 지금 없는 것 같다.",
                player
            );
            return;
        }

        startScene([
            {
                type: "text",
                value: "당신이 다가오자 카인이 당신을 쳐다봤다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "kain_smallTalk" },
                    { text: "다른 얘기를 한다", action: "kain_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["kain"].emotion.affection;
        const rage = NPC_DATA["kain"].emotion.rage;
        const dominance = NPC_DATA["kain"].emotion.dominance;
        const onEnd = () => {
            if (NPC_DATA["kain"].emotion.affection > 50 && rage <= 60){
                changeEmotion("kain", "affection", 1);
                changeEmotion("kain", "rage", -1);
            }

            if (rage>60){
                changeStamina(player, -10);
            }

            if (dominance>50){
                changeStamina(player, -5);
            }
            
            startScene(getLocationScene(player), player);
        };
    
        if (rage > 60 && affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 사나운 얼굴로 당신을 쏘아보았다. 당신이 어떤 말을 하든 그는 받아들이지 않을 것이다. 그는 당신에게 무언가를 말하려다가 욕을 하며 그만두었다.",
                        "\"넌 대체 나한테 뭘 원하는 거야!\"<br>그는 화를 냈다. 그러더니 고개를 돌려버렸다. 하지만 당신이 정말로 가려고 하자 그는 자기도 모르게 당신의 팔을 붙잡았다. <br>\"...씨발.\"<br>그는 욕을 하면서도 당신의 팔을 놓아주지는 않았다.",
                        "\"넌...넌 대체 왜 자꾸...\"<br>그는 갈피를 잡지 못하고 있다. 그는 당신에게 무언가를 말하려다가 욕을 하며 바닥을 발로 찼다."
                    ])
                }
            ], player, { onEnd });
        } else if (rage > 60 && dominance > 50 && affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신의 손목을 잡으려다가 주변의 시선을 의식했는지 손을 멈췄다.<br>\"넌 대체 나랑 뭘하고 싶은 거야.\"<br>그는 당신에게 차갑게 쏘아붙였다.",
                        "카인은 몸을 돌려 다른 사람들의 시야에서 당신을 가렸다.<br>\"넌 씨발... 진짜 짜증나는 개새끼야.\"<br>그는 당신을 내려다보며 중얼거렸다.",
                        "카인은 당신의 목에 코를 대더니 인상을 찌푸렸다. <br>\"너, 어디 갔다온 거야?\"<br>그는 당신의 손목을 쥐었다. <br>\"지금 당장 말해.\""
                    ])
                }
            ], player, { onEnd });
        } else if (rage > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 보더니 인상을 찌푸렸다. <br>\"씨발. 왜?\"<br>그는 당신의 얼굴만 봐도 짜증을 내고 있다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "노래를 흥얼거리고 있던 카인은 당신이 오자 헛기침을 하며 목을 가다듬었다. 그는 당신과 시선을 마주쳤다가 바로 돌리며 괜히 툴툴거렸다. <br>\"왜. 뭐 할 말 있어?\"",
                        "짜증을 내고 있던 그는 당신이 오는 것을 보더니 표정이 조금 순하게 풀어졌다. <br>\"야, 다음 공연 때...\"<br>그는 말을 삼켰다.<br>\"아냐. 됐어.\"",
                        "카인은 당신에게 결혼에 대해서는 어떻게 생각하고 있냐고 물었다. 당신이 뭐라고 하지도 않았는데 괜히 그는 변명부터 해댔다. <br>\"데릭이 결혼 얘기하길래 궁금해서 물어본 거야. 별 뜻은 없어.\""
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 위아래로 훑어보더니 곧장 인상을 구겼다. 그는 저벅저벅 걸어오더니 당신의 옷차림을 정돈해주며 남들 앞에서 이런 꼴 좀 보이지 말라고 말했다. <br>\"씨발, 다들 쳐다보잖아.\"<br>그는 짜증을 냈다.",
                        "카인은 당신의 앞에서 작게 하품을 했다. 하품을 하자마자 당신이 있다는 걸 자각한 카인은 괜히 다른 사람들 공연이나 관람객에 대해 투덜거리면서 시선을 돌렸다. 그의 귀끝이 붉다.",
                        "공연에 대해 물어보자 카인은 이런저런 이야기를 많이 해주었다. 그는 한 사람이 공연장으로 들어가는 걸 보더니 혀를 찼다.<br>\"생각보다 노래를 진짜로 좋아해서 하는 사람은 많지 않아.\"<br>그는 말하다가 다시 짜증이 났는지 괜히 바닥을 발로 찼다.",
                        "카인은 당신의 앞에서 작게 하품을 하다가 당신과 시선을 마주치자 사레가 들렸다. 당신은 켁켁거리는 그에게 물을 가져다주었다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 보더니 당신에게서 몇 걸음 떨어졌다. <br>\"거기서 말해.\"<br>어쩐지 그의 행동이 조금 뚝딱거리는 것처럼 느껴진다.",
                        "\"너 아직도 데릭이랑 만나?\"<br>카인은 인상을 찌푸렸다. <br>\"그새끼 너무 믿지는 마. 사람 금방 갈아치우는 놈이니까.\"",
                        "카인은 공연에 대한 얘기는 거의 하지 않았다. 당신이 공연에 대해 물어봐도 그는 누구나 할 수 있는 답변만 해주었다. 공연에 대해 말하고 싶지 않아하는 모양이다.",
                        "그는 당신에게 유리에 대해 물어보았다. 유리에 대해 어떤 이야기를 하든 그의 주황색 눈동자는 점점 어두워진다. 그는 신경질적으로 발로 바닥을 툭툭 찼다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 보자 까닥 고갯짓을 해보였다. 그는 당신에게 친근하게 말을 걸지도, 그렇다고 자신의 옆에 있는 당신을 쫓아내지도 않았다.",
                        "카인은 당신에게 유리에 대해 물어보았다. 그는 당신의 말을 들으며 허공으로 시선을 던졌다. 그의 주황색 눈동자가 무겁게 가라앉았다.",
                        "카인은 당신에게 유리에 대해 물어보았다. <br>\"잠깐만.\"<br>그는 주변을 둘러보며 당신의 입을 막았다. 그의 손바닥에서 오렌지 향수 냄새가 난다.<br>\"목소리가 너무 커.\""
                    ])
                }
            ], player, { onEnd });
        }
    },

    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "kain_giveFood"
        });

        if (!player.flags?.KainYuriRecognize){
            choices.push({
                text : "유리에 대해 묻는다",
                scene : NPC_DATA.kain.scenes.kain_aboutYuri_01
            });
        }


        choices.push({ text: "돌아간다", action: "kain_talk" });

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
    }
})

registerGiftActions("kain");

function isKainAvailable(player){
    const day = getWeekdayIndex(player);
    const time = getTimePeriod(player);

    // 월/수/금 낮에는 없음
    if ([0, 2, 4].includes(day) && (time === "morning" || time === "afternoon")){
        return false;
    }

    // 화/목 밤에는 없음
    if ([1, 3].includes(day) && (time === "night" || time === "dawn")){
        return false;
    }

    // 토/일에는 새벽에만 있음
    if ([5, 6].includes(day) && time !== "dawn"){
        return false;
    }

    return true;
}