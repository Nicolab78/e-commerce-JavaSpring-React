package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "username", nullable = false, unique = true, length = 50)
	private String username;
	
	@Column(name = "email", nullable = false, unique = true, length = 50)
	@Size(min = 8, max = 100)
	private String email;
	
	
	@Column(name = "password", nullable = false)
	@Size(min = 12)
	private String password;
	
	
	@Column(name = "role", nullable = false)
	private String role;
	
	@Column(name = "active", nullable = false)
	private boolean active;
	
	@Column(name = "phone_number", length = 15)
	private String phoneNumber;
	

}
