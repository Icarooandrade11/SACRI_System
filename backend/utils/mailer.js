const buildPayload = ({ to, subject, html }) => ({
  to,
  subject,
  html,
  from: process.env.MAIL_FROM || "no-reply@sacri.local",
});

export const sendMail = async ({ to, subject, html }) => {
  const payload = buildPayload({ to, subject, html });
  const webhook = process.env.MAIL_WEBHOOK_URL;

  if (webhook) {
    const headers = { "Content-Type": "application/json" };
    if (process.env.MAIL_WEBHOOK_TOKEN) {
      headers.Authorization = `Bearer ${process.env.MAIL_WEBHOOK_TOKEN}`;
    }

    const response = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Falha ao enviar e-mail (status ${response.status})`);
    }

    return { delivered: true };
  }

  console.info("📧 [MAIL MOCK]", { to: payload.to, subject: payload.subject });
  console.info(html);
  return { delivered: false, mocked: true };
};

export const sendPasswordRecoveryEmail = async ({ to, name, link }) => {
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Recuperação de senha - SACRI</h2>
      <p>Olá ${name || ""}, recebemos uma solicitação para redefinir a sua senha.</p>
      <p><a href="${link}" style="padding: 12px 18px; background: #16a34a; color: #fff; text-decoration: none; border-radius: 6px;">Definir nova senha</a></p>
      <p>Ou copie e cole este link no navegador: ${link}</p>
      <p>Se você não fez esta solicitação, ignore este e-mail.</p>
    </div>
  `;

  return sendMail({ to, subject: "SACRI • Recuperação de senha", html });
};
