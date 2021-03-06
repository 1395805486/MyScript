function ArrayViews(controller) {
  this.views = [];
  this.getViews = function() {
    return this.views;
  };
  function getView(controller) {
    var views = controller;
    if (typeof views == "object") {
      for (var i in views) {
        getView(views[i].views);
        var id = views[i].id;
        if (id != undefined) this.views.push(id);
      }
    }
  }
  getView(controller);
  return this;
}
