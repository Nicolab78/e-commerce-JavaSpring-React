package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.user.UpdateUserDto;
import com.example.demo.dto.user.UserDto;

public interface IUserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto updateUser(Long id, UpdateUserDto updateUserDto);
    void deleteUser(Long id);
}