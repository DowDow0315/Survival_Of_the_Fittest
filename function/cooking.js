window.open_cookingMenu = function(player){
    player.cooking = player.cooking || {};
    player.cooking.selected = [];

    startScene([
        {
            type: "text",
            value: "주점의 낡은 주방이다.<br><br>재료 3개를 골라 요리를 시작할 수 있다."
        },
        {
            type: "choice",
            choices: [
                { text: "재료를 고른다", action: "open_cookingIngredientSelect" },
                { text: "알고 있는 레시피를 본다", action: "open_knownRecipes" },
                { text: "돌아간다", action: "return_tavern" }
            ]
        }
    ], player);
};

window.open_cookingIngredientSelect = function(player){
    player.cooking = player.cooking || {};
    player.cooking.selected = player.cooking.selected || [];

    const choices = [];

    const miscItems = player.inventory.filter(item =>
        item.type === "junk" &&
        item.key
    );

    const grouped = {};

    miscItems.forEach(item => {
        grouped[item.key] = grouped[item.key] || {
            item,
            count: 0
        };
        grouped[item.key].count++;
    });

    Object.values(grouped).forEach(({ item, count }) => {
        const selectedCount =
        player.cooking.selected.filter(key => key === item.key).length;
        
        const remainingCount = count - selectedCount;
        
        choices.push({
            text: `${item.name} (${remainingCount}개)`,
            action: () => selectCookingIngredient(player, item.key)
        });
    });

    choices.push(
        { text: "선택 초기화", action: "resetCookingIngredients" },
        { text: "돌아간다", action: "open_cookingMenu" }
    );

    startScene([
        {
            type: "text",
            value:
                "재료를 고르자.<br><br>" +
                `현재 선택: ${getCookingSelectedText(player)}<br>` +
                `(${player.cooking.selected.length} / 3)`
        },
        {
            type: "choice",
            choices
        }
    ], player);
};

function selectCookingIngredient(player, itemKey){
    player.cooking = player.cooking || {};
    player.cooking.selected = player.cooking.selected || [];

    if (player.cooking.selected.length >= 3) return;

    const ownedCount =
        player.inventory.filter(item => item.key === itemKey).length;

    const selectedCount =
        player.cooking.selected.filter(key => key === itemKey).length;

    if (selectedCount >= ownedCount){
        showSingleTextScene(
            "그 재료는 더 이상 없다.",
            player,
            {
                onEnd: () => open_cookingIngredientSelect(player)
            }
        );
        return;
    }

    player.cooking.selected.push(itemKey);

    if (player.cooking.selected.length >= 3){
        open_cookingConfirm(player);
        return;
    }

    open_cookingIngredientSelect(player);
}

window.resetCookingIngredients = function(player){
    player.cooking = player.cooking || {};
    player.cooking.selected = [];
    open_cookingIngredientSelect(player);
};

function getCookingSelectedText(player){
    const selected = player.cooking?.selected || [];

    if (selected.length === 0) return "없음";

    return selected.map(key => {
        const item = findItemByKey(key);
        return item?.name || key;
    }).join(", ");
}

window.open_cookingConfirm = function(player){
    const selectedText = getCookingSelectedText(player);

    startScene([
        {
            type: "text",
            value:
                `선택한 재료:<br>${selectedText}<br><br>` +
                "이 재료들로 요리를 시작할까?"
        },
        {
            type: "choice",
            choices: [
                { text: "요리를 시작한다", action: "startCooking" },
                { text: "다시 고른다", action: "resetCookingIngredients" },
                { text: "돌아간다", action: "open_cookingMenu" }
            ]
        }
    ], player);
};

function unlockRecipe(player, recipeId){
    if (!recipeId) return;

    player.knownRecipes = player.knownRecipes || [];

    if (!player.knownRecipes.includes(recipeId)){
        player.knownRecipes.push(recipeId);
    }

    savePlayer(player);
}

window.startCooking = function(player){
    const selected = player.cooking?.selected || [];
    const weirdTexts = [
        "야호~ 당신은 새로운 음식을 만들어낼 생각에 신이 났다!",
        "퍄~! 바로 이거지~! 나를 믿고 있었다구~!",
        "뭔가 냄새가 이상하긴 하지만 괜찮을 거야. 요리는 원래 언제나 신세계랬어!",
        "외면하던 당신은 드디어 현실을 직시했다. 이건 요리가 아니다."
    ];

let weirdIndex = 0;

    if (selected.length !== 3){
        open_cookingIngredientSelect(player);
        return;
    }

    // 재료 실제 보유 확인
    const neededCounts = {};
    selected.forEach(key => {
        neededCounts[key] = (neededCounts[key] || 0) + 1;
    });
    
    for (const [key, needed] of Object.entries(neededCounts)){
        const owned = player.inventory.filter(item => item.key === key).length;
        
        if (owned < needed){
            showSingleTextScene("재료가 부족하다.", player, {
                onEnd: () => open_cookingMenu(player)
            });
            return;
        }
    }

    // 재료 소모
    selected.forEach(key => {
        const index = player.inventory.findIndex(item => item.key === key);
        if (index !== -1){
            player.inventory.splice(index, 1);
        }
    });

    const recipeId = findRecipeByIngredients(selected);
    let successCount = 0;
    
    startArrowMinigame(player, {
        title: "요리를 시작한다!",
        target: 4,
        sequenceLength: 6,
        timeLimit: 4000,
        hideAfter: 1100,
        
        successText: (player, state) => {
            if (recipeId){
                return "이야호~ 당신은 금손이다!";
            }
            
            return weirdTexts[weirdIndex++] || "좆됨 감지!";
        },
        
        failText: recipeId
        ? "아이 젠장~ 당신의 손은 곰손으로 추락했다!"
        : weirdTexts[weirdIndex++] || "크게 좆됨 감지!",
        
        onStepSuccess: (player, state) => {
            successCount++;
        },

        onStepFail: (player, state) => {
            return {
                progress: state.progress + 1,
                text: recipeId
                ? "망스멜이 나기 시작한다..."
                : weirdTexts[weirdIndex++] || "이건 음식이 아니다..."
            };
        },
        
        onClear: (player) => {
            let grade;
            
            if (successCount >= 4) grade = "great";
            else if (successCount === 3) grade = "normal";
            else if (successCount === 2) grade = "bad";
            else grade = "disaster";
            
            finishCooking(player, recipeId, grade);
        }
    });
};

function findRecipeByIngredients(selectedKeys){
    const selectedCounts = {};

    selectedKeys.forEach(key => {
        selectedCounts[key] = (selectedCounts[key] || 0) + 1;
    });

    for (const [recipeId, recipe] of Object.entries(RECIPES)){
        const ingredients = recipe.ingredients;

        const recipeKeys = Object.keys(ingredients);
        const selectedKeysOnly = Object.keys(selectedCounts);

        if (recipeKeys.length !== selectedKeysOnly.length) continue;

        const matched = recipeKeys.every(key =>
            selectedCounts[key] === ingredients[key]
        );

        if (matched){
            return recipeId;
        }
    }

    return null;
}

function finishCooking(player, recipeId, grade){
    let resultItemKey;

    if (recipeId){
        unlockRecipe(player, recipeId);
        resultItemKey = RECIPES[recipeId].results[grade] || RECIPES[recipeId].results.normal;
    } else {
        resultItemKey = "trash";
    }

    const resultItem = ITEMS.consumable[resultItemKey];

    if (!resultItem){
        showSingleTextScene("요리 결과물을 찾을 수 없다.", player, {
            onEnd: () => open_cookingMenu(player)
        });
        return;
    }

    addItem(player, resultItem);
    passTime(player, 5);

    player.cooking.selected = [];
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                recipeId
                    ? `요리가 완성되었다.<br><br>${resultItem.name}을 얻었다.`
                    : `무언가 잘못된 것 같다.<br><br>${resultItem.name}을 얻었다.`
        },
        {
            type: "choice",
            choices: [
                { text: "계속 요리한다", action: "open_cookingMenu" },
                { text: "돌아간다", action: "return_tavern" }
            ]
        }
    ], player);
}

window.open_knownRecipes = function(player){
    player.knownRecipes = player.knownRecipes || [];

    if (player.knownRecipes.length === 0){
        startScene([
            {
                type: "text",
                value: "아직 알고 있는 레시피가 없다.<br><br>직접 재료를 조합해보자."
            },
            {
                type: "choice",
                choices: [
                    { text: "돌아간다", action: "open_cookingMenu" }
                ]
            }
        ], player);
        return;
    }

    const text = player.knownRecipes.map(recipeId => {
        const recipe = RECIPES[recipeId];
        if (!recipe) return null;

        const ingredientsText = Object.entries(recipe.ingredients)
            .map(([key, count]) => {
                const item = findItemByKey(key);
                return `${item?.name || key} x${count}`;
            })
            .join(", ");

        return `<strong>${recipe.name}</strong><br>${recipe.desc || recipe.description || ""}<br>재료: ${ingredientsText}`;
    }).filter(Boolean).join("<br><br>");

    startScene([
        {
            type: "text",
            value: "알고 있는 레시피<br><br>" + text
        },
        {
            type: "choice",
            choices: [
                { text: "돌아간다", action: "open_cookingMenu" }
            ]
        }
    ], player);
};