let battleState = null;

function initBattle(enemy,player, options={}){
    player.buffs = player.buffs || [];
    battleState = {
        player: player,
        enemy: enemy,
        grapple: false,
        grappleBonus: 0,
        energy: 1,
        maxEnergy: 7,
        turn : "player",
        counter: false,
        noEscape: options.noEscape || false,
        options : options,
        lastHitPart : null,
        repeatCount: 0,
        enemyArousal: 0,
        enemyMaxArousal: 100,
        lustStreak: 0,
        reviveUsed: false,
        turnCount: 0
    }

    renderBattleUI();
}

function getLine(enemy, type){
    if (!enemy.lines || !enemy.lines[type]) return "";
    return getRandom(enemy.lines[type]);
}

function renderBattleUI(){
    const battleUI = document.getElementById("battleUI");
    const logBox = document.getElementById("logBox");

    battleUI.innerHTML = `
        <div class="battle-layout">
            <div class="battle-panel player-panel">
                <h3>플레이어</h3>
                <p id="playerHp"></p>
                <p id="playerArousal"></p>
                <p id="energy"></p>
                <p id="playerWeapon"></p>
                <p id="weaponMastery"></p>
            </div>

            <div class="battle-center">
                <h3>전투 로그</h3>
                <div id="battleLogInner"></div>
            </div>

            <div class="battle-panel enemy-panel">
                <h3>적</h3>
                <p id="enemyName"></p>
                <p id="enemyHp"></p>
                <p id="enemyArousal"></p>
            </div>
        </div>

        <div class="battle-actions">
            <button onclick="playerAttack()">공격</button>
            <button onclick="counterAttack()">반격</button>
            <button onclick="openSkillMenu()">스킬</button>
            <button onclick="playerTease()">유혹한다</button>
            <button onclick="openBattleInventory()">아이템</button>
            <button onclick="pickupWeapon()">무기줍기</button>
            <button onclick="runAway()">도망</button>
            <button onclick="giveUp()">포기</button>
        </div>
    `;

    logBox.innerHTML = "";

    if (isNaked(battleState.player) && battleState.enemy.lines.nakedStart){
        log(getLine(battleState.enemy, "nakedStart"));
    }

    updateBattleUI();
    checkArousalState(battleState.player);
}

function updateBattleUI(){
    if (!battleState) return;
    const player = battleState.player;
    const enemy = battleState.enemy;

    document.getElementById("enemyName").innerText =
        enemy.name;

    document.getElementById("enemyHp").innerText =
        "HP : " + enemy.hp + "/" + enemy.maxHp;

    const enemyArousalEl = document.getElementById("enemyArousal");
    if (enemyArousalEl){
        enemyArousalEl.innerText =
            "상대 흥분도 : " + (battleState.enemyArousal || 0) + "/" + (battleState.enemyMaxArousal || 100);
    }

    document.getElementById("playerHp").innerText =
        "HP : " + player.status.hp + "/" + player.status.maxHp;

    document.getElementById("playerArousal").innerText =
        "흥분도 : " + player.status.arousal + "/" + player.status.maxArousal;

    document.getElementById("energy").innerText =
        "에너지 : " + battleState.energy + "/" + battleState.maxEnergy;

    document.getElementById("playerWeapon").innerText =
        "무기 : " + (player.equipment.weapon?.name || "맨주먹");

    const weapon = player.equipment.weapon?.name;
    const mastery = weapon ? (player.weaponMastery?.[weapon] || 0) : 0;
    document.getElementById("weaponMastery").innerText =
    weapon ? `숙련도 : ${mastery}` : "숙련도 : -";

    updateStatusUI(player);
}

function showBattleUI(){
    document.getElementById("storyArea").style.display = "none";
    document.getElementById("choiceArea").style.display = "none";
    document.getElementById("storyBtn").style.display = "none";

    document.getElementById("battleUI").style.display = "block";
}

function hideBattleUI(){
    document.getElementById("storyArea").style.display = "block";
    document.getElementById("choiceArea").style.display = "block";
    document.getElementById("storyBtn").style.display = "block";

    document.getElementById("battleUI").style.display = "none";
}

function increaseEnemyArousalFromContact(target){
    if (!battleState) return;

    const player = battleState.player;
    const gain = (typeof getCharmArousalGain === "function")
        ? getCharmArousalGain(player, 10)
        : 5;

    battleState.enemyArousal = (battleState.enemyArousal || 0) + gain;

    if (battleState.enemyArousal >= (battleState.enemyMaxArousal || 100)){
        battleState.enemyArousal = 0;
        if (battleState.grapple){
            applyEnemyReleaseToPlayer(target);
        } else {
            applyEnemySoloRelease()
        }
    }
}

function applyEnemyReleaseToPlayer(target){
    if (!battleState) return;

    const player = battleState.player;

    flashScreenMulti(3);

    if (["a", "m", "c"].includes(target) && typeof addBodyFluid === "function"){
        addBodyFluid(player, target, 10);

        const line = getEnemyReleaseLine(target);

        if (line){
            log(line, "lust");
        }
        battleState.enemyStunned = 1;
    }
    updateBattleUI();
}

function applyEnemySoloRelease(){
    if (!battleState) return;

    const enemy = battleState.enemy;

    flashScreenMulti(3);

    if (enemy.isUnique){
        const line = getEnemyReleaseLine("default");
        if (line){
            log(line, "lust");
        }
    } else {
        log("상대는 이어지는 흥분에 참지 못하고 혼자 절정했다.", "lust");
    }

    battleState.enemyStunned = 2;
    updateBattleUI();
}


function getEnemyReleaseLine(target){
    const enemy = battleState?.enemy;
    if (!enemy?.releaseLines) return null;

    let pool = enemy.releaseLines[target] || enemy.releaseLines.default;
    if (!pool) return null;

    // 문자열
    if (typeof pool === "string"){
        return pool;
    }

    // 성별 분기
    if (typeof pool === "object" && !Array.isArray(pool)){
        const gender = battleState.player.gender;
        const genderPool = pool[gender] || pool.default;

        if (!genderPool) return null;

        return genderPool[Math.floor(Math.random() * genderPool.length)];
    }

    // 배열
    if (Array.isArray(pool)){
        return pool[Math.floor(Math.random() * pool.length)];
    }

    return null;
}

function checkArousalState(player){
    if (!battleState) return;
    if (!battleState.arousalCount){
        battleState.arousalCount = 0;
    }

    if (player.status.arousal >= player.status.maxArousal){
        battleState.arousalCount ++;
        player.status.arousal = 0;
        player.status.stunned = 3;

        flashScreenMulti(3);

        if(battleState.enemy.lines.orgasm){
            log(getLine(battleState.enemy,"orgasm"));
        }
    }
}

function getSensitivity(player, target){
    return getSensitivityValue(player, target);
}

function openBattleInventory(){
    const player = battleState.player;

    const consumables = player.inventory
        .map((item, index) => ({ item, index }))
        .filter(entry => isConsumableItem(entry.item));

    // 같은 아이템 묶기
    const grouped = Object.values(
        consumables.reduce((acc, entry) => {
            const key = entry.item.key || entry.item.name;

            if (!acc[key]){
                acc[key] = {
                    item: entry.item,
                    count: 1,
                    index: entry.index
                };
            } else {
                acc[key].count++;
            }

            return acc;
        }, {})
    );

    if (grouped.length === 0){
        log("전투 중 사용할 수 있는 아이템이 없다.");
        return;
    }

    let html = "<div id='battleInventory'>";

    grouped.forEach(entry => {
        html += `
            <button onclick="useBattleItem(${entry.index})">
                ${entry.item.name} (${entry.count}개)
            </button>
        `;
    });

    html += `<button onclick="closeBattleInventory()">취소</button>`;
    html += "</div>";

    document.getElementById("battleUI").innerHTML += html;
}

function closeBattleInventory(){
    const box = document.getElementById("battleInventory");
    if (box) box.remove();
}

function useBattleItem(index){
    if (!battleState) return;

    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;
    const player = battleState.player;
    const item = player.inventory[index];

    if (!item){
        log("아이템 오류");
        return;
    }

    if (item.type === "heal"){
    changeHP(player, item.value);
    log(`${item.name} 사용! HP +${item.value}`);
    }

    else if (["weapon","top","bottom","underwear"].includes(item.type)){
        equipItem(player, item);
        log(`${item.name} 장착!`);
    }
    closeBattleInventory();

    updateBattleUI();
    enemyTurn();
}

//배틀 주사위 던지기

function calculateDamage(attack, defense){
    const defenseRoll = Math.floor(Math.random() * (defense + 1));
    const damage = attack - defenseRoll;

    return Math.max(1, damage); //최소 1 데미지
}

//공격턴제

function playerAttack(isBonusAttack = false){
     if (!battleState) return;

    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;
    const player = battleState.player;
    const enemy = battleState.enemy;

    if (battleState.grapple){
        log("붙잡혀서 공격할 수 없다!");
        return;
    }

    if(!isBonusAttack && !useEnergy(1)){
        log("에너지가 부족하다");
        return;
    }

    //적 회피 체크
    if (tryEvade(enemy)){
        log(getLine(enemy, "evade"));
        enemyTurn()
        return;
    }

    //공격계산
    const weapon = player.equipment.weapon;
    const isClub = 
        weapon?.tags?.includes("club");
        
    const isSkeleton =
        enemy.tags?.includes("skeleton");
    
        let enemyDefense = getEnemyFinalDef(enemy);
        
        if (isClub && isSkeleton){
            enemyDefense = Math.floor(enemyDefense * 0.2);
            
            log("클럽이 해골의 뼈를 강하게 부쉈다!", "damage");
        }

    const isMagicWeapon =  weapon?.tags?.includes("magicStick");
    const attackPower = isMagicWeapon
    ? getFinalMag(player)
    : getFinalAtk(player);
    
    let damage = calculateDamage(
        attackPower,
        enemyDefense
    );
    
    // 치명타 (slippery)
    if (player.battleTrait === "slippery" && Math.random() < 0.3){
        damage *= 2;
        log("치명타!", "damage");
    }

    enemy.hp -= damage;

    if (!player.equipment.weapon) {
    log("당신은 맨주먹으로 상대를 후려쳤다!", "damage");
    } else {
    log(`${damage} 데미지!`, "damage");
    }

    //예리한(chance Attack)
    if (
        !isBonusAttack &&
        player.battleTrait === "chanceattack" &&
        enemy.hp > 0 &&
        Math.random() < 0.2
    ){
        log("야호! 당신은 재빠르게 한번 더 공격했다!", "damage");
        playerAttack(true);
    }

    gainWeaponExp(player);
    checkWeaponSkillUnlock(player);
    checkArousalState(player);
    updateBattleUI();
    if (enemy.hp <= 0){
    endBattle("win");
    return;
}
enemyTurn();
}

function gainWeaponExp(player){
    const weapon = player.equipment.weapon?.name;

    if (!weapon) return;

    player.weaponMastery = player.weaponMastery || {};

    if (!player.weaponMastery[weapon]){
        player.weaponMastery[weapon] = 0;
    }

    player.weaponMastery[weapon]++;
}

function getAvailableSkills(player){
    const weapon = player.equipment.weapon?.name;
    if (!weapon) return [];
    const allSkills = WEAPON_SKILLS[weapon] || [];
    const learned = player.learnedSkills?.[weapon] || [];
    const weaponSkills = allSkills.filter(skill => learned.includes(skill.name));
    const masterSkills = player.masterSkills || [];

    return [
    ...weaponSkills,
    ...masterSkills.filter(ms => !weaponSkills.some(ws => ws.name === ms.name))
    ];
}

function useEnergy(cost){
    if (battleState.energy < cost) return false;

    battleState.energy -= cost;
    return true;
}

function pickupWeapon(){
    if (!battleState) return;
    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;
    const player = battleState.player;

    if (!battleState.droppedWeapon){
        log("주울 무기가 없다.");
        return;
    }

    player.equipment.weapon = battleState.droppedWeapon;
    battleState.droppedWeapon = null;

    log("당신은 다시 무기를 들었다.");

    enemyTurn();
}

function openSkillMenu(){
    if (!battleState) return;

    closeSkillMenu();

    const player = battleState.player;
    const skills = getAvailableSkills(player);

    if (skills.length === 0){
        log("사용 가능한 스킬이 없다.");
        return;
    }

    let html = `<div id="skillMenu">`;

    skills.forEach((skill, i)=>{
        html += `<button onclick="useSkill(${i})">${skill.name} (cost:${skill.cost})</button>`;
    });

    html += `<button onclick="this.parentNode.remove()">닫기</button>`;
    html += "</div>";

    document.getElementById("battleUI").innerHTML += html;

    battleState.currentSkills = skills;
}

function closeSkillMenu(){
    const menu = document.getElementById("skillMenu");
    if (menu) menu.remove();
}

function useSkill(index){
    if (!battleState) return;

    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;
    const player = battleState.player;
    const enemy = battleState.enemy;
    const skill = battleState.currentSkills[index];
    const isMagicWeapon = player.equipment.weapon?.name === "지팡이";
    const powerStat = isMagicWeapon ? getFinalMag(player) : getFinalAtk(player);

    if (!useEnergy(skill.cost)){
        log("에너지가 부족하다.");
        return;
    }

    closeSkillMenu();

    switch(skill.type){

        case "damage":
            let damage = calculateDamage(
                powerStat * skill.power,
                getEnemyFinalDef(enemy)
            );
            enemy.hp -= damage;
            log(`${skill.name}! ${damage} 데미지!`, "damage");
            break;

        case "multiHit":
            let total = 0;
            for (let i=0;i<skill.hits;i++){
                let d = calculateDamage(
                    powerStat * skill.power,
                    getEnemyFinalDef(enemy)
                );
                total += d;
                log(`${i + 1}타! ${d} 데미지!`, "damage");
            }
            enemy.hp -= total;
            log(`총 ${total} 데미지!`, "damage");
            break;

        case "buff":
            applyBuff(player, skill.effect);
            log(`${skill.name}! 버프 성공!`);
            break;

        case "bleed": {
            let dmg = calculateDamage(
                powerStat * skill.power,
                enemy.defense
            );
            enemy.hp -= dmg;
            applyBuff(enemy, {
                id : "bleed",
                dot: skill.dot,
                duration: skill.duration
            });
            log(`${skill.name}! ${dmg} 데미지 + 출혈!`, "damage");
            break;
        }
        case "poison": {
            let dmg = calculateDamage(
                powerStat * skill.power,
                enemy.defense
            );
            enemy.hp -= dmg;
            applyBuff(enemy, {
                id : "poison",
                dot: skill.dot,
                duration: skill.duration
            });
            log(`${skill.name}! ${dmg} 데미지 + 독!`, "damage");
            break;
        }
        }
        if (enemy.hp <= 0){
            endBattle("win");
            return;
    }
    updateBattleUI();
    enemyTurn();
}

function getFinalAtk(player){
    let atk = player.derivedStats.atk;

    if (player.buffs){
        player.buffs.forEach(buff=>{
            if (buff.atkMult){
                atk *= buff.atkMult;
            }
        });
    }

    //기력0패널티
    if (player.status.stamina === 0){
        atk *= 0.5;
    }

    return Math.floor(atk);

}

function getFinalDef(player){
    let def = player.derivedStats.def;

    if (player.buffs){
        player.buffs.forEach(buff=>{
            if (buff.defMult){
                def *= buff.defMult;
            }
        });
    }

    //기력0패널티
    if (player.status.stamina === 0){
        def *= 0.7;
    }

    return Math.floor(def);
}

function getFinalMag(player){
    let mag = player.derivedStats.mag;

    if (player.buffs){
        player.buffs.forEach(buff => {
            if (buff.magMult){
                mag *= buff.magMult;
            }
        });
    }

    if (player.status.stamina === 0){
        mag *= 0.5;
    }

    return Math.floor(mag);
}

function getEnemyFinalAtk(enemy){
    let atk = enemy.attack;

    if (enemy.buffs){
        enemy.buffs.forEach(buff=>{
            if (buff.atkMult){
                atk *= buff.atkMult;
            }
        });
    }

    return Math.floor(atk);
}

function getEnemyFinalDef(enemy){
    let def = enemy.defense;

    if (enemy.buffs){
        enemy.buffs.forEach(buff => {
            if (buff.defMult){
                def *= buff.defMult;
            }
        });
    }

    return Math.floor(def);
}

function applyBuff(target, effect, type = "buff"){
    target.buffs = target.buffs || [];

    if (effect.id){
        const existing = target.buffs.find(buff => buff.id === effect.id);

        if (existing){
            existing.remaining = effect.duration;
            return;
        }
    }

    target.buffs.push({
        ...effect,
        remaining: effect.duration
    });

    if (type === "debuff"){
        log("몸에 이상한 힘이 스며든다.", "damage");
    } else if (type === "selfBuff"){
        log("상대의 기세가 달라졌다.", "damage");
    }
}

function updateBuffs(target){
    if (!target.buffs) return false;

    let dead = false;

    target.buffs.forEach(buff => {

        if (buff.dot){
            const dotDamage = Number(buff.dot);
            if (target.status){
                target.status.hp -= dotDamage;
                if (target.status.hp <= 0){
                    dead = true;
                }
            } else {
                target.hp -= dotDamage;
                if (target.hp <= 0){
                    dead = true;
                }
            }

            if (buff.id === "bleed"){
                log(`출혈 데미지 ${buff.dot}!`, "damage");
            } else if (buff.id === "poison"){
                log(`독 데미지 ${buff.dot}!`, "damage");
            } else {
                log(`${buff.dot}의 지속 피해!`, "damage");
            }
        }
        buff.remaining--;
    });

    target.buffs = target.buffs.filter(buff => buff.remaining > 0);

    return dead;
}

function playerTease(){
    if (!battleState) return;
    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;
    const player = battleState.player;
    const enemy = battleState.enemy;

    if (!useEnergy(1)){
        log("에너지가 부족하다.");
        return;
    }
    const baseGain = (typeof getCharmArousalGain === "function")
        ? getCharmArousalGain(player, 8)
        : 10;
    const resist = enemy.lustResist || 1;
    let finalGain = Math.max(1, Math.floor(baseGain / resist));
    if (battleState.grapple){
        finalGain = Math.floor(finalGain * 1.3);
        log("붙잡힌 상태에서도 당신은 요염하게 몸을 비틀었다...", "lust");
    } else {
        log("당신은 상대를 유혹했다...", "lust");
    }
    battleState.enemyArousal += finalGain;
    if (enemy.teaseLines){
        if (finalGain <= 5 && enemy.teaseLines.fail){
            log(getRandom(enemy.teaseLines.fail), "lust");
        } else if (finalGain <= 12 && enemy.teaseLines.weak){
            log(getRandom(enemy.teaseLines.weak), "lust");
        } else if (enemy.teaseLines.success){
            log(getRandom(enemy.teaseLines.success), "lust");
        }
    }
    log(`상대 흥분도 +${finalGain}`, "lust");
    if (battleState.enemyArousal >= battleState.enemyMaxArousal){
        battleState.enemyArousal = 0;
        if (battleState.grapple){
            applyEnemyReleaseToPlayer("default");
        } else {
            applyEnemySoloRelease();
        }
        updateBattleUI();
        enemyTurn();
        return;
    }
    
    updateBattleUI();
    enemyTurn();
}

function enemyTurn(){
    if (!battleState) return;

    if (battleState.enemyStunned > 0){
        log("상대가 잠시 움직이지 못한다!", "lust");
        battleState.enemyStunned--;
        endEnemyTurn();
        return;
    }
    
    const player = battleState.player;
    const enemy = battleState.enemy;

    if (!startEnemyTurn()) return;

    if (enemy.hp <= 0){
    endBattle("win");
    return;
    }
    
    if (player.status.hp <= 0){
    endBattle("lose");
    return;
    }

    log("적의 턴!");

    //플레이어 회피 체크
    if (tryEvade(player)){
        log("당신은 공격을 회피했다!", "evade");

        battleState.counter = false;

        battleState.energy = Math.min(
        battleState.maxEnergy,
        battleState.energy + 1
     );
     updateBattleUI();
     return;
    }

    let skill = chooseEnemySkill(enemy);
    let damage = 0;
    if (skill.type !== "lust"){
    let attackpower = getEnemyFinalAtk(enemy) * (skill.power || 1)
    damage = calculateDamage(
        attackpower,
        getFinalDef(player)
    );
    }

    if (skill.type === "lust"){
    battleState.lustStreak++;
    } else {
    battleState.lustStreak = 0;
    }

    //플레이어 반격처리
    if (battleState.counter){

        if (battleState.counter && skill.type === "disarm"){
        battleState.counter = false;
        log("당신은 상대의 손목을 쳐내며 무장해제를 막아냈다!", "evade");
        endEnemyTurn();
        return;
    }
    
    battleState.counter = false;

    if (skill.type === "lust" || skill.type === "grapple"){
        log("반격을 시도했지만 그가 당신에게 손을 뻗는 속도가 더 빨랐다.");
    } else {
        damage = Math.floor(damage * 0.5);
        enemy.hp -= 10;

        log("당신은 자세를 낮추고 반격했다!", "damage");
        log("피해를 절반으로 줄이고 적에게 10의 피해!", "damage");
    }
    }
    
    //무장해제 공격
    if (skill.type === "disarm"){

        if (skill.lines){
            log(getRandom(skill.lines));
        }
        
        const playerEva = player.derivedStats?.eva || 0;
        const enemyEva = enemy.eva || enemy.derivedStats?.eva || 0;
        
        let resistChance = 0.5 + (playerEva - enemyEva) * 0.005;
        resistChance = Math.max(0.15, Math.min(0.75, resistChance));
        
        if (Math.random() < resistChance){
            log("당신은 가까스로 무장해제를 피했다!", "evade");
            endEnemyTurn();
            return;
        }
        
        disarmPlayer(player);
        endEnemyTurn();
        return;
    }

    if (skill.type === "multiHit"){
    let total = 0;

    if (skill.lines){
        log(getRandom(skill.lines));
    }

    log(`${skill.name}!`, "damage");

    for (let i = 0; i < (skill.hits || 2); i++){
        const d = calculateDamage(
            getEnemyFinalAtk(enemy) * (skill.power || 1),
            getFinalDef(player)
        );
        total += d;
        log(`${i + 1}타! ${d} 데미지를 입었다!`, "damage");
    }
    player.status.hp -= total;

    log(`총 ${total} 데미지를 입었다!`, "damage");

    endEnemyTurn();
    return;
    }

    //일반 물리 공격
    if (skill.type === "damage" || !skill.type){
        player.status.hp -= damage;
        log(`${damage} 데미지를 입었다!`, "damage");
    }

    //잡기공격
        if (battleState.grapple){
        handleGrappleAttack(enemy, player);
        checkArousalState(player);
        updateBattleUI();
        endEnemyTurn();
        return;
    }

    if (skill.type === "grapple"){
        battleState.grapple = true;

        log(getLine(enemy,"grappleStart"));

        renderGrappleUI();
        endEnemyTurn();
        return;
    }

    //디버프공격
    if (skill.type === "debuff"){
        applyBuff(player, {
            ...skill.effect,
            duration: skill.duration
        }, "debuff");
        
        if (skill.lines){
            log(getRandom(skill.lines));
        } else {
            log("몸이 뭔가 이상해진 거 같다!", "damage");
        }
        
        endEnemyTurn();
        return;
    }

    //버프공격
    if (skill.type === "selfBuff"){
        applyBuff(enemy, {
            ...skill.effect,
            duration: skill.duration
        }, "selfBuff");
        
        if (skill.lines){
            log(getRandom(skill.lines));
        } else {
            log("상대의 기세가 날카로워졌다.", "damage");
        }
        
        endEnemyTurn();
        return;
    }

    //지속데미지공격
    if (skill.type === "poison"){
    player.status.hp -= damage;

    applyBuff(player, {
        id : "poison",
        dot: skill.dot,
        duration: skill.duration
    });

    log("당신의 기분이 역해졌다!", "damage");
    endEnemyTurn();
    return;
    }

    if (skill.type === "bleed"){
    player.status.hp -= damage;

    applyBuff(player, {
        id : "bleed",
        dot: skill.dot,
        duration: skill.duration
    });

    log("당신은 지금 피를 흘리고 있다!", "damage");
    endEnemyTurn();
    return;
    }

    //성공격
    if (skill.type === "lust"){
        const base = 3 * (skill.power || 1);
        const finalArousal =
        getSensitivityArousalGain(
            player,
            skill.target,
            base
        );

        player.status.arousal += finalArousal;

        log(`${skill.name}! (${skill.target})`);
        log("몸이 달아오른다!", "lust");
    }

    if (skill.lines){
    let lines = [];
    // 공통 대사
    if (skill.lines.common){
        lines = lines.concat(skill.lines.common);
    }
    // 성별 대사
    if (skill.lines[player.gender]){
        lines = lines.concat(skill.lines[player.gender]);
    }
    // 배열 형태
    if (Array.isArray(skill.lines)){
        lines = lines.concat(skill.lines);
    }
    if (lines.length > 0){
        log(getRandom(lines));
    }

    if (player.status.hp <= 0){
    endBattle("lose");
    return;
     }
    }

    checkArousalState(player);

    if (player.status.hp <= 0){
    endBattle("lose");
    return;
    }
    if (enemy.hp <= 0){
    endBattle("win");
    return;
    }

    runCustomTurnEvent();

    battleState.energy = Math.min(
    battleState.maxEnergy,
    battleState.energy + 1
    );

    updateBattleUI();
}

function grappleAction(action){
    if (!battleState) return;
    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;
    const player = battleState.player;
    const enemy = battleState.enemy;

    if (action === "struggle"){
        const dmg = calculateDamage(
            Math.floor(getFinalAtk(player) * 0.4),
            enemy.defense
        );
        
        enemy.hp -= dmg;
        log(`당신은 붙잡힌 채로 발버둥쳐 ${dmg} 데미지를 줬다!`, "damage");
        
        if (enemy.hp <= 0){
            endBattle("win");
            return;
        }
    }

    if (action === "resist"){
        const arousal = player.status.arousal || 0;
        const maxArousal = player.status.maxArousal || 100;
        const arousalRatio = arousal / maxArousal;
        
        let baseChance = 0.3 + battleState.grappleBonus;
        baseChance += (getTotalStat(player, "str") || 0) * 0.01;
        baseChance += (getTotalStat(player, "dex") || 0) * 0.008;
        baseChance -= arousalRatio * 0.3;
        baseChance = Math.max(0.1, Math.min(0.8, baseChance));

        if (battleState.enemyStunned > 0){
            log("상대가 빈틈을 보인 사이 당신은 구속을 풀어냈다!", "evade");
            battleState.grapple = false;
            battleState.grappleBonus = 0;
            
            const ui = document.getElementById("grappleUI");
            if (ui) ui.remove();
            endEnemyTurn();
            return;
        }

        if (Math.random() < baseChance){
            log("당신은 빠져나왔다!", "evade");
            battleState.grapple = false;
            battleState.grappleBonus = 0;

            const ui = document.getElementById("grappleUI");
            if (ui) ui.remove();

        } else {
            log(getLine(enemy, "grappleFail"));
        }
    }
    if (action === "endure"){
        const heal = Math.floor(player.status.maxHp * (0.1 + Math.random() * 0.1));
        const calm = Math.floor(player.status.maxArousal * (0.05 + Math.random() * 0.15));
        player.status.hp = Math.min(
            player.status.maxHp,
            player.status.hp + heal
        );
        
        player.status.arousal = Math.max(
            0,
            player.status.arousal - calm
        );
        
        battleState.grappleBonus += 0.15;
        log(getLine(enemy, "grappleSubmit"));
        log(`HP +${heal} / 흥분도 -${calm}`, "heal");

        updateBattleUI();
    }
    if (battleState){
    enemyTurn();
}
}

function checkWeaponSkillUnlock(player){
    const weapon = player.equipment.weapon?.name;
    if (!weapon) return;

    player.weaponMastery = player.weaponMastery || {};
    const mastery = player.weaponMastery[weapon] || 0;

    const skills = WEAPON_SKILLS[weapon];
    if (!skills) return;

    player.learnedSkills = player.learnedSkills || {};

    skills.forEach(skill => {
        if (mastery >= skill.unlock){

            if (!player.learnedSkills[weapon]){
                player.learnedSkills[weapon] = [];
            }

            if (!player.learnedSkills[weapon].includes(skill.name)){
                player.learnedSkills[weapon].push(skill.name);
                log(`새로운 스킬 획득: ${skill.name}!`);
            }
        }
    });

    const master = MASTER_SKILLS[weapon];

    if (master && mastery >= master.requiredMastery){
        player.masterSkills = player.masterSkills || [];

        const masterSkill = skills.find(s => s.name === master.skillName);

        if (masterSkill && !player.masterSkills.some(s => s.name === masterSkill.name)){
            player.masterSkills.push({
                ...masterSkill,
                sourceWeapon: weapon,
                isMasterSkill: true
            });

            log(`마스터 스킬 획득: ${masterSkill.name}!`);
        }
    }
}

function disarmPlayer(player){
    const weapon = player.equipment.weapon;

    if (!weapon){
        log("상대는 당신의 손목을 가격했다. 당신에게는 이미 무기가 없는데도.");
        return;
    }

    if (battleState.droppedWeapon){
        log("상대는 다시 무기를 노렸지만 이미 바닥에 떨어져 있다!");
        return;
    }

    battleState.droppedWeapon = weapon;
    player.equipment.weapon = null;

    log(`${weapon.name}이 손에서 튕겨나갔다!`, "warning");
    updateBattleUI();
}

function getRemovableClothes(player){
    const eq = player.equipment;
    const removable = [];

    if (eq.top && !eq.top.removed){
        removable.push("top");
    }
    
    if (eq.bottom && !eq.bottom.removed){
        removable.push("bottom");
    }
    
    if (
        eq.bottom?.removed &&
        eq.underwear &&
        !eq.underwear.removed
    ){
        removable.push("underwear");
    }
    
    return removable;
}

function removeClothes(player){
    const removable = getRemovableClothes(player);

    if (removable.length === 0){
        log("더 이상 벗길 옷이 없다.");
        return;
    }

    const part = getRandom(removable);
    const item = player.equipment[part];

    item.removed = true;

    log(`${item.name}이 벗겨졌다!`);

    // 뺏김
    if (Math.random() < 0.2){
        const itemName = item.name;
        item.lost = true;

        const index = player.inventory.findIndex(inv => inv.name === item.name);
        if (index !== -1){
            player.inventory.splice(index, 1);
        }
        player.equipment[part] = null;
        log(`상대가 ${itemName}을 가져갔다.`);
    }
    updateStatusUI(player);
    renderInventoryModal(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function counterAttack(){
    const player = battleState.player;
    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;

    if (battleState.grapple){
        log("붙잡혀서 반격할 수 없다!");
        return;
    }

    battleState.counter = true;
    log("당신은 반격 태세를 취했다!", "damage");

    enemyTurn();
}

function getRandom(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function tryEvade(target){
    let eva = target.derivedStats?.eva || target.eva || 0;
    if (target.buffs){
        target.buffs.forEach(buff => {
            if (buff.evaMult){
                eva *= buff.evaMult;
            }
        });
    }

    let chance = eva / 200;
    
    //럭키(Lucky)
    let bonus = 0;
    if (target.battleTrait === "lucky" && Math.random()<0.3){
        chance *=1.5;
        log("당신의 몸에 행운이 넘쳐흐른다! 럭키!")
    }

    if (Math.random() < chance){
        return true;
    }
    return false;
}

function chooseEnemySkill(enemy){
    const player = battleState.player;

    if (!enemy.skills || enemy.skills.length === 0){
        return { type: "damage", power: 1, chance: 1 };
    }

    // 1. 사용 가능한 스킬 필터
    let available = enemy.skills.filter(skill => {
        if (skill.type === "disarm" && !player.equipment.weapon){
            return false;
        }
        return true;
    });

    // 2. lust 연속 제한
    if (battleState.lustStreak >= 5){
        available = available.filter(s => s.type !== "lust");
    }

    if (available.length === 0){
        return enemy.skills[0];
    }

    // 3. 가중치 계산
    let weighted = [];
    const personality = enemy.personality || "normal";

    available.forEach(skill => {
        let weight = skill.chance || 1;

        if (skill.type === "lust"){
            const sensitivity = getSensitivity(player, skill.target);
            weight += Math.sqrt(sensitivity) * 0.02;

            if (personality === "lustful"){
                weight *= 1.5;
            }

            if (personality === "cruel" && battleState.lastHitPart === skill.target){
                weight *= (1.3 + battleState.repeatCount * 0.2);
            }
        }

        if (personality === "dominant" && skill.type === "grapple"){
            weight *= 1.7;
        }

        weighted.push({...skill, weight});
    });

    // 4. 총합
    let total = weighted.reduce((sum, s)=> sum + s.weight, 0);

    let roll = Math.random() * total;

    for (let skill of weighted){
        roll -= skill.weight;
        if (roll <= 0){
            return skill;
        }
    }

    return weighted[0];
}

function renderGrappleUI(){
    const battleUI = document.getElementById("battleUI");
    const old = document.getElementById("grappleUI");
    if (old) old.remove();
    const html = `
        <div id="grappleUI">
            <button onclick="grappleAction('struggle')">발버둥친다</button>
            <button onclick="grappleAction('resist')">구속을 풀어낸다</button>
            <button onclick="grappleAction('endure')">인내한다</button>
        </div>
    `;
    battleUI.insertAdjacentHTML("beforeend", html);
}

//log 함수
function log(text, type = "normal"){
    const box = document.getElementById("battleLogInner");
    if (!box) return;

    const p = document.createElement("p");
    p.innerHTML = text;
    p.classList.add("log-" + type);

    box.appendChild(p);

    while (box.children.length > 12){
        box.removeChild(box.firstChild);
    }

    box.scrollTop = box.scrollHeight;
}

//function 잡기상태 전용 공격
function handleGrappleAttack(enemy, player){

    let pool = [...enemy.grappleSkills];

    if (isTopless(player) && enemy.toplessGrappleSkills){
        pool = pool.concat(enemy.toplessGrappleSkills);
    }

    if (isBottomless(player) && enemy.bottomlessGrappleSkills){
        pool = pool.concat(enemy.bottomlessGrappleSkills);
    }

    // 나체면 strip 제거
    if (isNaked(player)){
        pool = pool.filter(a => a.type !== "strip");
    }

    const attack = pickByChance(pool);

    if (attack.type === "strip"){
        processGrappleText(attack, player);
        removeClothes(player);
        return;
    }

    processGrappleAttack(attack, player);
}
function pickByChance(arr){
    let total = arr.reduce((sum,a)=>sum + (a.chance || 1), 0);
    let roll = Math.random() * total;

    for (let a of arr){
        roll -= (a.chance || 1);
        if (roll <= 0){
            return a;
        }
    }
    return arr[0];
}
//성공격 처리
function processGrappleAttack(attack, player){

    if (attack.type === "lust"){
        const base = 3 * (attack.power || 1);
        const dmg = getSensitivityArousalGain(
            player,
            attack.target,
            base
        );

        player.status.arousal += dmg;
        increaseSensitivity(player, attack.target, 1);
        increaseEnemyArousalFromContact(attack.target);
        checkArousalState(player);
        updateStatusUI(player);

    } else if (attack.type === "damage" || attack.type === "multiHit") {
    if (attack.type === "multiHit") {
        let total = 0;
        for (let i = 0; i < (attack.hits || 2); i++) {
            total += calculateDamage(
                getEnemyFinalAtk(battleState.enemy) * (attack.power || 1),
                getFinalDef(player)
            );
        }
        player.status.hp -= total;
    } else {
        const dmg = calculateDamage(
            getEnemyFinalAtk(battleState.enemy) * (attack.power || 1),
            getFinalDef(player)
        );
        player.status.hp -= dmg;
    }

    if (player.status.hp <= 0){
        endBattle("lose");
        return;
    }
    }

    processGrappleText(attack, player);
}

function increaseSensitivity(player, target, amount = 1){
    const s = player.sexualTraits;

    if (battleState.lastHitPart === target){
        battleState.repeatCount++;
    } else {
        battleState.repeatCount = 1;
        battleState.lastHitPart = target;
    }

    const bonus = battleState.repeatCount;

    let finalAmount = amount + (bonus - 1);

    //둔감trait
     const traits = player.sexBattleTraits || [];
     const map = {
        m: "insensitiveM",
        b: "insensitiveB",
        c: "insensitiveC",
        a: "insensitiveA"
     };
     const traitKey = map[target];
     if (traits.includes(traitKey)){
        finalAmount = Math.floor(finalAmount * 0.5);
        finalAmount = Math.max(1, finalAmount); // 최소 1 보장
     }

    switch(target){
        case "m": s.mSensitivity += finalAmount; break;
        case "b": s.bSensitivity += finalAmount; break;
        case "c": s.cSensitivity += finalAmount; break;
        case "a": s.aSensitivity += finalAmount; break;
    }
}

//대사 처리
function processGrappleText(attack, player){

    // text (단일)
    if (attack.text){
        log(attack.text);
        return;
    }

    // lines (배열 or gender 분기)
    if (attack.lines){
        let lines = [];

        if (attack.lines.common){
            lines = lines.concat(attack.lines.common);
        }

        if (attack.lines[player.gender]){
            lines = lines.concat(attack.lines[player.gender]);
        }

        if (Array.isArray(attack.lines)){
            lines = lines.concat(attack.lines);
        }

        if (lines.length > 0){
            log(getRandom(lines));
        }
    }
}

//벗겨진 이후 전용공격
function isTopless(player){
    const top = player.equipment.top;
    return !top || top.lost || top.removed;
}

function isBottomless(player){
    const bottom = player.equipment.bottom;
    const underwear = player.equipment.underwear;

    return (
        (!bottom || bottom.lost || bottom.removed) &&
        (!underwear || underwear.lost || underwear.removed)
    );
}

function isNaked(player){
    const eq = player.equipment;

    return (
        (!eq.top || eq.top.lost || eq.top.removed) &&
        (!eq.bottom || eq.bottom.lost || eq.bottom.removed) &&
        (!eq.underwear || eq.underwear.lost || eq.underwear.removed)
    );
}

//도망가기
function runAway(){
    if (!battleState) return;

    if (!startPlayerTurn()) return;
    if (handlePlayerStunnedTurn()) return;

    // 도망 불가 상태 (이벤트용)
    if (battleState.noEscape){
        log("도망칠 수 없다...", "damage");
        return;
    }

    // 붙잡힘 상태
    if (battleState.grapple){
        log("붙잡혀서 도망칠 수 없다!", "lust");
        return;
    }

    const player = battleState.player;

    let chance = 0.3 + (player.derivedStats.eva / 200);
    chance = Math.min(0.7, chance);

    if (Math.random() < chance){
        if (battleState.enemy.lines.escapeSuccess){
            log(getLine(battleState.enemy, "escapeSuccess"));
        }

        const p = battleState.player;

        if (battleState.droppedWeapon){
            p.equipment.weapon = battleState.droppedWeapon;
            battleState.droppedWeapon = null;
        }

        const options = battleState.options || {};

        p.inBattle = false;
        battleState = null;

        setTimeout(()=>{
            hideBattleUI();

            if (typeof options.onEscape === "function"){
                options.onEscape();
                return;
            }

            if (p.dungeon?.active && typeof buildDungeonScene === "function"){
                renderMap(p);
                startScene(buildDungeonScene(p), p);
                return;
            }

            renderMap(p);
            startScene(getLocationScene(p), p);
        }, 500);

    } else {

        if (battleState.enemy.lines.escapeFail){
            log(getLine(battleState.enemy, "escapeFail"));
        }

        enemyTurn();
    }
}

function handlePlayerStunnedTurn(){
    if (!battleState) return false;

    const player = battleState.player;

    if (player.status.stunned > 0){
        log("당신은 몸을 움직일 수 없다....", "lust");
        player.status.stunned--;
        enemyTurn();
        return true;
    }

    return false;
}

//턴 시작함수
function startPlayerTurn(){
    if (!battleState) return false;
    const player = battleState.player;

    const dead = updateBuffs(player); // 🔥 플레이어 DOT만

    if (dead || player.status.hp <= 0){
        endBattle("lose");
        return false;
    }
    if (checkTraumaFreeze(player)){
        log("당신은 정신적 충격으로 멍해졌다. 지금까지 겪었던 일들이 당신의 머리를 장악한다. 당신은 움직일 수 없다.", "lust");
        enemyTurn();
        return false;
    }
    return true;
}
function startEnemyTurn(){
    if (!battleState) return false;
    const enemy = battleState.enemy;

    const dead = updateBuffs(enemy); // 🔥 적 DOT만

    if (dead || enemy.hp <= 0){
        endBattle("win");
        return false;
    }
    return true;
}

//끝
function endBattle(result){
    if (!battleState) return;

    const enemy = battleState.enemy;
    const player = battleState.player;
    const options = battleState.options || {};

    player.inBattle = false;
    if (battleState.droppedWeapon){
    player.equipment.weapon = battleState.droppedWeapon;
    battleState.droppedWeapon = null;
    }

    //onemoretime 지지않아
    if (result === "lose" && player.battleTrait === "onemoretime" && !battleState.reviveUsed){

        if (Math.random() < 0.2){
            battleState.reviveUsed = true;

            player.status.hp = Math.floor(player.status.maxHp * 0.5);

            log("당신은 쓰러졌지만… 다시 일어섰다!");

            updateBattleUI();
            return;
        }
    }

    if (result === "win"){
        log(getLine(enemy, "defeat"));
        giveLoot(player, enemy);
        gainExp(player, enemy.exp || 0);

        if (typeof addQuestProgress === "function"){
        addQuestProgress(player, enemy.id);
        }
    }

    if (result === "lose"){
        player.status.hp = 0;
        log("당신은 패배했다...", "damage");
    }

    const grappleUI = document.getElementById("grappleUI");
    if (grappleUI) grappleUI.remove();

    battleState = null;

    setTimeout(() => {
        hideBattleUI();

        restoreRemovedClothes(player);
        
        const goAfterBattle = () => {
            if (result === "win"){
                if (options.onWin){
                    options.onWin();
                    return;
                }
                
                startScene(getLocationScene(player), player);
                return;
            }
            
            if (result === "lose"){
                if (options.onSkipDefeat){
                    options.onSkipDefeat();
                    return;
                }
                
                if (typeof runDefeatEvent === "function"){
                    runDefeatEvent(player, enemy, {
                        onAfterDefeat: () => {
                            if (options.onLose){
                                options.onLose();
                                return;
                            }                            
                            collapsePlayer(player, "battle");
                        }
                    });
                    return;
                }
                
                if (options.onLose){
                    options.onLose();
                    return;
                }
                
                startScene(getLocationScene(player), player);
                return;
            }
            startScene(getLocationScene(player), player);
        };
        
        if (result === "win" && player.statPoints > 0){
            openStatAllocation(player, goAfterBattle);
            return;
        }
        
        goAfterBattle();
    }, 3000);
}


function endEnemyTurn(){
    if (!battleState) return;

    if (battleState.player.status.hp <= 0){
        endBattle("lose");
        return;
    }

    if (battleState.enemy.hp <= 0){
        endBattle("win");
        return;
    }

    runCustomTurnEvent();

    battleState.energy = Math.min(
        battleState.maxEnergy,
        battleState.energy + 1
    );

    updateBattleUI();
}

function restoreRemovedClothes(player){
    ["top", "bottom", "underwear"].forEach(part => {
        const item = player.equipment[part];

        if (!item) return;
        if (item.lost) return;

        item.removed = false;
    });

    updateStatusUI(player);
    renderInventoryModal(player);
    localStorage.setItem("playerData", JSON.stringify(player));
}

function giveUp(){
    log("당신은 더 이상 버틸 수 없다...", "damage");
    endBattle("lose");
}

//전리품 시스템
function giveLoot(player, enemy){
    if (!enemy.drops || enemy.drops.length === 0) return;

    const gained = [];

    enemy.drops.forEach(drop => {
        if (Math.random() < drop.chance){
            const item = findItemByKey(drop.item);
            if (item){
                addItem(player, item);
                gained.push(item.name);
            }
        }
    });

    if (gained.length > 0){
        log("전리품 획득: " + gained.join(", "), "item");
    }
}

//턴 스페셜 대사
function runCustomTurnEvent(){
    if (!battleState) return;

    const events = battleState.options?.customTurnEvents;
    if (!events) return;

    battleState.turnCount = (battleState.turnCount || 0) + 1;

    const event = events[battleState.turnCount];

    if (typeof event === "function"){
        event(battleState.player, battleState.enemy, battleState);
    }
}