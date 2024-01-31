export interface Pic {
  src?: string;
  caption?: string;
  alt?: string;
  title?: string;
}

export interface SliderPic extends Pic {
  thumbSrc: string;
}
