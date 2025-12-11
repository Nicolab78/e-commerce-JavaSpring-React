package com.example.demo.dto.auth;

import com.example.demo.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private String type;
    private UserDto user;

    public AuthResponseDto(String token, UserDto user) {
        this.token = token;
        this.type = "Bearer";
        this.user = user;
    }
}