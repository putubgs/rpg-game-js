var tempHeroHP = 100;
var tempMonsterHP = 100;

const attackBtn = document.getElementById("attack-button");
const ultiBtn = document.getElementById("ultimate-button");
const healBtn = document.getElementById("heal-button");
const battleLogs = document.getElementById("battle-logs");

var heroHealth = 100;
var monsterHealth = 100;
const heroHealthBox = document.querySelector(".hero-health-bar");
const monsterHealthBox = document.querySelector(".monster-health-bar");

console.log(heroHealthBox);

heroHealthBox.style.setProperty("--hero-health", `${heroHealth}%`);
monsterHealthBox.style.setProperty("--monster-health", `${monsterHealth}%`);

let monsterOpt = 0;

// ATTACK FUNCTION AND CURRENT HEALTH CALCULATOR
const attack = () => {
  battleLogs.innerHTML = "user attacked";

  let lolAttack = generateDamage(Math.round(Math.random() * 1));

  tempMonsterHP -= lolAttack.heroDmg;
  tempHeroHP -= lolAttack.monsterDmg;

  console.log(tempHeroHP);
  console.log(tempMonsterHP);

  heroHealth = deathDetector(heroHealth - lolAttack.monsterDmg);

  heroHealthBox.style.setProperty("--hero-health", heroHealth + "%");

  monsterHealth = deathDetector(monsterHealth - lolAttack.heroDmg);

  monsterHealthBox.style.setProperty("--monster-health", `${monsterHealth}%`);

  monsterHealth.innerHTML = deathDetector(
    monsterHealth.innerHTML - lolAttack.monsterDmg,
  );

  console.log(`Monster's health remaining ${monsterHealth.innerHTML}`);
  console.log(`Hero's health remaning ${heroHealth}`);

  if (winnerSelector(monsterHealth, heroHealth) == "hero") {
    console.log("the monster is dead");
    attackBtn.disabled = true;
  }
  if (
    winnerSelector(monsterHealth, heroHealth) == "monster"
  ) {
    console.log("the hero is dead");
    attackBtn.disabled = true;
  }
};

const ultimate = () => {
  console.log("ultimate attack");
};

const heal = () => {
  console.log("user healed");
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

const generateDamage = (monsterOpt, attackOpt = "attack") => {
  let monsterDmg = 0;
  let heroDmg = 0;

  console.log(`The monster attack option ${monsterOpt}`);
  if (attackOpt == "ultimate") {
    heroDmg = Math.round(Math.random() * 20 + 5);
    // console.log(`the ultimeate attack value is ${Math.random() * 20 + 5}`);
  } else {
    heroDmg = Math.round(Math.random() * 10 + 5);
  }

  if (monsterOpt == 2) {
    monsterDmg = Math.round(Math.random() * 20 + 5);
    // console.log(
    // `Monster's ultimate attack value is ${Math.random() * 20 + 5}}`,
    // );
  } else {
    monsterDmg = Math.round(Math.random() * 10 + 5);
  }

  return {
    heroDmg: heroDmg,
    monsterDmg: monsterDmg,
  };
};

attackBtn.addEventListener("click", attack);
ultiBtn.addEventListener("click", ultimate);
healBtn.addEventListener("click", heal);
