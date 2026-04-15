const attackBtn = document.getElementById("attack-button");
const ultiBtn = document.getElementById("ultimate-button");
const healBtn = document.getElementById("heal-button");

const attack = () => {
  console.log("user attacked");
};

const ultimate = () => {
  console.log("ultimate attack");
};

const heal = () => {
  console.log("user healed");
};

attackBtn.addEventListener("click", attack);
ultiBtn.addEventListener("click", ultimate);
healBtn.addEventListener("click", heal);
