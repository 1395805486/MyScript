$include("ArrayViews");
for (var id of ArrayViews($ui.controller.view.views).views) {
  $(id).setShadow = function(num = 2, color = "black", alpha = 0.1) {
    if (isNumber(num) && haveShadow(this, num, color, alpha)) {
      var colors = [$color(color), $color("clear")];
      var prev = this.super;
      var id = this.id;
      var left = $ui.create({
        type: "gradient",
        props: {
          id: id + "_left",
          colors: colors,
          locations: [0, 1],
          startPoint: $point(1, 1),
          endPoint: $point(0, 1),
          alpha: alpha
        }
      });
      var right = $ui.create({
        type: "gradient",
        props: {
          id: id + "_right",
          colors: colors,
          locations: [0, 1],
          startPoint: $point(0, 0),
          endPoint: $point(1, 0),
          alpha: alpha
        }
      });
      var top = $ui.create({
        type: "gradient",
        props: {
          id: id + "_top",
          colors: colors,
          locations: [0, 1],
          startPoint: $point(0, 1),
          endPoint: $point(0, 0),
          alpha: alpha
        }
      });
      var bottom = $ui.create({
        type: "gradient",
        props: {
          id: id + "_bottom",
          colors: colors,
          locations: [0, 1],
          startPoint: $point(0, 0),
          endPoint: $point(0, 1),
          alpha: alpha
        }
      });
      var left_top = $ui.create({
        type: "gradient",
        props: {
          id: id + "_left_top",
          colors: colors,
          locations: [0, 0.5],
          startPoint: $point(1, 1),
          endPoint: $point(0, 0),
          alpha: alpha
        }
      });
      var right_top = $ui.create({
        type: "gradient",
        props: {
          id: id + "_right_top",
          colors: colors,
          locations: [0, 0.5],
          startPoint: $point(0, 1),
          endPoint: $point(1, 0),
          alpha: alpha
        }
      });
      var left_bottom = $ui.create({
        type: "gradient",
        props: {
          id: id + "_left_bottom",
          colors: colors,
          locations: [0, 0.5],
          startPoint: $point(1, 0),
          endPoint: $point(0, 1),
          alpha: alpha
        }
      });
      var right_bottom = $ui.create({
        type: "gradient",
        props: {
          id: id + "_right_bottom",
          colors: colors,
          locations: [0, 0.5],
          startPoint: $point(0, 0),
          endPoint: $point(1, 1),
          alpha: alpha
        }
      });
      var self = $ui.create({
        type: "view",
        props: {
          id: id + "_self",
          bgcolor: colors[0],
          alpha: alpha
        }
      });
      prev.add(left);
      prev.add(right);
      prev.add(top);
      prev.add(bottom);
      prev.add(left_top);
      prev.add(right_top);
      prev.add(left_bottom);
      prev.add(right_bottom);
      prev.insertBelow(self, this);
      left.layout((make, view) => {
        make.width.equalTo(num);
        make.height.equalTo(this.height);
        make.right.equalTo(this.left);
        make.top.equalTo(this.top);
      });
      right.layout((make, view) => {
        make.width.equalTo(num);
        make.height.equalTo(this.height);
        make.left.equalTo(this.right);
        make.top.equalTo(this.top);
      });
      top.layout((make, view) => {
        make.height.equalTo(num);
        make.left.equalTo(this.left);
        make.right.equalTo(this.right);
        make.bottom.equalTo(this.top);
      });
      bottom.layout((make, view) => {
        make.height.equalTo(num);
        make.left.equalTo(this.left);
        make.right.equalTo(this.right);
        make.top.equalTo(this.bottom);
      });
      left_top.layout((make, view) => {
        make.width.height.equalTo(num);
        make.right.equalTo(top.left);
        make.bottom.equalTo(left.top);
      });
      right_top.layout((make, view) => {
        make.width.height.equalTo(num);
        make.left.equalTo(top.right);
        make.bottom.equalTo(right.top);
      });
      left_bottom.layout((make, view) => {
        make.width.height.equalTo(num);
        make.right.equalTo(bottom.left);
        make.top.equalTo(left.bottom);
      });
      right_bottom.layout((make, view) => {
        make.width.height.equalTo(num);
        make.left.equalTo(bottom.right);
        make.top.equalTo(right.bottom);
      });
      self.layout((make, view) => {
        make.left.equalTo(left.right);
        make.right.equalTo(right.left);
        make.top.equalTo(top.bottom);
        make.bottom.equalTo(bottom.top);
      });
    }
  };
}

function isNumber(obj) {
  if (obj != undefined) return typeof obj == "number";
  return false;
}

function haveShadow(obj, num = 2, color = "black", alpha = 0.1) {
  var views = ArrayViews(obj.super.views).views;
  if (views.indexOf(obj.id + "_left") != -1) {
    function init(views) {
      for (var view of views) {
        if (view.id.indexOf("_self") != -1) view.bgcolor = $color(color);
        else view.colors = [$color(color), $color("clear")];
        view.alpha = alpha;
      }
    }
    var left = $(obj.id + "_left");
    var right = $(obj.id + "_right");
    var top = $(obj.id + "_top");
    var bottom = $(obj.id + "_bottom");
    var left_top = $(obj.id + "_left_top");
    var right_top = $(obj.id + "_right_top");
    var left_bottom = $(obj.id + "_left_bottom");
    var right_bottom = $(obj.id + "_right_bottom");
    var self = $(obj.id + "_self");
    init([
      left,
      right,
      top,
      bottom,
      left_top,
      right_top,
      left_bottom,
      right_bottom,
      self
    ]);
    left.updateLayout(make => {
      make.width.equalTo(num);
      make.height.equalTo(obj.height);
      make.right.equalTo(obj.left);
      make.top.equalTo(obj.top);
    });
    right.updateLayout(make => {
      make.width.equalTo(num);
      make.height.equalTo(obj.height);
      make.left.equalTo(obj.right);
      make.top.equalTo(obj.top);
    });
    top.updateLayout(make => {
      make.height.equalTo(num);
      make.left.equalTo(obj.left);
      make.right.equalTo(obj.right);
      make.bottom.equalTo(obj.top);
    });
    bottom.updateLayout(make => {
      make.height.equalTo(num);
      make.left.equalTo(obj.left);
      make.right.equalTo(obj.right);
      make.top.equalTo(obj.bottom);
    });
    left_top.updateLayout(make => {
      make.width.height.equalTo(num);
      make.right.equalTo(top.left);
      make.bottom.equalTo(left.top);
    });
    right_top.updateLayout(make => {
      make.width.height.equalTo(num);
      make.left.equalTo(top.right);
      make.bottom.equalTo(right.top);
    });
    left_bottom.updateLayout(make => {
      make.width.height.equalTo(num);
      make.right.equalTo(bottom.left);
      make.top.equalTo(left.bottom);
    });
    right_bottom.updateLayout(make => {
      make.width.height.equalTo(num);
      make.left.equalTo(bottom.right);
      make.top.equalTo(right.bottom);
    });
    self.updateLayout(make => {
      make.left.equalTo(left.right);
      make.right.equalTo(right.left);
      make.top.equalTo(top.bottom);
      make.bottom.equalTo(bottom.top);
    });

    return false;
  }
  return true;
}
