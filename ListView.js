$include("ArrayViews");
for (var view of ArrayViews($ui.controller.view.views).views) {
  if ($(view).toString() == "[object BBScrollView]") {
    $(view).addViews = function(views, lineHeight) {
      var height = 0;
      for (view of views) {
        height += lineHeight;
        var _ = $ui.create(view);
        this.add(_);
        if (view.layout != undefined) {
          _.layout((p1, p2) => {
            p1.top.equalTo(p2.prev != undefined ? p2.prev.bottom : 0);
            view.layout(p1, p2);
          });
          this.contentSize = $size(0, height);
        } else {
          _.layout((p1, p2) => {
            p1.left.equalTo(16);
            p1.top.equalTo(p2.prev != undefined ? p2.prev.bottom : 0).inset(16);
            p1.width.equalTo($device.info.screen.width - 32);
            p1.height.equalTo(lineHeight);
          });
          this.contentSize = $size(0, (height += 16));
        }
      }
    };
  }
}
