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
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_2_URL}/app.js`,
    appName: 'app',
  },
];



export default function readRemotes(req, res) {
  res.status(200).json(remotes);
}
