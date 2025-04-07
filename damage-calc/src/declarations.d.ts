declare module 'dom-to-image-more' {
    interface DomToImage {
      toPng(node: HTMLElement, options?: any): Promise<string>;
    }
  
    const domtoimage: DomToImage;
    export default domtoimage;
  }
  