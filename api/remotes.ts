export default function readRemotes(req, res) {
  res.status(200).json([{ data: process.env.VERCEL_URL }]);
}
