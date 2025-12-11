package com.example.demo.dto.user;

import lombok.Data;

@Data
public class UpdateUserDto {
    private String username;
    private String email;
    private String password;
    private String phoneNumber;
}