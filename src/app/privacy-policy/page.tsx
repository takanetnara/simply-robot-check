export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16 text-slate-800">
        <h1 className="text-3xl font-semibold text-blue-900">
          プライバシーポリシー
        </h1>
        <p className="mt-4 text-base text-slate-700">
          株式会社シンプリーロボット（以下「当社」）は、個人情報の保護を重要な責務と考え、
          個人情報の取扱いに関する方針を以下のとおり定め、適切に管理・運用します。
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">1. 事業者情報</h2>
          <div className="text-base text-slate-700">
            <p>会社名：株式会社シンプリーロボット</p>
            <p>代表者：代表取締役 杉谷 卓宏</p>
            <p>
              所在地：〒464-0807 愛知県名古屋市千種区東山通2-4-1 HARVEY
              MOTOYAMA 5F
            </p>
            <p>電話番号：052-388-6775</p>
            <p>メールアドレス：info@simplyrobot.co.jp</p>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            2. 取得する個人情報
          </h2>
          <p className="text-base text-slate-700">
            当社は、お問い合わせや資料請求、診断依頼等に際して、お名前、会社名、メールアドレス、
            電話番号、相談内容、添付画像、アクセスログ等を取得する場合があります。
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            3. 利用目的
          </h2>
          <ul className="list-inside list-disc space-y-2 text-base text-slate-700">
            <li>
              お問い合わせ、見積依頼、診断依頼への回答および資料送付
            </li>
            <li>
              ロボット導入、物流・製造現場の効率化に関するコンサルティング業務の提供
            </li>
            <li>
              2026年問題を含む業界動向、法規制、ソリューションに関する情報提供
              （メール・LINE等）
            </li>
            <li>当社が提供する新サービス、展示会、セミナー等のご案内</li>
            <li>サービス向上のためのアンケート調査および分析</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            4. 第三者提供について
          </h2>
          <p className="text-base text-slate-700">
            当社は法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供しません。
            ただし、適切な通知サービス（LINE Messaging API、メール配信システム等）を
            利用するため、必要最小限の範囲で個人情報を外部APIと連携する場合があります。
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            5. 安全管理措置
          </h2>
          <p className="text-base text-slate-700">
            当社は個人情報の漏えい、滅失、毀損等を防止するため、組織的・技術的な安全管理措置を
            講じます。
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            6. 開示・訂正・削除等
          </h2>
          <p className="text-base text-slate-700">
            本人から個人情報の開示、訂正、利用停止、削除等の請求があった場合、適切な本人確認の上、
            法令に従い速やかに対応します。
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            7. Cookie等の利用
          </h2>
          <p className="text-base text-slate-700">
            当社はサイトの利便性向上やアクセス解析のためにCookie等を利用する場合があります。
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            8. お問い合わせ窓口
          </h2>
          <p className="text-base text-slate-700">
            本ポリシーに関するお問い合わせは、上記「事業者情報」に記載の窓口までご連絡ください。
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            9. ポリシーの変更
          </h2>
          <p className="text-base text-slate-700">
            当社は法令等の変更に応じて、本ポリシーを改定する場合があります。改定後は本ページに
            掲載します。
          </p>
        </section>
      </div>
    </main>
  );
}
