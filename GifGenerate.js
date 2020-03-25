function GifGenerate(data) {
  this.data = data;
  this.assets_ = "/assets/";
  this.images_ = "/images/";
  this.init = async function(path) {
    var assets_ = this.assets_ + path;
    var config = {
      subtitles: {},
      durations: []
    };
    $file.mkdir(assets_);
    $file.mkdir(assets_ + this.images_);
    const { images, durations } = await $imagekit.extractGIF(this.data);
    for (var i = 0; i < images.length; i++) {
      var data = $imagekit.scaleFill(images[i], $size(200, 130)).jpg(1);
      $file.write({
        data: data,
        path: assets_ + this.images_ + i + ".jpg"
      });
    }
    config.durations = durations;
    $file.write({
      data: $data({ string: JSON.stringify(config, null, 2) }),
      path: assets_ + "/config.json"
    });
  };
  this.rate = function(path) {
    var images = [];
    var config = {};
    var images_ = this.assets_ + path + this.images_;
    for (var i = 0; i < $file.list(images_).length; i++) {
      images.push(
        $file.read(this.assets_ + path + this.images_ + i + ".jpg").image
      );
    }
    config = _initConfig(
      JSON.parse($file.read(this.assets_ + path + "/config.json").string)
    );
    images = _initImages(images, config);
    return $imagekit.makeGIF(images, {
      durations: config.durations
    });
  };
  this.edit = function(path, subtitles) {
    var config_ = this.assets_ + path + "/config.json";
    var config = JSON.parse($file.read(config_).string);
    config.subtitles = subtitles;
    $file.write({
      data: $data({ string: JSON.stringify(config, null, 2) }),
      path: config_
    });
  };
  function _initConfig(config) {
    var no_undefined;
    for (var i = 0; i < config.durations.length; i++) {
      if (config.subtitles[i] != undefined) no_undefined = i;
      else config.subtitles[i] = config.subtitles[no_undefined];
    }
    return config;
  }
  function _initImages(images, config) {
    for (var i = 0; i < images.length; i++) {
      var subtitle = config.subtitles[i];
      images[i] = $imagekit.render(
        {
          size: $size(200, 130),
          color: $color("clear")
        },
        ctx => {
          var rect = $rect(0, 0, 200, 130);
          ctx.addRect(rect);
          ctx.drawImage(rect, images[i]);
          ctx.drawText(
            $rect(100 - (12.33 * subtitle.length) / 2, 110, 200, 130),
            subtitle,
            {
              color: $color("white"),
              font: $font(".SFUI-Semibold", 12)
            }
          );
        }
      );
    }
    return images;
  }
  return this;
}
