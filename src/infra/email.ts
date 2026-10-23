import fs from "node:fs/promises";
import path from "node:path";

import transporter from "../config/nodemailer.config";

async function renderTemplate(arquivo: string, dados: Record<string, string>) {
  const html = await fs.readFile(
    path.join(__dirname, "..", "templates", arquivo),
    "utf-8",
  );
  return html.replace(
    /{{(\w+)}}/g,
    (_: string, chave: string) => dados[chave] ?? "",
  );
}
export async function sendConfirmation(
  email: string,
  nome: string,
  token: string,
) {
  const html = await renderTemplate("confirmar-registro.html", {
    appName: "Meu App",
    nome,
    linkConfirmacao: `${process.env.APP_URL}/api/auth/confirmar?token=${encodeURIComponent(token)}`,
    expiracao: "24 horas",
  });

  await transporter.sendMail({
    from: `"Meu App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirme seu e-mail",
    html,
  });
}
