import { ComponentType } from 'react';
import WebpackContainerError from './WebpackContainerError';
import WebpackLoadingError from './WebpackLoadingError';

function Mm() {
  // @ts-ignore
  this.loaded = false;
  // @ts-ignore
  this.callbacks = [];
  // @ts-ignore
  this.registerCallback = (fn: any) => {
    // @ts-ignore
    if (this.loaded) {
      fn();
    } else {
      // @ts-ignore
      this.callbacks.push(fn);
    }
  };
  // @ts-ignore
  this.executeCallbacks = () => {
    // @ts-ignore
    this.loaded = true;
    let fn;
    // @ts-ignore // eslint-disable-line
    while ((fn = this.callbacks.pop())) {
      // eslint-disable-line
      fn();
    }
  };
  // @ts-ignore
  this.modules = new Map();
}

export default (function loadComponentWrapper() {
  const apps = new Map();

  return function loadComponent(
    url: string,
    scope: string,
    moduleName: string,
  ): () => Promise<{ default: ComponentType<any> }> {
    return () =>
      new Promise((resolve, reject) => {
        // defines the applicaton reference
        const app = `${url}#${scope}`;

        async function init(scope: string) {
          const factory = await window[scope].get(`./${moduleName}`);
          const Module = factory();
          resolve(Module);

          // const mm = apps.get(app);
          // mm.registerCallback(async () => {
          //   const { modules } = mm;
          //   if (!modules.has(moduleName)) {
          //     try {
          //       // @ts-ignore
          //       console.log(window, scope, moduleName, modules)
          //       const factory = await window[scope].get(`./${moduleName}`);
          //       const Module = factory();
          //       modules.set(moduleName, Module);
          //     } catch (e) {
          //       reject(new WebpackContainerError(`module ${moduleName} not found`));
          //     }
          //   }
          //   // console.log(mm);
          //   // console.log(url, scope, module);
          //   resolve(modules.get(moduleName));
          // });
        }

        async function load() {
          console.log('looking for ', app, scope)
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
            init(scope);
            apps.get(app).executeCallbacks();
          } catch (error) {
            reject(error);
          }
        }

        console.log('before:', { apps })
        if (apps.has(app)) {
          console.log('[   ] has:', app)
          init(scope);
        } else {

          console.log('[ X ] has not:', app)
          // @ts-ignore
          apps.set(app, new Mm());
          console.log('after:', { apps })
          const script = document.createElement('script');
          script.src = url;
          script.onerror = () => {
            reject(new WebpackLoadingError(`Error loading from ${url}`));
          };
          script.onload = load;

          const head =
            document.querySelector('head') ||
            document.body.appendChild(document.createElement('head'));
          head.appendChild(script);
        }
      });
  };
})();
