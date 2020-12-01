export default class WebpackContainerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Webpack Container Error';
  }
}
