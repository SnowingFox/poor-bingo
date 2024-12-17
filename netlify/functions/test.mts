import type { Context } from "@netlify/functions";
import * as fs from 'fs';

export default async (req: Request, context: Context) => {
  const filePath = './pv.txt';
  let pv = 0;
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    pv = parseInt(data, 10);
  } catch (error) {
    console.error('Error reading PV file:', error);
  }
  await fs.promises.writeFile(filePath, (pv + 1).toString());
  return new Response(`pv: ${pv + 1}`);
}