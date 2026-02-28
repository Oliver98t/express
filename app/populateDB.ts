import fetch from 'node-fetch';

async function addItem(input: object, table: string) {
  const response = await fetch(`http://localhost:3001/${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  const data = await response.json();
  return data;
}

// Example usage:
const num = 100;
for(let i = 0; i < num; i++)
{
    await addItem({
        name: `item${i}`,
        value: Math.round(Math.random() * 1000) / 10
    }, "item");
    await addItem({
        email: `name${i}@test.com`,
        name: `name${i}`
    }, "user");
}