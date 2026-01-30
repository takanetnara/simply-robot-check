"use client";

import { FormEvent, useRef, useState } from "react";
import {
  supabase,
  supabaseBucket,
  supabaseEnabled,
} from "@/lib/supabaseClient";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface LeadFormProps {
  targetParam: string;
}

export default function LeadForm({ targetParam }: LeadFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileSelected, setFileSelected] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!supabaseEnabled || !supabase) {
      setStatus("error");
      setErrorMessage(
        "Supabaseの環境変数が未設定です。設定後に再度お試しください。"
      );
      return;
    }

    const formData = new FormData(event.currentTarget);
    const file = formData.get("attachment") as File | null;

    let attachmentUrl = "";
    if (file && file.size > 0) {
      setFileSelected(true);
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/\s+/g, "_");
      const filePath = `leads/${timestamp}_${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from(supabaseBucket)
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        setStatus("error");
        setErrorMessage("画像のアップロードに失敗しました。");
        return;
      }

      const { data } = supabase.storage
        .from(supabaseBucket)
        .getPublicUrl(filePath);
      attachmentUrl = data.publicUrl;
    }

    const { error } = await supabase.from("leads").insert({
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: (formData.get("phone") as string | null) || null,
      message: String(formData.get("message") ?? ""),
      target_param: targetParam,
      attachment_url: attachmentUrl,
    });

    if (error) {
      setStatus("error");
      setErrorMessage("送信に失敗しました。時間をおいて再度お試しください。");
      return;
    }

    event.currentTarget.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileSelected(false);
    setStatus("success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div>
        <label
          htmlFor="attachment"
          className="flex w-full cursor-pointer items-center justify-center rounded-2xl bg-orange-500 px-6 py-6 text-center text-xl font-semibold text-white shadow-lg transition hover:bg-orange-600"
        >
          他社見積書をスマホで撮って送る
        </label>
        <input
          ref={fileInputRef}
          id="attachment"
          name="attachment"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(event) =>
            setFileSelected(Boolean(event.currentTarget.files?.length))
          }
          className="sr-only"
        />
        <p className="mt-2 text-sm text-slate-500">
          スマホの場合はそのままカメラが起動します。PCの場合は画像を選択してください。
        </p>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700" htmlFor="email">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base"
          placeholder="info@simplyrobot.co.jp"
        />
      </div>

      {fileSelected && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="name"
              >
                お名前
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base"
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="company"
              >
                会社名
              </label>
              <input
                id="company"
                name="company"
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base"
                placeholder="株式会社シンプリーロボット"
              />
            </div>
            <div>
              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="phone"
              >
                電話番号
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base"
                placeholder="03-1234-5678"
              />
            </div>
          </div>

          <div>
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="message"
            >
              ご相談内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base"
              placeholder="パレタイズ対象の製品や現在の課題をご記入ください。"
            />
          </div>
        </>
      )}

      {fileSelected && (
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-blue-900 px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          無料診断を申し込む
        </button>
      )}

      {status === "success" && (
        <p className="text-base font-semibold text-emerald-600">
          送信が完了しました。24時間以内にご連絡します。
        </p>
      )}
      {status === "error" && (
        <p className="text-base font-semibold text-red-600">{errorMessage}</p>
      )}
    </form>
  );
}
