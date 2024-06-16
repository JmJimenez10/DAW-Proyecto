package es.jimenezyhormigo.tfg.exception;

public class MailSendingException extends RuntimeException {
    public MailSendingException(String message) {
        super(message);
    }
}

