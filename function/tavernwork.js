function saveTavernWorkState(player){
    localStorage.setItem(
        "playerData",
        JSON.stringify(player)
    );
}

window.matin_work = function(player){
    player.flags = player.flags || {};

    if (!player.flags.matinWorkStarted){
        player.flags.matinWorkStarted = true;

        giveMatinWorkUniform(player);

        localStorage.setItem("playerData", JSON.stringify(player));

        startScene(NPC_DATA["matin"].scenes.matin_work_start, player);
        return;
    }

    startTavernWork(player);
};

function giveMatinWorkUniform(player){
    if (!player.inventory.some(item => item.name === ITEMS.top.tavernUpper.name)){
        addItem(player, ITEMS.top.tavernUpper);
    }

    if (!player.inventory.some(item => item.name === ITEMS.bottom.tavernBottom.name)){
        addItem(player, ITEMS.bottom.tavernBottom);
    }
}

const TAVERN_MENU = {
    food: ["고기꼬치", "고기야채꼬치", "야채꼬치", "배추수프", "감자스매시", "고기야채볶음", "야채볶음", "고기주먹밥", "야채주먹밥", "빵"],
    drink: ["맥주", "와인", "위스키"]
};

const CUSTOMER_STATE = {
    IDLE: "idle",
    CALLING: "calling"
};

function makeRandomTavernOrder(){
    return {
        food: pickRandom(TAVERN_MENU.food),
        drink: pickRandom(TAVERN_MENU.drink)
    };
}

function createTavernCustomers(){
    return [
        { id: "A1", tableId: "A", x: 1, y: 1, state: "calling", order: null, harass:null },
        { id: "A2", tableId: "A", x: 3, y: 1, state: "idle", order: null, harass:null },
        { id: "A3", tableId: "A", x: 1, y: 2, state: "idle", order: null, harass:null },
        { id: "A4", tableId: "A", x: 3, y: 2, state: "idle", order: null, harass:null },

        { id: "B1", tableId: "B", x: 5, y: 1, state: "idle", order: null, harass:null },
        { id: "B2", tableId: "B", x: 7, y: 1, state: "calling", order: null, harass:null },
        { id: "B3", tableId: "B", x: 5, y: 2, state: "idle", order: null, harass:null },
        { id: "B4", tableId: "B", x: 7, y: 2, state: "idle", order: null, harass:null },

        { id: "C1", tableId: "C", x: 1, y: 4, state: "idle", order: null, harass:null },
        { id: "C2", tableId: "C", x: 3, y: 4, state: "idle", order: null, harass:null },
        { id: "C3", tableId: "C", x: 1, y: 5, state: "calling", order: null, harass:null },
        { id: "C4", tableId: "C", x: 3, y: 5, state: "idle", order: null, harass:null },

        { id: "D1", tableId: "D", x: 5, y: 4, state: "calling", order: null, harass:null },
        { id: "D2", tableId: "D", x: 7, y: 4, state: "idle", order: null, harass:null },
        { id: "D3", tableId: "D", x: 5, y: 5, state: "idle", order: null, harass:null },
        { id: "D4", tableId: "D", x: 7, y: 5, state: "idle", order: null, harass:null }
    ];
}

//맵 렌더링
const TAVERN_MAP_WIDTH = 9;
const TAVERN_MAP_HEIGHT = 7;

const TAVERN_COUNTER = { x: 4, y: 0 };

const TAVERN_TABLES = [
    { id: "A", x: 2, y: 1, w: 1, h: 2 },
    { id: "B", x: 6, y: 1, w: 1, h: 2 },
    { id: "C", x: 2, y: 4, w: 1, h: 2 },
    { id: "D", x: 6, y: 4, w: 1, h: 2 }
];

function initTavernWorkState(player){
    player.tavernWork = {
        x: 4,
        y: 6,
        movesLeft: 80,

        customers: createTavernCustomers(),

        carryingFood : [],
        carryingDrink : [],

        earnings: 0,
        mistakes: 0,

        servedCount: 0,
        log: "마틴은 요리를 하면서 당신을 향해 고개만 까닥였다. 당신은 손님들에게 주문을 받고, 주문 요리를 마틴에게 받아 손님들에게 가져다주면 된다."
    };
}

function renderTavernWork(player){
    const storyBtn = document.getElementById("storyBtn");
    const choiceArea = document.getElementById("choiceArea");
    if (storyBtn) storyBtn.style.display = "none";
    if (choiceArea) choiceArea.innerHTML = "";
    const work = player.tavernWork;
    const grid = [];

    for (let y = 0; y < TAVERN_MAP_HEIGHT; y++){
        grid[y] = [];
        for (let x = 0; x < TAVERN_MAP_WIDTH; x++){
            grid[y][x] = ".";
        }
    }

    // 음식 받는 곳
    grid[TAVERN_COUNTER.y][TAVERN_COUNTER.x] = "#";

    // 테이블
    TAVERN_TABLES.forEach(table => {
        for (let dy = 0; dy < table.h; dy++){
            for (let dx = 0; dx < table.w; dx++){
                const char = "|";
                grid[table.y + dy][table.x + dx] = char;
            }
        }
    });

    // 손님
    work.customers.forEach(c => {
        grid[c.y][c.x] = c.state === CUSTOMER_STATE.CALLING ? "!" : "o";
    });

    // 플레이어
    grid[work.y][work.x] = "P";

    const mapHtml = grid
    .map(row => row.join(" "))
    .join("<br>");

    document.getElementById("storyText").innerHTML = `
        <div style="font-family: monospace; font-size: 24px; line-height: 1.35; text-align:center;">
            ${mapHtml}
        </div>
        <hr>
        <p>${work.log}</p>
        <p>남은 이동: ${work.movesLeft}</p>
        <p>들고 있는 음식: ${formatCarryingList(work.carryingFood)}</p>
        <p>들고 있는 음료: ${formatCarryingList(work.carryingDrink)}</p>
        <p>조작: W/A/S/D 이동, E 상호작용</p>
    `;
}

function formatTavernOrder(order){
    if (!order) return "없음";
    return `${order.food}, ${order.drink}`;
}

function formatCarryingList(items){
    if (!items || items.length === 0) return "없음";

    const counts = {};

    items.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([name, count]) => `${name} x${count}`)
        .join(", ");
}

function startTavernWork(player){
    if (!player.tavernWork || !player.tavernWork.active){
        initTavernWorkState(player);
        player.tavernWork.active = true;
    }

    saveTavernWorkState(player);

    renderTavernWork(player);
    bindTavernWorkKeys(player);
}

//이동관련
function bindTavernWorkKeys(player){
    document.onkeydown = function(event){
        const key = event.key.toLowerCase();

        if (["w", "a", "s", "d"].includes(key)){
            moveTavernPlayer(player, key);
        }

        if (key === "e"){
            interactTavernWork(player);
        }
    };
}

function moveTavernPlayer(player, key){
    const work = player.tavernWork;
    if (!work || work.movesLeft <= 0) return;

    let nx = work.x;
    let ny = work.y;

    if (key === "w") ny--;
    if (key === "s") ny++;
    if (key === "a") nx--;
    if (key === "d") nx++;

    if (!isTavernWalkable(player, nx, ny)){
        work.log = "그쪽으로는 지나갈 수 없다.";
        renderTavernWork(player);
        return;
    }

    work.x = nx;
    work.y = ny;
    work.movesLeft--;

    work.log = "당신은 주점 안을 바쁘게 움직였다.";

    if (work.movesLeft <= 0){
        endTavernWork(player);
        return;
    }

    triggerTavernHarassEvent(player);
    
    if (work.activeHarassEvent) {
        saveTavernWorkState(player);
        return;
    }
    
    saveTavernWorkState(player);
    renderTavernWork(player);
}

function isTavernWalkable(player, x, y){
    if (x < 0 || y < 0 || x >= TAVERN_MAP_WIDTH || y >= TAVERN_MAP_HEIGHT) return false;

    const isTable = TAVERN_TABLES.some(table =>
        x >= table.x &&
        x < table.x + table.w &&
        y >= table.y &&
        y < table.y + table.h
    );
    if (isTable) return false;

    const isCustomer = player.tavernWork.customers.some(c => c.x === x && c.y === y);
    if (isCustomer) return false;

    return true;
}

let pendingServe = null;

function openServeSelect(player, customer){
    const work = player.tavernWork;

    document.onkeydown = null;

    pendingServe = {
        customerId: customer.id,
        food: null,
        drink: null
    };

    const storyBtn = document.getElementById("storyBtn");
    const choiceArea = document.getElementById("choiceArea");

    if (storyBtn) storyBtn.style.display = "none";
    choiceArea.innerHTML = "";

    function renderSelect(){
        document.getElementById("storyText").innerHTML = `
            <p>${customer.id} 손님에게 무엇을 낼까?</p>
            <hr>
            <p>선택한 음식: ${pendingServe.food || "없음"}</p>
            <p>선택한 음료: ${pendingServe.drink || "없음"}</p>
            <p>들고 있는 음식: ${formatCarryingList(work.carryingFood)}</p>
            <p>들고 있는 음료: ${formatCarryingList(work.carryingDrink)}</p>
        `;

        choiceArea.innerHTML = "";

        [...new Set(work.carryingFood)].forEach(food => {
            const btn = document.createElement("button");
            btn.innerText = `${food} 선택`;
            btn.onclick = () => {
                pendingServe.food = food;
                renderSelect();
            };
            choiceArea.appendChild(btn);
        });

        [...new Set(work.carryingDrink)].forEach(drink => {
            const btn = document.createElement("button");
            btn.innerText = `${drink} 선택`;
            btn.onclick = () => {
                pendingServe.drink = drink;
                renderSelect();
            };
            choiceArea.appendChild(btn);
        });

        const noFoodBtn = document.createElement("button");
        noFoodBtn.innerText = "음식 안 냄";
        noFoodBtn.onclick = () => {
            pendingServe.food = null;
            renderSelect();
        };
        choiceArea.appendChild(noFoodBtn);

        const noDrinkBtn = document.createElement("button");
        noDrinkBtn.innerText = "음료 안 냄";
        noDrinkBtn.onclick = () => {
            pendingServe.drink = null;
            renderSelect();
        };
        choiceArea.appendChild(noDrinkBtn);

        const confirmBtn = document.createElement("button");
        confirmBtn.innerText = "내기";
        confirmBtn.onclick = () => serveSelectedTavernOrder(player);
        choiceArea.appendChild(confirmBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "취소";
        cancelBtn.onclick = () => {
            pendingServe = null;
            choiceArea.innerHTML = "";
            work.log = "당신은 음식을 내지 않고 물러났다.";
            renderTavernWork(player);
            bindTavernWorkKeys(player);
        };
        choiceArea.appendChild(cancelBtn);
    }

    renderSelect();
}

//음식 선택 및 주문 관련
function interactTavernWork(player){
    const work = player.tavernWork;

    // 마틴/음식 받는 곳
    if (work.x === TAVERN_COUNTER.x && work.y === TAVERN_COUNTER.y){
        openMatinOrderSelect(player);
        return;
    }

    const orderedCustomer = findAdjacentCustomerWithOrder(player);
    if (orderedCustomer){
        openServeSelect(player, orderedCustomer);
        return;
    }

    const customer = findAdjacentCallingCustomer(player);

    if (customer){
        customer.order = makeRandomTavernOrder();
        customer.state = CUSTOMER_STATE.IDLE;

        work.log = `${customer.id} 손님은 ${formatTavernOrder(customer.order)}을 주문했다.`;

        saveTavernWorkState(player);
        renderTavernWork(player);
        return;
    }

    work.log = "여기서는 할 수 있는 일이 없다.";
    renderTavernWork(player);
}


function openMatinOrderSelect(player){
    const work = player.tavernWork;

    document.onkeydown = null;

    const storyBtn = document.getElementById("storyBtn");
    const choiceArea = document.getElementById("choiceArea");

    if (storyBtn) storyBtn.style.display = "none";
    choiceArea.innerHTML = "";

    const selected = {
        food: [],
        drink: []
    };

    function renderSelect(){
        document.getElementById("storyText").innerHTML = `
            <p>마틴이 당신을 쳐다보았다.</p>
            <p>"뭐."</p>
            <hr>
            <p>선택한 음식: ${formatCarryingList(selected.food)}</p>
            <p>선택한 음료: ${formatCarryingList(selected.drink)}</p>
            <p>음식은 최대 3개, 음료는 최대 3개까지 들 수 있다.</p>
        `;

        choiceArea.innerHTML = "";

        TAVERN_MENU.food.forEach(food => {
            const btn = document.createElement("button");
            btn.innerText = food;
            btn.onclick = () => {
                if (selected.food.length < 3){
                    selected.food.push(food);
                }
                renderSelect();
            };
            choiceArea.appendChild(btn);
        });

        TAVERN_MENU.drink.forEach(drink => {
            const btn = document.createElement("button");
            btn.innerText = drink;
            btn.onclick = () => {
                if (selected.drink.length < 3){
                    selected.drink.push(drink);
                }
                renderSelect();
            };
            choiceArea.appendChild(btn);
        });

        const clearFoodBtn = document.createElement("button");
        clearFoodBtn.innerText = "음식 선택 초기화";
        clearFoodBtn.onclick = () => {
            selected.food = [];
            renderSelect();
        };
        choiceArea.appendChild(clearFoodBtn);

        const clearDrinkBtn = document.createElement("button");
        clearDrinkBtn.innerText = "음료 선택 초기화";
        clearDrinkBtn.onclick = () => {
            selected.drink = [];
            renderSelect();
        };
        choiceArea.appendChild(clearDrinkBtn);

        const confirmBtn = document.createElement("button");
        confirmBtn.innerText = "확인";
        confirmBtn.onclick = () => receiveOrderFromMatin(player, selected.food, selected.drink);
        choiceArea.appendChild(confirmBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "취소";
        cancelBtn.onclick = () => {
            choiceArea.innerHTML = "";
            work.log = "당신은 주문을 다시 떠올리며 카운터에서 물러났다.";
            renderTavernWork(player);
            bindTavernWorkKeys(player);
        };
        choiceArea.appendChild(cancelBtn);
    }

    renderSelect();
}

function receiveOrderFromMatin(player, foods, drinks){
    const work = player.tavernWork;

    foods = foods || [];
    drinks = drinks || [];

    if (foods.length === 0 && drinks.length === 0){
        work.log = "아무것도 고르지 않았다.";
        document.getElementById("choiceArea").innerHTML = "";
        renderTavernWork(player);
        bindTavernWorkKeys(player);
        return;
    }

    if (work.carryingFood.length + foods.length > 3){
        work.log = "음식은 3개까지만 들 수 있다.";
        document.getElementById("choiceArea").innerHTML = "";
        renderTavernWork(player);
        bindTavernWorkKeys(player);
        return;
    }

    if (work.carryingDrink.length + drinks.length > 3){
        work.log = "음료는 3개까지만 들 수 있다.";
        document.getElementById("choiceArea").innerHTML = "";
        renderTavernWork(player);
        bindTavernWorkKeys(player);
        return;
    }

    foods.forEach(food => {
        work.carryingFood.push(food);
    });

    drinks.forEach(drink => {
        work.carryingDrink.push(drink);
    });

    work.log =
        `당신은 마틴에게서 ` +
        `${formatCarryingList(foods)}, ` +
        `${formatCarryingList(drinks)}을 받아 들었다.`;

    document.getElementById("choiceArea").innerHTML = "";

    saveTavernWorkState(player);
    renderTavernWork(player);
    bindTavernWorkKeys(player);
}

function findAdjacentCallingCustomer(player){
    const work = player.tavernWork;

    return work.customers.find(c =>
        c.state === CUSTOMER_STATE.CALLING &&
        Math.abs(c.x - work.x) + Math.abs(c.y - work.y) === 1
    );
}

function findAdjacentCustomerWithOrder(player){
    const work = player.tavernWork;

    return work.customers.find(c =>
        c.order &&
        Math.abs(c.x - work.x) + Math.abs(c.y - work.y) === 1
    );
}

function removeOneFromArray(arr, item){
    const index = arr.indexOf(item);
    if (index !== -1){
        arr.splice(index, 1);
        return true;
    }
    return false;
}

function serveSelectedTavernOrder(player){
    const work = player.tavernWork;

    const customer = work.customers.find(c => c.id === pendingServe?.customerId);

    if (!customer || !customer.order){
        work.log = "주문을 낼 손님이 없다.";
        pendingServe = null;
        renderTavernWork(player);
        bindTavernWorkKeys(player);
        return;
    }

    const servedFood = pendingServe.food;
    const servedDrink = pendingServe.drink;

    if (!servedFood && !servedDrink){
        work.log = "아무것도 내지 않았다.";
        renderTavernWork(player);
        bindTavernWorkKeys(player);
        return;
    }

    if (servedFood) removeOneFromArray(work.carryingFood, servedFood);
    if (servedDrink) removeOneFromArray(work.carryingDrink, servedDrink);

    const correctFood = servedFood === customer.order.food;
    const correctDrink = servedDrink === customer.order.drink;

    pendingServe = null;

    if (correctFood && correctDrink){
        work.earnings += getTavernTip(player, 100);
        work.servedCount++;
        work.log = `${customer.id} 손님이 만족스럽게 고개를 끄덕였다.`;

        customer.order = null;
        makeNextCustomerCall(player);

        saveTavernWorkState(player);
        renderTavernWork(player);
        bindTavernWorkKeys(player);
        return;
    }

    work.earnings += getTavernTip(player, 50);
    work.mistakes++;

    triggerWrongOrderReaction(player, customer);
}

function makeNextCustomerCall(player){
    const work = player.tavernWork;

    const candidates = work.customers.filter(c =>
        c.state === CUSTOMER_STATE.IDLE &&
        !c.order
    );

    if (candidates.length === 0) return;

    const next = pickRandom(candidates);
    next.state = CUSTOMER_STATE.CALLING;
}

function getTavernTip(player, base){

    const top = player.equipment?.top;
    const bottom = player.equipment?.bottom;

    const fullSet =
        top?.name === "주점알바상의" &&
        bottom?.name === "주점알바하의";

    if (fullSet){
        return base * 2;
    }

    return base;
}

function endTavernWork(player){
    const work = player.tavernWork;

    document.onkeydown = null;

    const finalPay = Math.max(0, work.earnings);

    addGold(player, finalPay);
    changeStamina(player, -20);
    passTime(player, 20); // 2시간

    player.tavernWork.active = false;

    localStorage.setItem("playerData", JSON.stringify(player));

    startScene([
        {
            type: "text",
            value:
                `주점 알바가 끝났다.<br><br>` +
                `성공한 주문: ${work.servedCount}개<br>` +
                `실수: ${work.mistakes}개<br>` +
                `정산 금액: ${finalPay}G`
        }
    ], player, {
        onEnd: () => {
            player.tavernWork = null;
            localStorage.setItem("playerData", JSON.stringify(player));
            startScene(getLocationScene(player), player);
        }
    });
}

function checkTavernWorkEnd(player){
    const work = player.tavernWork;

    if (!work) return true;

    if (work.movesLeft <= 0){
        endTavernWork(player);
        return true;
    }

    return false;
}

//이벤트들
function triggerWrongOrderReaction(player, customer){
    const work = player.tavernWork;

    const reactions = ["angry"];

    if (getTotalStat(player, "charm") >= 15){
        reactions.push("charm");
    }

    reactions.push("grab");

    const reaction = pickRandom(reactions);

    if (reaction === "angry"){
        work.log = `${customer.id} 손님이 인상을 찌푸렸다. 그는 손가락을 톡톡 두드리며 당신에게 화를 내려다가 대신 마틴을 노려보았다. 마틴이 낮게 한숨을 쉬며 돈을 꺼내는 것이 보인다.`;
        finishWrongOrder(player, customer);
        return;
    }

    if (reaction === "grab"){
        startWrongOrderSpankEvent(player, customer);
        return;
    }

    if (reaction === "charm"){
        startWrongOrderCharmEvent(player, customer);
        return;
    }
}

function finishWrongOrder(player, customer){
    const work = player.tavernWork;

    customer.order = null;

    makeNextCustomerCall(player);
    saveTavernWorkState(player);

    if (checkTavernWorkEnd(player)) return;

    renderTavernWork(player);
    bindTavernWorkKeys(player);
}

function startWrongOrderSpankEvent(player, customer){
    const work = player.tavernWork;

    document.onkeydown = null;

    startScene([
        {
            type: "text",
            value:
                `${customer.id} 손님은 화를 내며 당신의 팔을 잡아당겼다.<br>` +
                `"장난해? 이걸 그냥 넘어가라고?"<br>` +
                `당신은 균형을 잃고 테이블 가까이 끌려갔다.`
        },
        {
            type: "choice",
            choices: [
                {
                    text: "저항한다.",
                    action: "tavern_wrongOrder_resist"
                },
                {
                    text : "미소를 지으며 그에게 한번만 봐달라고 말한다.",
                    action : "tavern_wrongOrder_seduce"
                },
                {
                    text: "가만히 있는다.",
                    action: "tavern_wrongOrder_accept"
                }
            ]
        }
    ], player);

    work.pendingCustomerId = customer.id;
    saveTavernWorkState(player);
}

function startWrongOrderCharmEvent(player, customer){
    const work = player.tavernWork;

    document.onkeydown = null;

    startScene([
        {
            type: "text",
            value:
                `${customer.id} 손님은 화를 내려다가 당신의 얼굴을 보더니 웃었다. <br>` +
                `"뭐, 실수할 수도 있지. 가슴 한번만 만지게 해주면 봐줄게."`
        },
        {
            type: "choice",
            choices: [
                {
                    text: "당신은 가까이 다가가는 척하다가 휙 튀어버렸다.",
                    action: "tavern_wrongOrder_charm_refuse"
                },
                {
                    text: "당신은 미소를 지으며 가까이 갔다.",
                    action: "tavern_wrongOrder_charm_accept"
                }
            ]
        }
    ], player);

    work.pendingCustomerId = customer.id;
    saveTavernWorkState(player);
}

window.tavern_wrongOrder_resist = function(player){
    const work = player.tavernWork;
    const customer = getTavernPendingCustomer(player);

    const success = rollCheck(player, "str", 12) || rollCheck(player, "dex", 12);

    if (success){
        work.log = "테이블 위로 넘어질 뻔한 당신은 손님의 손을 쳐내고 몸의 균형을 바로세운 후 곧바로 도망가버렸다. 손님은 바로 일어나서 화를 내려고 했지만 결국 행동에 옮기지는 못하고 씩씩거리며 다시 의자에 앉았다.";
    } else {
        work.movesLeft = Math.max(0, work.movesLeft - 1);
        changeSensitivity(player, "aSensitivity", 1);
        changeHP(player, -10);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "a", 5)
        );
        work.log = "테이블 위로 넘어진 당신을 제압한 후 손님은 무서운 표정으로 당신의 엉덩이를 때리기 시작했다. 당신은 도망가려고 했지만, 이미 그의 손아귀에 잡힌 당신의 발버둥은 그저 그에게 에피타이저일 뿐이었다. 짜악, 짜악, 짜악, 당신의 엉덩이와 다리는 그가 스팽킹할 때마다 움찔거리면서 반응을 보였다." +
                   "그는 당신에게 당신이 멍청해서 맞는 거라고 말했다. 멍청하면 말을 잘 듣기라도 할 것이지, 말도 안 들으니 맞을 수밖에 없는 거라며 그는 으름장을 놓았다. 그의 주변에 있던 사람들이 동조하며 술잔을 들었다. 그러자 손님은 더 기고만장해져서 당신의 엉덩이를 더 세게 때리기 시작했다. 당신의 눈에 눈물이 고였다." +
                   "<br>\"이 엉덩이 우는 꼴을 더 보고 싶은 사람?\"<br>당신은 수치심 속에서 엉덩이를 더 맞아야만 했다. 엉덩이에서 붉지 않은 살을 찾을 수 없을 때가 되어서야 손님은 당신을 놓아주었다.";
    }
    finishWrongOrder(player, customer);
};

window.tavern_wrongOrder_seduce = function(player){
    const work = player.tavernWork;
    const customer = getTavernPendingCustomer(player);

    const success = rollCheck(player, "charm", 12);

    if (success){
        work.log = "손님이 당신의 가슴을 만지려고 할 때, 당신은 순식간에 거리를 벌렸다. 손님은 비어버린 손에 멍하니 있다가 화를 내려고 했지만 당신이 멀리서 지어보이는 미소에 넋을 잃고 말았다.";
    } else {
        work.movesLeft = Math.max(0, work.movesLeft - 1);

        if (player.gender === "male"){
            changeArousal(
                player,
                getSensitivityArousalGain(player, "a", 5)
            );
            changeSensitivity(player, "aSensitivity", 1);
            work.log = "당신은 손님을 홀린 후 빠져나오려고 했지만 손님은 당신의 미소에 속지 않고 당신을 제 무릎 위로 끌어당겼다. 그는 당신의 다리 사이로 손을 집어넣으며 가만히 있으라고 말했다."+
                       "다리 사이로 파고든 그의 손은 곧이어 중지로 당신의 애널 입구 부분을 꾹꾹 누르기 시작했다. 당신은 다리를 오므리며 그의 손을 밀어내려고 했지만 그는 이미 당신의 회음부에 중지까지 집어넣은 후였다. 입구를 간질이다가 내벽을 긁는 손가락에 당신의 허리가 휘었다." +
                       "그 모습을 지켜보던 몇 명이 휘파람을 부르며 손님을 응원했다. 손님은 당신의 허리가 움찔거리다가 바르르 떨릴 때까지 손가락으로 당신의 애널을 쑤셔댔다. 당신의 얼굴이 열기와 홍조로 물들었을 때 그는 가볍게 당신의 이마에 키스를 해준 후 사랑스럽다고 말해주었다." +
                       "<br>\"예뻐서 봐준 줄 알아, 예쁜이.\"<br>그는 당신을 잡고 있었던 손을 풀었다. 하지만 엉덩이를 쑤시는 그의 손가락은 당신이 제대로 일어날 때까지도 당신의 애널에서 빠지지 않았다. 당신이 몇 번을 넘어질 뻔하고 간신히 일어났을 때에야 그는 의미심장한 미소를 지으면서 당신을 보내주었다."
        } else {
            changeArousal(
                player,
                getSensitivityArousalGain(player, "c", 5)
            );
            changeSensitivity(player, "cSensitivity", 1);
            work.log = "당신은 손님을 홀린 후 빠져나오려고 했지만 손님은 당신의 미소에 속지 않고 당신을 제 무릎 위로 끌어당겼다. 그는 당신의 다리 사이로 손을 집어넣으며 가만히 있으라고 말했다."+
                       "다리 사이로 파고든 그의 손은 곧이어 중지와 검지로 당신의 보지를 쑤셔댔다. 번갈아서 왔다갔다 하는 손가락에 당신은 다리를 오므리며 그의 손을 밀어내려고 했지만 그는 이미 당신의 보지에 세번째 손가락까지 집어넣은 후였다. 점점 습기가 차오르는 내벽에 그의 손가락은 더 매끄럽게 안까지 들어갔다. 내벽을 쑤시면서도 간질이는 그의 손놀림에 당신의 허리가 휘었다." +
                       "그 모습을 지켜보던 몇 명이 휘파람을 부르며 손님을 응원했다. 손님은 당신의 허리가 움찔거리다가 바르르 떨릴 때까지 손가락으로 당신의 보지를 쑤셔댔다. 당신의 얼굴이 열기와 홍조로 물들었을 때 그는 가볍게 당신의 이마에 키스를 해준 후 사랑스럽다고 말해주었다." +
                       "<br>\"예뻐서 봐준 줄 알아, 예쁜이.\"<br>그는 당신을 잡고 있었던 손을 풀었다. 하지만 보지를 쑤시는 그의 손가락은 당신이 제대로 일어날 때까지도 당신의 보지에서 빠지지 않았다. 당신이 몇 번을 넘어질 뻔하고 간신히 일어났을 때에야 그는 의미심장한 미소를 지으면서 당신을 보내주었다."
        }
    }
    finishWrongOrder(player, customer);
};

window.tavern_wrongOrder_accept = function(player){
    const work = player.tavernWork;
    const customer = getTavernPendingCustomer(player);

    work.movesLeft = Math.max(0, work.movesLeft - 1);
    changeArousal(
            player,
            getSensitivityArousalGain(player, "a", 5)
        );
    changeSensitivity(player, "aSensitivity", 1);

    work.log = "당신이 테이블 위에 엎드린 채로 가만히 있자 손님은 당신 쪽으로 몸을 기울이며 속삭였다. <br>\"옳지. 똑똑하면 말이라도 잘 들어야지.\"<br>그는 당신의 엉덩이를 토닥이다가 갑자기 당신의 엉덩이를 내리쳤다."+
               "갑작스러운 고통에 당신의 엉덩이 구멍이 움츠러들자 손님은 히죽 웃었다. 그는 마치 당신을 달래주듯이 엉덩이를 쓰다듬다가 갑자기 엉덩이를 때리는 행위를 반복했다. 계속 그 행위가 반복되자 당신은 당신의 아랫배가 점점 뜨거워지는 것을 느꼈다."+
               "그는 몇 번 더 그 행위를 반복한 후, 당신의 눈가에 눈물이 고이자 풀어주었다. 그는 마지막까지 당신의 엉덩이를 두드리며 다음부터는 실수하지 말라고 엄포를 놓았다. <br>...눈빛은 당신의 실수를 한번 더 기다리는 것처럼 보이긴 했지만.";

    finishWrongOrder(player, customer);
};

window.tavern_wrongOrder_charm_refuse = function(player){
    const work = player.tavernWork;
    const customer = getTavernPendingCustomer(player);
    const success = rollCheck(player, "charm", 18);

    if (success){
        work.log = "당신이 매력적인 미소를 지으면서 거절하자 손님은 이번 한번만 봐주겠다고 말하며 웃어넘겼다. 그러면서도 그는 가는 당신의 엉덩이를 장난스럽게 톡 치는 걸 잊지 않았다.";
    } else {
        work.movesLeft = Math.max(0, work.movesLeft - 1);
        changeArousal(
            player,
            getSensitivityArousalGain(player, "b", 5)
        );
        changeArousal(
            player,
            getSensitivityArousalGain(player, "m", 5)
        );
        changeSensitivity(player, "bSensitivity", 1);
        changeSensitivity(player, "mSensitivity", 1);
        work.log = "\"봐주려고 했는데 거절을 해?\"<br>손님은 당신을 그대로 테이블로 밀어붙였다. 테이블 위의 음식과 술이 바닥으로 쏟아졌다. 당신이 뭐라 하기도 전에 손님은 억지로 당신에게 키스를 했다. 당신은 그를 밀어내려고 했지만, 몸무게와 위치로 당신을 누르는 그를 이길 수가 없었다." +
                   "숨이 끊어질 것만 같은 키스 후 그는 당신의 가슴을 억지로 만지기 시작했다. 당신이 조금만 고개를 돌려도 그는 당신의 입술을 물어뜯듯이 응징했다. 주무르는 손아귀의 힘이 너무 세서 가슴에 멍이 들 것만 같았다. 손톱이 유두의 푹 들어간 부분을 긁듯이 쓸어내렸다." +
                   "당신의 가슴이 손톱자국과 울멍자국으로 엉망이 되고 나서야 그는 당신을 풀어주었다. 그는 당신의 가슴에 남긴 자신의 흔적을 만족스럽다는 듯이 바라보았다. <br>\"더 아름다워졌군.\"";
    }

    finishWrongOrder(player, customer);
};

window.tavern_wrongOrder_charm_accept = function(player){
    const work = player.tavernWork;
    const customer = getTavernPendingCustomer(player);

    work.movesLeft = Math.max(0, work.movesLeft - 1);
    work.earnings -= 50;
    changeArousal(
            player,
            getSensitivityArousalGain(player, "b", 5)
        );
    changeSensitivity(player, "bSensitivity", 1);

    work.log = "손님은 푹 파인 골 사이로 손을 집어넣었다. 그의 손이 당신의 가슴을 몇 번이고 주무른다. 집요할 정도로 가슴을 물고 늘어지는 그의 손에 당신의 얼굴은 점점 붉어졌다." +
               "그는 당신의 붉어진 얼굴을 보더니 웃으며 당신의 가슴을 더 주물럭거렸다. 그는 붉은색 손자국이 남은 당신의 가슴 위로 팁을 꽂아넣었다.";

    finishWrongOrder(player, customer);
};

function getTavernPendingCustomer(player){
    const work = player.tavernWork;

    return work.customers.find(c => c.id === work.pendingCustomerId)
        || work.customers[0];
}

//지나가면서 성희롱 이벤트 관련
let currentHarassChoice = null;

window.tavern_harass_choice_0 = function(player){
    handleHarassChoice(
        player,
        currentHarassChoice.choices[0],
        currentHarassChoice.stageData
    );
};

window.tavern_harass_choice_1 = function(player){
    handleHarassChoice(
        player,
        currentHarassChoice.choices[1],
        currentHarassChoice.stageData
    );
};

window.tavern_harass_choice_2 = function(player){
    handleHarassChoice(
        player,
        currentHarassChoice.choices[2],
        currentHarassChoice.stageData
    );
};

function triggerTavernHarassEvent(player){
    const work = player.tavernWork;
    if (work.activeHarassEvent) return;

    const nearby = work.customers.filter(c =>
        Math.abs(c.x - work.x) + Math.abs(c.y - work.y) <= 1
    );
    if (nearby.length === 0) return;

    let chance = 0.2;
    chance += getAlcoholLevel(player) * 0.005;
    chance += player.status.arousal / player.status.maxArousal * 0.12;
    if (Math.random() > chance) return;
    const customer = pickRandom(nearby);
    startHarassEvent(player, customer);
}

function startHarassEvent(player, customer){

    const types = ["touch", "spank", "drink"];

    const type = pickRandom(types);

    customer.harass = {
        type,
        stage: 0
    };

    player.tavernWork.activeHarassEvent = customer.id;

    openHarassStage(player, customer);
}

function openHarassStage(player, customer){

    const data = customer.harass;

    if (data.type === "touch"){
        openTouchStage(player, customer);
    }

    if (data.type === "spank"){
        openSpankStage(player, customer);
    }

    if (data.type === "drink"){
        openDrinkStage(player, customer);
    }
}

function getStageTarget(stageData, player){
    if (stageData.getTarget) return stageData.getTarget(player);
    return stageData.target;
}

function getGenderText(data, player){
    if (player.gender === "male" && data.maleIntro) return data.maleIntro;
    if (player.gender !== "male" && data.femaleIntro) return data.femaleIntro;
    return data.intro || "";
}

function handleHarassChoice(player, choice, stageData){
    const customer = getActiveHarassCustomer(player);
    const work = player.tavernWork;

    if (!customer) return endHarassEvent(player);

    const target = getStageTarget(stageData, player);

    function failAndAdvance(text){
        changeSensitivity(
            player,
            target + "Sensitivity",
            stageData.sensitivityGain || 1
        );

        startScene([
            { type: "text", value: text }
        ], player, {
            onEnd: () => advanceHarassStage(player)
        });
    }

    if (checkTraumaFreeze(player)){
        failAndAdvance("당신은 저항하려 했지만 몸이 굳어 움직이지 못했다.");
        return;
    }

    const success = rollCheck(player, choice.stat, choice.difficulty);

    if (success){
        startScene([
            { type: "text", value: choice.successText || "당신은 손님의 손길에서 벗어났다." }
        ], player, {
            onEnd: () => endHarassEvent(player)
        });
        return;
    }

    failAndAdvance(choice.failText || "당신은 손님에게 붙잡혔다.");
}

function advanceHarassStage(player){
    const work = player.tavernWork;
    const customer = getActiveHarassCustomer(player);
    if (!customer) return endHarassEvent(player);

    const dataList = getHarassDataList(customer.harass.type);
    const currentStageData = dataList[customer.harass.stage];

    work.movesLeft = Math.max(0, work.movesLeft - 1);
    applyHarassStageArousal(player, currentStageData);
    if (player.flags?.pendingArousalRelease){
        startTavernArousalCollapse(
            player,
            customer,
            currentStageData
        );
        return;
    }
    customer.harass.stage++;

    if (customer.harass.stage >= dataList.length){
        applyHarassFinalEffect(player, currentStageData);
        endHarassEvent(player);
        return;
    }
    saveTavernWorkState(player);
    openHarassStage(player, customer);
}

function applyHarassStageEffect(player, stageData){
    const target = getStageTarget(stageData, player);

    changeArousal(
        player,
        getSensitivityArousalGain(player, target, stageData.baseArousal || 1)
    );
}

function applyHarassStageArousal(player, stageData){
    const target = getStageTarget(stageData, player);

    changeArousal(
        player,
        getSensitivityArousalGain(
            player,
            target,
            stageData.baseArousal || 1
        )
    );
}

function applyHarassFinalEffect(player, stageData){
    const target = getStageTarget(stageData, player);

    changeSensitivity(player, target + "Sensitivity", stageData.finalSensitivityGain || 1);
    changeTrauma(player, 1);

    changeArousal(
        player,
        getSensitivityArousalGain(player, target, stageData.finalArousal || 5)
    );
}

function getHarassDataList(type){
    if (type === "touch") return TOUCH_STAGE_DATA;
    if (type === "spank") return spanking_STAGE_DATA;
    if (type === "drink") return DRINKING_STAGE_DATA;
    return TOUCH_STAGE_DATA;
}

function getActiveHarassCustomer(player){

    const work = player.tavernWork;

    return work.customers.find(
        c => c.id === work.activeHarassEvent
    );
}

function endHarassEvent(player){

    const work = player.tavernWork;

    const customer =
        getActiveHarassCustomer(player);

    if (customer){
        customer.harass = null;
    }

    work.activeHarassEvent = null;

    saveTavernWorkState(player);
    if (checkTavernWorkEnd(player)) return;

    renderTavernWork(player);
    bindTavernWorkKeys(player);
}

const TOUCH_STAGE_DATA = [
    {
        intro : "손님이 지나가던 당신의 엉덩이를 슬쩍 쓸어올렸다.",
        target : "a",
        baseArousal : 4,

        choices : [
            {
                text : "당신은 손님의 손을 강하게 밀쳐냈다.",
                stat : "str",
                difficulty : 15,
                successText: "손님은 당신의 힘에 놀랐는지 손이 내쳐진 채로 잠시 멍때렸다. 당신은 그틈을 타서 도망갔다.",
                failText : "짝하는 소리와 함께 손님의 손이 붉어졌지만, 손님은 당신을 놓아주지 않았다. 그는 오히려 당신의 허리를 휘어잡더니 그대로 당신을 자신의 무릎 위로 끌어당겼다."
            },
            {
                text : "당신은 재빨리 손님의 손에서 벗어났다.",
                stat : "dex",
                difficulty : 10,
                successText: "눈 깜짝할 사이에 당신은 손님에게서 도망가버렸다. 손님은 아쉽다는 듯 입맛을 다셨다.",
                failText : "당신은 손님의 손에서 벗어나려고 했지만 손님의 손이 더 빨랐다. 그는 당신의 허리를 휘어잡더니 그대로 당신을 자신의 무릎 위로 끌어당겼다."
            },
            {
                text : "당신은 미소를 지으며 은근슬쩍 손님의 손을 밀어냈다.",
                stat : "charm",
                difficulty : 8,
                successText: "당신의 미소에 손님은 넋을 잃었다. 그는 당신이 멀리 갈 때까지 당신을 응시하다가 어쩔 수 없다는 듯 어깨를 으쓱였다. 그의 귀는 붉어져있었다.",
                failText : "당신이 미소를 짓자 손님도 미소를 지었다. 그는 당신의 허리를 잡아 당신을 제 무릎 위로 끌어당기며 조금만 놀자고 당신의 귀에 속삭였다."
            }
        ]
    },
    {
        maleIntro : "손님은 당신을 자신의 무릎 위에 앉힌 채 엉덩이를 주물거렸다. 그의 손은 당신의 하의 위에서 맴돌다가 천천히 하의 안으로 들어섰다.",
        femaleIntro : "손님은 당신의 자신의 무릎 위에 앉힌 채 당신의 두 다리 사이를 손을 집어넣었다. 그의 손가락은 당신의 클리를 장난스럽게 튕기다가 천천히 하의 안으로 진입했다.",

        getTarget(player){
            return player.gender === "male" ? "a" : "c";
        },
        baseArousal : 7,
        
        choices : [
            {
                text : "당신은 무릎을 모으며 그의 손에 저항했다.",
                stat : "str",
                difficulty : 20,
                successText: "손님은 당신의 무릎을 벌리려고 했지만 실패했다. 그 틈을 타서 당신은 그의 두 무릎을 강제로 양쪽으로 벌렸다. 갑작스러운 힘에 손님이 고통스러워하는 동안 당신은 그대로 그 자리를 벗어났다.",
                failText : "당신이 무릎을 모으려고 하자 손님은 다른 손으로 당신의 허벅지를 짓누르며 다리를 벌렸다. 주변 손님들의 시선이 당신에게 몰리는 것이 느껴진다..."
            },
            {
                text : "당신은 옆으로 몸을 움직여 그의 손을 피하며 무릎 위에서 내려오려고 했다.",
                stat : "dex",
                difficulty : 15,
                successText: "손님은 당신의 허리를 다시 잡아서 고정시키려고 했지만 이미 당신은 그의 무릎에서 벗어난 후였다. 그는 멀어지는 당신을 바라보며 입맛만 다셨다.",
                failText : "당신이 옆으로 도망가려고 하자 손님은 이미 알고 있었다는 듯이 당신의 허리를 더 꽉 붙잡았다. 당신의 다리 사이로 파고든 그의 다리가 당신의 다리를 벌린다. 주변 손님들의 시선이 당신에게 몰리는 것이 느껴진다..."
            },
            {
                text : "당신은 그와 시선을 마주하며, 그의 시선이 당신의 눈동자에 홀려있을 때 슬쩍 몸을 움직였다.",
                stat : "charm",
                difficulty : 14,
                successText: "손님은 멍하니 당신이 자신의 품에서 사라지는 것을 바라보고 있다가 당신과 또 시선이 마주치자 얼굴을 붉히며 고개를 돌렸다.",
                failText : "손님은 당신의 허리에 두르고 있는 손을 더 단단히 하며 당신이 도망가지 못하게 막았다. 그는 아름다운 사냥감을 놓치고 싶은 생각이 없다. 당신의 다리 사이로 파고든 그의 다리가 당신의 다리를 벌린다. 주변 손님들의 시선이 당신에게 몰리는 것이 느껴진다..."
            }
        ]
    },
    {
        maleIntro : "손님의 엄지가 당신의 하의로 파고들어, 당신의 하의는 무릎 밑까지 내려갔다. 그는 그대로 당신의 애널에 손가락을 집어넣어 쑤시며 당신의 반응을 즐겼다. 주변 손님들이 당신을 안주로 삼고 있다.",
        femaleIntro : "손님의 엄지가 당신의 하의로 파고들어, 당신의 하의는 무릎 밑까지 내려갔다. 그는 그대로 당신의 보지에 손가락을 집어넣어 쑤시며 당신의 반응을 즐겼다. 주변 손님들이 당신을 안주로 삼고 있다.",

        getTarget(player){
            return player.gender === "male" ? "a" : "c";
        },
        baseArousal : 10,

        choices : [
            {
                text : "당신은 그의 손가락에 저항하며 몸을 억지로 일으키려고 했다.",
                stat : "str",
                difficulty : 30,
                successText: "당신의 저항은 격렬했다. 그 격렬함에 놀란 손님의 손이 헛돌았을 때 당신은 그 기회를 잡고 그대로 자리를 박차고 도망가버렸다.",
                failText : "당신의 저항은 이미 연약한 나비의 날개짓과도 같았다. 그는 당신의 구멍을 더 깊게 쑤셨다. 당신은 이제 저항할 수 없다! 그는 당신의 다리가 파들파들 떨릴 때까지 몇 번을 쑤시고 나서야 당신을 놓아주었다. 당신은 후들거리는 다리를 어떻게든 바로잡으며 그 자리에서 벗어났다."
            },
            {
                text : "당신은 그에게 더 이상은 하지 말아달라고 부탁했다.",
                stat : "charm",
                difficulty : 25,
                successText: "손님은 당신의 부탁에 고민하더니 \"이번만 봐주는 거야, 예쁜이.\"라고 말하며 당신을 놓아주었다. 그는 자리를 벗어나는 당신을 끝까지 바라보며 히죽히죽 웃었다.",
                failText : "손님은 당신을 놓아주지 않았다. 그는 '조금만 더'라고 당신의 귀에 대고 속삭이며 당신의 구멍을 유린했다. 당신의 다리 사이에 습기가 찰 때까지 손님은 당신의 구멍을 괴롭혔다. 당신이 제대로 서있을 수조차 없을 때야 그는 당신을 놓아주었다. 여기저기서 음란한 시선들이 느껴진다." 
            }
        ]
    }
]

const spanking_STAGE_DATA = [
    {
        intro : "손님이 당신의 엉덩이를 팡 소리가 나게 때렸다.",
        target : "a",
        baseArousal : 4,

        choices : [
            {
                text : "당신은 엉덩이를 또 때리려는 그의 손을 잡았다.",
                stat : "str",
                difficulty : 15,
                successText: "당신은 손님의 손을 꺾어서 역으로 손님을 테이블 위로 제압해버렸다. 손님이 화를 내며 일어났을 때는 이미 당신은 멀어진지 오래였고, 다른 사람들이 그를 비웃고 있었다. 손님은 씩씩거리며 고개를 돌렸다.",
                failText : "손님은 오히려 당신의 손목을 잡더니 손을 뒤로 꺾어 제압한 후 그대로 당신을 테이블 위로 엎드리게 했다."
            },
            {
                text : "당신은 민첩하게 그다음 스팽킹을 피했다.",
                stat : "dex",
                difficulty : 10,
                successText: "당신은 유연하게 그의 스팽킹을 피한 뒤 다시 일하러 갔다. 손님은 믿을 수 없다는 듯이 자신의 손을 내려보다가 다시 자신의 음식에 집중했다.",
                failText : "당신의 발재간을 한번에 파악한 손님은 그대로 손의 궤적을 틀어 당신의 엉덩이를 때렸다. 찰싹! 하는 소리와 함께 당신이 움찔했을 떄, 손님은 그대로 당신을 테이블 위로 엎드리게 했다."
            },
            {
                text : "당신은 슬쩍 엉덩이를 흔들어 손님의 시선을 사로잡았다. 손님의 행동이 느려졌을 때 당신은 그대로 그 자리를 벗어났다.",
                stat : "charm",
                difficulty : 8,
                successText: "당신의 엉덩이 놀림에 손님은 당신의 엉덩이를 잡으려고 들었다. 하지만 당신은 유연하게 손님의 손을 피한 후 일하러 갔다.",
                failText : "오히려 손님의 집착에 기름을 더 부은 거 같다... 그는 탐욕스러운 시선으로 \"이리와!\"라고 말하며 당신을 그대로 테이블에 엎드리게 했다. 그는 창녀처럼 군 값을 받으라고 으르렁거렸다."
            }
        ]
    },
    {
        intro : "손님은 테이블에 엎드려서 엉덩이만 삐죽 솟구쳐있는 당신을 스팽킹하기 시작했다. 짝, 짝, 주점에 크게 울려퍼지는 마찰음에 사람들의 시선이 당신에게 몰리기 시작한다.",
        target : "a",
        baseArousal : 7,

        choices : [
            {
                text : "당신은 어떻게든 테이블에서 벗어나기 위해 팔에 힘을 주어 벌떡 일어났다.",
                stat : "str",
                difficulty : 20,
                successText: "손님은 그대로 당신의 뒤통수에 자신의 얼굴을 부딪혔다. 쾅하는 소리와 함께 손님은 뒤로 넘어졌고 당신은 아무렇지도 않게 그 자리를 벗어나버렸다.",
                failText : "당신의 저항은 오히려 그의 분노를 불러왔다. 그는 당신의 머리를 억눌러 테이블 위에서 못 벗어나게 한 뒤 더 강한 스팽킹을 이어갔다."
            },
            {
                text : "당신은 재빠르게 옆의 잔을 잡아 손님의 얼굴에 술을 뿌리려고 했다.",
                stat : "dex",
                difficulty : 15,
                successText: "술을 얼굴에 맞은 손님은 화를 내며 당신을 잡으려고 했지만 당신은 이미 그의 사정범위에서 멀어진 후였다. 당신이 떠나간 후에도 손님은 눈을 비비며 고통을 호소했다.",
                failText : "손님은 당신이 자신의 얼굴에 술을 뿌리기 전에 당신의 손을 제압해서 테이블에 쾅 내리쳤다. 당신의 신음 소리와 함께, 더 강한 스팽킹 소리가 이어졌다. 그는 당신이 또 잘못을 저질렀으니 더 매를 맞아야 한다고 으르렁거렸다."
            },
            {
                text : "당신은 일부러 앙앙거리는 소리를 내며 손님을 방심시킨 뒤 도망가려고 했다.",
                stat : "charm",
                difficulty : 14,
                successText: "당신의 앙앙거리는 소리에 취해있던 손님은 당신을 그만 놓쳐버리고 말았다. 그는 멍하니 있다가 웃음을 터뜨렸다. <br>\"앙큼한 년.\"",
                failText : "\"어딜 도망가.\"<br> 손님은 으르렁거리며 당신의 엉덩이를 꽉 꼬집었다. 당신이 몸을 뒤틀자 그는 너도 원했던 거 아니냐고 으르렁거렸다. <br>\"더 흔들어, 창년아.\"<br>그는 당신의 엉덩이를 때리면서 당신이 엉덩이를 흔들지 않으면 더 가학적으로 때렸다."
            }
        ]
    },
    {
        intro : "손님은 이제 당신의 하의와 속옷까지 벗겨내고 당신을 때리려고 하고 있다.... 주변의 분위기가 달아올랐다.",
        target : "a",
        baseArousal : 10,

        choices : [
            {
                text : "당신은 하의와 속옷을 벗겨내려는 그의 손에 몸을 비틀며 힘으로 저항했다.",
                stat : "str",
                difficulty : 30,
                successText: "그는 당신의 저항에 막혀 하의와 속옷을 벗기지 못했다. 당신을 그를 밀어낸 후 그 자리에서 벗어나버렸다.",
                failText : "손님은 당신의 저항에 코웃음을 치며 당신의 맨엉덩이를 드러냈다. 모두의 앞에 드러난 당신의 엉덩이를 때리다가도 엉덩이골을 문지르며 그는 당신에게 고통과 쾌락을 반복해서 주었다."
            },
            {
                text : "당신은 재빠르게 하의와 속옷을 벗겨내려는 그의 손을 쳐냈다.",
                stat : "dex",
                difficulty : 25,
                successText: "그는 당신의 저항에 막혀 하의와 속옷을 벗기지 못했다. 당신을 그가 당황한 사이에 테이블에서 벗어나버렸다.",
                failText : "손님은 당신의 손을 한번 더 쳐낸 후 당신의 하의와 속옷을 벗겨냈다. 그는 모두의 앞에 당신의 맨엉덩이를 전시하며 일부러 더 과장스럽게 당신의 엉덩이를 때리며 문질렀다. 고통과 쾌락이 당신의 몸을 달아오르게 만든다."
            }
        ]
    }
]

const DRINKING_STAGE_DATA = [
    {
        intro: "손님이 당신을 보더니 능글맞은 미소를 지었다. 그는 당신에게 술을 한 잔 마시면 팁을 주겠다고 말했다.",
        tip: 25,
        alcohol: 10
    }
];

function openDrinkStage(player, customer){
    document.onkeydown = null;

    const drunk = (player.status?.alcohol || 0) >= 60;

    startScene([
        {
            type: "text",
            value: drunk
                ? "손님은 당신이 이미 꽤 취한 것을 보고 웃으며 술잔을 더 밀어붙였다."
                : "손님이 술잔을 내밀며 한 잔 마시면 팁을 주겠다고 했다."
        },
        {
            type: "choice",
            choices: [
                { text: "마신다. (+25G)", action: "tavern_drink_accept" },
                { text: "거절한다.", action: drunk ? "tavern_drink_forced" : "tavern_drink_refuse" }
            ]
        }
    ], player);
}

window.tavern_drink_accept = function(player){
    addGold(player, 25);
    changeAlcohol(player, 10);

    player.tavernWork.log = "당신은 술을 마시고 팁을 받았다.";
    endHarassEvent(player);
};

window.tavern_drink_refuse = function(player){
    player.tavernWork.log = "당신은 술잔을 거절하고 다시 일하러 돌아갔다.";
    endHarassEvent(player);
};

window.tavern_drink_forced = function(player){
    changeAlcohol(player, 10);

    player.tavernWork.movesLeft = Math.max(0, player.tavernWork.movesLeft - 1);
    player.tavernWork.log = "손님은 웃으며 술잔을 강하게 권했고, 당신은 결국 한 잔 더 마셨다.";

    endHarassEvent(player);
};

function openTouchStage(player, customer){
    document.onkeydown = null;

    const stageData = TOUCH_STAGE_DATA[customer.harass.stage];
    const intro = getGenderText(stageData, player);

    currentHarassChoice = {
        stageData,
        choices: stageData.choices
    };

    startScene([
        { type: "text", value: intro },
        {
            type: "choice",
            choices: stageData.choices.map((choice, index) => ({
                text: choice.text,
                action: `tavern_harass_choice_${index}`
            }))
        }
    ], player);
}

function openSpankStage(player, customer){
    document.onkeydown = null;

    const stageData = spanking_STAGE_DATA[customer.harass.stage];
    const intro = getGenderText(stageData, player);

    currentHarassChoice = {
        stageData,
        choices: stageData.choices
    };

    startScene([
        { type: "text", value: intro },
        {
            type: "choice",
            choices: stageData.choices.map((choice, index) => ({
                text: choice.text,
                action: `tavern_harass_choice_${index}`
            }))
        }
    ], player);
}

//절정 이벤트
function startTavernArousalCollapse(player, customer, stageData){
    flashScreenMulti(5, 100);

    player.flags.pendingArousalRelease = false;

    const type = customer.harass.type;
    const stage = customer.harass.stage;

    const intro = getTavernCollapseIntro(type, stage);

    const matin = NPC_DATA["matin"];
    const affection = matin?.emotion?.affection || 0;
    const rage = matin?.emotion?.rage || 0;

    const noticedByMatin = Math.random() < 0.5;

    if (noticedByMatin && affection >= 50){
        startMatinSaveScene(player, rage, intro);
        return;
    }

    startTavernDraggedAwayScene(player, intro, noticedByMatin);
}

function getTavernCollapseIntro(type, stage){
    if (type === "touch"){
        if (stage === 0){
            return "엉덩이를 쓸어올리는 손에 당신은 그대로 절정했다. 손님은 자기도 놀란 듯 바르르 떨고 있는 당신을 보다가 미소를 지었다.";
        }

        else if (stage === 1){
            return "무릎에 앉은 채로 괴롭힘당하던 당신은 손님의 손이 다리 사이를 파고들었을 때 다리를 오므리며 그대로 절정했다. 당신의 거친 호흡 사이로 손님의 웃음소리가 파고든다.";
        }

        else{
            return "손님의 손가락에 움찔거리던 당신은 결국 다리를 벌린 채 그대로 절정했다. 손님은 당신이 절정하자 웃으며 당신의 구멍으로 더 집요하게 파고들었고 당신은 그대로 연속 절정당했다.";
        }
    }

    if (type === "spank"){

        if (stage === 0){
            return "짝 하는 소리와 함께 당신의 몸이 무너졌다. 당신은 무릎을 꿇은 채 바닥에 네 발로 엎드려 덜덜 떨었다. 손님은 당신이 스팽킹에 절정한 것을 보며 입꼬리를 올렸다."
        }

        else if (stage === 1){
            return "엉덩이가 뜨거워지는 것과 함께 당신은 테이블에 엎드린 채 절정했다. 본능적으로 올라간 발뒤꿈치가 바들바들 떨리고, 다리 사이로 애액이 흘러내렸다. 손님은 엉덩이창년이라 비웃으며 아직도 떨리고 있는 당신의 엉덩이를 쓰다듬었다.";
        }

        else{
            return "고통과 쾌락 사이에서 당신은 참지 못하고 절정했다. 손님은 당신의 엉덩이를 때리면서도 집요하게 애널을 손가락으로 괴롭혔다. 당신의 애널은 그의 손가락이 들어왔다가 빠질 때마다 놓기 싫다는 듯이 쫀득하게 굴었다. 새하얘진 당신의 시야 사이로 사람들의 악의적인 미소가 보인다.";
        }
    }

    if (type === "drink"){
        return "취기 때문인지, 열기 때문인지, 당신은 그대로 절정해버렸다. 목을 뒤로 꺾고 절정하는 당신의 모습에 여기저기서 휘파람 소리가 들려왔다.";
    }
}

//끌려가기 이벤트
function startMatinSaveScene(player, rage, intro){
    const work = player.tavernWork;
    const finalPay = Math.max(0, work?.earnings || 0);

    changeEmotion("matin", "dominance", 3);

    if (rage < 80){
        addGold(player, finalPay);
    }

    forceEndTavernWork(player);

    const text = rage >= 80
        ? intro +
          "당신이 화장실로 끌려가려는 순간 마틴이 당신의 팔을 잡아끌었다. 손님은 마틴에게 항의하려고 했지만 당신을 바라보는 마틴의 싸늘한 시선에 그만두었다. 마틴은 당신을 거칠게 카운터로 끌고 온 후 그대로 당신을 바닥에 밀쳤다. 당신은 엉덩방아를 찧은 채 마틴을 올려다보았다." +
          "<br>\"꺼져.\"<br>" +
          "그는 그 말을 끝으로 당신을 쳐다도 보지 않았다. 그대로 가려는 당신의 뒤로 챙, 하는 날카로운 소리가 들렸다. 마틴이 그릇을 꺤 거다. 당신은 마틴을 돌아보았지만 그는 여전히 당신을 쳐다보고 있지 않다."
        : intro +
          "당신이 화장실로 끌려가려는 순간 마틴이 당신의 팔을 잡아끌었다.<br>\"적당히 해.\"<br>손님은 위협적으로 마틴에게 네가 뭔 상관이냐고 했지만 마틴이 서늘한 얼굴로 술병을 집어들자 그만두었다. 그는 마틴과 척을 지는 것보다는 당신을 한번 봐주는 게 낫다고 생각한 모양이다." +
          "당신을 카운터로 데려온 마틴은 돈을 꺼내더니 그대로 당신의 손에 쥐어주었다. 거친 손길이었지만 돈이 당신의 손바닥 밖으로 벗어나지는 않았다.<br>" +
          `정산 금액: ${finalPay}G` +
          "<br>\"네 몸 간수도 못하나? 이제 꺼져.\"<br>" +
          "마틴은 당신에게서 고개를 돌리고 그릇을 닦았다. 잔을 닦는 그의 손은 평소보다 더 거칠었다.";

    startScene([{ type: "text", value: text }], player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
}

function startTavernDraggedAwayScene(player, intro, noticedByMatin){
    changeSensitivity(player, "aSensitivity", 5);
    changeSensitivity(player, "bSensitivity", 5);
    changeSensitivity(player, "mSensitivity", 5);
    if (player.gender !== "male"){
        changeSensitivity(player, "cSensitivity", 5);
    }

    changeTrauma(player, 3);
    changeStamina(player, -30);
    passTime(player, 40);
    forceEndTavernWork(player);

    const matinText = noticedByMatin
        ? "화장실로 끌려가려는 순간, 당신은 마틴이 자신을 보았다고 생각했다. 하지만 눈을 깜박였을 때 마틴은 당신에게서 시선을 돌린 후였다."
        : "";

    startScene([
        {
            type: "text",
            value:
                intro +
                matinText +
                "손님은 제대로 움직이도 못하는 당신을 화장실로 질질 끌고 갔다. 화장실 변기에 내던져진 당신은 그대로 손님에게 덮쳐졌다. 당신은 변기에서 육변기마냥 다리를 M자로 벌린 채 남자의 성기를 받아내야만 했다. 당신이 아프다고 울어도 여기서 당신을 도와줄 사람은 없다... 오히려 다른 사람들을 불러들이는 거면 모를까. 그리고 그의 입술이 당신의 입술을 덮어버리면서 당신의 울음 소리도 막힌 목구멍 아래로 묻혀버렸다. 그는 당신의 엉덩이를 짝짝 때리며 추삽질을 계속했다. 변기 위에서 들썩이던 당신의 엉덩이는 결국 한번 더 절정하며 전기에라도 감전된 것처럼 바르르 떨렸다. 몇 번이고 당신을 박은 남자는 만족스러워하며 당신을 떠나갔다. 변기 물 위로 당신의 구멍에서부터 흘러내린 남자의 정액이 똑, 똑, 떨어진다."
        }
    ], player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
}

function forceEndTavernWork(player){
    document.onkeydown = null;

    passTime(player, 20);
    changeStamina(player, -20);

    if (player.tavernWork){
        player.tavernWork.active = false;
        player.tavernWork = null;
    }

    player.location = "tavern";

    localStorage.setItem("playerData", JSON.stringify(player));
}