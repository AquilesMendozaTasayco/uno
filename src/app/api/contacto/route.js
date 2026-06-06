import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, asunto, mensaje } = body;

    if (!nombre || !email || !asunto || !mensaje) {
      return Response.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"UNO Publicidad" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Nuevo contacto: ${asunto} – ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <style>
            body { margin: 0; padding: 0; background: #f5f5f5; font-family: Arial, sans-serif; }
            .wrapper { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 16px; overflow: hidden; }
            .header { background: #E8001C; padding: 32px 36px; }
            .header h1 { margin: 0; color: #fff; font-size: 22px; font-family: Georgia, serif; }
            .header p { margin: 6px 0 0; color: rgba(255,255,255,0.7); font-size: 13px; }
            .body { padding: 32px 36px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #E8001C; margin-bottom: 4px; }
            .value { font-size: 15px; color: #1a1a1a; line-height: 1.5; }
            .mensaje-box { background: #fafafa; border-left: 3px solid #E8001C; padding: 16px 20px; border-radius: 0 10px 10px 0; }
            .footer { background: #f0f0f0; padding: 18px 36px; }
            .footer p { margin: 0; font-size: 11px; color: #666; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>UNO Publicidad</h1>
              <p>Nuevo mensaje desde el formulario de contacto</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Nombre</div>
                <div class="value">${nombre}</div>
              </div>
              <div class="field">
                <div class="label">Correo</div>
                <div class="value"><a href="mailto:${email}" style="color:#E8001C">${email}</a></div>
              </div>
              ${telefono ? `
              <div class="field">
                <div class="label">Teléfono</div>
                <div class="value">${telefono}</div>
              </div>` : ""}
              <div class="field">
                <div class="label">Asunto</div>
                <div class="value">${asunto}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje</div>
                <div class="value mensaje-box">${mensaje.replace(/\n/g, "<br/>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>Enviado desde unopubli.com &bull; ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return Response.json(
      { ok: false, error: "Error al enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
