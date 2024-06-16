package es.jimenezyhormigo.tfg.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Table(name = "templates")
public class TemplateData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String type;
	
	@Column(name = "section", nullable = true, columnDefinition = "varchar(255) default 'General'")
	private String section;
	
	@Lob
	@Column(name="document_data", length = 20971520)
	private byte[] documentData;
	
	@CreatedDate
	@Column(name = "creation_date")
    private LocalDateTime creationDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private TemplateSection templateSection;
}
