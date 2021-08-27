const remotes = [
  {
    path: '/dynamic-runtime-subpath',
    label: 'Remote App 1',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_1_URL}/app.js`,
    appName: 'app',
  },
  {
    path: '/app2',
    label: 'Remote App 2',
    menuComponent: 'Menu2',
    appComponent: 'App2',
    url: `${process.env.REMOTE_2_URL}/app2.js`,
    appName: 'app2',
  },
];



export default function readRemotes(req, res) {
  res.status(200).json(remotes);
}
