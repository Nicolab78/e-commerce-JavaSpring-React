package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.demo.services.IUserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserRequestDto;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto) {
        
        Optional<User> existingUser = userRepository.findByEmail(userRequestDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with email " + userRequestDto.getEmail() + " already exists.");
        }

        User user = mapToEntity(userRequestDto);
        userRepository.save(user);

        return mapToDto(user);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findByEnabled(true);
        if (users.isEmpty()) {
            throw new RuntimeException("No active users found.");
        }
        return users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found."));

        if (!user.isEnabled()) {
            throw new RuntimeException("User with ID " + id + " is inactive.");
        }

        return mapToDto(user);
    }

    @Override
    public UserResponseDto updateUser(Long id, UserRequestDto userRequestDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found."));

        if (!user.isEnabled()) {
            throw new RuntimeException("Cannot update inactive user.");
        }

        user.setUsername(userRequestDto.getUsername());
        user.setEmail(userRequestDto.getEmail());

        if (userRequestDto.getPassword() != null && !userRequestDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        }

        user.setPhoneNumber(userRequestDto.getPhoneNumber());

        if (userRequestDto.getRole() != null) {
            user.setRole(userRequestDto.getRole());
        }

        userRepository.save(user);
        return mapToDto(user);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found."));

        user.setEnabled(false);
        userRepository.save(user);
    }

    private User mapToEntity(UserRequestDto dto) {
        return User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .phoneNumber(dto.getPhoneNumber())
                .role(dto.getRole() != null ? dto.getRole() : Role.USER)
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();
    }

    private UserResponseDto mapToDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .enabled(user.isEnabled())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
}