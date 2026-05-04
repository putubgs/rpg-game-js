var tempHeroHP = 100;
var tempMonsterHP = 100;

const attackBtn = document.getElementById("attack-button");
const ultiBtn = document.getElementById("ultimate-button");
const healBtn = document.getElementById("heal-button");
const battleLogs = document.getElementById("battle-logs");
const battleResult = document.getElementById("battle-result");

const logs = [];

var heroHealth = 100;
var monsterHealth = 100;
const heroHealthBox = document.querySelector(".hero-health-bar");
const monsterHealthBox = document.querySelector(".monster-health-bar");

console.log(heroHealthBox);

heroHealthBox.style.setProperty("--hero-health", `${heroHealth}%`);
monsterHealthBox.style.setProperty("--monster-health", `${monsterHealth}%`);

let monsterOpt = "attack";

// ATTACK FUNCTION AND CURRENT HEALTH CALCULATOR
const attack = () => {
  let lolAttack = generateDamage(Math.round(Math.random() * 1));

  console.log(tempHeroHP);
  console.log(tempMonsterHP);

  heroHealth = deathDetector(heroHealth - lolAttack.monsterDmg);
  heroHealthBox.style.setProperty("--hero-health", heroHealth + "%");
  monsterHealth = deathDetector(monsterHealth - lolAttack.heroDmg);
  monsterHealthBox.style.setProperty("--monster-health", `${monsterHealth}%`);

  console.log(`Monster's health remaining ${monsterHealth.innerHTML}`);
  console.log(`Hero's health remaning ${heroHealth}`);

  logsGenerator(monsterOpt, "attack", lolAttack.monsterDmg, lolAttack.heroDmg);

  resultGenerator(monsterHealth, heroHealth);
};

const resultGenerator = (monsterHealth, heroHealth) => {
  if (winnerSelector(monsterHealth, heroHealth) == "hero") {
    console.log("the monster is dead");
    attackBtn.disabled = true;
    ultiBtn.disabled = true;
    healBtn.disabled = true;
    battleResult.innerHTML = "HERO WIN";
  }
  if (winnerSelector(monsterHealth, heroHealth) == "monster") {
    console.log("the hero is dead");
    attackBtn.disabled = true;
    ultiBtn.disabled = true;
    healBtn.disabled = true;
    battleResult.innerHTML = "MONSTER WIN";
  }
};

const ultimate = () => {
  let lolAttack = generateDamage(monsterOpt, "ultimate");

  heroHealth = deathDetector(heroHealth - lolAttack.monsterDmg);
  heroHealthBox.style.setProperty("--hero-health", heroHealth + "%");

  monsterHealth = deathDetector(monsterHealth - lolAttack.heroDmg);
  monsterHealthBox.style.setProperty("--monster-health", monsterHealth + "%");

  logsGenerator(
    monsterOpt,
    "ultimate",
    lolAttack.monsterDmg,
    lolAttack.heroDmg,
  );

  resultGenerator(monsterHealth, heroHealth);
};

const heal = () => {
  const healAmount = Math.round(Math.random() * 10 + 10);

  heroHealth = Math.min(heroHealth + healAmount, 100);
  heroHealthBox.style.setProperty("--hero-health", heroHealth + "%");

  let monsterDmg = Math.round(Math.random() * 10 + 5);
  heroHealth = deathDetector(heroHealth - monsterDmg);
  heroHealthBox.style.setProperty("--hero-health", heroHealth + "%");

  let healLogMsg = `HERO: healed ${healAmount} HP`;
  let dmgLogMsg = `HERO: received ${monsterDmg} damage from monster`;

  logs.push(healLogMsg);
  logs.push(dmgLogMsg);

  renderLogs();

  resultGenerator(monsterHealth, heroHealth);
};

// FUNCTION TO DETECT THE WINNER BASED ON CURRENT HP
const winnerSelector = (monsterHP, heroHP) => {
  if (monsterHP <= 0) {
    return "hero";
  }
  if (heroHP <= 0) {
    return "monster";
  }
  return 0;
};

// FUCTION TO DETECTH WHICH CHARACTHER HAS BEEN DEATH BASED ON CURRENT HP
const deathDetector = (HP) => {
  if (HP <= 0) {
    return 0;
  }
  return HP;
};

// FUNCTION TO GENERATE DAMAGE
const generateDamage = (monsterOpt, attackOpt = "attack") => {
  let monsterDmg = 0;
  let heroDmg = 0;

  console.log(`The monster attack option ${monsterOpt}`);
  if (attackOpt == "ultimate") {
    heroDmg = Math.round(Math.random() * 20 + 5);
  } else {
    heroDmg = Math.round(Math.random() * 10 + 5);
  }

  if (monsterOpt == "ultimate") {
    monsterDmg = Math.round(Math.random() * 20 + 5);
  } else {
    monsterDmg = Math.round(Math.random() * 10 + 5);
  }

  return {
    heroDmg: heroDmg,
    monsterDmg: monsterDmg,
  };
};

const logsGenerator = (monsterAttOpt, heroAttOpt, monsterDmg, heroDmg) => {
  console.log(`Monster attack option: ${monsterAttOpt}`);
  console.log(`Hero attack option: ${heroAttOpt}`);
  console.log(`Monster damage: ${monsterDmg}`);
  console.log(`Hero damage: ${heroDmg}`);

  battleLogs.innerHTML = "user attacked";

  let monsterLogMsg = `MONSTER: received ${heroDmg} damage from ${heroAttOpt == "attack" ? "basic attack" : heroAttOpt}`;
  let heroLogMsg = `HERO: received ${monsterDmg} damage from ${monsterAttOpt == "attack" ? "basic attack" : monsterAttOpt}`;

  battleLogs.innerHTML += `<p>${monsterLogMsg}</p>`;
  battleLogs.innerHTML += `<p>${heroLogMsg}</p>`;

  logs.push(monsterLogMsg);
  logs.push(heroLogMsg);

  renderLogs();
};

const renderLogs = () => {
  battleLogs.innerHTML = logs.map((log) => `<p>${log}</p>`).join("");

  battleLogs.scrollTop = battleLogs.scrollHeight;
};

attackBtn.addEventListener("click", attack);
ultiBtn.addEventListener("click", ultimate);
healBtn.addEventListener("click", heal);
