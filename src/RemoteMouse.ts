import $ from "jquery";

export default class RemoteMouse {
  public show() {
    $("#remoteMouse").show();
  }

  public move(posX: number, posY: number) {
    $("#remoteMouse").animate(
      { top: posY + "px", left: posX + "px" },
      {
        duration: 100,
        complete: function () {},
      }
    );
  }

  public click(posX: number, posY: number) {
    console.log("click");

    var d = document.createElement("div");
    d.className = "clickEffect";
    d.style.top = posY + "px";
    d.style.left = posX + "px";

    document.body.appendChild(d);

    d.addEventListener(
      "animationend",
      function () {
        (d as any).parentElement.removeChild(d);
      }.bind(this)
    );
  }
}
