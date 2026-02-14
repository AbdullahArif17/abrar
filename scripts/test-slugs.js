
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'b5dr6ut1',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function test() {
  const query = `*[_type == "product"] { _id, title, "slug": slug.current }`;
  try {
    const products = await client.fetch(query);
    console.log('Products found:', products.length);
    products.forEach(p => {
      console.log(`- ID: ${p._id}, Title: ${p.title}, Slug: ${p.slug}`);
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
