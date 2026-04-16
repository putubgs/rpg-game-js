// var heroHealth = 100;
// var monsterHealth = 100;
var tempHeroHP = 100;
var tempMonsterHP = 100;

const attackBtn = document.getElementById("attack-button");
const ultiBtn = document.getElementById("ultimate-button");
const healBtn = document.getElementById("heal-button");
const battleLogs = document.getElementById("battle-logs");

const heroHealth = document.getElementById("hero-health");
const monsterHealth = document.getElementById("monster-health");

let monsterOpt = 0;

const attack = () => {
  battleLogs.innerHTML = "user attacked";
  //   console.log(`the attack value is ${Math.random() * 10 + 5}`);

  let lolAttack = generateDamage(Math.round(Math.random() * 1) + 1);

  tempMonsterHP -= lolAttack.heroDmg;
  tempHeroHP -= lolAttack.monsterDmg;

  heroHealth.innerHTML = deathDetector(tempHeroHP);
  monsterHealth.innerHTML = deathDetector(tempMonsterHP);

  console.log(`Monster's health remaining ${monsterHealth.innerHTML}`);
  console.log(`Hero's health remaning ${heroHealth.innerHTML}`);

  if (winnerSelector(monsterHealth.innerHTML, heroHealth.innerHTML) == "hero") {
    console.log("the monster is dead");
    attackBtn.disabled = true;
  }
  if (
    winnerSelector(monsterHealth.innerHTML, heroHealth.innerHTML) == "monster"
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

const winnerSelector = (monsterHP, heroHP) => {
  if (monsterHP <= 0) {
    return "hero";
  }
  if (heroHP <= 0) {
    return "monster";
  }
  return 0;
};

const deathDetector = (HP) => {
  if (HP <= 0) {
    return 0;
  }
  return HP;
};

// setTimeout(() => {
//     attack()
// }, 2000)

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
