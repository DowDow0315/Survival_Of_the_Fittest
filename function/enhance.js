const ENHANCE_CONFIG = {
    defaultMaxLevel: 10
};

function getEnhanceGain(level){
    if (level <= 3) return 1;
    if (level <= 6) return 2;
    if (level <= 9) return 3;
    if (level === 10) return 5;
    return 0;
}

function getAutoEnhanceBonus(item, stat){
    const enhance = Number(item.enhance) || 0;
    const baseValue = item?.stats?.[stat] || 0;

    if (baseValue <= 0) return 0;

    let bonus = 0;

    for (let lv = 1; lv <= Math.min(enhance, 4); lv++){
        bonus += getEnhanceGain(lv);
    }

    return bonus;
}

function addEnhanceCustomBonus(item, stat, amount){
    item.enhanceCustom ??= {
        str: 0,
        dex: 0,
        int: 0,
        charm: 0
    };

    item.enhanceCustom[stat] = (item.enhanceCustom[stat] || 0) + amount;
}

function getEnhanceMaxLevel(place = "default"){
    if (place === "matin"){
        return 3;
    }

    if (place === "richTown"){
        return 10;
    }

    return ENHANCE_CONFIG.defaultMaxLevel;
}

function getEnhanceCost(item){
    const level = Number(item.enhance) || 0;
    return Math.round(1000 * Math.pow(1.67, level) / 100) * 100;
}
//게산 : 1,000 /1,700 / 2,800 / 4,700 / 7,800 / 13,000 / 21,700 / 36,200 / 60,500 / 100,900

const RICHTOWN_ENHANCE_MATERIALS = {
    6: [{ key: "ironOre", name: "철광석", count: 8 }],
    7: [{ key: "silverOre", name: "은광석", count: 6 }],
    8: [{ key: "goldOre", name: "금광석", count: 4 }],
    9: [{ key: "whiteFlowerLeafStone", name: "백화석", count: 2 }],
    10: [{ key: "whiteHeart", name: "백심장", count: 1 }]
};

function getRichTownEnhanceMaterials(nextLevel){
    return RICHTOWN_ENHANCE_MATERIALS[nextLevel] || [];
}

function countInventoryItem(player, key){
    return (player.inventory || []).filter(item => item.key === key).length;
}

function hasMaterials(player, materials){
    return materials.every(mat => countInventoryItem(player, mat.key) >= mat.count);
}

function consumeMaterials(player, materials){
    for (const mat of materials){
        let need = mat.count;

        for (let i = player.inventory.length - 1; i >= 0 && need > 0; i--){
            if (player.inventory[i].key !== mat.key) continue;

            player.inventory.splice(i, 1);
            need--;
        }
    }
}

function getMaterialText(materials){
    return materials
        .map(mat => `${mat.name} x${mat.count}`)
        .join(", ");
}

function enhanceItem(player, item, place = "default", customStat = null){
    if (!isEquipmentItem(item)) return false;

    item.enhance = Number(item.enhance) || 0;

    const maxLevel = getEnhanceMaxLevel(place);

    if (item.enhance >= maxLevel){
        if (place === "matin"){
            startScene([
                {
                    type: "text",
                    value: "마틴은 당신이 가져온 물건을 살펴보더니 고개를 저었다." +
                           "<br><br>\"내 실력으로 이 이상은 무리야. 여기서 내가 손보았다가는 망가질 거 같아.\"<br><br>"+
                           "그는 몇 초 침묵을 지키다가 더 강화하고 싶으면 상류도시에 가보라고 말했다. 그곳에는 분명 당신의 장비를 더 강화할 수 있는 사람이 있을 거라고 말하며 그는 말꼬리를 흐렸다. 더 이상 말하고 싶어하지 않는 듯했다."
                }
            ], player, {
                onEnd: () => openEnhanceMenu(player, place)
            });
        } else {
            addLog(`여기서는 +${maxLevel} 이상 강화할 수 없다.`);
        }
        return false;
    }

    const nextLevel = item.enhance + 1;

    if (nextLevel >= 5 && !["str", "dex", "int", "charm"].includes(customStat)){
        addLog("강화할 능력치를 선택해야 한다.");
        return false;
    }

    const cost = getEnhanceCost(item);

    const materials =
    place === "richTown"
        ? getRichTownEnhanceMaterials(nextLevel)
        : [];
        
        if (materials.length > 0 && !hasMaterials(player, materials)){
            addLog(`소재가 부족하다. 필요 소재: ${getMaterialText(materials)}`);
            return false;
        }

    if (!spendGold(player, cost)){
        addLog("돈이 부족하다.");
        return false;
    }

    if (materials.length > 0){
        consumeMaterials(player, materials);
    }

    item.enhance = nextLevel;
    if (place === "matin"){
        player.flags ??= {};
        player.flags.matinEnhancedOnce = true;
    }

    if (nextLevel >= 5){
        const gain = getEnhanceGain(nextLevel);
        addEnhanceCustomBonus(item, customStat, gain);

        addLog(`${getDisplayItemName(item)} 강화 완료! ${customStat} +${gain} (-${cost}G)`);
    } else {
        addLog(`${getDisplayItemName(item)} 강화 완료! (-${cost}G)`);
    }

    savePlayer(player);
    updateDerivedStats(player);
    updateStatusUI(player);
    openEnhanceMenu(player, place);

    return true;
}

function getEnhanceItemList(player){
    const equippedItems = Object.values(player.equipment || {})
        .filter(item => item && isEquipmentItem(item));

    const inventoryItems = (player.inventory || [])
        .filter(item => isEquipmentItem(item));

    return [...equippedItems, ...inventoryItems];
}

const ENHANCE_STAT_LABELS = {
    str: "힘",
    dex: "민첩",
    int: "지능",
    charm: "매력"
};

function openEnhanceStatSelect(player, item, place){
    const nextLevel = (Number(item.enhance) || 0) + 1;

    startScene([
        {
            type: "text",
            value:
                `${getDisplayItemName(item)}을 +${nextLevel}로 강화한다.<br><br>` +
                `어느 능력치를 강화할까?`
        },
        {
            type: "choice",
            choices: [
                ...Object.entries(ENHANCE_STAT_LABELS).map(([stat, label]) => ({
                    text: label,
                    action: () => enhanceItem(player, item, place, stat)
                })),
                {
                    text: "돌아간다",
                    action: () => openEnhanceMenu(player, place)
                }
            ]
        }
    ], player);
}

function selectEnhanceAction(player, item, place){
    const nextLevel = (Number(item.enhance) || 0) + 1;

    if (nextLevel >= 5){
        openEnhanceStatSelect(player, item, place);
        return;
    }

    enhanceItem(player, item, place);
}

function openEnhanceMenu(player, place = "default"){
    const equipList = getEnhanceItemList(player);

    startScene([
        {
            type: "text",
            value: "어느 장비를 강화할까?"
        },
        {
            type: "choice",
            choices: [
                ...equipList.map(item => ({
                    text: getEnhanceChoiceText(item, place),
                    action: () => selectEnhanceAction(player, item, place)
                })),
                {
                    text: "돌아간다",
                    action: () => startScene(getLocationScene(player), player)
                }
            ]
        }
    ], player);
}

function getEnhanceChoiceText(item, place = "default"){
    const currentLevel = Number(item.enhance) || 0;
    const nextLevel = currentLevel + 1;
    const cost = getEnhanceCost(item);

    const materials =
        place === "richTown"
            ? getRichTownEnhanceMaterials(nextLevel)
            : [];

    const materialText = materials.length > 0
        ? ` + ${getMaterialText(materials)}`
        : "";

    return `${getDisplayItemName(item)} (+${currentLevel} → +${nextLevel}) - ${cost}G${materialText}`;
}

const GEM_SOCKET_CONFIG = {
    ruby: {
        name: "루비",
        trait: "chanceattack"
    },

    sapphire: {
        name: "사파이어",
        trait: "lucky"
    },

    aquamarine: {
        name: "아쿠아마린",
        trait: "slippery"
    },

    diamond: {
        name: "다이아몬드",
        trait: "onemoretime"
    }
};

function getSocketItemList(player){
    return getEnhanceItemList(player).filter(canSocketGem);
}

function getGemList(player){
    return (player.inventory || []).filter(item =>
        item.key && GEM_SOCKET_CONFIG[item.key]
    );
}

function socketGem(player, item, gem){
    if (!canSocketGem(item)){
        addLog("보석을 장착하려면 장비가 +10이어야 한다.");
        return false;
    }

    if (item.socketGem){
        addLog("이미 보석이 장착되어 있다.");
        return false;
    }

    const gemConfig = GEM_SOCKET_CONFIG[gem.key];

    if (!gemConfig){
        addLog("장착할 수 없는 보석이다.");
        return false;
    }

    item.socketGem = {
        key: gem.key,
        name: gemConfig.name,
        trait: gemConfig.trait
    };

    removeItem(player, gem);

    savePlayer(player);
    updateDerivedStats(player);
    updateStatusUI(player);

    addLog(`${getDisplayItemName(item)}에 ${gemConfig.name} 장착 완료! (${getBattleTraitLabel(gemConfig.trait)})`);

    openSocketMenu(player);
    return true;
}

function openSocketMenu(player){
    const socketItems = getSocketItemList(player);

    startScene([
        {
            type: "text",
            value: "어느 장비에 보석을 장착할까?"
        },
        {
            type: "choice",
            choices: [
                ...socketItems.map(item => ({
                    text: item.socketGem
                        ? `${getDisplayItemName(item)} - ${item.socketGem.name} 장착됨`
                        : `${getDisplayItemName(item)} - 보석 장착 가능`,
                    action: () => {
                        if (item.socketGem){
                            addLog("이미 보석이 장착되어 있다.");
                            openSocketMenu(player);
                            return;
                        }

                        openGemSelectMenu(player, item);
                    }
                })),
                {
                    text: "돌아간다",
                    action: () => startScene(getLocationScene(player), player)
                }
            ]
        }
    ], player);
}

function openGemSelectMenu(player, item){
    const gems = getGemList(player);
    if (gems.length === 0){
        startScene([
            {
                type: "text",
                value: "장착할 수 있는 보석이 없다."
            },
            {
                type: "choice",
                choices: [
                    {
                        text: "돌아간다",
                        action: () => openSocketMenu(player)
                    }
                ]
            }
        ], player);
        return;
    }

    startScene([
        {
            type: "text",
            value:
                `${getDisplayItemName(item)}에 어떤 보석을 장착할까?<br><br>` +
                `한 번 장착한 보석은 되돌릴 수 없다.`
        },
        {
            type: "choice",
            choices: [
                ...gems.map(gem => {
                    const gemConfig = GEM_SOCKET_CONFIG[gem.key];

                    return {
                        text: `${gemConfig.name} - ${getBattleTraitLabel(gemConfig.trait)}`,
                        action: () => socketGem(player, item, gem)
                    };
                }),
                {
                    text: "돌아간다",
                    action: () => openSocketMenu(player)
                }
            ]
        }
    ], player);
}

window.open_juliangSocket = function(player){
    openSocketMenu(player);
};

function canSocketGem(item){
    return item?.type === "weapon" && Number(item.enhance) >= 10;
}

window.open_matinEnhance = function(player){
    openEnhanceMenu(player, "matin");
};

window.open_juliangEnhance = function(player){
    openEnhanceMenu(player, "richTown");
};