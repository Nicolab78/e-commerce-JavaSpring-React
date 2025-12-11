package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.order.CreateOrderDto;
import com.example.demo.dto.order.OrderDto;
import com.example.demo.dto.order.UpdateOrderDto;

public interface IOrderService {
    OrderDto createOrder(Long userId, CreateOrderDto createOrderDto);
    List<OrderDto> getAllOrders();
    List<OrderDto> getOrdersByUserId(Long userId);
    OrderDto getOrderById(Long id);
    OrderDto updateOrderStatus(Long id, UpdateOrderDto updateOrderDto);
    void deleteOrder(Long id);
}