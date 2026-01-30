import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const dynamic = "force-dynamic";

type ProfileKey = "A" | "B" | "C" | "D";

const profileLabels: Record<ProfileKey, string> = {
  A: "ROI最短化",
  B: "完遂信頼",
  C: "SIer難民救済",
  D: "爆速即レス",
};

const sumByProfile = (rows: { profile_type: ProfileKey }[]) => {
  return rows.reduce(
    (acc, row) => {
      acc[row.profile_type] += 1;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0 }
  );
};

export default async function AbTestDashboard() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-slate-900">
          ABテスト ダッシュボード
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Supabaseの環境変数が未設定です。
        </p>
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("ab_test_logs")
    .select("profile_type, viewed_at")
    .order("viewed_at", { ascending: false })
    .limit(5000);

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-slate-900">
          ABテスト ダッシュボード
        </h1>
        <p className="mt-4 text-base text-red-600">
          取得に失敗しました: {error.message}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          RLSのSELECTポリシーが必要です。
        </p>
      </div>
    );
  }

  const rows = (data ?? []) as { profile_type: ProfileKey; viewed_at: string }[];
  const totals = sumByProfile(rows);
  const totalCount = rows.length;
  const latest = rows[0]?.viewed_at
    ? new Date(rows[0].viewed_at).toLocaleString("ja-JP")
    : "まだデータがありません";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">
          ABテスト ダッシュボード
        </h1>
        <p className="mt-2 text-base text-slate-600">
          総表示回数: <span className="font-semibold">{totalCount}</span> /
          最新: <span className="font-semibold">{latest}</span>
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {(Object.keys(totals) as ProfileKey[]).map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                プロフィール {key}
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {profileLabels[key]}
              </p>
              <p className="mt-4 text-4xl font-extrabold text-blue-900">
                {totals[key]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">最近の表示</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {rows.slice(0, 10).map((row, index) => (
              <li key={`${row.viewed_at}-${index}`}>
                {new Date(row.viewed_at).toLocaleString("ja-JP")} —{" "}
                <span className="font-semibold">
                  プロフィール {row.profile_type}
                </span>
              </li>
            ))}
            {rows.length === 0 && <li>まだ表示ログがありません。</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
