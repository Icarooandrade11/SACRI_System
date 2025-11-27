
import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM, // ex: "seu_sistema <sistema_escolhido@gmail.com>"
} = process.env;

const fromAddress = MAIL_FROM || (SMTP_USER ? `SACRI <${SMTP_USER}>` : null);

let transporter = null;
let transportReady = false;
let transportError = null;

async function buildTransporter() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !fromAddress) {
    transportError = `[mailer] Variáveis ausentes: ${
      [
        !SMTP_HOST && 'SMTP_HOST',
        !SMTP_PORT && 'SMTP_PORT',
        !SMTP_USER && 'SMTP_USER',
        !SMTP_PASS && 'SMTP_PASS',
        !fromAddress && 'MAIL_FROM/SMTP_USER',
      ]
        .filter(Boolean)
        .join(', ')
    }`;
    console.warn(transportError);
    return null;
  }

  const t = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // 465 = TLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await t.verify();
    console.log('[mailer] SMTP pronto (verify OK).');
    transportReady = true;
    return t;
  } catch (err) {
    transportError = `[mailer] verify falhou: ${err?.message || err}`;
    console.warn(transportError);
    return null;
  }
}

// inicializa de forma preguiçosa (útil se dotenv não carregou a tempo)
async function getTransporter() {
  if (transporter || transportReady || transportError) return transporter;
  transporter = await buildTransporter();
  return transporter;
}

export async function sendPasswordRecoveryEmail({ to, name, link }) {
  const html = `
    <div style="font-family:Arial,sans-serif">
      <h2>Recuperação de senha</h2>
      <p>Olá, ${name || ''}!</p>
      <p>Clique no botão abaixo para redefinir sua senha:</p>
      <p><a href="${link}" style="background:#22c55e;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Redefinir senha</a></p>
      <p>Se você não solicitou, ignore este e-mail.</p>
      <hr/>
      <small>O link expira em 1 hora.</small>
    </div>
  `;

  const t = await getTransporter();

  if (!t) {
    // Sem SMTP válido: **mock** explícito com razão
    console.info('📧 [MAIL MOCK - sem SMTP válido]', {
      reason: transportError || 'Variáveis incompletas',
      to,
      subject: 'SACRI — Recuperação de senha',
    });
    console.info(html);
    return { delivered: false, mocked: true, reason: transportError || 'missing-env' };
  }

  const info = await t.sendMail({
    from: fromAddress,
    to,
    subject: 'SACRI — Recuperação de senha',
    html,
  });

  console.log('[mailer] Enviado:', info.messageId, info.response);
  if (info.rejected?.length) {
    throw new Error('E-mail rejeitado: ' + info.rejected.join(', '));
  }
  return { delivered: true, id: info.messageId };
}

export async function sendRoleApprovalRequestEmail({ requester, approvalLink }) {
  const to = "systemsacri@gmail.com";
  const subject = "SACRI — Aprovação de cadastro especial";

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a">
      <h2 style="color:#0ea5b9">Novo cadastro aguardando aprovação</h2>
      <p><strong>Nome:</strong> ${requester?.name || ""}</p>
      <p><strong>E-mail:</strong> ${requester?.email || ""}</p>
      <p><strong>Papel solicitado:</strong> ${requester?.role || ""}</p>
      ${requester?.phone ? `<p><strong>Telefone:</strong> ${requester.phone}</p>` : ""}
      ${requester?.organization ? `<p><strong>Organização:</strong> ${requester.organization}</p>` : ""}
      <p style="margin-top:16px">Confirme ou rejeite manualmente este cadastro.</p>
      <p>Para aprovar diretamente, clique no botão abaixo:</p>
      <p><a href="${approvalLink}" style="background:#22c55e;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Aprovar cadastro</a></p>
    </div>
  `;

  const t = await getTransporter();
  if (!t) {
    console.info('📧 [MAIL MOCK - sem SMTP válido]', {
      reason: transportError || 'Variáveis incompletas',
      to,
      subject,
    });
    console.info(html);
    return { delivered: false, mocked: true, reason: transportError || 'missing-env' };
  }

  const info = await t.sendMail({ from: fromAddress, to, subject, html });
  console.log('[mailer] Enviado:', info.messageId, info.response);
  if (info.rejected?.length) {
    throw new Error('E-mail rejeitado: ' + info.rejected.join(', '));
  }
  return { delivered: true, id: info.messageId };
}
