package com.example.demo.controller;

import com.example.demo.dto.CartRequest;
import com.example.demo.dto.CartResponse;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(Authentication authentication) {
        System.out.println("=== GET CART ===");
        try {
            Long userId = getUserIdFromAuth(authentication);
            System.out.println("UserId: " + userId);

            CartResponse cart = cartService.getCartByUserId(userId);
            System.out.println("Cart récupéré: " + cart);

            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            System.err.println("ERREUR dans getCart: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItemToCart(
            @Valid @RequestBody CartRequest request,
            Authentication authentication
    ) {
        Long userId = getUserIdFromAuth(authentication);
        CartResponse cart = cartService.addItemToCart(userId, request);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItemQuantity(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity,
            Authentication authentication
    ) {
        Long userId = getUserIdFromAuth(authentication);
        CartResponse cart = cartService.updateCartItemQuantity(userId, cartItemId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> removeItemFromCart(
            @PathVariable Long cartItemId,
            Authentication authentication
    ) {
        Long userId = getUserIdFromAuth(authentication);
        CartResponse cart = cartService.removeItemFromCart(userId, cartItemId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    private Long getUserIdFromAuth(Authentication authentication) {
        System.out.println("=== getUserIdFromAuth ===");

        if (authentication == null) {
            throw new RuntimeException("No authentication found");
        }

        String identifier = authentication.getName();
        System.out.println("Identifier extrait du JWT: " + identifier);

        return userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new RuntimeException("User not found with identifier: " + identifier))
                .getId();
    }
}