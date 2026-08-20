# Payload config patch — disable Search plugin for `posts`

## Problem

The deployed Payload template includes the Search plugin and lists `posts` in its `collections` array:

```ts
// payload.config.ts (current, broken)
plugins: [
  searchPlugin({
    collections: ['posts', /* ...other collections */],
  }),
],
```

The plugin's `beforeChange` hook on the `posts` collection runs an internal `payload.create({ collection: 'search', ... })` to mirror every post into the search index. When you PATCH a post's `_status` to `"published"` and the main collection writes commit, the hook fires the search create **inside the same transaction**. On this template the search create hits a constraint failure (the search row's polymorphic `doc` relation is written with a `value` shape that conflicts with the unique constraint on the polymorphic key), and Postgres rolls back the entire transaction.

The PATCH response shows `_status: "published"` because that's the value being written to the response, but the actual stored value is reverted to `"draft"` (or whatever it was before). The public read endpoint filters on `_status: { equals: "published" }`, so only the 4 posts that were seeded via the template's own internal migration — which uses a different code path that doesn't trigger the Search hook in the same way — are publicly visible. New posts land as drafts and never escape.

## Fix

Remove `posts` from the Search plugin's `collections` array. The blog doesn't need a search index (the site has no in-site search), and the Search collection can be deleted entirely.

```ts
// payload.config.ts (fixed)
plugins: [
  searchPlugin({
    collections: [/* remove 'posts' — blog doesn't need search */],
  }),
],
```

After the change, redeploy the Payload service. Then run the seed script (`npm run seed:blog`) to republish the 8 stuck drafts. Or publish them in the Payload admin UI by hitting "Publish" on each draft card.

## How to apply (no source available)

The Payload service was deployed from a Railway template, so the source `payload.config.ts` isn't checked in to any repo in this workspace. To apply the fix:

1. **Railway shell** — open the Payload service in the Railway dashboard → "Shell" tab, then:
   ```bash
   find / -name "payload.config.ts" -not -path "*/node_modules/@payloadcms/*" 2>/dev/null
   ```
   This finds the live config file. Edit it (vim/nano) to remove `'posts'` from the search plugin's collections list.

2. **Rebuild** — the change is bundled, so trigger a redeploy of the Payload service. Railway will rebuild the container with the patched config.

3. **Republish** — either click "Publish" on each draft card in the Payload admin UI, or run the seed script:
   ```bash
   PAYLOAD_URL=https://payload-cms-production-25bc.up.railway.app \
   ADMIN_EMAIL="..." ADMIN_PASSWORD="..." \
   npx tsx scripts/seed-blog.ts
   ```
   The seeder uses the two-step draft→publish flow that survives the broken hook.

## Verification

After the fix:
```bash
curl -sS "https://payload-cms-production-25bc.up.railway.app/api/posts?where[_status][equals]=published&limit=200" | python3 -c "
import json, sys
d = json.load(sys.stdin)
print('totalDocs:', d['totalDocs'])
for p in d['docs']:
    print(f\"  id={p['id']:3} slug={p['slug']}\")
"
```

Should print 12 posts (or however many are seeded).

## Alternative workaround (no Payload config change)

If you can't modify Payload's config, run `scripts/payload-fix/publish-all-drafts.ts` after every seed — it does a delete + recreate as published which avoids the broken hook path. This is fragile (duplicate IDs grow the row count over time) but it works until the config is patched.
