const remotes = [
  {
    path: '/dynamic-runtime-subpath',
    label: 'Remote App 1',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_1_URL || 'https://localhost:8081'}/app.js`,
    appName: 'app',
  },
];

export default {
  read: {
    delay: 2000,
    call: () => ({
      status: 200,
      data: remotes,
    }),
  },
};
