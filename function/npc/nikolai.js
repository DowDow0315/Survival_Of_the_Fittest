function processNikolaiText(text, player){
    return text.replaceAll("{nikolaiTitle}", getNikolaiTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getNikolaiTitle(player){
    if (NPC_DATA["nikolai"].emotion.rage > 70) return "암퇘지";
    else if(NPC_DATA["nikolai"].emotion.lust > 70) return "러블리";
    else if(NPC_DATA["nikolai"].emotion.affection > 80) return "보석";
    else if(NPC_DATA["nikolai"].emotion.affection > 50) return "스위츠달링";
    return "자기";
}

registerActions("nikolai", {
    //처음 이벤트
    gloryHoleWelcome_defiant: (player) => {
        changeEmotion("nikolai", "rage", 2);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_defiant, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    gloryHoleWelcome_neutral: (player) => {
        changeEmotion("nikolai", "affection", 3);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_neutral, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    gloryHoleWelcome_submissive: (player) => {
        changeEmotion("nikolai", "affection", 5);
        changeGold(player, 100);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_submissive, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    //개인이벤트

    //스토리이벤트

    //talk
    giveFood : (player) => {
        openGiveFoodMenu(player, "nikolai");
    },

    talk: (player) => {
        startScene([
            {
                type: "text",
                value: "니콜라이는 당신을 보더니 미소를 지었다. <br><br>\"무슨 일이야, {nikolaiTitle}?\"<br><br>그는 살랑살랑 당신에게 손을 흔들었다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "nikolai_smallTalk" },
                    { text: "다른 얘기를 한다", action: "nikolai_otherTalk" },
                    { text: "돌아간다", action: "gh_office" }
                ]
            }
        ], player);
    },
    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["nikolai"].emotion.affection || 0;
        const rage = NPC_DATA["nikolai"].emotion.rage || 0;
        const onEnd = () => {
            startScene(getLocationScene(player), player);
            changeEmotion("nikolai", "affection", 1);
        };

        if (rage >= 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 미소를 짓고 있긴 했지만, 어쩐지 차가웠다...<br><br>\"바빠서 그런데, 용건이 없으면 가주지 않겠어?\"",
                        "\"있잖아, 이게 화를 달래는 방법이라고 믿었다면 땡이야.\"<br><br>니콜라이는 자판을 두드리며 말했다.<br><br>\"난 화나는 얼굴이 내 앞에 있으면 더 화나거든.\""
                    ])
                }
            ], player, { onEnd });
            return;
        }

        if (affection > 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 당신의 잡담에 즐거워하고 있다. 그는 까르르 웃더니 당신의 얘기는 언제 들어도 재밌다고 말해주었다.",
                        "니콜라이는 꽃받침을 한 채 당신의 얘기를 듣고 있다. 그는 당신의 얘기에 몇 번이고 고개를 끄덕이며 웃었다.",
                        "잠시 말이 없던 니콜라이는 미안하다는 듯 웃었다. <br><br>\"미안. 사실 난 말하는 것보다 듣는 걸 더 좋아하거든. 네가 편해서 그런지 자꾸 말이 없어지네.\"",
                        "니콜라이는 당신의 얘기에 웃음을 터뜨렸다. 그는 당신의 얘기가 재밌다고 생각하고 있다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 당신에게 컵케이크르 먹겠냐고 물었다. 당신은 고개를 끄덕였고 그의 옆에 앉아서 상류도시에서 사온 컵케이크르 나눠먹었다.",
                        "니콜라이는 상류도시 사람들과의 대화는 재미없지 않냐고 물었다. <br><br>\"출신 때문에 그런가, 난 하류도시 사람들이랑 대화하는 게 더 재밌더라고.\"",
                        "니콜라이는 당신에게 상류도시의 예법에 대해 가르쳐주었다. 그는 상류도시에서 무시를 당하지 않으려면 상류도시 사람들처럼 행동해야 한다고 말했다.<br><br>\"자기는 나같은 사람이 아니잖아. 존중받아야지.\""
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 웃으며 당신에게 자신과 얘기를 하는 게 재밌냐고 물었다. 그는 당신을 앞에 앉혀두고 이것저것 많은 것들을 얘기해주었다.",
                        "니콜라이는 소문에 빨랐다. 당신이 니콜라이에게 어떻게 그렇게 소문을 잘 아냐고 묻자 그는 웃으며 가끔씩 상류도시의 사람들은 자신을 귀머거리로 생각하기 때문이라고 말했다.",
                        "니콜라이는 당신의 하루에 대해 물었다. 그는 당신의 일상을 들으며 미소를 잃지 않았다.",
                        "니콜라이는 오늘도 한 사람을 상류도시에 올려보냈다고 말했다. 그는 그 누구에게도 타인의 선택을 막을 권리는 없다고 말했다."
                    ])
                }
            ], player, { onEnd });
        }
    },
    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "nikolai_giveFood"
        });

        if (!player.flags?.nikolai_ask_about_deric){
            choices.push({
                text: "데릭에 대해 묻는다.",
                scene: NPC_DATA.nikolai.scenes.nikoai_ask_about_deric
            });
        }

        if (!player.flags?.nikolai_ask_about_ash && player.flags.uppercity_quest03_done ){
            choices.push({
                text: "애쉬 가문에 대해 묻는다.",
                scene: NPC_DATA.nikolai.scenes.nikoai_ask_about_ash
            });
        }

        if (!player.flags?.nikolai_ask_about_hisUppercity_01 && player.flags.nikolai_upperOneNight_01_seen ){
            choices.push({
                text: "상류도시에서 무슨 일을 하고 있냐고 묻는다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_ask_about_hisUppercity_01
            });
        }

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

registerGiftActions("nikolai");

window.giveDericLetter = function(player){
    if (!hasItem(player, "데릭의 친필 서신")){
        addItem(player, ITEMS.misc.dericLetter);
    }

    player.flags.dericLetterReceived = true;
    savePlayer(player);
};