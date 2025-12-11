package com.example.demo.services;

import com.example.demo.dto.cart.AddToCartDto;
import com.example.demo.dto.cart.CartDto;
import com.example.demo.dto.cart.UpdateCartItemDto;

public interface ICartService {
    CartDto getCartByUserId(Long userId);
    CartDto addToCart(Long userId, AddToCartDto addToCartDto);
    CartDto updateCartItem(Long userId, Long cartItemId, UpdateCartItemDto updateCartItemDto);
    CartDto removeFromCart(Long userId, Long cartItemId);
    void clearCart(Long userId);
}