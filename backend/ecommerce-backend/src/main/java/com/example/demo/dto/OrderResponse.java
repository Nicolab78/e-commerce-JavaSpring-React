package com.example.demo.dto;

import com.example.demo.entity.OrderStatus;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private Long userId;
    private List<OrderItemDTO> items;
    private Double totalPrice;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private String shippingAddress;
}