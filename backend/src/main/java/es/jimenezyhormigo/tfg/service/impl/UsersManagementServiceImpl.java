package es.jimenezyhormigo.tfg.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import es.jimenezyhormigo.tfg.dto.ReqRes;
import es.jimenezyhormigo.tfg.entity.OurUser;
import es.jimenezyhormigo.tfg.repository.UserRepository;
import es.jimenezyhormigo.tfg.utility.JWTUtils;

@Service
public class UsersManagementServiceImpl {

    @Autowired
    private UserRepository usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();

        try {
        	if (usersRepo.findByDni(registrationRequest.getDni()).isPresent()) {
                resp.setMessage("DNI duplicado");
                return resp;
            }
        	
        	if (usersRepo.findByEmail(registrationRequest.getEmail()).isPresent()) {
                resp.setMessage("Email duplicado");
                return resp;
            }
        	
            OurUser ourUser = new OurUser();
            ourUser.setDni(registrationRequest.getDni());
            ourUser.setName(registrationRequest.getName());
            ourUser.setSurnames(registrationRequest.getSurnames());
            ourUser.setEmail(registrationRequest.getEmail());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUser.setRole(registrationRequest.getRole());
            ourUser.setCreationDate(registrationRequest.getCreationDate());

            OurUser ourUsersResult = usersRepo.save(ourUser);
            if (ourUsersResult.getId() > 0) {
                resp.setOurUsers((ourUsersResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            // Verificar si es el primer ingreso y ajustar la respuesta acordemente
            if (user.isFirstLogin()) {
                response.setMessage("First Time Logged In Successfully");
                response.setFirstLogin(true);
            } else {
                response.setMessage("Successfully Logged In");
                response.setFirstLogin(false);
            }

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");

        } catch (BadCredentialsException e) {
            response.setStatusCode(401);
            response.setMessage("Credenciales inválidas");
        } catch (UsernameNotFoundException e) {
            response.setStatusCode(404);
            response.setMessage("Usuario no encontrado.");
        } catch (AuthenticationException e) {
            response.setStatusCode(500);
            response.setMessage("Error de autenticación: " + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenReqiest) {
        ReqRes response = new ReqRes();
        try {
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            OurUser users = usersRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public ReqRes getAllUsers() {
        ReqRes reqRes = new ReqRes();

        try {
            List<OurUser> result = usersRepo.findAll();
            if (!result.isEmpty()) {
                reqRes.setOurUsersList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }

    public ReqRes getUsersById(Long id) {
        ReqRes reqRes = new ReqRes();
        try {
            OurUser usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setOurUsers(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes deleteUser(Long userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUser> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                usersRepo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateUser(Long userId, OurUser updatedUser) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUser> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                OurUser existingUser = userOptional.get();

                existingUser.setDni(updatedUser.getDni());
                existingUser.setName(updatedUser.getName());
                existingUser.setSurnames(updatedUser.getSurnames());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setRole(updatedUser.getRole());
                existingUser.setEmailNotifications(updatedUser.isEmailNotifications());
                existingUser.setCreationDate(updatedUser.getCreationDate());

                OurUser savedUser = usersRepo.save(existingUser);
                reqRes.setOurUsers(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes getMyInfo(String email) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUser> userOptional = usersRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setOurUsers(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes changePassword(String email, String newPassword) {
        ReqRes response = new ReqRes();
        try {
            Optional<OurUser> userOptional = usersRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                OurUser user = userOptional.get();
                user.setPassword(passwordEncoder.encode(newPassword));
                
                // Cambiar el estado de firstLogin a false después de cambiar la contraseña
                if (user.isFirstLogin()) {
                    user.setFirstLogin(false);
                }
                
                usersRepo.save(user);
                response.setStatusCode(200);
                response.setMessage("Password changed successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("User not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while changing password: " + e.getMessage());
        }
        return response;
    }
    
    public ReqRes forgotPassword(ReqRes request) {
        ReqRes response = new ReqRes();
        try {
            String email = request.getEmail();
            String dni = request.getDni();
            String newPassword = request.getPassword();

            // Verificar que el correo electrónico y el DNI coincidan con un usuario en la base de datos
            Optional<OurUser> userOptional = usersRepo.findByEmailAndDni(email, dni);
            if (userOptional.isPresent()) {
                OurUser user = userOptional.get();
                
                // Actualizar la contraseña del usuario
                user.setPassword(passwordEncoder.encode(newPassword));
                usersRepo.save(user);
                
                response.setStatusCode(200);
                response.setMessage("Contraseña restablecida exitosamente");

                // Generar y enviar el token JWT
                String jwt = jwtUtils.generateToken(user);
                response.setToken(jwt);
            } else {
                response.setStatusCode(404);
                response.setMessage("Usuario no encontrado");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al procesar la solicitud de restablecimiento de contraseña: " + e.getMessage());
        }
        return response;
    }


    public ReqRes verifyEmail(String dni, String password) {
        ReqRes response = new ReqRes();
        try {
            Optional<OurUser> userOptional = usersRepo.findByDni(dni);
            if (userOptional.isPresent()) {
                OurUser user = userOptional.get();

                // Verifica que el dni y la contraseña coincidan
                if (user.getDni().equals(dni) && passwordEncoder.matches(password, user.getPassword())) {
                    user.setEmailVerified(true);
                    usersRepo.save(user);
                    response.setStatusCode(200);
                    response.setMessage("Email verificado exitosamente");
                    response.setEmailVerified(true);
                } else {
                    response.setStatusCode(401);
                    response.setMessage("Credenciales inválidas para verificar el email");
                }
            } else {
                response.setStatusCode(404);
                response.setMessage("Usuario no encontrado para verificar el email");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error al verificar el email: " + e.getMessage());
        }
        return response;
    }
}
