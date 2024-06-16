package es.jimenezyhormigo.tfg.service.impl;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import es.jimenezyhormigo.tfg.dto.EmailDto;
import es.jimenezyhormigo.tfg.entity.OurUser;
import es.jimenezyhormigo.tfg.exception.MailSendingException;
import es.jimenezyhormigo.tfg.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Service
public class MailServiceImpl {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final UserRepository userRepository;

    public void sendMail(EmailDto mail) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(mail.getMailTo());
            helper.setSubject(mail.getSubject());

            Context context = new Context();
            context.setVariable("message", mail.getMessage());
            context.setVariable("name", mail.getName());
            context.setVariable("logo", "logo");
            String contentHTML = templateEngine.process("email", context);

            helper.setText(contentHTML, true);
            helper.addInline("logo", new ClassPathResource("static/LogoJyH_NoFondo.png"));

            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailSendingException("Error al enviar el correo: " + e.getMessage());
        }
    }

    public void sendMailAll(String subject, String message) {
        List<OurUser> users = userRepository.findByEmailVerifiedTrueAndEmailNotificationsTrue();

        for (OurUser user : users) {
            try {
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                helper.setTo(user.getEmail());
                helper.setSubject(subject);

                Context context = new Context();
                context.setVariable("message", message);
                context.setVariable("name", user.getName());
                context.setVariable("logo", "logo");
                String contentHTML = templateEngine.process("emailNotification", context);

                helper.setText(contentHTML, true);
                helper.addInline("logo", new ClassPathResource("static/LogoJyH_NoFondo.png"));

                javaMailSender.send(mimeMessage);
            } catch (Exception e) {
                throw new MailSendingException("Error al enviar el correo a " + user.getEmail() + ": " + e.getMessage());
            }
        }
    }
    
    public void sendMailResetPassword(EmailDto mail, String temporalUrl) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(mail.getMailTo());
            helper.setSubject(mail.getSubject());

            Context context = new Context();
            context.setVariable("temporalUrl", temporalUrl);
            context.setVariable("name", mail.getName());
            context.setVariable("logo", "logo");
            String contentHTML = templateEngine.process("emailConfirmResetPassword", context);

            helper.setText(contentHTML, true);
            helper.addInline("logo", new ClassPathResource("static/LogoJyH_NoFondo.png"));

            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailSendingException("Error al enviar el correo: " + e.getMessage());
        }
    }
}
