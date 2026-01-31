import { NextResponse } from "next/server";

type LeadRecord = Record<string, unknown>;

const getString = (value: unknown) =>
  typeof value === "string" ? value : "";

const formatRecord = (record: LeadRecord) => {
  const lines = Object.entries(record).map(([key, value]) => {
    if (value === null || value === undefined) {
      return `${key}:`;
    }
    if (typeof value === "object") {
      return `${key}: ${JSON.stringify(value)}`;
    }
    return `${key}: ${String(value)}`;
  });
  return lines.join("\n");
};

const getCompanyName = (record: LeadRecord) =>
  getString(record.company) ||
  getString(record.company_name) ||
  getString(record.companyName);

const getContactName = (record: LeadRecord) =>
  getString(record.name) ||
  getString(record.contact_name) ||
  getString(record.contactName);

const sendLinePush = async (record: LeadRecord) => {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "";
  const userId = process.env.LINE_USER_ID ?? "";
  if (!token || !userId) {
    return { skipped: true, reason: "LINE環境変数が未設定です。" };
  }

  const company = getCompanyName(record);
  const message = `【至急】商談候補の問い合わせ！ 社名: ${company} 様`;

  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text: message }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`LINE push failed: ${response.status} ${body}`);
  }

  return { ok: true };
};

const sendResendEmail = async (record: LeadRecord) => {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  if (!apiKey) {
    return { skipped: true, reason: "RESEND_API_KEYが未設定です。" };
  }

  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
  const to = process.env.RESEND_TO ?? "takanetnara@gmail.com";
  const company = getCompanyName(record);
  const contact = getContactName(record);

  const subject = "【商談候補】新規問い合わせ";
  const text = [
    "新しい問い合わせが入りました。",
    "",
    `社名: ${company}`,
    `担当者: ${contact}`,
    "",
    "---- 受信内容 ----",
    formatRecord(record),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend failed: ${response.status} ${body}`);
  }

  return { ok: true };
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      record?: LeadRecord;
      type?: string;
      table?: string;
    };

    const record = payload.record ?? (payload as LeadRecord);
    if (!record || Object.keys(record).length === 0) {
      return NextResponse.json(
        { error: "recordが空です。" },
        { status: 400 }
      );
    }

    const results = await Promise.allSettled([
      sendLinePush(record),
      sendResendEmail(record),
    ]);

    const failures = results.filter(
      (result) => result.status === "rejected"
    );

    if (failures.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          results,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
