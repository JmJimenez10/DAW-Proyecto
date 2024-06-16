package es.jimenezyhormigo.tfg.service.impl;

import es.jimenezyhormigo.tfg.entity.Company;
import es.jimenezyhormigo.tfg.entity.OurUser;
import es.jimenezyhormigo.tfg.repository.CompanyRepository;
import es.jimenezyhormigo.tfg.repository.UserRepository;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class CompanyUserServiceImpl {

    private CompanyRepository companyRepository;
    private UserRepository userRepository;

    @Transactional
    public void addUserToCompany(Long companyId, Long userId) {
        // Buscar la compañía y el usuario por sus IDs
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + companyId));

        OurUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Agregar el usuario a la lista de usuarios de la compañía
        company.getUsers().add(user);

        // Guardar la compañía actualizada
        companyRepository.save(company);
    }
    
    @Transactional(readOnly = true)
    public List<OurUser> getAllCompanyUsers() {
        // Obtener todos los usuarios asociados a todas las compañías
        List<OurUser> allUsers = companyRepository.findAll().stream()
                .flatMap(company -> company.getUsers().stream()) // Obtener todos los usuarios de cada compañía
                .collect(Collectors.toList());

        return allUsers;
    }
    
    @Transactional(readOnly = true)
    public Set<OurUser> getUsersByCompanyId(Long companyId) {
        // Obtener los usuarios asociados a una compañía por su ID
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + companyId));

        Set<OurUser> users = company.getUsers();

        return users;
    }
    
    @Transactional(readOnly = true)
    public Set<Company> getCompaniesByUserId(Long userId) {
        // Obtener las empresas asociadas a un usuario por su ID
        OurUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Set<Company> companies = user.getCompanies();

        return companies;
    }
    
    @Transactional
    public void deleteUserFromCompany(Long companyId, Long userId) {
        // Buscar la compañía por su ID
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + companyId));

        // Buscar el usuario por su ID
        OurUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Remover el usuario de la lista de usuarios de la compañía
        company.getUsers().remove(user);

        // Guardar la compañía actualizada
        companyRepository.save(company);
    }

    
}
