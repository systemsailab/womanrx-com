import { redirect } from "next/navigation";

export default async function WeightLossIntakeRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const next = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) next.append(key, item);
      });
      return;
    }
    if (value) next.set(key, value);
  });

  if (!next.get("source")) next.set("source", "glp1-offer-v1");

  redirect(`/glp1-offer-v1/intake/height-weight?${next.toString()}`);
}
