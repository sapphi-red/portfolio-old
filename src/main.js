const $container = document.querySelector("#container");
const $main = document.querySelector("#main");

let menu = false;

if (location.pathname === "/") {
  // PC
  {
    const onMousedown = () => {
      $main.classList.add("focus");

      let cancel = true;
      const timeoutId = setTimeout( () =>{
        cancel = false;
      }, 500);

      const onMouseLeave = () => {
        clearTimeout(timeoutId);
        $main.classList.remove("focus");
        $main.removeEventListener("mouseup", onMouseUp);
      };
      $main.addEventListener("mouseleave", onMouseLeave);

      const onMouseUp = () => {
        clearTimeout(timeoutId);
        $main.classList.remove("focus");
        $main.removeEventListener("mouseleave", onMouseLeave);
        if (cancel) return;

        $container.classList.replace("start", "menu");
        $main.removeEventListener("mousedown", onMousedown);
        menu = true;
      };
      $main.addEventListener("mouseup", onMouseUp, { once: true });
    };
    $main.addEventListener("mousedown", onMousedown);

    $main.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  }

  // smartphone
  {
    const onTouchStart = () => {
      $main.classList.add("focus");

      let cancel = true;
      const timeoutId = setTimeout( () =>{
        cancel = false;
      }, 500);

      const onTouchEnd = () => {
        clearTimeout(timeoutId);
        $main.classList.remove("focus");
        if (cancel) return;

        $container.classList.replace("start", "menu");
        $main.removeEventListener("touchstart", onTouchStart);
        menu = true;
      };
      $main.addEventListener("touchend", onTouchEnd, { once: true });
    };
    $main.addEventListener("touchstart", onTouchStart);
  }
} else {
  menu = true;
}

$main.addEventListener("click", () => {
  if (!menu) return;

  $main.classList.toggle("open");
});
