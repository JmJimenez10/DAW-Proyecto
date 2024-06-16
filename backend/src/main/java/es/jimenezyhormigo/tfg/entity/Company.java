package es.jimenezyhormigo.tfg.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "companies")
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "cif", nullable = false, unique = true)
	private String cif;

	@Column(name = "name", nullable = false)
	private String name;

	@CreatedDate
	@Column(name = "creation_date")
	private LocalDateTime creationDate;

	@OneToOne(mappedBy = "company")
	@JsonIgnore
	private ImageData imageData;

	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<DocumentData> documents = new ArrayList<>();
	
	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<FinancialData> financialData = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "company_user", joinColumns = { @JoinColumn(name = "company_id") }, inverseJoinColumns = {
			@JoinColumn(name = "user_id") })
	private Set<OurUser> users = new HashSet<>();

}
