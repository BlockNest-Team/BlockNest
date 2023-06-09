export default async function handler(req, res) {
  const response = await fetch(
    `https://api.replicate.com/v1/predictions/${req.query.id}`,
    {
      headers: {
        Authorization: "r8_2n8unrY0V9ZG8eSDNKV0YBnIUodk8Jo0eWrZJ",
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.end(JSON.stringify(prediction));
}
