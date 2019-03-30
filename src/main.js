const $container = document.querySelector("#container");
const $main = document.querySelector("#main");
const $mainImg = $main.querySelector("img");

let menu = false;

$mainImg.addEventListener("mousedown", () => {
  $mainImg.classList.add("focus");

  let cancel = true;
  setTimeout( () =>{
    cancel = false;
  }, 500);

  $mainImg.addEventListener("mouseup", () => {
    $mainImg.classList.remove("focus");
    if (cancel) return;

    $container.classList.replace("start", "menu");
    menu = true;
  });
});

$mainImg.addEventListener("click", () => {
  if (!menu) return;

  $main.classList.toggle("open");
});
