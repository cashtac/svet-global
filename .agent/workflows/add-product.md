---
description: Add a new product to the SVET shop from a photo
---

# Add Product Photo to SVET Shop

When the user sends a product photo (image attachment), follow these steps:

## 1. Identify the Product
Ask the user (or identify from context) what the product is:
- Product type: t-shirt / hoodie / pants / long sleeve / cap / set
- Color: black / yellow / white / navy / etc.
- Logo style: bubble sVet™ / serif SVET / minimal / etc.

## 2. Save the Image
// turbo
Save the uploaded image to the products directory:
```
cp <uploaded_image_path> '/Users/daniils/Desktop/Studio OS/svet-global/public/images/products/<product-id>.jpg'
```
Use a clean filename like: `tshirt-black.jpg`, `hoodie-navy.jpg`, `pants-navy.jpg`

## 3. Update Product Data
Update the shared product data in TWO files:
- `app/shop/page.tsx` — the PRODUCTS array
- `app/product/[slug]/page.tsx` — the ALL_PRODUCTS array

For each product entry, set:
- `image: '/images/products/<filename>'` — the saved image path
- `sizes: ['S/M', 'L/XL']` — first drop sizes only (cap = `['ONE SIZE']`)
- Proper `nameKey` and `descKey` matching the i18n translation keys
- Proper `slug` in format `svet-<type>-<color>`

## 4. CSS Background Handling
Product images already display with:
- Light `#f5f5f5` background in the image container
- Gradient fade from image area to dark card body
- `object-fit: contain` with padding
- No `mix-blend-mode` — the white/light background of the photo blends naturally

No CSS changes needed per product.

## 5. Build and Deploy
// turbo
```
cd '/Users/daniils/Desktop/Studio OS/svet-global' && npx next build 2>&1 | tail -5
```

Then commit and deploy:
```
cd '/Users/daniils/Desktop/Studio OS/svet-global' && git add -A && git commit -m "feat: add <product-name> product photo" && npx -y vercel --prod --yes 2>&1
```

## 6. Verify
Open the shop page in the browser and take a screenshot to confirm the new product card looks correct.

## Product Data Template
```typescript
{
  id: '<type>-<color>',
  nameKey: 'product.<type>-<color>',
  descKey: 'product.<type>-<color>.desc',
  slug: 'svet-<type>-<color>',
  preOrderPrice: <price>,
  retailPrice: <retail>,
  sizes: ['S/M', 'L/XL'],
  category: 'CLOTHING',
  image: '/images/products/<filename>',
  // For PDP only:
  color: '<Color Name>',
  material: '<Material>',
  details: ['Detail 1', 'Detail 2', ...],
}
```

## Price Reference
- T-Shirt: $25 pre-order / $35 retail
- Long Sleeve: $45 / $60
- Hoodie: $69 / $95
- Pants: $59 / $85
- Set (Hoodie+Pants): $99 / $149
- Cap: $25 / $35
