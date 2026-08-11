import { NextResponse } from "next/server";
import { answerGroundedQuestion } from "@/lib/research/answer";
import { financialDataProvider } from "@/lib/providers/financial";
import { askDeltaRequestSchema, askDeltaResponseSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const input = askDeltaRequestSchema.safeParse(await request.json());
    if (!input.success) {
      return NextResponse.json({ error: "Enter a valid question for a supported company." }, { status: 400 });
    }

    const company = await financialDataProvider.getCompany(input.data.ticker);
    if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

    const response = answerGroundedQuestion(company, input.data.mode, input.data.question);
    return NextResponse.json(askDeltaResponseSchema.parse(response));
  } catch {
    return NextResponse.json({ error: "Research is temporarily unavailable. Try again." }, { status: 500 });
  }
}
