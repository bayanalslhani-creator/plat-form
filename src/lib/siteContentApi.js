import { base44 } from "@/api/base44Client";

export async function saveSection(key, data) {
  const existing = await base44.entities.SiteContent.filter(
    { key },
    "-updated_date",
    1
  );
  if (existing.length > 0 && existing[0].id) {
    return base44.entities.SiteContent.update(existing[0].id, { data });
  }
  return base44.entities.SiteContent.create({ key, data });
}