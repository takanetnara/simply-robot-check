"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase, supabaseEnabled } from "@/lib/supabaseClient";

type ProfileKey = "A" | "B" | "C" | "D";

const profileContent: Record<
  ProfileKey,
  { title: string; lead: string; points: string[] }
> = {
  A: {
    title: "ROI最短化アプローチ",
    lead: "投資回収の早さを最優先に、導入計画と費用対効果を明確化。",
    points: [
      "2ヶ月導入を前提にROI試算",
      "人件費・残業・離職コストを可視化",
      "定量成果を経営会議向けに整理",
    ],
  },
  B: {
    title: "完遂信頼アプローチ",
    lead: "元豊田通商の商社品質で、納期と品質の確実性を重視。",
    points: [
      "実行責任の所在を明確化",
      "現場導入までの段取りを一括管理",
      "長期稼働の保守運用まで設計",
    ],
  },
  C: {
    title: "SIer難民救済アプローチ",
    lead: "大手に断られた案件を、即戦力パッケージで救済。",
    points: [
      "1,200万円〜の現実価格",
      "小規模案件でも即レス対応",
      "大手不在の空白地帯を埋める",
    ],
  },
  D: {
    title: "爆速即レスアプローチ",
    lead: "24時間以内の診断で、すぐに動ける体制を約束。",
    points: [
      "初回診断を最短当日実施",
      "現場課題を即日フィードバック",
      "導入までの最短スケジュールを提示",
    ],
  },
};

export default function ProfileTest() {
  const keys = useMemo(() => Object.keys(profileContent) as ProfileKey[], []);
  const [profileKey, setProfileKey] = useState<ProfileKey | null>(null);

  useEffect(() => {
    const selected = keys[Math.floor(Math.random() * keys.length)];
    setProfileKey(selected);

    if (!supabaseEnabled || !supabase) return;
    supabase
      .from("ab_test_logs")
      .insert({
        profile_type: selected,
        viewed_at: new Date().toISOString(),
      })
      .then(() => undefined);
  }, [keys]);

  if (!profileKey) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-lg text-slate-500">プロフィールを準備中...</p>
      </div>
    );
  }

  const profile = profileContent[profileKey];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
        プロフィール{profileKey}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-900">
        {profile.title}
      </h3>
      <p className="mt-3 text-lg text-slate-700">{profile.lead}</p>
      <ul className="mt-5 space-y-2 text-base text-slate-700">
        {profile.points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
