declare module 'dom-to-image-more' {
    interface DomToImage {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toPng(node: HTMLElement, options?: any): Promise<string>;
    }
  
    const domtoimage: DomToImage;
    export default domtoimage;
  }
  