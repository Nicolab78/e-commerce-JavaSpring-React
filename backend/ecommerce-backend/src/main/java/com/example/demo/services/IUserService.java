package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.UserRequestDto;
import com.example.demo.dto.UserResponseDto;

public interface IUserService {
    
    UserResponseDto saveUser(UserRequestDto userRequestDto);
    List<UserResponseDto> getAllUsers();
    UserResponseDto getUserById(Long id);
    UserResponseDto updateUser(Long id, UserRequestDto userRequestDto);
    void deleteUser(Long id);
}