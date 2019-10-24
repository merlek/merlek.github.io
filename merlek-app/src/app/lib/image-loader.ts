export interface ImageSet {
  [key: string]: HTMLImageElement;
}
export interface ImageSourceSet {
  [key: string]: string;
}
export class ImageLoader {
  private loaded = 0;
  private readonly total;
  private readonly images: ImageSet = {};
  constructor(
    sources: ImageSourceSet,
    callback: (images: ImageSet) => void = () => {}
  ) {
    let t = 0;
    for (const src in sources) {
      if (sources.hasOwnProperty(src)) {
        t++;
      }
    }
    this.total = t;

    for (const src in sources) {
      if (sources.hasOwnProperty(src)) {
        this.images[src] = new Image();
        this.images[src].src = sources[src];
      }
    }

    this.onLoad(callback);
  }

  public hasImage(img: string) {
    return this.images[img] != null;
  }
  public onLoad(callback: (images: ImageSet) => void) {
    // console.log('onLoad loaded=' + this.loaded + ', total=' + this.total);
    for (const img in this.images) {
      if (this.images.hasOwnProperty(img)) {
        if (this.loaded < this.total) {
          // console.log('   images not loaded, add listener');
          this.images[img].addEventListener(
            'load',
            () => {
              if (++this.loaded >= this.total) {
                // console.log('   images  loaded');
                callback(this.images);
              }
            },
            false
          );
        } else {
          // console.log('   images loaded, execute callback');
          callback(this.images);
        }
      }
    }
  }
}
