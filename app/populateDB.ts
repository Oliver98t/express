import fetch from 'node-fetch';

async function addItem(name: string, value: number) {
  const response = await fetch('http://localhost:3001/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, value })
  });
  const data = await response.json();
  return data;
}

// Example usage:
const num = 100;
for(let i = 0; i < num; i++)
{
    await addItem(`item${i}`, Math.round(Math.random() * 1000) / 10);
}