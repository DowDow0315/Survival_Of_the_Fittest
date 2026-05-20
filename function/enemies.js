//맨날 빼먹어서. 적 추가시 main.js에서 loadEnemy에 등록해야 한다!!!

let ENEMIES = {};

function createEnemy(data){
    return {
        id : data.id,
        name: data.name,

        hp: data.hp,
        maxHp: data.hp,

        attack: data.attack,
        defense: data.defense,
        eva: data.eva || 5,
        
        exp: data.exp || 0,

        lines: data.lines || {},
        teaseLines: data.teaseLines,

        skills: data.skills || [],
        grappleSkills: data.grappleSkills || [],
        toplessGrappleSkills: data.toplessGrappleSkills || [],
        bottomlessGrappleSkills: data.bottomlessGrappleSkills || [],

        drops: data.drops || []
    };
}

function registerEnemy(id, data){
    data.id = id;
    ENEMIES[id] = () => createEnemy(data);
}

function registerNPCAsEnemy(id){
    NPC_DATA[id].id = id;
    ENEMIES[id] = () => createEnemy(NPC_DATA[id]);
}

function getLine(enemy, type){
    const list = enemy.lines[type];
    if (!list || list.length === 0) return "";
    return list[Math.floor(Math.random() * list.length)];
}

async function loadEnemies(){
    const list = [
        "rapistM", "rapistF", "slime", "goblin", "flower",
        "begger", "beggers", "goblinKing", "skeleton",
        "bandit1", "bandit2", "banditBoss"
    ];

    for (const name of list){
        const res = await fetch(`data/enemies/${name}.json`);
        const data = await res.json();

        registerEnemy(name, data);
    }
}

window.ENEMIES = ENEMIES;
window.registerEnemy = registerEnemy;
window.registerNPCAsEnemy = registerNPCAsEnemy;
window.getLine = getLine;
window.loadEnemies = loadEnemies;