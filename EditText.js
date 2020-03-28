class EditText {
  constructor(preView) {
    if (typeof preView == "object") {
      if (preView.toString().indexOf("object BB") == 1) {
        var _ = this;
        this.editText = $ui.create({
          type: "text"
        });
        $timer.schedule({
          interval: 1,
          handler: function() {
            var text = _.editText.text;
            if (text != "" && text != _.textArray[_.textArraylen]) {
              _.textArray.push(text);
              _.textArraylen = _.textArray.length - 1;
            }
          }
        });
        preView.add(this.editText);
        this.init();
        return this;
      }
    }
    return null;
  }

  init() {
    this.textArray = new Array();
    this.textArray.push("");
    this.textArraylen = 0;
  }

  redo() {
    if (this.textArraylen > 0) this.textArraylen--;
    this.editText.text = this.textArray[this.textArraylen];
  }

  undo() {
    if (this.textArraylen < this.textArray.length - 1) this.textArraylen++;
    this.editText.text = this.textArray[this.textArraylen];
  }

  edit() {
    return this.editText;
  }
}