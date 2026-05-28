let player;
let NPC_DATA = {};
let inventoryTab = "equipment";

const ACTIONS = {};
window.registerActions = function(npcName, actions){
    Object.entries(actions).forEach(([key, fn]) => {
        const actionKey = `${npcName}_${key}`;
        ACTIONS[actionKey] = fn;
    });
};

function initStoryUI(){
    const storyBox = document.getElementById("storyBox");

    storyBox.innerHTML = `
        <div id="storyArea">
            <p id="storyText"></p>
        </div>

        <div id="choiceArea"></div>

        <button class="story-btn" id="storyBtn">다음</button>

        <div id="battleUI"></div>
        <div id="logBox" style="display:none;"></div>
    `;

    document.getElementById("storyBtn").onclick = nextstory;
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("INIT START");

    player = JSON.parse(localStorage.getItem("playerData"));
    console.log("player:", player);

    if (!player) {
        alert("playerData 없음 (localStorage 확인)");
        return;
    }

    player = normalizePlayer(player);
    player.flags = player.flags || {};

    initStoryUI(); //DOM 먼저 생성

    await loadAllNPCData();
    await loadEnemies();

    ["eric", "luke", "sora", "yuri", "matin", "deric", "pale", "nikolai", "valen"].forEach(name => {
        registerNPCAsEnemy(name);
    })

    updateDerivedStats(player);
    updateStatusUI(player);
    renderMap(player);
    renderInventoryModal(player);

    if (player.inEvent && player.subwayEvent){
    showSubwayTurn(player);
    return;
    }

    if (player.activeTraining?.active){
        resumeTraining(player);
        return;
    }

    if (player.tavernWork?.active){
        startTavernWork(player);
        return;
    }

    if (player.currentScene?.active){
        startScene(player.currentScene.scene, player, {
            resumeIndex: getSafeResumeIndex(player.currentScene.scene, player.currentScene.index)
        });
        return;
    }

    if (!player.flags.introDone){
        initIntroStory(player);
    } else {
        startScene(getLocationScene(player), player);
    }
});

let introStory = [];
let storyIndex = 0;
function initIntroStory(player){
    introStory= [
    `"${player.name}!"`,
    "환청이었을까. 당신은 순간 당신의 이름을 들었다. <br> 당신이 들은 소리가 환청이었든 환청이 아니었든, 지금 이순간만큼은 당신은 혼자다.",   
    "발걸음을 옮긴 당신의 시야에 마을 하나가 맺혔다. <br> 당신이 그 마을을 좋아하거나 싫어하는 것과 별개로 당신은 이 마을에 들어서지 않으면 <strong>당신이 죽을 수도 있다는 걸 알고 있다.</strong> <br> <strong>...아니면 죽음을 선택할 기회마저 주어지지 않을 수도.</strong> <br> 물론 마을 안이라고 해서 안전한 건 아니었지만 최악을 선택하느니 차악을 선택하는 게 낫지 않겠는가?",
    "발걸음을 옮기던 당신의 발에 돌이 하나 걸렸다. <br> 둥글지는 않지만 적어도 모나있지는 않은 돌이었다. <br> 당신은 멍하니 그 돌을 바라보다가 마을 안으로 들어섰다. <br> 마을에 들어서자 몇몇 사람들이 당신을 보고 수군거리는 게 느껴진다.",
    "당신에게는 선택권이 있다. <br> 쉘터로 돌아가거나, 돈을 벌 방법을 찾아보거나, 목적없이 돌아다니거나.",
    "당신에게는 선택권이 있다. <br> <br> 당신에게는........... <br> <br> ................................... <br><br> <strong>그래. 아직까지는 선택권이 있다.</strong> <br><br> 당신은 어디로 향하시겠습니까?",
];
    storyIndex = 0;

    const el = document.getElementById("storyText");
    if (el) el.innerHTML = introStory[0];
}

function nextstory(){
    storyIndex++;

    if (storyIndex < introStory.length){
        document.getElementById("storyText").innerHTML =
            introStory[storyIndex];
    } else {
        player.flags.introDone = true;
        if (!player.flags.metEric){
            player.flags.metEric = true;
            savePlayer(player);
            startEricFirstMeeting(player);
            return;
        }
        savePlayer(player);
        startScene(getLocationScene(player), player);
    }
}

function saveCurrentSceneState(scene, index, player, options = {}){
    if (!player || options.noSaveScene) return;

    try {
        player.currentScene = {
            active: true,
            scene: JSON.parse(JSON.stringify(scene)),
            index: index
        };

        localStorage.setItem("playerData", JSON.stringify(player));
    } catch (e){
        console.warn("현재 씬 저장 실패:", e);
    }
}

function clearCurrentSceneState(player){
    if (!player) return;
    player.currentScene = null;
    localStorage.setItem("playerData", JSON.stringify(player));
}


function getSafeResumeIndex(scene, index){
    index = Number.isInteger(index) ? index : 0;

    if (Array.isArray(scene) && scene[index]?.type === "choice" && index > 0){
        for (let i = index - 1; i >= 0; i--){
            if (scene[i]?.type === "text") return i;
        }
    }

    return index;
}

function startScene(scene, player, options = {}){
    if (!options.skipMapRefresh){
        renderMap(player);
    }
    let index = Number.isInteger(options.resumeIndex) ? options.resumeIndex : 0;

    const storyText = document.getElementById("storyText");
    const storyBtn = document.getElementById("storyBtn");
    const choiceArea = document.getElementById("choiceArea");

    function showText(text, callback){
    if (typeof text === "function"){
        text = text(player);
    }

    if (
        text &&
        typeof text === "object" &&
        !Array.isArray(text)
    ){
        text = text[player.gender] || text.default || "";
    }

    if (Array.isArray(text)){
        text = text.join("<br>");
    }

    text = processText(text, player);
    storyText.innerHTML = text;

    if (callback) callback();
    }

    function next(){
        const current = scene[index];
        saveCurrentSceneState(scene, index, player, options);

        if (!current){
            clearCurrentSceneState(player);
            
            if (options.onEnd) {
                options.onEnd();
            } else {
                startScene(getLocationScene(player), player, { noSaveScene: true });
            }
            return;
        }
        
        if (current.type === "text"){
            storyBtn.style.display = "none";
            choiceArea.innerHTML = "";

            showText(current.value, () => {
                storyBtn.style.display = "block";
            });

            index++;
        }

        else if (current.type === "effect"){
            if (Array.isArray(current.effects)){
                current.effects.forEach(effect => applyEffect(effect, player));
            }
            
            else if (typeof current.run === "function"){
                const handled = current.run(player, options);
                updateDerivedStats(player);
                updateStatusUI(player);
                renderMap(player);
                localStorage.setItem("playerData", JSON.stringify(player));
                if (handled === true) return;
            }
            
            else if (typeof current.run === "string"){
                const fn = window[current.run];
                
                if (typeof fn === "function"){
                    const handled = fn(player, options);
                    updateDerivedStats(player);
                    updateStatusUI(player);
                    renderMap(player);
                    localStorage.setItem("playerData", JSON.stringify(player));
                    if (handled === true) return;
                }
            }
            index++;
            next();
        }

        else if (current.type === "check"){
            storyBtn.style.display = "none";
            choiceArea.innerHTML = "";
            
            const stat = getTotalStat(player, current.stat);
            const roll = Math.random() * 20;
            
            const resultScene =
            stat + roll >= current.difficulty
            ? current.success
            : current.fail;
            
            index++;
            runScene(resultScene || [], player, options);
            return;
        }

        else if (current.type === "choice"){
            storyBtn.style.display = "none";
            choiceArea.innerHTML = "";

            current.choices.forEach(choice => {
                const btn = document.createElement("button");
                btn.innerText = choice.text;

                btn.onclick = () => {
                    if (choice.stat){
                        if (!choice.noTraumaCheck && checkTraumaFreeze(player)){
                            runScene(
                                choice.traumaFail || choice.fail || [
                                    {
                                        type: "text",
                                        value: "당신은 정신적 충격으로 멍해졌다. 당신은 움직일 수 없다."
                                    }
                                ],
                                player,
                                options
                            );
                            return;
                        }

    const success = rollCheck(
        player,
        choice.stat,
        choice.difficulty
    );

    if (success){
        runScene(choice.success, player, options);
    } else {
        runScene(choice.fail, player, options);
    }
    return;
}

                if (choice.scene){
                    runScene(choice.scene, player, options);
                    return;
                }

                    handleAction(choice.action, player);
                };

                choiceArea.appendChild(btn);
            });
        }
    }

    storyBtn.onclick = next;
    next();
}

function processText(text, player){
    text = text.replaceAll("{playerName}", player.name);
    //npc 추가
    text = processEricText(text, player);
    text = processLukeText(text, player);
    text = processSoraText(text, player);
    text = processYuriText(text, player);
    text = processMatinText(text, player);
    text = processDericText(text, player);
    text = processPaleText(text, player);
    text = processNikolaiText(text, player);
    text = processValenText(text, player);
    return text;
}

function changeHP(player, amount){
    player.status.hp += amount;

    if (player.status.hp < 0) player.status.hp = 0;
    if (player.status.hp > player.status.maxHp) player.status.hp = player.status.maxHp;

    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function changeStamina(player, amount){
    player.status.stamina += amount;

    if (player.status.stamina < 0) player.status.stamina = 0;
    if (player.status.stamina > player.status.maxStamina) player.status.stamina = player.status.maxStamina;

    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function changeArousal(player, amount){
    player.status.arousal += amount;

    if (player.status.arousal >= player.status.maxArousal){
        player.status.arousal = 0;

        player.flags = player.flags || {};
        player.flags.pendingArousalRelease = true;
    }

    if (player.status.arousal < 0){
        player.status.arousal = 0;
    }

    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

window.calmDown = function(player){

    if (player.status.stamina < 5){
        showSingleTextScene(
            "너무 지쳐서 정신을 집중할 수 없다.",
            player
        );
        return;
    }

    changeStamina(player, -5);
    changeArousal(player, -30);

    passTime(player, 10);

    showSingleTextScene(
        "당신은 천천히 숨을 고르며 흥분을 가라앉혔다.",
        player
    );
}

function getSensitivityValue(player, target){
    player.sexualTraits = player.sexualTraits || {};

    const keyMap = {
        m: "mSensitivity",
        b: "bSensitivity",
        c: "cSensitivity",
        a: "aSensitivity",
        mSensitivity: "mSensitivity",
        bSensitivity: "bSensitivity",
        cSensitivity: "cSensitivity",
        aSensitivity: "aSensitivity"
    };

    const key = keyMap[target];
    if (!key) return 0;

    return Number(player.sexualTraits[key]) || 0;
}

function getSensitivityArousalGain(player, target, base){
    const sensitivity = getSensitivityValue(player, target);

    let multiplier = 1 + (sensitivity / 200);

    const alcoholLevel = getAlcoholLevel(player);
    if (alcoholLevel === 1) multiplier += 0.1;
    else if (alcoholLevel === 2) multiplier += 0.25;
    else if (alcoholLevel === 3) multiplier += 0.5;

    return Math.floor(base * multiplier);
}

function buildArousalReleaseScene(player, isDungeon = false){
    player.flags = player.flags || {};
    player.flags.pendingArousalRelease = false;

    let text;

    if (player.flags.inNikolaiPunishmentRoom){

        text =
            "당신의 눈앞이 새하얘졌다. 참을 새도 없이 절정의 파도가 당신을 덮쳤다. 빠르게 점멸되는 시야 속에서, 당신의 귀로 니콜라이의 웃음 소리가 들린 것만 같은 착각이 들었다. 당신의 다리 사이로 습기가 찼다."

    } else if (isDungeon){

        text =
            "당신의 눈앞이 순간 새하얘졌다. 몸 안쪽에서 치밀어오른 감각이 한순간에 터져나가고, 당신은 벽에 기대어 거칠게 숨을 몰아쉬었다." +
            "잠시 뒤, 당신은 겨우 정신을 붙잡고 다시 움직이기 시작했다.";

    } else {

        const locationName = LOCATIONS[player.location]?.name || "그곳";

        text =
            `${locationName}.<br><br>` +
            "당신의 눈앞이 순간 새하얘졌다. 당신은 참으려고 했지만, 하복부의 열기는 폭발하듯이 당신의 몸을 장악했다. 헐떡이는 숨소리와 함께 당신은 절정했다.<br>" +
            "얼마간 움직이지 못하던 당신은 주변의 시선이 당신에게 몰리는 걸 눈치챘다. 당신은 재빨리 자리를 피했다.";
    }

    localStorage.setItem("playerData", JSON.stringify(player));

    return [
        {
            type: "text",
            value: text
        }
    ];
}

function checkArousalRelease(player, onEnd){

    if (!player.flags?.pendingArousalRelease){
        return false;
    }
    if (player.tavernWork?.active){

        const customer =
            typeof getActiveHarassCustomer === "function"
                ? getActiveHarassCustomer(player)
                : null;

        if (customer){

            startTavernArousalCollapse(
                player,
                customer
            );

            return true;
        }
    }
    startScene(
        buildArousalReleaseScene(
            player,
            !!player.dungeon?.active
        ),
        player,
        { onEnd }
    );
    return true;
}

function normalizeBodyFluidState(player){
    player.status = player.status || {};
    player.status.bodyFluid = player.status.bodyFluid || {};
    ["a", "m", "c"].forEach(key => {
        player.status.bodyFluid[key] = Number(player.status.bodyFluid[key]) || 0;
    });
    player.status.maxBodyFluid = player.status.maxBodyFluid || 300;
}

function getBodyFluidTotal(player){
    normalizeBodyFluidState(player);
    return ["a", "m", "c"].reduce((sum, key) => sum + (Number(player.status.bodyFluid[key]) || 0), 0);
}

function getBodyFluidLabel(key){
    return ({ a: "A", m: "M", c: "C" })[key] || key;
}

function addBodyFluid(player, key, amount = 1){
    normalizeBodyFluidState(player);
    if (!["a", "m", "c"].includes(key)) return 0;

    if (player.gender === "male" && key === "c"){
        return 0;
    }

    const max = player.status.maxBodyFluid || 300;
    const before = player.status.bodyFluid[key] || 0;
    player.status.bodyFluid[key] = clamp(before + amount, 0, max);

    updateDerivedStats(player);
    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));

    return player.status.bodyFluid[key] - before;
}

function reduceBodyFluid(player, amount){
    normalizeBodyFluidState(player);

    for (let i = 0; i < amount; i++){
        const entries = ["a", "m", "c"]
            .filter(key => player.status.bodyFluid[key] > 0)
            .map(key => ({
                key,
                weight: player.status.bodyFluid[key]
            }));

        if (entries.length === 0) break;

        const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
        let roll = Math.random() * totalWeight;

        for (const entry of entries){
            roll -= entry.weight;

            if (roll <= 0){
                player.status.bodyFluid[entry.key]--;
                break;
            }
        }
    }

    updateDerivedStats(player);
    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function getBodyFluidDebuffLevel(player){
    const total = getBodyFluidTotal(player);
    if (total >= 200) return 3;
    if (total >= 100) return 2;
    if (total >= 50) return 1;
    return 0;
}

function getBodyFluidStatusText(player){
    const a = player.status.bodyFluid.a || 0;
    const m = player.status.bodyFluid.m || 0;
    const c = player.status.bodyFluid.c || 0;

    const texts = [];

    if (a >= 200) texts.push("움직일 때마다 엉덩이에서 축축한 것이 흘러내린다.");
    else if (a >= 100) texts.push("엉덩이에 묵직한 압박감이 느껴진다.");
    else if (a >= 50) texts.push("엉덩이가 약간 불편하다.");

    if (m >= 200) texts.push("입을 열자마자 정액이 질질 흐를 정도다.");
    else if (m >= 100) texts.push("말할 때마다 뭔가가 걸리는 느낌이 든다.");
    else if (m >= 50) texts.push("입 안이 찝찝하다.");

    if (player.gender !== "male"){
        if (c >= 200) texts.push("배가 너무 부풀어올라서 거동이 힘들다");
        else if (c >= 100) texts.push("아랫배가 묵직하게 부풀어 있다.");
        else if (c >= 50) texts.push("속이 약간 불편하다.");
    }

    return texts;
}

function getCharmArousalGain(player, base = 10){
    const charm = getTotalStat(player, "charm");
    return Math.floor(base * (1 + charm / (20 + charm)));
}

window.cleanseBodyFluid = function(player){
    if (player.location !== "shelter"){
        showSingleTextScene("여기서는 몸을 정비할 수 없다.", player);
        return;
    }

    const total = getBodyFluidTotal(player);
    if (total <= 0){
        showSingleTextScene("이미 몸 상태는 깨끗하다.", player);
        return;
    }

    const stamina = player.status.stamina || 0;
    const base = 10 + Math.floor(stamina / 10);
    const amount = base + Math.floor(Math.random() * 6); // +0~5

    reduceBodyFluid(player, amount);
    passTime(player, 5);

    showSingleTextScene(
        `당신은 쉘터의 화장실에서 정액을 빼냈다.<br>조금은 나아진 기분이 든다. (-${amount})`,
        player
    );
}

function changeGold(player, amount){
    player.gold += amount;

    if (player.gold < 0) player.gold = 0;

    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}


function addGold(player, amount){
    player.gold += amount;
    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function addStatusEffect(player, effect){
    player.buffs = player.buffs || [];

    const existing = player.buffs.find(b => b.id === effect.id);

    if (existing){
        existing.duration = Math.max(existing.duration, effect.duration);
        existing.damage = Math.max(existing.damage, effect.damage);
    } else {
        player.buffs.push({
            ...effect
        });
    }
}

function applyActionStatusEffects(player){
    if (!player.buffs || player.buffs.length === 0) return;

    let totalDamage = 0;

    player.buffs.forEach(buff => {
        if (buff.damage){
            totalDamage += buff.damage;
        }

        buff.duration--;
    });

    if (totalDamage > 0){
        changeHP(player, -totalDamage);
        log(`상태이상으로 ${totalDamage} 피해를 입었다.`, "damage");
    }

    player.buffs = player.buffs.filter(buff => buff.duration > 0);

    if (player.status.hp <= 0){
    collapsePlayer(player, "statusEffect");
    return true;
    }
    return false;
}

function getExpToNextLevel(level){
    level = Math.max(1, Number(level) || 1);
    return Math.floor(50 + level * level * 25);
}

function gainExp(player, amount){
    amount = Math.max(0, Number(amount) || 0);
    if (amount <= 0) return;

    player.level = Number.isInteger(player.level) ? player.level : 1;
    player.exp = Number.isFinite(player.exp) ? player.exp : 0;
    player.statPoints = Number.isInteger(player.statPoints) ? player.statPoints : 0;

    player.exp += amount;
    addLog(`경험치 ${amount} 획득!`);

    while (player.exp >= getExpToNextLevel(player.level)){
        player.exp -= getExpToNextLevel(player.level);
        levelUp(player);
    }

    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function levelUp(player){
    player.level += 1;
    player.statPoints += 1;
    addLog(`레벨업! Lv.${player.level}`);
}

function addLog(text){
    const logBox = document.getElementById("logBox");
    if (!logBox) return;

    logBox.style.display = "block";

    const p = document.createElement("p");
    p.innerHTML = text;

    logBox.appendChild(p);

    logBox.scrollTop = logBox.scrollHeight;

    setTimeout(() => {
        p.remove();
        if (logBox.children.length === 0){
            logBox.style.display = "none";
        }
    }, 3000);
}

let afterStatAllocation = null;

function openStatAllocation(player, onDone = null){
    afterStatAllocation = onDone;

    startScene([
        {
            type: "text",
            value: `혹독한 경험으로 당신은 더 강해졌습니다! <br>남은 스탯 포인트: ${player.statPoints}`
        },
        {
            type: "choice",
            choices: [
                { text: "근력 STR +1", action: "stat_str" },
                { text: "민첩 DEX +1", action: "stat_dex" },
                { text: "지력 INT +1", action: "stat_int" },
                { text: "매력 CHARM +1", action: "stat_charm" }
            ]
        }
    ], player);
}

function allocateStat(player, key){
    player.statPoints = Number.isInteger(player.statPoints) ? player.statPoints : 0;
    if (player.statPoints <= 0){
        alert("사용 가능한 스탯 포인트가 없습니다.");
        if (afterStatAllocation) afterStatAllocation();
        else startScene(getLocationScene(player), player);
        return;
    }

    player.stats = player.stats || { str:0, dex:0, int:0, charm:0 };
    player.stats[key] = (player.stats[key] || 0) + 1;

    player.statPoints -= 1;
    updateDerivedStats(player);
    updateStatusUI(player);

    localStorage.setItem("playerData", JSON.stringify(player));

    if (player.statPoints > 0){
        openStatAllocation(player, afterStatAllocation);
        return;
    }

    const done = afterStatAllocation;
    afterStatAllocation = null;
    if (done) done();
    else startScene(getLocationScene(player), player);
}

window.stat_str = function(player){ allocateStat(player, "str"); };
window.stat_dex = function(player){ allocateStat(player, "dex"); };
window.stat_int = function(player){ allocateStat(player, "int"); };
window.stat_charm = function(player){ allocateStat(player, "charm"); };

function spendGold(player,amount){
    if (player.gold<amount){
        alert("돈이부족해");
        return false;
    }
    player.gold -= amount;
    updateStatusUI(player);
    return true;
}

function clamp(value, min, max){
    return Math.max(min, Math.min(max, value));
}

function changeTrauma(player, amount){
    player.status.trauma = player.status.trauma || 0;
    player.status.trauma = clamp(player.status.trauma + amount, 0, 100);
    updateStatusUI(player);
}

function checkTraumaFreeze(player, options = {}){
    const trauma = player.status?.trauma || 0;

    const threshold = options.threshold ?? 80;
    const startChance = options.startChance ?? 0.3;
    const maxChance = options.maxChance ?? 0.5;

    if (trauma < threshold){
        return false;
    }

    const ratio = (trauma - threshold) / (100 - threshold);

    let chance =
        startChance +
        (maxChance - startChance) * ratio;

    if (player.status?.arousal >= player.status?.maxArousal * 0.7){
        chance *= 1.1;
    }

    if (player.status?.stamina <= 0){
        chance *= 1.2;
    }

    chance = clamp(chance, 0, 0.95);

    return Math.random() < chance;
}

function getAlcoholLevel(player){
    const alcohol = Number(player.status?.alcohol) || 0;

    if (alcohol >= 90) return 3; // 만취
    if (alcohol >= 60) return 2; // 취함
    if (alcohol >= 30) return 1; // 살짝 취함
    return 0;
}

function getAlcoholLabel(player){
    const level = getAlcoholLevel(player);

    if (level === 3) return "만취";
    if (level === 2) return "취함";
    if (level === 1) return "살짝 취함";
    return "멀쩡함";
}

function changeAlcohol(player, amount){
    player.status = player.status || {};
    player.status.alcohol = Number(player.status.alcohol) || 0;
    player.status.maxAlcohol = player.status.maxAlcohol || 100;

    player.status.alcohol = clamp(
        player.status.alcohol + amount,
        0,
        player.status.maxAlcohol
    );

    updateDerivedStats(player);
    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function normalizeAlcoholState(player){
    player.status = player.status || {};
    player.status.alcohol = Number(player.status.alcohol) || 0;
    player.status.maxAlcohol = player.status.maxAlcohol || 100;
}

function changeSensitivity(player, key, amount){
    player.sexualTraits = player.sexualTraits || {};
    player.sexualTraits[key] = player.sexualTraits[key] || 0;
    player.sexualTraits[key] = clamp(player.sexualTraits[key] + amount, 0, 400);
    updateStatusUI(player);
}

function changeEmotion(npcId, key, amount){
    const npc = NPC_DATA[npcId];
    if (!npc) return;

    npc.emotion = npc.emotion || {};
    npc.emotion[key] = npc.emotion[key] ?? 0;
    npc.emotion[key] = clamp(npc.emotion[key] + amount, -100, 100);

    if (typeof saveNpcProgressToLocalStorage === "function"){
        saveNpcProgressToLocalStorage();
    }

    updateStatusUI(player);
}

function changeNPCEmotion(npcId, key, amount){
    changeEmotion(npcId, key, amount);
}

function applyEffect(effect, player){
    if (!effect) return;

    if (effect.target === "player"){
        if (effect.key === "hp") changeHP(player, effect.amount);
        else if (effect.key === "stamina") changeStamina(player, effect.amount);
        else if (effect.key === "arousal") changeArousal(player, effect.amount);
        else if (effect.key === "trauma") changeTrauma(player, effect.amount);
    }

    else if (effect.target === "sensitivity"){
        changeSensitivity(player, effect.key, effect.amount);
    }

    else if (effect.target === "fluid"){
        addBodyFluid(player, effect.key, effect.amount);
    }

    else if (effect.target === "npc"){
        changeEmotion(effect.npc, effect.key, effect.amount);
    }
    
    else if (effect.target === "flag"){
        player.flags = player.flags || {};
        player.flags[effect.key] = effect.value;
    }

    else if (effect.target === "time"){
        passTime(player, effect.amount);
    }

    updateDerivedStats(player);
    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function buyItem(player, item){
    if (!spendGold(player, item.price)) return;

    addItem(player, item);

    renderInventoryModal(player);

    alert(item.name + " 샀다!");
}

function isEquipmentItem(item){
    return ["weapon", "top", "bottom", "underwear"].includes(item.type);
}

function isConsumableItem(item){
    return ["heal", "stamina", "arousal", "alcohol"].includes(item.type);
}

//시간대함수
function getTimePeriod(player){
    const hour = Math.floor(player.time/10)%24;
    if (hour<6) return "dawn";
    if (hour<12) return "morning";
    if (hour<18) return "afternoon";
    if (hour<24) return "night";
}

function passTime(player, amount){
    player.time += amount;

    if (player.status?.alcohol > 0){
        player.status.alcohol = clamp(player.status.alcohol - Math.floor(amount / 2), 0, player.status.maxAlcohol || 100);
    } //1시간마다 5 감소

    updateNpcDaily(player);

    updateStatusUI(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function getCurrentDay(player){
    return Math.floor((Number(player?.time) || 0) / 240);
}

const NPC_LUST_GROWTH_CONDITIONS = {
    sora: [
        { key: "affection", min: 30, amount: 1 },
        { key: "dominance", min: 40, amount: 1 }
    ],

    yuri: [
        { key: "affection", min: 90, amount: 1 }
    ],

    luke: [
        { key: "affection", min: 50, amount: 1 },
        { key: "dominance", min: 30, amount: 1 }
    ],

    eric: [
        { key: "affection", min: 80, amount: 1 }
    ],

    matin: [
        { key: "affection", min: 50, amount: 1 }
    ],

    deric: [
        { key: "dominance", min: 50, amount: 1 },
        { key: "affection", min: 80, amount: 1 }
    ],

    pale: [
        { key: "affection", min: 20, amount: 1 }
    ],

    nikolai: [
        { key: "dominance", min: 20, amount: 1 },
        { key: "affection", min: 60, amount: 1 }
    ],

    valen: [
        { key: "affection", min: 90, amount: 1 }
    ]
};

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateNpcDaily(player){
    if (!player || !NPC_DATA) return;

    const currentDay = getCurrentDay(player);

    if (player.lastNpcDailyUpdateDay === currentDay) return;

    player.lastNpcDailyUpdateDay = currentDay;

    Object.entries(NPC_DATA).forEach(([npcId, npc]) => {
        if (!npc.emotion) return;

        const conditions = NPC_LUST_GROWTH_CONDITIONS[npcId] || [];

        let amount = 0;

        conditions.forEach(condition => {
            const value = npc.emotion[condition.key] || 0;

            if (value >= condition.min){
                amount += condition.amount;
            }
        });

        if (amount <= 0) return;

        npc.emotion.lust = npc.emotion.lust ?? 0;
        npc.emotion.lust = clamp(npc.emotion.lust + amount, 0, 100);
    });

    if (typeof saveNpcProgressToLocalStorage === "function"){
        saveNpcProgressToLocalStorage();
    }

    savePlayer(player);
}

function registerActions(npcName, actions){
    Object.entries(actions).forEach(([key, fn]) => {
        const actionKey = `${npcName}_${key}`;
        ACTIONS[actionKey] = fn;
    });
}


function doAction(player, staminaCost, timeCost){
    if (player.status.stamina<staminaCost){
        alert("지쳤어");
        return;
    }
    player.status.stamina -= staminaCost;
    passTime(player,timeCost);
    updateStatusUI(player);
}

function doSleep(player){
    const sleepLocation = player.location;
    const locationData = LOCATIONS[sleepLocation];

    if (Math.random() < (locationData.sleepDanger || 0)){

        passTime(player, 20);
        changeStamina(player, 10);
        changeHP(player, 20);

        const returnToSleepLocation = () => {
            player.location = sleepLocation;
            if (player.dungeon) player.dungeon.active = false;
            localStorage.setItem("playerData", JSON.stringify(player));
            renderMap(player);
            startScene(getLocationScene(player), player);
        };

        const enemyId =
            pickEnemyFromPool(locationData.sleepEnemyPool)
            || getEncounterEnemyForLocation(sleepLocation)
            || "rapistM";

        startBattle(enemyId, player, {
            onWin: returnToSleepLocation,
            onLose: returnToSleepLocation,
            onEscape: returnToSleepLocation
        });

        return;
    }

    player.status.stamina = player.status.maxStamina;
    player.status.hp = player.status.maxHp;
    changeTrauma(player, -10);
    passTime(player, 80);

    startScene(getLocationScene(player), player);
}

function doRest(player){
    const sleepLocation = player.location;
    const locationData = LOCATIONS[sleepLocation];

    const danger = (locationData.sleepDanger || 0) * 0.5;

    if (Math.random() < danger){
        passTime(player, 10);
        changeStamina(player, 5);
        changeHP(player, 10);

        const returnToSleepLocation = () => {
            player.location = sleepLocation;
            if (player.dungeon) player.dungeon.active = false;

            localStorage.setItem("playerData", JSON.stringify(player));

            renderMap(player);
            startScene(getLocationScene(player), player);
        };

        const enemyId =
            pickEnemyFromPool(locationData.sleepEnemyPool)
            || getEncounterEnemyForLocation(sleepLocation)
            || "rapistM";

        startBattle(enemyId, player, {
            onWin: returnToSleepLocation,
            onLose: returnToSleepLocation,
            onEscape: returnToSleepLocation
        });

        return;
    }

    changeStamina(player, Math.floor(player.status.maxStamina * 0.3));
    changeHP(player, Math.floor(player.status.maxHp * 0.4));
    changeTrauma(player, -2);
    passTime(player, 20);

    startScene(getLocationScene(player), player);
}

window.sleep = function(player){
    doSleep(player);
}

window.rest = function(player){
    doRest(player);
};

function getEncounterEnemyForLocation(locationKey){
    if (typeof ENEMY_POOLS === "undefined") return null;

    const pool = ENEMY_POOLS[locationKey];
    if (!Array.isArray(pool) || pool.length === 0) return null;

    return pickWeighted(pool);
}

function showSingleTextScene(text, player, options = {}){
    startScene([
        {
            type: "text",
            value: text
        }
    ], player, {
        onEnd: options.onEnd || (() => startScene(getLocationScene(player), player))
    });
}

const SEARCH_CONFIG = {
    forest: {
        monsterChance: 0.35,
        itemChance: 0.35,
        itemPool: [
            { item: () => ITEMS.misc.wildFruit, weight: 80 },
            { item: () => ITEMS.misc.rareFruit, weight: 20 }
        ]
    },

    deepForest: {
        monsterChance: 0.55,
        itemChance: 0.4,
        itemPool: [
            { item: () => ITEMS.misc.rareFruit, weight: 30 },
            { item: () => ITEMS.misc.wildFruit, weight: 30 },
            { item: () => ITEMS.misc.bloodycloth, weight: 30 },
            { item: () => ITEMS.misc.pieceofwhiteflower, weight: 10 }            
        ]
    },

    graveyard : {
        monsterChance : 0.4,
        itemChance : 0.4,
        itemPool : [
            { item: () => ITEMS.misc.skull, weight: 70 },
            { item: () => ITEMS.misc.pieceofwhiteflower, weight: 20 },
            { item: () => ITEMS.misc.jewerlyPieces, weight: 10 }
        ]
    },

    banditForest : {
        monsterChance : 0.6,
        itemChance : 0.4,
        itemPool : [
            { item: () => ITEMS.misc.silverChain, weight: 60 },
            { item: () => ITEMS.misc.jewerlyPieces, weight: 20 },
            { item: () => ITEMS.misc.druggy, weight: 20 }
        ]
    }
};

function pickWeightedSearchItem(pool){
    if (!Array.isArray(pool) || pool.length === 0) return null;

    const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * total;

    for (const entry of pool){
        roll -= entry.weight;
        if (roll <= 0){
            return entry.item();
        }
    }

    return pool[0].item();
}

window.search = function(player){
    if (player.status.stamina <= 0){
        alert("너무 지쳐서 주변을 수색할 수 없다.");
        return;
    }

    const locationKey = player.location;
    const config = SEARCH_CONFIG[locationKey];

    if (!config){
        showSingleTextScene("이곳에서는 딱히 수색할 만한 것이 없다.", player);
        return;
    }

    changeStamina(player, -10);
    passTime(player, 5);

    const fluidLevel = getBodyFluidDebuffLevel(player);
    const monsterChance = clamp(
        config.monsterChance + fluidLevel * 0.07,
        0,
        0.85
    );

    const roll = Math.random();

    if (roll < monsterChance){
        const enemyId = getEncounterEnemyForLocation(locationKey) || "slime";
        startBattle(enemyId, player, { noEscape: false });
        return;
    }

    if (roll < monsterChance + config.itemChance){
        const item = pickWeightedSearchItem(config.itemPool);

        if (!item){
            showSingleTextScene("당신은 한참 동안 주변을 수색했지만, 특별한 것은 찾지 못했다.", player);
            return;
        }

        addItem(player, item);
        renderInventoryModal(player);

        const itemName = item?.name || "쓸만한 물건";
        const extraText = getDeepForestExtraSearchText(player, locationKey) ||
                          getBanditForestExtraSearchText(player, locationKey);
        
        showSingleTextScene(
            "당신은 주변을 수색하다가 " + itemName + "을 발견했다." +
            (extraText ? "<br><br>" + extraText : ""),
            player
        );        
        return;
    }
    const extraText = getDeepForestExtraSearchText(player, locationKey) ||
                      getBanditForestExtraSearchText(player, locationKey);
    
    showSingleTextScene(
        "당신은 한참 동안 주변을 수색했지만, 특별한 것은 찾지 못했다." +
        (extraText ? "<br><br>" + extraText : ""),
        player
    );
};

//수색퀘스트 전용
function getUndercity03SearchHint(player){
    player.flags = player.flags || {};

    const isStory03 =
        player.quest?.active?.id === "undercity_story_03" &&
        !player.flags.goblin_cave_found;

    if (!isStory03) return "";

    if (Math.random() >= 0.3) return "";

    if (!player.flags.undercity_03_guard_cloth_found){
        player.flags.undercity_03_guard_cloth_found = true;
        savePlayer(player);

        return "수풀을 뒤지던 당신은 잎에 묻어있는 핏자국을 발견했다. 의뢰에서 찾고 있는 실종자일까, 아니면 그냥 실종자일까. 더 찾아보는 수밖에 없다.";
    }

    if (!player.flags.undercity_03_blood_trace_found){
        player.flags.undercity_03_blood_trace_found = true;
        savePlayer(player);

        return "당신은 수풀에서 경비병의 옷을 발견했다. 옷의 상태를 보니 시간이 아주 오래 지난 건 아닌 것처럼 보인다. 당신은 더 찾아보기로 했다.";
    }

    if (!player.flags.undercity_03_white_flower_found){
        player.flags.undercity_03_white_flower_found = true;
        savePlayer(player);

        return "당신은 피가 하나도 묻어있지 않은, 깨끗한 발자국을 보았다. 루크일까? 루크의 발이라고 하기에는 작다... 발자국의 상태를 보니 적어도 끌려간 건 아닌 거 같다. 스스로 어디로 걸어간 걸까? 당신은 쫓아가보았지만 발자국은 중간에 끊겨있었다.";
    }

    player.flags.goblin_cave_found = true;              // 03 퀘스트 완료 판정용
    player.flags.story_goblin_cave_visible = true;      // 스토리 동굴 임시 입장용

    addQuestProgress(player);
    savePlayer(player);

    return "웅성거리는 소리에 당신은 숨을 죽였다. 고블린들의 소리가 들렸다. 저 동굴이다, 처음에 당신은 확신하지 못했지만 동굴 입구 앞에 떨어져있는 은색 손목시계를 보고 확신했다. 은색 손목시계는 부서져있었다.";
}
function maybeFindNormalGoblinCave(player){
    player.flags = player.flags || {};

    const isStory03 =
        player.quest?.active?.id === "undercity_story_03" &&
        !player.flags.goblin_cave_found;

    if (isStory03) return "";
    if (player.flags.goblin_cave_visible) return "";
    if (Math.random() >= 0.15) return "";

    player.flags.goblin_cave_visible = true;
    savePlayer(player);

    return "<br><br>수풀을 헤치고 들어가자 오래된 고블린 동굴 입구가 보였다. 안쪽에서 축축한 악취와 낮은 울음소리가 흘러나온다.";
}
function getDeepForestExtraSearchText(player, locationKey){
    if (locationKey !== "deepForest") return "";

    return (
        getUndercity03SearchHint(player) ||
        maybeFindNormalGoblinCave(player) ||
        ""
    );
}

function getUndercity05SearchHint(player){
    player.flags = player.flags || {};

    const isStory05 =
        player.quest?.active?.id === "undercity_story_05" &&
        !player.flags.bandit_hideout_found;

    if (!isStory05) return "";

    if (Math.random() >= 0.15) return "";

    if (!player.flags.undercity_05_cart_found){
        player.flags.undercity_05_cart_found = true;
        savePlayer(player);

        return "당신은 부서진 수레를 발견했다. 바퀴는 반쯤 빠져 있었고, 주변 흙바닥에는 여러 사람의 발자국이 어지럽게 찍혀 있었다. 발자국을 따라가던 당신은 시체 앞에서 발걸음을 멈췄다. 옷까지 털려있었다.";
    }

    if (!player.flags.undercity_05_guard_trace_found){
        player.flags.undercity_05_guard_trace_found = true;
        savePlayer(player);

        return "경비병 옷을 입고 있는 시체가 보인다. 흔적을 보니 딱히 저항하지는 않은 거 같다. 어쩌면 아는 사람에게 습격당한 걸지도...?";
    }

    if (!player.flags.undercity_05_watch_found){
        player.flags.undercity_05_watch_found = true;
        savePlayer(player);

        return "나무껍질에 얕은 칼자국이 남아 있었다. 표식처럼 일정한 간격으로 새겨진 흔적이었다. 도적들이 길을 잃지 않기 위해 남겨둔 표시일지도 모른다.";
    }

    player.flags.bandit_hideout_found = true;
    addQuestProgress(player);
    savePlayer(player);

    return "사람들의 왕래가 끊긴 지 오래된 장소, 하지만 바닥에는 최근 남겨진 말발굽 자국과 발자국들이 선명하게 남아있었다. 그 발자국을 따라가던 당신은 녹슨 철문을 발견했다. 문틈 사이로 희미한 횃불빛이 새어나오고 있다. 당신은 조용히 다가가 문을 밀어보았지만 열리지 않았다. 안쪽에서 단단히 잠겨있는 모양이다. 시간을 들이면 자물쇠를 딸 수야 있겠지만 안에서 들리는 소리들을 보아 지금 혼자 들어가는 건 자살행위에 가깝다. 당신은 다시 도적떼의 성채를 바라보았다. 성채는 생각했던 것보다 훨씬 거대하고 단단했다. 누군가에게서 무기를 사고 있는 걸지도 모르겠다.<br><br>지금 혼자 들어가는 건 무리다. 당신은 다른 사람들의 시선을 끌기 전에 조용히 물러났다.";
}
function getBanditForestExtraSearchText(player, locationKey){
    if (locationKey !== "banditForest") return "";

    return (
        getUndercity05SearchHint(player) ||
        ""
    );
}

//에리어 관련

function renderMap(player){
    const mapArea = document.getElementById("mapArea");
    if (!mapArea || !player) return;

    if (player.dungeon?.active){
    if (typeof window.renderDungeonMap === "function"){
        window.renderDungeonMap(player);
    }
    return;
    }

    if (isRichTownLocation(player.location)){
        renderRichTownMap(player);
        return;
    }

    if (isOuterForestLocation(player.location)){
        renderOuterForestMap(player);
        return;
    }

    const currentKey = player.location;

    function node(key){
        const loc = LOCATIONS[key];
        if (!loc) return "";

        const currentClass = currentKey === key ? " current-map-node" : "";

        return `
            <div class="map-node${currentClass}">
                ${loc.name}
            </div>
        `;
    }

    mapArea.innerHTML = `
        <div class="map-box">
            <h3>지도</h3>

            <div class="fixed-map">

                <div class="map-row center">
                    ${node("forest")}
                </div>

                <div class="map-v-line"></div>

                <div class="map-row center">
                    ${node("townEntrance")}
                </div>

                <div class="map-v-line"></div>

                <div class="map-row street-branch">
                    ${node("townStreet")}

                    <div class="branch-list">
                        ${node("shelter")}
                        ${node("shop")}
                        ${node("tavern")}
                        ${node("subway")}
                        ${node("gloryHole")}
                    </div>
                </div>

                <div class="map-v-line"></div>

                <div class="map-row street-branch">
                    ${node("darkStreet")}
                
                    <div class="branch-list">
                        ${node("sewer")}
                        ${node("graveyard")}
                    </div>
                </div>

            </div>
        </div>
    `;
}

function isRichTownLocation(locationKey){
    return [
        "richTownEntrance",
        "richTownStreet"
    ].includes(locationKey);
}

function isOuterForestLocation(locationKey){
    return [
        "deepForest",
        "banditForest",
        "guardPost1",
        "guardPost2",
        "guardPost3",
        "wastedRuin",
        "whiteFlowerTomb"
    ].includes(locationKey);
}

function renderRichTownMap(player){
    const mapArea = document.getElementById("mapArea");
    if (!mapArea || !player) return;

    const currentKey = player.location;

    function node(key){
        const loc = LOCATIONS[key];
        if (!loc) return "";

        const currentClass = currentKey === key ? " current-map-node" : "";

        return `
            <div class="map-node${currentClass}">
                ${loc.name}
            </div>
        `;
    }

    mapArea.innerHTML = `
        <div class="map-box">
            <h3>상류도시 지도</h3>

            <div class="fixed-map">

                <div class="map-row street-branch">
                    ${node("richTownEntrance")}

                    <div class="branch-list">
                        ${node("subway")}
                    </div>
                </div>

                <div class="map-v-line"></div>

                <div class="map-row center">
                    ${node("richTownStreet")}
                </div>

            </div>
        </div>
    `;
}

function renderOuterForestMap(player){
    const mapArea = document.getElementById("mapArea");
    if (!mapArea || !player) return;

    const currentKey = player.location;

    function node(key){
        const loc = LOCATIONS[key];
        if (!loc) return "";

        const currentClass = currentKey === key ? " current-map-node" : "";

        return `
            <div class="map-node${currentClass}">
                ${loc.name}
            </div>
        `;
    }

    mapArea.innerHTML = `
        <div class="map-box">
            <h3>외곽 지도</h3>

            <div class="fixed-map">

                <div class="map-row center">
                    ${node("deepForest")}
                </div>

                <div class="map-v-line"></div>

                <div class="map-row center">
                ${node("banditForest")}
                </div>

                <div class="map-v-line"></div>

                <div class="map-row center">
                    ${node("guardPost1")}
                </div>

                <div class="map-v-line"></div>

                <div class="map-row center">
                    ${node("guardPost2")}
                </div>

                <div class="map-v-line"></div>

                <div class="map-row street-branch">
                    ${node("guardPost3")}

                    <div class="branch-list">
                        ${node("wastedRuin")}
                        ${node("whiteFlowerTomb")}
                    </div>
                </div>

            </div>
        </div>
    `;
}

function moveToFromMap(locationKey){
    if (!player) return;
    moveTo(player, locationKey);
}

function tryEscapeArea(player, targetLocation, requiredSteps){
    if (player.status.stamina <= 0){
        alert("너무 지쳐서 움직일 수 없다.");
        return;
    }

    player.escapeProgress = player.escapeProgress || {};

    const fromLocation = player.location;
    const key = fromLocation + "_to_" + targetLocation;

    player.escapeProgress[key] = (player.escapeProgress[key] || 0) + 1;

    changeStamina(player, -5);
    changeArousal(player, -5);
    passTime(player, 10);

    let dangerChance = fromLocation === "deepForest" ? 0.35 : 0.25;
    dangerChance = clamp(dangerChance + getBodyFluidDebuffLevel(player) * 0.05, 0, 0.75);

    if (Math.random() < dangerChance){
        const enemyId = getEncounterEnemyForLocation(fromLocation) || "slime";
        startBattle(enemyId, player, { noEscape: false });
        return;
    }

    if (player.escapeProgress[key] >= requiredSteps){
        player.escapeProgress[key] = 0;
        player.location = targetLocation;
        player.justMoved = true;

        if (checkAllEvents(player)){
            player.justMoved = false;
            return;
        }

        player.justMoved = false;
        startScene(getLocationScene(player), player);
        return;
    }

    showSingleTextScene(
        "당신은 길을 더듬으며 빠져나가려 했다. 아직 더 걸어야 할 것 같다. (" + player.escapeProgress[key] + "/" + requiredSteps + ")",
        player
    );
}

function travelOuterArea(player, targetLocation, requiredSteps){
    tryEscapeArea(player, targetLocation, requiredSteps);
}

window.escape_forest = function(player){
    tryEscapeArea(player, "townEntrance", 5);
}

window.escape_deepForest = function(player){
    tryEscapeArea(player, "forest", 5);
}

window.travel_banditForest_to_guardPost1 = function(player){
    travelOuterArea(player, "guardPost1", 5);
};

window.travel_guardPost1_to_guardPost2 = function(player){
    travelOuterArea(player, "guardPost2", 5);
};

window.travel_guardPost2_to_guardPost3 = function(player){
    travelOuterArea(player, "guardPost3", 5);
};

window.travel_guardPost3_to_wastedRuin = function(player){
    travelOuterArea(player, "wastedRuin", 3);
};

window.travel_guardPost3_to_whiteFlowerTomb = function(player){
    travelOuterArea(player, "whiteFlowerTomb", 3);
};

window.travel_guardPost1_to_banditForest = function(player){
    travelOuterArea(player, "banditForest", 5);
};

window.travel_guardPost2_to_guardPost1 = function(player){
    travelOuterArea(player, "guardPost1", 5);
};

window.travel_guardPost3_to_guardPost2 = function(player){
    travelOuterArea(player, "guardPost2", 5);
};

window.travel_wastedRuin_to_guardPost3 = function(player){
    travelOuterArea(player, "guardPost3", 3);
};

window.travel_whiteFlowerTomb_to_guardPost3 = function(player){
    travelOuterArea(player, "guardPost3", 3);
};

//전투이벤트
function startBattle(enemyId, player, options = {}){
    const enemyFactory = ENEMIES[enemyId];

    if (!enemyFactory){
        alert("적 데이터가 없습니다.");
        return;
    }

    const enemy = enemyFactory();

    player.inBattle = true;

    showBattleUI();

    initBattle(enemy, player, options);
}


//장소
//랜덤선택함수
function pickRandom(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

function pickEnemyFromPool(pool){
    if (!pool || pool.length === 0) return null;

    let total = pool.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * total;

    for (let e of pool){
        roll -= e.weight;
        if (roll <= 0){
            return e.id;
        }
    }

    return pool[0].id;
}

function moveTo(player,locationKey){
    const current = player.location;
    const connections = LOCATIONS[current].connections;

    if (!connections[locationKey]){
        alert("여기서는 갈 수 없는 곳이다.");
        return;
    }

    changeStamina(player, -5);
    changeArousal(player, -5);
    if (applyActionStatusEffects(player)) return;
    if (player.status.stamina < 0) player.status.stamina = 0;

    const travelTime = connections[locationKey];

    if (window.DUNGEONS?.[locationKey]){
    passTime(player, travelTime);
    enterDungeon(player, locationKey);
    return;
    }

    if (locationKey === "subway"){
    player.lastSubwayFrom = player.location;
    }
    
    player.location=locationKey;
    passTime(player, travelTime);

    player.justMoved = true;

    if (checkAllEvents(player)){
        player.justMoved = false;
        return;
    }
    player.justMoved = false;
    renderMap(player);
    startScene(getLocationScene(player), player);
}

function getTimeKey(player){
    return getTimePeriod(player);
}

function openInventory(tab="equipment"){
    inventoryTab = tab;
    document.getElementById("inventoryModal").style.display = "flex";
    renderInventoryModal(player);
}

function closeInventory(){
    document.getElementById("inventoryModal").style.display = "none";
}

function renderInventoryModal(player){
    const box = document.getElementById("inventoryContent");
    box.innerHTML = "";

    const tabWrap = document.createElement("div");
    tabWrap.className = "inventory-tabs";

    const equipTab = document.createElement("button");
    equipTab.innerText = "장비";
    equipTab.className = inventoryTab === "equipment" ? "active-tab" : "";
    equipTab.onclick = () => {
        inventoryTab = "equipment";
        renderInventoryModal(player);
    };

    const itemTab = document.createElement("button");
    itemTab.innerText = "아이템";
    itemTab.className = inventoryTab === "items" ? "active-tab" : "";
    itemTab.onclick = () => {
        inventoryTab = "items";
        renderInventoryModal(player);
    };

    tabWrap.appendChild(equipTab);
    tabWrap.appendChild(itemTab);
    box.appendChild(tabWrap);

    const listWrap = document.createElement("div");
    listWrap.className = "inventory-list";

    let filtered = [];

    if (inventoryTab === "equipment"){
        const inventoryEquip =
        player.inventory.filter(isEquipmentItem);
        
        const equipped =
        Object.values(player.equipment || {})
        .filter(item =>
            item && isEquipmentItem(item)
        );
        
        filtered = [
            ...equipped,
            ...inventoryEquip
        ];
    } else if (inventoryTab === "items"){
        filtered = player.inventory.filter(item =>
            isConsumableItem(item) ||
            item.type === "junk" ||
            item.type === "key"
        );
    }

    if (filtered.length === 0){
        const empty = document.createElement("p");
        empty.innerText = "비어있음";
        listWrap.appendChild(empty);
        box.appendChild(listWrap);
        return;
    }

    const displayItems = inventoryTab === "items"
    ? Object.values(
        filtered.reduce((acc, item) => {
            const key = item.key || item.name;

            if (!acc[key]){
                acc[key] = {
                    ...item,
                    count: 1
                };
            } else {
                acc[key].count++;
            }

            return acc;
        }, {})
    )
    : filtered;

    displayItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "inventory-item";

        const info = document.createElement("div");
        info.className = "inventory-item-info";

        const name = document.createElement("strong");
        name.innerText = isEquipmentItem(item)
        ? getDisplayItemName(item)
        : `${item.name} (${item.count || 1}개)`;
        info.appendChild(name);

        if (["heal", "stamina", "arousal"].includes(item.type)){
            const desc = document.createElement("p");
            
            if (item.type === "heal"){
                desc.innerText = `체력 회복량: ${item.value}`;
            } else if (item.type === "stamina"){
                desc.innerText = `기력 회복량: ${item.value}`;
            } else if (item.type === "arousal"){
                desc.innerText = `흥분 감소: ${item.value}`;
            }

    info.appendChild(desc);
        } else if (item.stats){
            const statText = Object.entries(item.stats)
                .map(([key, value]) => {
                    const auto =
                    getAutoEnhanceBonus(item, key);
                    
                    const custom =
                    item.enhanceCustom?.[key] || 0;

                    const total =
                    value + auto + custom;
                    
                    return `${key} +${total}`;
                })
                
                .join(", ");
                
            const desc = document.createElement("p");
            desc.innerText = statText || "능력치 변화 없음";
            info.appendChild(desc);
        }

        div.appendChild(info);

        const actionWrap = document.createElement("div");
        actionWrap.className = "inventory-item-actions";

        if (isEquipmentItem(item)){
            if (isEquipped(player, item)){
                const equippedTag = document.createElement("span");
                equippedTag.className = "equipped-tag";
                equippedTag.innerText = "장착 중";
                actionWrap.appendChild(equippedTag);
                
                const equipBtn = document.createElement("button");
                equipBtn.innerText = "착용 중";
                equipBtn.disabled = true;
                equipBtn.className = "equipped-btn";
                actionWrap.appendChild(equipBtn);
            } else {
                const equipBtn = document.createElement("button");
                equipBtn.innerText = "착용";
                equipBtn.onclick = () => {
                    equipItem(player, item);
                    renderInventoryModal(player);
                };
                actionWrap.appendChild(equipBtn);
            }
        }
        if (isConsumableItem(item)){
            const useBtn = document.createElement("button");
            useBtn.innerText = "사용";
            useBtn.onclick = () => {
                useItem(player, item);
                renderInventoryModal(player);
            };
            actionWrap.appendChild(useBtn);
        }

        div.appendChild(actionWrap);
        listWrap.appendChild(div);
    });

    box.appendChild(listWrap);
}

function isEquipped(player, item){
    const equipped = player.equipment[item.type];
    if (!equipped) return false;
    return equipped.uid === item.uid;
}

function getDisplayItemName(item){
    const enhance = Number(item.enhance) || 0;

    if (enhance > 0){
        return `${item.name} +${enhance}`;
    }

    return item.name;
}

function useItem(player, item){

    if (item.type === "heal"){
        changeHP(player, item.value);

        consumeItem(player, item); // ← 추가
        return;
    }

    if (item.type === "stamina"){
        changeStamina(player, item.value);

        consumeItem(player, item); // ← 추가
        return;
    }

    if (item.type === "arousal"){
        changeArousal(player, -item.value);

        consumeItem(player, item);
        return;
    }

    if (item.type === "alcohol"){
        changeAlcohol(player, item.alcohol || 0);

        if (item.trauma){
            changeTrauma(player, item.trauma);
        }

        consumeItem(player, item);
        return;
    }
}

function consumeItem(player, item){
    removeItem(player, item.key);

    renderInventoryModal(player);
    savePlayer(player);
}

function handleAction(action, player){
    if (typeof action === "function"){
        action(player);
        return;
    }
    if (action.startsWith("move_")){
        const location = action.replace("move_","");
        moveTo(player, location);
        return;
    }

    if (action === "open_soraShop"){
        openShop("soraShop", player);
        return;
    }

    if (action === "open_matinShop"){
        openShop("matinShop", player);
        return;
    }

    const fn = ACTIONS[action] || window[action];

    if (fn){
        fn(player);
        return;
    }

    if(typeof handleQuestAction === "function" && handleQuestAction(action, player)){
    return;
    }
    console.log("알 수 없는 액션:", action);
}

function saveNpcProgressToLocalStorage(){
    if (!NPC_DATA) return;

    const npcProgress = {};
    Object.entries(NPC_DATA).forEach(([id, npc]) => {
        npcProgress[id] = {
            emotion: npc.emotion || {},
            flags: npc.flags || {},
            events: npc.events || {}
        };
    });

    localStorage.setItem("npcData", JSON.stringify(npcProgress));
}

async function loadAllNPCData() {
    const npcList = ["eric", "luke", "sora", "yuri", "matin", "deric", "pale", "nikolai", "valen"];
    const savedNpcData = JSON.parse(localStorage.getItem("npcData") || "null");

    for (const name of npcList) {
        const res = await fetch(`data/npc/${name}.json`);
        const data = await res.json();

        NPC_DATA[name] = data;

        const savedNpc = savedNpcData?.[name];
        if (savedNpc) {
            NPC_DATA[name].emotion = {
                ...(data.emotion || {}),
                ...(savedNpc.emotion || {})
            };

            NPC_DATA[name].flags = {
                ...(data.flags || {}),
                ...(savedNpc.flags || {})
            };

            NPC_DATA[name].events = {
                ...(data.events || {}),
                ...(savedNpc.events || {})
            };
        }
    }
}

//이벤트 관련
function rollCheck(player, stat, difficulty){
    let value = 0;

    if (["str", "dex", "int", "charm"].includes(stat)){
        if (typeof calculateTotalStats === "function"){
            value = calculateTotalStats(player)[stat] || 0;
        } else {
            value = player.stats?.[stat] || 0;
        }
    } else {
        value = player.derivedStats?.[stat] || player.stats?.[stat] || 0;
    }

    let chance = value / (value + difficulty);

    if (player.status.stamina <= 0){
        chance *= 0.5;
    }

    chance *= getTraumaPenalty(player);

    chance = clamp(chance, 0.05, 0.95);

    return Math.random() < chance;
}

function runScene(sceneArr, player, options = {}){
    startScene(sceneArr, player, options);
}

function pickWeighted(list){
    const total = list.reduce((sum, e) => sum + e.weight, 0);
    let r = Math.random() * total;

    for (const e of list){
        r -= e.weight;
        if (r <= 0) return e.id;
    }
}

function getTraumaPenalty(player){
    const trauma = player.status.trauma || 0;

    if (trauma >= 90) return 0.5;
    if (trauma >= 70) return 0.7;
    if (trauma >= 50) return 0.9;
    return 1;
}

function flashScreen(){
    const overlay = document.getElementById("flashOverlay");
    if (!overlay) return;

    overlay.classList.remove("flash-active");
    void overlay.offsetWidth;

    overlay.classList.add("flash-active");
}

function flashScreenMulti(times = 3, interval = 120){
    let count = 0;

    function flash(){
        if (count >= times) return;

        flashScreen();
        count++;

        setTimeout(flash, interval);
    }

    flash();
}


//플레이어 구출 이벤트
function collapsePlayer(player, reason){
    player.status.hp = 0;

    if (player.dungeon?.active){
        handleDungeonCollapse(player);
        return;
    }
    handleFieldCollapse(player);
}

function getNpcAffection(npcId){
    return NPC_DATA?.[npcId]?.emotion?.affection || 0;
}

function handleFieldCollapse(player){
    const rescuers = [
        { fn: collapse_yuri, weight: 30 },
        { fn: collapse_sora, weight: getNpcAffection("sora") >= 20 ? 25 : 0 },
        { fn: collapse_matin, weight: getNpcAffection("matin") >= 20 ? 25 : 0 },
        { fn: collapse_luke, weight: getNpcAffection("luke") >= 50 ? 15 : 0 },
        { fn: collapse_eric, weight: 30},
        { fn: collapse_noRescue, weight: 20 }
    ];

    pickWeightedRescue(rescuers)(player);
}

function pickWeightedRescue(list){
    const valid = list.filter(e => e.weight > 0);
    const total = valid.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * total;

    for (const e of valid){
        roll -= e.weight;
        if (roll <= 0) return e.fn;
    }

    return valid[0].fn;
}

function collapse_noRescue(player){
    startScene([
        {
            type: "text",
            value: "의식이 끊겼다..."
        },
        {
            type: "effect",
            run: (player)=>{
                clearSpecialStateAfterCollapse(player);

                addBodyFluid(player, "a", 20);
                addBodyFluid(player, "m", 20);
                addBodyFluid(player, "c", 20);
                changeSensitivity(player, "aSensitivity", 10);
                changeSensitivity(player, "mSensitivity", 10);
                changeSensitivity(player, "cSensitivity", 10);

                passTime(player, 30);

                player.status.hp = Math.floor(player.status.maxHp * 0.5);
                player.status.stamina = Math.floor(player.status.maxStamina * 0.5);
            }
        },
        {
            type: "text",
            value: "눈을 떴을 때, 당신은 쓰러졌던 그 자리에 그대로 있었다... 누군가 당신이 의식을 잃었을 떄 몸을 사용했는지, 몸에는 끈적함과 아픔만 남아있다..."
        }
    ], player);
}

function collapse_yuri(player){
    startScene([
        {
            type: "text",
            value: "멀어지는 의식 사이로 유리가 보인다. 어디를 다녀왔는지 유리의 손에는 피가 묻어있었다. 그가 당신의 이름을 부르며 달려오는 것이 보인다."
        },
        {
            type: "effect",
            run: (player)=>{
                clearSpecialStateAfterCollapse(player);

                player.location = "shelter";

                player.status.hp = player.status.maxHp * 1;
                player.status.stamina = player.status.maxStamina * 1;

                changeNPCEmotion("yuri", "dominance", 5);
                addItem(player, ITEMS.consumable.smallPotion);
                passTime(player, 30);
            }
        },
        {
            type: "text",
            value: "눈을 뜨자 유리가 당신을 내려다보고 있었다.<br>\"괜찮아?\"<br>유리는 당신을 걱정스러운 표정으로 바라보았다. 그는 당신의 이마를 부드럽게 쓰다듬어주더니 조금 더 자도 된다고 말하며 노래를 불러주었다. 당신이 예전부터 들어왔던, 익숙한 노래다."
        }
    ], player);
}

function collapse_sora(player){
    startScene([
        {
            type: "text",
            value: "멀어지는 시야 사이로 촉수가 보인다... 촉수...?"
        },
        {
            type: "effect",
            run: (player)=>{
                clearSpecialStateAfterCollapse(player);
                player.location = "shop";

                player.status.hp = player.status.maxHp * 1;
                player.status.stamina = player.status.maxStamina * 1;

                changeNPCEmotion("sora", "dominance", 5);
                changeNPCEmotion("sora", "affection", 5);
                changeNPCEmotion("sora", "lust", -10);
                changeSensitivity(player, "bSensitivity", 5);
                changeSensitivity(player, "mSensitivity", 5);
                changeSensitivity(player, "aSensitivity", 5);
                changeSensitivity(player, "cSensitivity", 5);
                passTime(player, 50);
            }
        },
        {
            type: "text",
            value: "눈을 뜨자 소라의 상점이었다. 소라는 당신에게 아주 가까이 맞닿아 있다가 당신이 눈을 뜨자 까르르 웃으면서 당신에게서 몸을 뗐다. <br>\"괜찮아? 더 아픈 곳은 없고?\"<br>어쩐지 입 주변에 달콤한 냄새가 맴돈다. 당신은 까끌해진 혀를 이리저리 돌려보았다. 소라는 그런 당신을 귀엽다는 듯이 내려보다가 윙크했다. <br>\"푹 쉬어. 고마워? 고마우면 나중에 키스나 한번 해줘.\" <br>소라가 카운터로 향하는 발걸음 소리가 들린다."
        }
    ], player);
}

function collapse_matin(player){
    startScene([
        {
            type: "text",
            value: "멀어지는 시야 사이로 누군가가 보인다. 마틴이다. 그는 당신의 쓰러진 모습에 멈칫하더니 당신에게 빠르게 뛰어왔다."
        },
        {
            type: "effect",
            run: (player)=>{
                clearSpecialStateAfterCollapse(player);
                player.location = "tavern";

                player.status.hp = player.status.maxHp * 1;
                player.status.stamina = player.status.maxStamina * 1;

                changeNPCEmotion("matin", "dominance", 5);
                changeNPCEmotion("matin", "rage", 3);
                addItem(player, ITEMS.consumable.mediumPotion);
                passTime(player, 30);
            }
        },
        {
            type: "text",
            value: "눈을 뜨자 주점이었다. 당신이 깨어난 걸 확인한 마틴은 당신에게서 몇 걸음 물러났다. <br>\"멍청하게 굴지마.\"<br>그는 당신에게 싸늘하게 쏘아붙였다. 당신이 뭐라 대꾸하기도 전에 그는 주점의 카운터로 향했다."
        }
    ], player);
}

function collapse_eric(player){
    startScene([
        {
            type: "text",
            value: "멀어지는 시야 사이로 누군가가 보인다. 당신은 자신에게 다가오는 사람이 누군지 확인하지 못했다."
        },
        {
            type: "effect",
            run: (player)=>{
                clearSpecialStateAfterCollapse(player);
                player.location = "tavern";

                player.status.hp = player.status.maxHp * 1;
                player.status.stamina = player.status.maxStamina * 1;

                changeNPCEmotion("eric", "dominance", 5);
                changeNPCEmotion("matin", "rage", 3);
                addItem(player, ITEMS.consumable.mediumPotion);
                passTime(player, 30);
            }
        },
        {
            type: "text",
            value: "눈을 뜨자 주점이었다. 당신의 이마 위에 수건을 올려주고 있던 마틴이 움찔하더니 뒤로 물러났다. 그는 차가운 표정으로 당신을 내려다보았다.<br> \"에릭이 널 구해줬어.\"<br>마틴이 인상을 찌푸리며 말했다. <br>\"믿기지 않는 눈치인데, 에릭이 아니면 누가 너같이 멍청한 놈을 구해주겠어.\"<br>그는 그대로 돌아 다시 주점의 카운터로 향했다."
        }
    ], player);
}

function collapse_luke(player){
    startScene([
        {
            type: "text",
            value: "멀어지는 의식 사이로 누군가가 다가온다. 그는 쌍욕을 내뱉더니 당신을 배려없이 어꺠에 들쳐맸다. 당신의 시야가 뒤집히면서, 당신의 세상도 어두워진다..."
        },
        {
            type: "effect",
            run: (player)=>{
                clearSpecialStateAfterCollapse(player);
                player.location = "shelter";

                player.status.hp = player.status.maxHp * 1;
                player.status.stamina = player.status.maxStamina * 1;

                changeNPCEmotion("luke", "dominance", 5);
                addItem(player, ITEMS.consumable.smallPotion);
                passTime(player, 30);
            }
        },
        {
            type: "text",
            value: "눈을 뜨자 유리가 당신을 내려다보고 있었다.<br>\"괜찮아?\"<br>유리는 당신을 걱정스러운 표정으로 바라보았다. 그는 루크가 당신을 구해줬다고 말했다. <br>\"...장난감은 고장나면 안 되니까, 라고 말하던데...\" <br>유리는 찝찝한 표정을 지으면서도 당신의 손에 요구르트를 쥐어주었다. <br>\"하지만 그래도, 네가 구출되어서 다행이야. 많이 걱정했어.\"<br>쉬다가 몸이 좀 괜찮아지면 일어나라고 말하며 유리는 방을 나갔다."
        }
    ], player);
}

function handleDungeonCollapse(player){
    const dungeonId = player.dungeon.id;

    if (dungeonId === "sewer"){
        pickWeightedRescue([
            { fn: collapse_yuri, weight: 30 },
            { fn: collapse_sora, weight: getNpcAffection("sora") >= 20 ? 25 : 0 },
            { fn: collapse_matin, weight: 20},
            { fn: collapse_eric, weight: 40},
            { fn: collapse_luke, weight: getNpcAffection("luke") >= 50 ? 10 : 0 },
            { fn: collapse_noRescue, weight: 20 }
        ])(player);
        return;
    }

    if (dungeonId === "goblinCave"){
        pickWeightedRescue([
            { fn: collapse_yuri, weight: 20 },
            { fn: collapse_eric, weight: 40},
            { fn: collapse_luke, weight: getNpcAffection("luke") >= 50 ? 10 : 0 },
            { fn: collapse_goblinCapture, weight: 50 }
        ])(player);
        return;
    }

    collapse_noRescue(player);
}
function collapse_goblinCapture(player){
    startScene([
        {
            type: "text",
            value: "희미해지는 의식 사이로 고블린들의 키득거리는 소리가 들렸다. 곧 거친 손들이 당신을 붙잡고 어딘가로 끌고 갔다."
        },
        {
            type: "effect",
            run: (player) => {
                startGoblinCaptureTraining(player);
                return true;
            }
        }
    ], player);
}

function clearSpecialStateAfterCollapse(player){
    player.inBattle = false;
    player.currentScene = null;

    if (player.dungeon?.active){
        player.dungeon = null;
    }

    if (player.tavernWork?.active){
        player.tavernWork = null;
    }

    localStorage.setItem("playerData", JSON.stringify(player));
}