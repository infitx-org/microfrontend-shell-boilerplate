import WebpackContainerError from './WebpackContainerError';
import WebpackLoadingError from './WebpackLoadingError';

function loadComponent(url: string, scope: string, moduleName: string): () => Promise<unknown> {
  return () =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = async () => {
        try {
          // @ts-ignore
          await __webpack_init_sharing__('default');
          // @ts-ignore
          const container = window[scope];
          if (!container) {
            reject(new WebpackContainerError(`container ${scope} not found`));
          }

          // @ts-ignore
          await container.init(__webpack_share_scopes__.default);
          // @ts-ignore
          const factory = await window[scope].get(`./${moduleName}`);
          const Module = factory();
          resolve(Module);
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = () => {
        reject(new WebpackLoadingError(`Error loading from ${url}`));
      };

      const head =
        document.querySelector('head') || document.body.appendChild(document.createElement('head'));
      head.appendChild(script);
    });
}

export default loadComponent;
