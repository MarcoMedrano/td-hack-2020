import $ from "jquery";

export default class RemoteMouse {
  constructor(){
    $("#remoteMouse").show();
  }

  public move(posX: number, posY: number) {

    var mousePosition = $("#remoteMouse").position();
    
    // if (
    //   Math.abs(mousePosition.left - posX) + Math.abs(mousePosition.top - posY) >
    //   15
    // ) {
      $("#remoteMouse").animate(
        { top: posY + "px", left: posX + "px" },
        {
          duration: 0,
          complete: function () {},
        }
      );
    // }
    // $("#remoteMouse").hide();
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
