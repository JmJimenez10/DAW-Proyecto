package es.jimenezyhormigo.tfg.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.OurUser;
import es.jimenezyhormigo.tfg.repository.UserRepository;
import es.jimenezyhormigo.tfg.service.CompanyService;
import es.jimenezyhormigo.tfg.service.impl.CompanyUserServiceImpl;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
public class CompanyUserController {

    private final CompanyUserServiceImpl companyUserService;

    @GetMapping("/api/companyUser/admin")
    public ResponseEntity<List<OurUser>> getAllCompanyUsers() {
        List<OurUser> allCompanyUsers = companyUserService.getAllCompanyUsers();
        return ResponseEntity.ok(allCompanyUsers);
    }
    
    @GetMapping("/api/companyUser/admin/users/{companyId}")
    public ResponseEntity<Set<OurUser>> getUsersByCompanyId(@PathVariable Long companyId) {
        Set<OurUser> users = companyUserService.getUsersByCompanyId(companyId);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/api/companyUser/adminuser/companies/{userId}")
    public ResponseEntity<Set<Company>> getCompaniesByUserId(@PathVariable Long userId) {
        Set<Company> companies = companyUserService.getCompaniesByUserId(userId);
        return ResponseEntity.ok(companies);
    }
    
    @DeleteMapping("/api/companyUser/admin/{companyId}/{userId}")
    public ResponseEntity<String> deleteUserFromCompany(@PathVariable Long companyId, @PathVariable Long userId) {
        companyUserService.deleteUserFromCompany(companyId, userId);
        return ResponseEntity.ok("User removed from company successfully");
    }

}
