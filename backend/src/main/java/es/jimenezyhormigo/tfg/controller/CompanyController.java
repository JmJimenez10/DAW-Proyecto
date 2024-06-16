package es.jimenezyhormigo.tfg.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.jimenezyhormigo.tfg.dto.CompanyDto;
import es.jimenezyhormigo.tfg.service.CompanyService;
import es.jimenezyhormigo.tfg.service.impl.CompanyUserServiceImpl;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/companies")
public class CompanyController {

	private CompanyService companyService;
	private CompanyUserServiceImpl companyUserService;

	@PostMapping("/admin")
	public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto) {
		CompanyDto savedCompany = companyService.createCompany(companyDto);
		return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
	}

	@GetMapping("/admin")
	public ResponseEntity<List<CompanyDto>> getAllCompanies() {
		List<CompanyDto> companies = companyService.getAllCompanies();
		return ResponseEntity.ok(companies);
	}

	@GetMapping("/adminuser/{id}")
	public ResponseEntity<CompanyDto> getCompanyById(@PathVariable("id") Long companyId) {
		CompanyDto companyDto = companyService.getCompanyById(companyId);
		return ResponseEntity.ok(companyDto);
	}

	@PutMapping("/admin/{id}")
	public ResponseEntity<CompanyDto> updateCompany(@PathVariable("id") Long companyId,
			@RequestBody CompanyDto updatedCompany) {
		CompanyDto companyDto = companyService.updateCompany(companyId, updatedCompany);
		return ResponseEntity.ok(companyDto);
	}

	@DeleteMapping("/admin/{id}")
	public ResponseEntity<String> deleteCompany(@PathVariable("id") Long companyId) {
		companyService.deleteCompany(companyId);
		return ResponseEntity.ok("Company deleted successfully");
	}

	@PostMapping("/admin/addUserToCompany/{companyId}/{userId}")
	public ResponseEntity<String> addUserToCompany(@PathVariable Long companyId, @PathVariable Long userId) {
	    companyUserService.addUserToCompany(companyId, userId);
	    return ResponseEntity.ok("User added to Company successfully");
	}


}
