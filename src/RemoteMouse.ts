import $ from "jquery";

export default class RemoteMouse {
  public show() {
    $("#remoteMouse").show();
  }

  public move(posX: number, posY: number) {
    $("#remoteMouse").animate(
      {
        top: $(window).height() * posY + "px",
        left: $(window).width() * posX + "px",
      },
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
    d.style.top = $(window).height() * posY + "px";
    d.style.left = $(window).width() * posX + "px";

    document.body.appendChild(d);

    d.addEventListener(
      "animationend",
      function () {
        (d as any).parentElement.removeChild(d);
      }.bind(this)
    );
  }
}
