const $container = document.querySelector("#container");
const $main = document.querySelector("#main");
const $mainImg = $main.querySelector("img");

let menu = false;

if (location.pathname === "/") {
  const onMousedown = () => {
    $mainImg.classList.add("focus");

    let cancel = true;
    const timeoutId = setTimeout( () =>{
      cancel = false;
    }, 500);

    const onMouseLeave = () => {
      clearTimeout(timeoutId);
      $mainImg.classList.remove("focus");
      $mainImg.removeEventListener("mouseup", onMouseUp);
    };
    $mainImg.addEventListener("mouseleave", onMouseLeave);

    const onMouseUp = () => {
      clearTimeout(timeoutId);
      $mainImg.classList.remove("focus");
      $mainImg.removeEventListener("mouseleave", onMouseLeave);
      if (cancel) return;

      $container.classList.replace("start", "menu");
      $mainImg.removeEventListener("mousedown", onMousedown);
      menu = true;
    };
    $mainImg.addEventListener("mouseup", onMouseUp, { once: true });
  };
  $mainImg.addEventListener("mousedown", onMousedown);

  $mainImg.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
} else {
  menu = true;
}

$mainImg.addEventListener("click", () => {
  if (!menu) return;

  $main.classList.toggle("open");
});
