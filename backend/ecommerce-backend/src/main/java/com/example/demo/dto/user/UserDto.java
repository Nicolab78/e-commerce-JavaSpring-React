package com.example.demo.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private boolean enabled;
    private String phoneNumber;
}