function processPaleText(text, player){
    return text.replaceAll("{paleTitle}", getPaleTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getPaleTitle(player){
    if (NPC_DATA["pale"].emotion.affection > 90) return "꿈";
    else if(NPC_DATA["pale"].emotion.affection >= 70) return "소중한 사람";
    else if(NPC_DATA["pale"].emotion.affection >= 50) return "친구";
    else if(NPC_DATA["pale"].emotion.affection >= 10) return "구원자";
    return "....";
}

//첫만남
function startPaleChaseEvent(player){
    player.flags = player.flags || {};
    player.flags.paleChaseTurn = 0;

    player.inEvent = true;
    player.dungeon = null;
    player.location = "deepForest";

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
            "동굴 밖으로 나온 순간, 당신은 끔찍한 감각을 느꼈다."
        },
        {
            type: "choice",
            choices: [
                { text: "뒤를 돌아본다.", action: "pale_chase_start" }
            ]
        }
    ], player);
}

const PALE_CHASE_TURNS = [
    {
        text : "당신이 뒤를 돌아보려고 하자 유리가 당신을 막았다. <br><br><strong style='color:red'>\"뒤돌아보지마.\"</strong><br><br>유리는 아이를 안은 채 앞만 응시하고 있었다. <br><br>\"미신일 수도 있지만, 뒤를 도는 순간 하얀꽃에게 잡아먹힌다는 소문을 들은 적이 있어.\"<br><br>하얀꽃? 그제야 당신은 당신의 발밑에 어느 순간부터 떨어져있는 꽃잎을 발견했다. 하얀 꽃잎.... <br><br>\"지금이야, 가!\"<br><br>유리의 말과 함께 당신은 달리기 시작했다.",
        choices : [
            {
                text : "뒤돌아보지 않고 달린다.",
                stat : "dex",
                difficulty : 8,
                success : "당신은 잡히지 않았다! 뒤에서 울다가 깔깔거리며 웃는 소리가 들린다.",
                fail : "<strong style='color:red'>당신은 발밑의 뿌리에 걸려 다리가 휘청였다. 그 순간 당신의 다리에 뭔가가 달라붙었다! 다리에서 힘이 풀리려고 한다.</strong>",
                effect : (player) => {
                    addStatusEffect(player, {
                        id : "pale_chasing_poison",
                        name : "창백_왜도망가는거야",
                        damage : 5,
                        duration : 4
                    })
                }
            }
        ]
    },
    {
        text : "뭔가가 당신의 발목을 잡으려고 들고 있다!",
        choices : [
            {
                text : "당신은 당신의 발목을 잡으려던 무언가를 걷어찼다.",
                stat : "str",
                difficulty : 10,
                success : "당신은 물컹한 무언가를 걷어찼다. 뒤에서 울다가 깔깔거리며 웃는 소리가 들린다.",
                fail : "<strong style='color:red'>무언가는 당신에게 차이기 전에 당신의 발목을 찰싹 때렸다. 당신을 넘어뜨리려고 했던 모양이다. 당신은 간신히 넘어지지 않고 달렸다...</strong>",
                effect : (player) => changeHP(player, -25)
            },
            {
                text : "당신은 재빠르게 옆으로 피하며 달렸다.",
                stat : "dex",
                difficulty : 10,
                success : "당신은 발목을 잡으려고 했던 무언가를 피했다. 뒤에서 울다가 깔깔거리며 웃는 소리가 들렸다.",
                fail : "<strong style='color:red'>무언가는 당신이 피할 틈을 주지 않고 당신의 발목을 찰싹 때렸다. 당신을 넘어뜨리려고 했던 모양이다. 당신은 간신히 넘어지지 않고 달렸다.</strong>",
                effect : (player) => changeHP(player, -25)
            }
        ]
    },
    {
        text : "당신은 무언가가 당신에게 가까워진 것을 느꼈다. 그것은 당신의 옆에서 무어라 속삭였다. 정신이 몽롱해질 것만 같다.",
        choices: [
            {
                text : "당신은 그의 말을 듣지 않으려고 노력하며 정신을 집중했다.",
                stat : "int",
                difficulty : 10,
                success : "당신은 그의 말에 홀리지 않았다. <br><strong>\"왜 내 ㅁㅇ ㅇ ㄷㅇ...\"</strong><br>",
                fail : "<strong style='color:red'>당신의 집중에 흠을 내며, 그것의 목소리가 당신의 머리로 바로 들어온다.</strong> <br><strong style='color:red; font-style:italic'>\"가.지.마.\"</strong><br>",
                effect : (player) => changeStamina(player, -25)
            },
            {
                text : "당신은 고개를 저었다. 당신은 가까워진 그의 숨결에 매혹되지 않기 위해 노력했다.",
                stat : "charm",
                difficulty : 10,
                success : "당신은 그의 숨결에 매혹되지 않았다. 그것의 숨결이 당신의 목에 닿았다가 비명과 함께 사라졌다. 아파서 지른 비명은 아닌 거 같다.",
                fail : "<strong style='color:red'>당신은 그의 숨결에 홀려 뒤를 돌아볼 뻔했다. 숨결이 당신의 뺨을 어루만지며 아쉽다고 말한다. 목소리가 분명 없었는데 그렇게 들렸다.</strong>",
                effect : (player) => changeStamina(player, -25)
            }
        ]
    },
    {
        text : "꽃잎이 당신을 앞을 가로막았다. 하얀꽃잎은 날카롭게 변해 당신의 다리를 겨누고 있다.",
        choices : [
            {
                text : "당신은 민첩하게 꽃잎들을 피했다.",
                stat : "dex",
                difficulty : 12,
                success : "꽃잎들이 당신에게 닿기 전에, 당신은 아슬아슬하게 모든 꽃잎들을 피해버렸다. 당신이 지나간 자리에는 꽃잎들이 박혀있다.",
                fail : "<strong style='color:red'>당신은 꽃잎들을 피하려고 했지만 꽃잎들이 당신들보다 더 빨랐다. 꽃잎들이 당신의 허벅지와 종아리를 날카롭게 찢었다!</strong>",
                effect : (player) => changeHP(player, -40) 
            },
            {
                text : "당신은 꽃잎들의 움직임에 따라 춤을 추면서 유연하게 피했다.",
                stat : "charm",
                difficulty : 12,
                success : "당신은 마치 꽃춤을 추는 거 같았다. 춤사위에 하늘하늘 꽃잎이 하나씩 떨어져갔다. <br><strong style='color:red'>\"흐으으...\"</strong><br>의미모를 신음소리가 꽃잎 위로 떨어진다.",
                fail : "<strong style='color:red'>당신은 춤을 췄지만 꽃잎의 움직임에 제대로 반응하지는 못했다. 꽃잎이 당신의 허벅지와 종아리를 날카롭게 찢었다. 이리와, 분명 목소리는 안 들리는데 뭔가가 들리는 기분이다.</strong>",
                effect : (player) => changeHP(player, -40)
            }
        ]
    },
    {
        text : "당신의 그림자가 발밑에서 길게 늘어진다. 그림자 끝에, 당신이 아닌 무언가가 서있는 거 같다.",
        choices : [
            {
                text : "당신은 그림자를 밟아누르고 떼어냈다.",
                stat : "str",
                difficulty : 12,
                success : "길게 늘어진 그림자가 아파하면서 꿈틀거렸다. 단순히 물리적 고통 때문에 비명을 지르는 게 아닌 거 같다. 당신은 순간 그림자에서 우는 표정을 보고 말았다.",
                fail : "<strong style='color:red'>당신은 그림자를 밟으려고 했지만 그림자는 당신의 발에 오히려 달라붙었다. 순간 당신은 당신이 비명을 질렀다고 생각했다. 왜? 하지만 당신은 비명을 지르지 않았다.</strong>",
                effect : (player) => changeStamina(player, -40)
            },
            {
                text : "당신은 당신의 밑에 있는 것이 당신의 그림자가 아니라는 걸 안다. 당신은 무시했다.",
                stat : "int",
                difficulty : 12,
                success : "당신이 완전히 무시하자 그림자는 가늘게 길어졌다가 당신에게서 떨어져나갔다. 당신은 밑을 바라보지 않았다. 밑을 바라보면 안 될 거 같았다...",
                fail : "<strong style='color:red'>당신은 그림자를 무시하려고 했지만, 그림자는 당신의 몸을 타고 목까지 올라왔다. 울음소리와 웃음소리가 동시에 들린다. 당신은 순간 당신 밑의 그림자가 당신으로 보였다. 창백한 얼굴의 당신.</strong>",
                effect : (player) => changeStamina(player, -40)
            }
        ]
    },
    {
        text : "당신의 눈앞에 마을 입구가 보인다. 조금만 더 달리면 될 거 같다...!",
        choices : [
            {
                text : "당신은 젖먹던 힘을 짜내어 앞으로 달려나갔다.",
                stat : "str",
                difficulty : 13,
                success : "당신은 멈추지 않았다. 당신은 계속 달려나가고 있다. <br><strong style='color:red'>\"ㅁ ㄱ.... ㄴ... ㄴㄲ...ㅇ...\"</strong><br>",
                fail : "<strong style='color:red'>힘이 풀렸던 걸까, 당신의 다리는 생각만큼 움직여주지 않았다. 돌부리에 걸린 당신의 다리가 고통을 호소했다. 아니, 돌부리가 아니었나...? 그림자가 당신의 다리를 꽉 조여왔다. 당신의 다리에 핏기가 사라질 정도로.</strong>",
                effect : (player) => changeHP(player, -50)
            },
            {
                text : "목적지가 다가왔지만 당신은 흥분하지 않았다. 침착함을 유지하며 당신은 당신의 페이스를 유지했다.",
                stat : "int",
                difficulty : 13,
                success : "당신은 당신의 페이스를 유지하여 당신의 뒤를 쫓아오는 것을 무시하고 달릴 수 있었다. <br><strong style='color:red'>\"ㅇ... ㄴ...ㅂ...ㄹ...ㅈ..ㅁ...\"</strong><br>",
                fail : "<strong style='color:red'>당신은 당신의 페이스를 유지하려고 했지만, 그것에 너무 집중해버렸다. 당신의 정신에 틈이 생긴 순간, 그림자는 당신의 다리를 감싸안고 꽈악 조여왔다. 당신의 다리에 핏기가 없어져 창백해질 정도로.</strong>",
                effect : (player) => changeHP(player, -50)
            }
        ]
    },
    {
        text : "등 뒤에서 아주 가깝게 목소리가 들려왔다. 그것은 당신에게 분노하고 있다. 무언가가 당신의 심장을 향해 날아온다.",
        choices : [
            {
                text : "당신은 날렵하게 옆으로 스텝을 밟았다.",
                stat : "dex",
                difficulty : 13,
                success : "당신은 가까스로 당신의 심장으로 날아오던 것을 피했다. 그런데 어쩐지, 분명 당신을 스쳐지나갔는데 아무 것도 보이지 않았다. 그것이 분노하여 비명을 지른다.",
                fail : "<strong style='color:red'>당신은 그것의 공격을 피하지 못했다. 심장에 무언가 차가운 것이 쿵 박혔다. 슬픔. 비애. 무언가의 감정들이 당신의 온몸에 흘러들어온다. 당신의 눈에서 이유 모를 눈물이 흘렀다.</strong>",
                effect : (player) => changeStamina(player, -50)
            },
            {
                text : "당신은 부드러운 목소리로 그것의 분노를 잠재웠다.",
                stat : "charm",
                difficulty : 13,
                success : "당신의 부드러운 목소리에 그것의 공격이 순간 멈췄다. 당신은 그 틈을 놓치지 않고 질주했다. 원망 어린 목소리가 뒤에서 들린다. <br><strong style='color:red'>\"ㅇ... ㅇㅅ...ㅎㅈ....ㅇ...\"</strong><br>",
                fail : "<strong style='color:red'>당신의 부드러운 목소리에 멈칫하는 것도 잠시, 울먹이는? 웃는? 목소리로 당신을 끌어안았다. 끌어안긴 당신의 몸속으로 온갖 부정적인 감정들이 스며든다. 당신은 소리없는 아우성을 지르며 발버둥쳤다.</strong> <strong style='color:red; font-style:italic'><br>...내... 아우성...?</strong>",
                effect : (player) => changeStamina(player, -50)
            }
        ]
    },
    {
        text : "마을 입구다! 마지막으로 그것이 당신을 향해 달려온다!",
        choices : [
            {
                text : "당신은 그것의 손길을 힘으로 뿌리쳤다!",
                stat : "str",
                difficulty : 15,
                success : "그것은 멀어졌다. 웃음소리인지, 울음소리인지 모르겠는 소리가 점점 잦아들었다.",
                fail : "<strong style='color:red'>당신은 그것의 힘을 이기지 못했다. 분노한 그것이 당신의 몸위로 창백한 촉수를 내리꽂았다! 당신은 엄청난 고통을 느꼈다!</strong>",
                effect : (player) => changeHP(player, -70)
            },
            {
                text : "당신은 몸을 틀어 그것의 돌진을 피했다!",
                stat : "dex",
                difficulty : 15,
                success : "그것은 멀어졌다. 웃음소리인지, 울음소리인지 모르겠는 소리가 점점 잦아들었다.",
                fail : "<strong style='color:red'>그것은 당신을 향해 똑바로 달려왔고, 당신은 그것을 피하지 못했다. 쿵하는 소리와 함께 당신은 온몸의 장기가 파열되는 듯한 고통을 느꼈다...</strong>",
                effect : (player) => changeHP(player, -70)
            },
            {
                text : "당신은 그것이 다수의 사람들을 피하는 걸 직감적으로 알아차렸다. 당신은 큰 소리로 사람들의 시선을 끌며 뛰어갔다.",
                stat : "int",
                difficulty : 15,
                success : "그것은 멀어졌다. 웃음소리인지, 울음소리인지 모르겠는 소리가 점점 잦아들었다.",
                fail : "<strong style='color:red'>당신이 제대로 시선을 끌기도 전에 그것은 당신의 목을 졸라왔다. 창백한 촉수.... 당신은 숨이 막혀서 컥컥거리며 발걸음을 제대로 내딛지 못하고 파닥거렸다.</strong>",
                effect : (player) => changeStamina(player, -70)
            },{
                text : "당신은 부드러운 목소리로 노래를 부르며 뛰었다. 당신은 당신의 목소리가 그것의 분노를 잠재울지도 모르겠다고 생각했다.",
                stat : "charm",
                difficulty : 15,
                success : "그것은 멀어졌다. 웃음소리인지, 울음소리인지 모르겠는 소리가 점점 잦아들었다.",
                fail : "<strong style='color:red'>노래를 불렀지만, 당신의 떨리는 목소리가 부드러움을 죽였다. 웅얼웅얼, 그것은 당신의 노래를 따라부르며 당신의 입과 코를 막아버렸다. 창백한 촉수... 당신은 그대로 정신이 혼미해졌다.</strong>",
                effect : (player) => changeStamina(player, -70)
            }
        ]
    }
]

window.pale_chase_start = function(player){
    showPaleChaseTurn(player);
};

function showPaleChaseTurn(player){
    player.flags = player.flags || {};

    if (applyPaleChaseStatusEffects(player)) return;

    const turn = player.flags.paleChaseTurn || 0;

    if (player.status.hp <= 0 || player.status.stamina <= 0){
        finishPaleChaseFail(player);
        return;
    }

    if (turn >= PALE_CHASE_TURNS.length){
        finishPaleChaseSuccess(player);
        return;
    }

    const data = PALE_CHASE_TURNS[turn];

    startScene([
        {
            type: "text",
            value: processPaleText(data.text, player)
        },
        {
            type: "choice",
            choices: data.choices.map((choice, index) => ({
                text: choice.text,
                action: `pale_chase_choice_${index}`
            }))
        }
    ], player);
}

function applyPaleChaseStatusEffects(player){
    if (!player.buffs || player.buffs.length === 0) return false;

    let totalDamage = 0;

    player.buffs.forEach(buff => {
        if (buff.damage){
            totalDamage += buff.damage;
        }

        buff.duration--;
    });

    if (totalDamage > 0){
        changeHP(player, -totalDamage);
    }

    player.buffs = player.buffs.filter(buff => buff.duration > 0);

    if (player.status.hp <= 0){
        finishPaleChaseFail(player);
        return true;
    }

    return false;
}

window.pale_chase_choice_0 = function(player){
    resolvePaleChaseChoice(player, 0);
};
window.pale_chase_choice_1 = function(player){
    resolvePaleChaseChoice(player, 1);
};
window.pale_chase_choice_2 = function(player){
    resolvePaleChaseChoice(player, 2);
};
window.pale_chase_choice_3 = function(player){
    resolvePaleChaseChoice(player, 3);
};

function resolvePaleChaseChoice(player, choiceIndex){
    player.flags = player.flags || {};

    const turn = player.flags.paleChaseTurn || 0;
    const data = PALE_CHASE_TURNS[turn];
    if (!data) {
        finishPaleChaseSuccess(player);
        return;
    }

    const choice = data.choices[choiceIndex];
    if (!choice) return;

    const stat = getTotalStat(player, choice.stat);
    const roll = Math.random() * 20;
    const success = stat + roll >= choice.difficulty;

    const resultScene = [];

    resultScene.push({
        type: "text",
        value: processPaleText(success ? choice.success : choice.fail, player)
    });

    if (!success && typeof choice.effect === "function"){
        if (typeof flashScreenMulti === "function"){
            flashScreenMulti(3);
        }

        if (typeof shakeScreen === "function"){
            shakeScreen();
        }
        
        resultScene.push({
            type: "effect",
            run: (player) => {
                choice.effect(player);
                
                if (player.status.hp <= 0 || player.status.stamina <= 0){
                    finishPaleChaseFail(player);
                    return true;
                }
            }
        });
    }

    resultScene.push({
        type: "effect",
        run: (player) => {
            player.flags.paleChaseTurn = turn + 1;
            savePlayer(player);

            if (player.status.hp <= 0 || player.status.stamina <= 0){
                finishPaleChaseFail(player);
                return true;
            }

            showPaleChaseTurn(player);
            return true;
        }
    });

    startScene(resultScene, player);
}

function finishPaleChaseFail(player){
    player.flags = player.flags || {};
    player.flags.paleChaseTurn = 0;

    player.buffs = [];

    player.inEvent = false;
    player.dungeon = null;
    player.location = "shelter";

    changeHP(player, 50);
    changeStamina(player, 50);
    passTime(player, 120);

    savePlayer(player);
    renderMap(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 더 이상 뛸 수 없다. 당신은 더 이상 도망갈 수 없다. 눈을 깜박인다." +
                "<div style='text-align:center; color:#302ce9'><br><br>슬픔? 절망? 상실? 배신감? 아픔?<br><br></div>" +
                "온갖 부정적인 감정들이 당신을 감싼다. 마치 물속에 갇힌 것같았다. 팔을 휘저어보아도 발을 휘저어보아도 뭐 하나 뚜렷하게 나아가는 것이 없다. 당신은 그저 부정적인 감정들의 소용돌이에 갇혀 허우적거려야만 했다." +
                " 점점 멀어져가는 의식 사이로 당신은 금안을 보았다. 그림자마냥 길쭉한 그것은 당신을 내려다보고 있었다." +
                "<div style= 'text-align:center; color:#302ce9; font-size:2rem'> <br>창백한,<br>창백한,<br>창백한,</div>" +
                "<div style= 'text-align:center; color:#302ce9; font-size:2rem'> <br>창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한, 창백한,</div>" +
                "<div style= 'text-align:center; color:#302ce9; font-size:2rem'><br><br><br>그것</div>"
        },
        {
            type : "text",
            value : "노랫소리가 들린다. 청아하고 구슬프고 너무나도 익숙한 노랫소리가. 당신이 어렸을 때부터 유리와 함께 불렀던 노래다. 눈을 뜨자 예상대로 당신의 눈앞에는 익숙한 천장과 유리가 있었다. 노래를 흥얼거리던 유리는 당신이 눈을 뜨자마자 노래를 멈췄다. 붉은색 머리 밑 하늘색 눈동자에 당신의 모습이 비친다." +
                    "<br><br>\"네가... 정말로 어떻게 되는 줄 알았어.\"<br><br>" +
                    "그는 당신이 너무 차가워서 이대로 영영 눈을 못 뜨면 어떡하나 걱정했다고 말했다. 그의 하늘색 눈동자는 습기로 가득했지만 눈물은 떨어뜨리지 않았다. 언제나처럼." +
                    "<br><br>\"너라서 괜찮을 거라고 생각했나봐... 정말 미안해...\"<br><br>" +
                    "그는 애써 웃으며 자리에서 일어났다. 그는 당신에게 더 쉬라고 말한 후 자리를 비웠다."
        },
        {
            type: "choice",
            choices: [
                { text: "침대에서 일어난다.", action: "return_shelter_after_pale_chase" }
            ]
        }
    ], player);
}

function finishPaleChaseSuccess(player){
    player.flags = player.flags || {};
    player.flags.paleChaseTurn = 0;
    player.flags.paleChaseCleared = true;

    player.buffs = [];

    player.inEvent = false;
    player.dungeon = null;
    player.location = "townEntrance";

    passTime(player, 5);

    savePlayer(player);
    renderMap(player);

    startScene([
        {
            type: "text",
            value:
                "마을입구에 도착한 당신은 숨을 골랐다. 하늘의 색이 바꼈을 거라고 생각했는데 전혀 안 바뀌었다. 몇 시간을 뛰었다고 생각했는데 몇 시간은커녕 1시간도 흐르지 않은 모양이다. 숨을 고르던 당신은 아무 생각 없이 뒤를 돌았다." +
                " 그림자처럼 긴 인영. 창백한 그것이 당신의 그림자와 이어진 그림자의 끝에서 당신을 바라보고 있었다. 그것은 손같이 생긴 무언가를 들었다. 손가락? 손가락일까. 그것의 손가락은" +
                "<div style= 'text-align:center; color:#302ce9; font-size:4rem'><br><br>당신<br><br><br></div>" +
                "을 가리키고 있었다. 당신의 목뒤로 식은땀이 흐른다. 눈을 한번 더 깜박였을 때 그것은 없어져있었다."
        },
        {
            type: "choice",
            choices: [
                { text: "숨을 고른다.", action: "return_townEntrance_after_pale_chase" }
            ]
        }
    ], player);
}

window.return_shelter_after_pale_chase = function(player){
    startScene(getLocationScene(player), player);
};

window.return_townEntrance_after_pale_chase = function(player){
    startScene(getLocationScene(player), player);
};

registerActions("pale", {
    //talk
    giveFood : (player) => {
        openGiveFoodMenu(player, "pale");
    },

    talk: (player) => {
        startScene([
            {
                type: "text",
                value: "당신이 다가오자 창백은 당신을 올려다보았다. 그의 뒤에서 뻗어나온 촉수가 좌우로 이리저리 흔들린다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "pale_smallTalk" },
                    { text: "다른 얘기를 한다", action: "pale_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["pale"].emotion.affection || 0;
        const lust = NPC_DATA["pale"].emotion.lust || 0;
        const onEnd = () => {
            startScene(getLocationScene(player), player);
        };

        if (lust >= 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "창백은 손가락을 꼼지락거리며 당신을 올려다보았다. 뭔가 할 말이 있는지 그는 당신을 올려다보았다가도 얼굴을 붉히며 고개를 숙였다."
                    ])
                }
            ], player, { onEnd });
            return;
        }

        else if (affection >= 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        ""
                    ])
                }
            ], player, { onEnd });
        } 

        else if (affection >= 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "당신을 본 창백이 당신에게 달려오려다가 물건을 우수수 떨어뜨려버렸다. <br><br>\"...아.\"<br><br>그는 시무룩한 표정으로 물품들을 다시 정렬했다.",
                        "\"이 세상에 네가 있어서... 다행이야.\"<br><br>여전히 목소리는 흔들리긴 하지만, 그는 당신에게 자신의 마음을 또박또박 전했다. 그는 당신을 보며 웃었다.",
                        "\"다치지 마.\"<br><br>창백은 우물쭈물하더니 다시 당신을 똑바로 바라보며 말했다. <br><br>\"네가 다치면... 너무 마음이 아파.\""
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "창백은 당신이 오자마자 빠르게 당신에게 다가왔다. 그는 당신의 옆에서 물품을 어디서 들여왔는지 하나하나 설명해주었다.",
                        "\"...어디 다녀오는 길이야?\"<br><br>그의 금안은 호기심에 반짝거리고 있다. 창백은 당신의 이야기를 듣고 싶어한다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "창백은 당신의 옆에서 낮은 목소리로 노래를 불렀다. 삐걱삐걱거리지만 전보다 더 명확한 발음으로 노래를 부르고 있다.",
                        "창백은 만들던 꽃다발을 당신에게 내밀었다. 그리고 헤헤 웃었다."
                    ])
                }
            ], player, { onEnd });
        }
    },
    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "pale_giveFood"
        });

        choices.push({ text: "돌아간다", action: "pale_talk" });

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

registerGiftActions("pale");


//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.pale = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startPaleChocoChocoGift(player, item, grade);
        return;
    }
};

function startPaleChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "되찾은 상점, 창백은 손님들에게 받은 초콜릿들을 정리하다가 당신을 돌아보았다. 그는 기대감 어린 눈동자로 당신을 바라보다가 먼저 당신에게 초콜릿을 내밀었다. 그것도 종류별로. 스트로베리, 밀크, 다크, 플레인.... 창백은 여러 가지 색깔의 초콜릿들을 당신 앞에 늘어놓으며 원하는 것을 고르라고 말했다." +
                    "<br><br>\"...! 아, 다, 가져...가도 돼!\"<br><br>" +
                    "환하게 웃는 창백의 뒤로 창백한 촉수가 이리저리 흔들렸다." +
                    "<br><br>\"어차피 줄, 사람.... 너밖...에, 없어!\"<br><br>" +
                    "창백의 수제 초콜릿을 받은 당신은 그에게도 초콜릿을 내밀었다. 창백의 창백한 촉수 꼬리들이 바닥을 빠르게 두드리기 시작했다. 그는 지금 먹어도 되냐고 물어보더니 당신 앞에서 먹으며 헤실헤실 웃었다. 촉수들 중 하나가 당신의 허리를 휘감았지만, 창백은 아직 눈치채지 못한 것 같다..."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "pale");
                    player.location = "reclaimedShop";
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
                    "되찾은 상점, 창백은 손님들에게 받은 초콜릿들을 정리하다가 당신을 돌아보았다. 그는 기대감 어린 눈동자로 당신을 바라보다가 먼저 당신에게 초콜릿을 내밀었다. 그것도 종류별로. 스트로베리, 밀크, 다크, 플레인.... 창백은 여러 가지 색깔의 초콜릿들을 당신 앞에 늘어놓으며 원하는 것을 고르라고 말했다." +
                    "<br><br>\"...! 아, 다, 가져...가도 돼!\"<br><br>" +
                    "환하게 웃는 창백의 뒤로 창백한 촉수가 이리저리 흔들렸다." +
                    "<br><br>\"어차피 줄, 사람.... 너밖...에, 없어!\"<br><br>" +
                    "창백에게 초콜릿을 받은 당신은, 이어 그에게 당신의 수제 초콜릿을 주었다. 눈을 반짝이며 당신의 초콜릿을 먹는 창백에게 당신은 상류도시의 초코초코데이 풍습을 아냐고 물었다. 창백은 고개를 갸웃거렸다." +
                    "<br><br>\"...?\"<br><br>" +
                    "모르는 것 같다. 창백은 그저 당신에게 초콜릿을 받았다는 사실만으로도 저렇게 기뻐하는 것 같다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "pale");
                    player.location = "reclaimedShop";
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
                    "되찾은 상점, 창백은 손님들에게 받은 초콜릿들을 정리하다가 당신을 돌아보았다. 그는 기대감 어린 눈동자로 당신을 바라보다가 먼저 당신에게 초콜릿을 내밀었다. 그것도 종류별로. 스트로베리, 밀크, 다크, 플레인.... 창백은 여러 가지 색깔의 초콜릿들을 당신 앞에 늘어놓으며 원하는 것을 고르라고 말했다." +
                    "<br><br>\"...! 아, 다, 가져...가도 돼!\"<br><br>" +
                    "환하게 웃는 창백의 뒤로 창백한 촉수가 이리저리 흔들렸다." +
                    "<br><br>\"어차피 줄, 사람.... 너밖...에, 없어!\"<br><br>" +
                    "창백에게 초콜릿을 받은 후, 당신도 창백에게 초콜릿을 내밀었다. 맛없는 초콜릿인데도 창백은 크게 기뻐하며 당신의 초코를 맛있게 먹었다. 당신도 창백의 초콜릿을 먹었다. 어라, 단맛이 아예 느껴지지 않는다...." +
                    "<br><br>\"고마워, 너무...맛,있어!\"<br><br>" +
                    "창백은 순수하게 당신을 바라보며 웃고 있다. 차라리 당신의 맛없는 초콜릿이 창백의 초콜릿보다는 맛있는 것 같다...."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "pale");
                    player.location = "reclaimedShop";
                    savePlayer(player);
                }
            }
        ], player);
        return;
    }
}

//연말 이벤트
window.YEAR_END_HANDLERS.pale = function(player){

    startScene([
        {
            type : "text",
            value : [
                "창백은 당신의 옆에 꼭 붙어서 당신의 방안으로 들어왔다. 축축한 것이 느껴져서 당신은 옆을 보았다. 그의 뒤에서 나온 창백한 촉수 하나가 당신의 허리를 휘감고 있었다." +
                "<br><br>...창백은 아직 눈치채지 못한 듯하다." +
                "<br><br>당신의 방을 천천히 둘러보던 창백은 당신과 시선을 마주치더니 휙 고개를 숙였다. 우물쭈물하며 촉수 꼬리로 바닥을 톡톡 치던 창백은 용기를 낸 듯 다시 고개를 들었다." +
                "<br><br>\"고, 마...워. 날 특...ㅂ...별한, 사람ㅇ, 이라, 말해....ㅈ....줘서.\"<br><br>" +
                "창백은 자신의 목을 가다듬더니 이번에는 또박또박 말했다." +
                "<br><br>\"...너도 내게, 특...특별한 사람이야.\"<br><br>" +
                "\"그 누구보다도.\", 그는 기침을 하면서도 마지막 말을 덧붙였다. 그러더니 당신의 옆에 꼭 붙어서 당신의 행동을 기다렸다. 그의 꼬리는 이미 기대감에 붕붕 당신의 옆에서 이리저리 흔들리고 있었다. 당신이 어떤 얘기를 하든, 그리고 당신이 어떤 놀이를 하든, 창백은 행복했다." +
                "<br><br>...창백의 손가락이 당신의 손가락에 닿았다. 우연이었다. 손가락이 닿자 창백은 흠칫 놀랐지만 당신의 눈치를 보더니 은근슬쩍 제 새끼손가락을 당신의 새끼손가락에 걸어왔다. 당신과 창백의 웃음 소리는 밤이 지나갈 때까지 멈추지 않았다."
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "pale")
    });
};
window.YEAR_END_LETTER_HANDLERS.pale = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "창백에게서 온 편지다.<br><br><br>" +
                "<span class='log-pale'>[너를 기다리지 않았다는 거짓말은 하지 않을게.]</span><br><br>" +
                "<span class='log-pale'>[네게 화가 나지 않았다는 거짓말도 하지 않을게.]</span><br><br>" +
                "<span class='log-pale'>[그래도 나는 여전히 널 사랑해.]</span><br><br>" +
                "<span class='log-pale'>[거짓말이 아닌 건, 너도 알 거라고 생각해.]</span><br><br>"
            ]
        }
    ], player, {
        onEnd : next
    });
};

//버섯이벤트
window.MUSHROOM_ROMANCE_HANDLERS.pale = function(player, next){
    const mushroomType =
        getMushroomRomanceType();

    if (mushroomType === "tasty"){
        startScene([
            {
                type : "text",
                value : [
                    "창백은 놀란 듯 주변을 둘러보더니 이곳이 바로 머쉬룸킹덤이냐고 물었다. 어렸을 때부터 만화를 열심히 봐서 안다고 말하며 창백은 어린 아이처럼 히히 웃었다." +
                    "<br><br>\"하, 지만... 그, ㄱ, 것과 별, 개로, 이렇, 게.... ㅅ...람으, 을, 납치하면, 아...안돼...!\"<br><br>" +
                    "보이지 않는 누군가에게 충고하듯 창백은 부서지는 목소리로 단호하게 말했다. 그의 창백 촉수 꼬리가 위협적으로 바닥을 탁탁 치다가 버섯을 잡았다. 창백은 먼저 버섯을 먹어보더니 당신에게 맛있다고 말하며 내밀었다. 당신이 받아먹으려고 하자 창백의 얼굴이 붉어졌다." +
                    "<br><br>버섯.... 어쩐지 버섯들의 기가 죽은 것 같다. 그들은 시무룩하게 버섯버섯거리며 당신과 창백을 하얀 빛으로 감쌌다..."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeStamina(player, 40);
                    passTime(player, 10);
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
                    "창백은 촉수꼬리로 독버섯을 잡더니 한 입 먹어보았다." +
                    "<br><br>\"...이거, ㄷ, 독.\"<br><br>" +
                    "창백은 인상을 찌푸리더니 자기가 독버섯을 다 먹어버렸다. 버서엇!? 버섯맨들은 독버섯들을 더 떨어뜨렸지만, 창백은 그 독버섯들을 계속 먹었다. 이러다 식량 거덜나겠어버섯...! 버섯맨들은 독버섯들을 전부 먹어치우는 창백에 당황한 모양이다. 창백은 아무렇지도 않게 중얼거리듯이 말했다." +
                    "<br><br>\"내, ㄱ... 배부....르...ㅁ, 촉수, 들이, 대, 신...ㅁ..먹어.\"<br><br>" +
                    "창백은 당신에게 독버섯을 먹일 생각이 없다. 결국 버섯맨들은 먼저 두 손을 들었다. 그들은 없어진 재정에 슬퍼하며 당신과 창백을 하얀 빛으로 감싸 안았다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("pale", "dominance", 3);
                    passTime(player, 30);
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
                "창백은 꽃 모양으로 생긴 버섯에 눈을 깜박이더니 예쁘다고 말했다. 그리고 그는 그 버섯을 입에 집어넣었다. 눈을 깜박이던 창백의 눈동자가 확장됐다." +
                "<br><br>\"아...!\"<br><br>" +
                "창백은 뒤로 물러나더니 구석에 쪼그리고 앉았다. 그는 저 버섯은 대신 먹어줄 수가 없어서 미안하다고 말했다. 그는 자신이 더 먹게 되면 당신이 위험해질 거라고 덧붙였다. 당신은 꽃 모양의 버섯을 먹었다. 하복부가 뜨거워진다." +
                "<br><br>촉수들은 위협적으로 당신에게 달려들려고 했지만 창백이 팔로 잡아서 제지했다. 창백은 당신에게 가까이 오지 말라고 말했다. 창백은 하얀 빛이 다시 눈앞에 나타날 때까지 당신에게 한 걸음도 가까이 다가오지 않았다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeNPCEmotion("pale", "lust", 25);
                passTime(player, 25);
            }
        }
    ], player, {
        onEnd : next
    });
};