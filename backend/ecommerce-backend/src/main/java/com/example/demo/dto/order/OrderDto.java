package com.example.demo.dto.order;

import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.dto.user.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDto {
    private Long id;
    private UserDto user;
    private List<OrderItemDto> items;
    private Double totalPrice;
    private String status;
    private LocalDateTime orderDate;
    private String shippingAddress;
}