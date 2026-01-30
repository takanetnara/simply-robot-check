import LeadForm from "./components/LeadForm";
import ProfileTest from "./components/ProfileTest";

export const dynamic = "force-dynamic";

const lpoData = {
  refused: {
    heroH1: "予算5,000万円以下で\n大手SIerに断られた企業様へ",
    heroSub: "1台から即対応。元キーエンス・元豊田通商の杉谷が直接診断します。",
    painTitle: "「小規模案件」という理由で、後回しにされていませんか？",
    painText:
      "大手SIerの最低受注金額は5,000万円〜1億円。私たちは1,200万円〜のパッケージで、大手が見捨てる現場を救います。",
    imageDesc: "大手SIerの見積書を前に悩む担当者の写真",
  },
  speed: {
    heroH1: "2026年4月「物流効率化法」\nCLO選任・法的義務へ即応",
    heroSub: "納期1年を「2ヶ月」に。法的義務（CLO対応）を最短でクリア。",
    painTitle: "法改正まで時間がない。でも大手は「14ヶ月待ち」。",
    painText:
      "輸送量9万トン以上の荷主には法的義務が発生。トラックを待たせないパレタイズが、経営陣の法的リスクを回避します。",
    imageDesc: "物流効率化法の条文イメージと焦る経営者",
  },
  heavy: {
    heroH1: "腰痛離職をゼロにする。\n20kg超の重量物パレタイズ。",
    heroSub: "大手住宅メーカー様等での実績あり。過酷な重労働を即ロボット化。",
    painTitle: "募集をかけても人が来ない。過酷な現場の限界。",
    painText:
      "20kg超えの積み込みは、最も人が定着しない現場です。実績に基づくノウハウで、2ヶ月以内に現場を無人化します。",
    imageDesc: "建材や土袋を高く積み上げる現場写真",
  },
  printing: {
    heroH1: "「型崩れ厳禁」の印刷物を、\n独自リフター方式で優しく積む。",
    heroSub: "1分で品種切り替え完了。現場スタッフが使いこなせる最新システム。",
    painTitle: "吸着不能・掴めないワーク。諦めるのはまだ早いです。",
    painText:
      "崩れやすい印刷物の束。独自開発の「下から救い上げる」リフター方式（開発中）で、荷崩れさせずに正確にパレタイズ。",
    imageDesc: "印刷物の束を下から救い上げるアームのイメージ",
  },
  default: {
    heroH1: "24時間以内の即レス診断で、\n最短2ヶ月の現場導入へ。",
    heroSub: "1,200万円〜、最短2ヶ月。元キーエンス・元豊田通商のプロが直販。",
    painTitle: "人手不足で現場が止まる前に、自動化の「正解」を。",
    painText:
      "納期14ヶ月の「大手待ち」はもう不要。元キーエンス・豊田通商の知見を結集した即戦力パッケージを提案します。",
    imageDesc: "杉谷代表がロボットの横で微笑む信頼感のある写真",
  },
} as const;

type TargetKey = keyof typeof lpoData;
const highlightTokens = ["1,200万円〜", "2ヶ月"] as const;

const getTargetData = (target?: string) => {
  if (!target) return lpoData.default;
  return lpoData[target as TargetKey] ?? lpoData.default;
};

const renderEmphasis = (text: string) => {
  const regex = new RegExp(`(${highlightTokens.join("|")})`, "g");
  return text.split(regex).map((part, index) => {
    if (highlightTokens.includes(part as (typeof highlightTokens)[number])) {
      return (
        <span
          key={`${part}-${index}`}
          className="mx-1 inline-block text-2xl font-extrabold text-orange-400 md:text-3xl"
        >
          {part}
        </span>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { target?: string } | Promise<{ target?: string }>;
}) {
  const resolvedParams = await Promise.resolve(searchParams);
  const targetParam = resolvedParams?.target ?? "default";
  const data = getTargetData(resolvedParams?.target);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold text-blue-900">
            Simply Robot
          </div>
          <a
            href="#contact"
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            無料診断を依頼する
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-blue-950 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/75 to-blue-950/90" />
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
                2026年市場対応LP
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h1 className="text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl whitespace-pre-line">
                  {data.heroH1}
                </h1>
                <div className="flex items-center gap-2 rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-500/80 to-amber-300/80 px-4 py-2 text-sm font-semibold text-amber-50 shadow-lg">
                  <span className="text-base">🏅</span>
                  元キーエンス・元豊田通商
                </div>
              </div>
              <p className="mt-6 text-lg leading-8 text-blue-100 md:text-xl">
                {renderEmphasis(data.heroSub)}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-full bg-orange-500 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition hover:bg-orange-600"
                >
                  24時間以内の即レス診断を依頼
                </a>
                <div className="rounded-full border border-white/40 px-6 py-4 text-center text-base font-semibold text-white/90">
                  最短2ヶ月で導入
                </div>
              </div>
              <p className="mt-6 text-sm text-blue-200">
                ※現場診断から設計・据付までワンストップ対応
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6 text-base text-blue-100">
                {data.imageDesc}
              </div>
              <div className="mt-6 space-y-3 text-lg text-white">
                <p className="font-semibold">杉谷が直接対応</p>
                <p>1台から即導入可能</p>
                <p>見積・設計・運用まで一貫サポート</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold text-blue-900 md:text-4xl">
                {data.painTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                {data.painText}
              </p>
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-base text-blue-900">
                大手待ちで止まる現場を、即戦力パッケージで救済します。
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold text-slate-500">
                  実績ベースのアプローチ
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  住宅メーカー・物流センターで実稼働
                </p>
                <p className="mt-2 text-base text-slate-700">
                  20kg超の重量物や高頻度ラインでも、確実に現場稼働させたノウハウを提供。
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold text-slate-500">投資規模</p>
                <p className="mt-3 text-3xl font-semibold text-blue-900">
                  1,200万円〜
                </p>
                <p className="mt-2 text-base text-slate-700">
                  大手SIerの最低受注金額の約1/4で導入可能。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-3xl font-semibold text-blue-900 md:text-4xl">
              大手SIerとの比較
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-3 bg-slate-100 text-sm font-semibold text-slate-600">
                <div className="px-6 py-4">項目</div>
                <div className="px-6 py-4 text-center text-red-600">
                  大手SIer
                </div>
                <div className="px-6 py-4 text-center text-blue-900 bg-orange-50">
                  シンプリーロボット
                </div>
              </div>
              <div className="grid grid-cols-3 border-t border-slate-200 bg-white text-base">
                <div className="px-6 py-6 font-semibold text-slate-700">
                  納期
                </div>
                <div className="px-6 py-6 text-center text-red-600">
                  <span className="mr-2 text-lg">×</span>14ヶ月〜
                  <div className="mt-2 text-sm font-semibold text-red-500">
                    （※4ヶ月分の機会損失発生）
                  </div>
                </div>
                <div className="px-6 py-6 text-center text-2xl font-semibold text-orange-500 bg-orange-50">
                  <span className="mr-2 text-2xl">◎</span>2ヶ月
                </div>
              </div>
              <div className="grid grid-cols-3 border-t border-slate-200 bg-white text-base">
                <div className="px-6 py-6 font-semibold text-slate-700">
                  最低予算
                </div>
                <div className="px-6 py-6 text-center text-red-600">
                  <span className="mr-2 text-lg">×</span>5,000万円〜
                </div>
                <div className="px-6 py-6 text-center text-2xl font-semibold text-orange-500 bg-orange-50">
                  <span className="mr-2 text-2xl">◎</span>1,200万円〜
                </div>
              </div>
              <div className="grid grid-cols-3 border-t border-slate-200 bg-white text-base">
                <div className="px-6 py-6 font-semibold text-slate-700">
                  対応規模
                </div>
                <div className="px-6 py-6 text-center text-red-600">
                  <span className="mr-2 text-lg">×</span>大規模案件中心
                </div>
                <div className="px-6 py-6 text-center text-2xl font-semibold text-blue-900 bg-orange-50">
                  <span className="mr-2 text-2xl">◎</span>1台から即対応
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold text-blue-900 md:text-4xl">
            2ヶ月導入を実現する3つの強み
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "現場診断の即日化",
                text: "元キーエンスの現場感で、ラインのボトルネックを即日で特定。",
              },
              {
                title: "パッケージ化設計",
                text: "実績テンプレートを活用し、設計と見積を最短化。",
              },
              {
                title: "立ち上げまで伴走",
                text: "据付・立会い・教育までを杉谷が直接リード。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-100">
          <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold text-blue-900 md:text-4xl">
            なぜ大手より1,000万円安く、5倍速いのか？
          </h2>
            <p className="mt-4 text-lg text-slate-700">
              あなたに最適な提案スタイルをランダムで表示します。
            </p>
            <div className="mt-8">
              <ProfileTest />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold text-blue-900 md:text-4xl">
            導入までの流れ
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "STEP 1",
                title: "24時間以内の現場診断",
                text: "写真・図面・現場ヒアリングで導入可否を即判断。",
              },
              {
                step: "STEP 2",
                title: "最短2週間で設計",
                text: "現場に合わせたレイアウトと費用感を提示。",
              },
              {
                step: "STEP 3",
                title: "2ヶ月以内に稼働開始",
                text: "据付・試運転・スタッフ教育まで支援。",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-orange-500">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-3xl font-semibold text-blue-900 md:text-4xl">
              よくある質問
            </h2>
            <div className="mt-8 space-y-4">
              {[
                {
                  q: "小規模ラインでも相談できますか？",
                  a: "1台から対応可能です。現場規模に合わせて最適化します。",
                },
                {
                  q: "見積書がなくても相談できますか？",
                  a: "はい、写真や図面があれば概算提案が可能です。",
                },
                {
                  q: "導入後の保守はどうなりますか？",
                  a: "保守契約のプランを用意しています。稼働率を維持するための点検も対応します。",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <p className="text-lg font-semibold text-slate-900">
                    {item.q}
                  </p>
                  <p className="mt-2 text-base text-slate-700">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-slate-100">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold text-blue-900 md:text-4xl">
                  まずは無料診断で、導入可否を即日判断
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-700">
                  見積書画像や現場写真があると、より正確な提案が可能です。
                </p>
                <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-base text-blue-900">
                  対象業種：物流／住宅建材／印刷／重量物対応の現場
                </div>
              </div>
              <LeadForm targetParam={targetParam} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>株式会社シンプリーロボット</p>
          <p>© 2026 Simply Robot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
