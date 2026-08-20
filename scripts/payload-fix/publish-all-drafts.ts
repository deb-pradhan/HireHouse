/**
 * Payload CMS — diagnostic helper, not a fix.
 *
 * Status: this script can list drafts and verify state, but it CANNOT publish
 * them. The deployed Payload template has a broken Search plugin hook on the
 * `posts` collection's beforeChange that silently rolls back every
 * `_status: "published"` write — across REST PATCH, GraphQL updatePost, and
 * delete+recreate. All three paths return success but leave _status as "draft".
 *
 * The real fix is on the Payload side: edit `payload.config.ts` to remove
 * `'posts'` from `searchPlugin({ collections: [...] })`. See
 * `payload.config.ts.patch.md` for details and Railway-shell steps.
 *
 * What this script DOES do:
 *   1. List every draft post on the live Payload instance.
 *   2. Print the slugs you need to publish manually in the Payload admin UI.
 *
 * Until the Payload config is patched, the only reliable publish path is
 * the Payload admin UI's "Publish" button on each draft card.
 *
 * Usage
 * ─────
 *   PAYLOAD_URL=https://payload-cms-production-25bc.up.railway.app \
 *   ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="********" \
 *   npx tsx scripts/payload-fix/publish-all-drafts.ts
 */

const URL = process.env.PAYLOAD_URL ?? "https://payload-cms-production-25bc.up.railway.app";
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD env vars.");
  process.exit(1);
}

let token = "";

async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status} ${JSON.stringify(json)}`);
  return json;
}

async function login() {
  const json = (await api("/users/login", {
    method: "POST",
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })) as { token: string; user: { email: string } };
  token = json.token;
  console.log(`✓ logged in as ${json.user.email}`);
}

type Post = { id: number; slug: string; title: string; _status: string };

async function listAll(): Promise<Post[]> {
  const all = (await api("/posts?limit=200&draft=true&depth=0")) as { docs: Post[] };
  return all.docs ?? [];
}

async function main() {
  console.log(`Inspecting ${URL} …`);
  await login();

  const posts = await listAll();
  const drafts = posts.filter((p) => p._status !== "published");
  const published = posts.filter((p) => p._status === "published");

  console.log(`  ${posts.length} total posts`);
  console.log(`    ${published.length} published (visible publicly)`);
  console.log(`    ${drafts.length} draft (invisible publicly)`);
  console.log();
  console.log("Drafts needing manual publish in the Payload admin UI:");
  for (const d of drafts) {
    console.log(`  • ${d.slug} (id=${d.id}) — ${d.title}`);
  }

  console.log();
  console.log("→ Open https://payload-cms-production-25bc.up.railway.app/admin/collections/posts");
  console.log("  and click Publish on each draft card above.");
  console.log();
  console.log("If you have shell access to the Railway service, edit payload.config.ts");
  console.log("to remove 'posts' from searchPlugin({ collections: [...] }) and redeploy —");
  console.log("see payload.config.ts.patch.md for the exact diff and steps.");
}

main().catch((e) => {
  console.error("✗ diagnostic failed:", e.message);
  process.exit(1);
});
