package es.jimenezyhormigo.tfg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.jimenezyhormigo.tfg.dto.EmailDto;
import es.jimenezyhormigo.tfg.service.impl.MailServiceImpl;
import jakarta.mail.MessagingException;

@RestController
public class MailController {
    
    @Autowired
    private MailServiceImpl mailService;

    @PostMapping("api/mail/send")
    public ResponseEntity<String> sendMail(@RequestBody EmailDto mail) throws MessagingException {
        mailService.sendMail(mail);
        return new ResponseEntity<>("Email enviado", HttpStatus.OK);
    }

    @PostMapping("api/mail/send-all")
    public ResponseEntity<String> sendMassMail(@RequestBody EmailDto mail) {
        mailService.sendMailAll(mail.getSubject(), mail.getMessage());
        return new ResponseEntity<>("Emails enviados", HttpStatus.OK);
    }
    
    @PostMapping("api/mail/reset-password")
    public ResponseEntity<String> sendMailResetPassword(@RequestBody EmailDto mail) throws MessagingException {
        String temporalUrl = mail.getTemporalUrl();
        mailService.sendMailResetPassword(mail, temporalUrl);
        return new ResponseEntity<>("Email enviado", HttpStatus.OK);
    }
}
