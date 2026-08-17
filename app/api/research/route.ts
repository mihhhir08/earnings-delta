import { NextResponse } from "next/server";
import { financialDataProvider } from "@/lib/providers/financial";
import { runThesisStressTest } from "@/lib/research/stress-test";
import { thesisResearchRequestSchema, thesisResearchResponseSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const input = thesisResearchRequestSchema.safeParse(await request.json());
    if (!input.success) {
      return NextResponse.json({ error: "Enter a specific thesis for a supported company." }, { status: 400 });
    }

    const company = await financialDataProvider.getCompany(input.data.ticker);
    if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (payload: unknown) => controller.enqueue(encoder.encode(`${JSON.stringify(payload)}\n`));
        try {
          const run = await runThesisStressTest(company, input.data.mode, input.data.thesis, async (event) => {
            send(event);
            await new Promise<void>((resolve) => setImmediate(resolve));
          });
          send({ type: "result", run: thesisResearchResponseSchema.parse(run) });
        } catch {
          send({ type: "error", message: "The stress test could not complete." });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "The stress test is temporarily unavailable. Try again." }, { status: 500 });
  }
}
