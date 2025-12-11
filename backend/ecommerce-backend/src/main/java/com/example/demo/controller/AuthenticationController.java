package com.example.demo.controller;

import com.example.demo.dto.auth.AuthResponseDto;
import com.example.demo.dto.auth.LoginDto;
import com.example.demo.dto.auth.RegisterDto;
import com.example.demo.services.AuthenticationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @Valid @RequestBody RegisterDto registerDto
    ) {
        AuthResponseDto response = authService.register(registerDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> authenticate(
            @Valid @RequestBody LoginDto loginDto
    ) {
        AuthResponseDto response = authService.authenticate(loginDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refreshToken(
            @RequestHeader("Authorization") String refreshToken
    ) {
        String token = refreshToken.substring(7);
        AuthResponseDto response = authService.refreshToken(token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok().build();
    }
}