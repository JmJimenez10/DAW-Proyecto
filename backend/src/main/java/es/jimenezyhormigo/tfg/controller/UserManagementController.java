package es.jimenezyhormigo.tfg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import es.jimenezyhormigo.tfg.dto.ReqRes;
import es.jimenezyhormigo.tfg.entity.OurUser;
import es.jimenezyhormigo.tfg.service.impl.UsersManagementServiceImpl;

@RestController
public class UserManagementController {
	
	@Autowired
    private UsersManagementServiceImpl usersManagementService;
	
	@PostMapping("/api/users/admin/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg){
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    @PostMapping("/api/users/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.login(req));
    }

    @PostMapping("/api/users/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }
    
    @GetMapping("/api/users/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());

    }

    @GetMapping("/api/users/admin/get-user/{userId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));

    }

    @PutMapping("/api/users/adminuser/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Long userId, @RequestBody OurUser reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/api/users/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/api/users/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUSer(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }
    
    @PostMapping("/api/users/adminuser/change-password")
    public ResponseEntity<ReqRes> changePassword(@RequestBody ReqRes request) {
        String email = request.getEmail();
        String newPassword = request.getPassword();

        ReqRes response = usersManagementService.changePassword(email, newPassword);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    
    @PostMapping("/api/users/auth/forgot-password")
    public ResponseEntity<ReqRes> forgotPassword(@RequestBody ReqRes request) {
        return ResponseEntity.ok(usersManagementService.forgotPassword(request));
    }
    
    @PostMapping("/api/users/verify-email")
    public ResponseEntity<ReqRes> verifyEmail(@RequestBody ReqRes request) {
        String dni = request.getDni();
        String password = request.getPassword();

        ReqRes response = usersManagementService.verifyEmail(dni, password);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
