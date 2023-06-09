// get predisctions using its handler

export default async function handler(req, res) {
  const { prompt, guidance_scale, seed } = req.body;
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: "r8_2n8unrY0V9ZG8eSDNKV0YBnIUodk8Jo0eWrZJ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      input: {
        prompt: prompt,
        guidance_scale: guidance_scale,
        seed: seed,
      },
    }),
  });
  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }
  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
