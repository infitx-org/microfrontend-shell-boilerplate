export default class WebpackLoadingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Webpack Loading Error';
  }
}
