import type { Context } from "@netlify/functions";

let pv = 1

export default async (req: Request, context: Context) => {
  pv++;
  return new Response(`pv: ${pv}`)
}
