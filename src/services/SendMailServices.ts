import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      this.client = transporter;
    });
  }

  async execute(
    to: string,
    subject: string,
    variables: Record<string, unknown>,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf8');

    const mailTemplateParse = handlebars.compile(templateFileContent);
    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: process.env.MAIL_FROM,
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
