package com.uvv.firstproject.controller;

import com.uvv.firstproject.config.jwt.JwtProvider;
import com.uvv.firstproject.dto.AuthDTO;
import com.uvv.firstproject.dto.JwtDTO;
import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.service.AuthService;
import com.uvv.firstproject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;
    private JwtProvider jwtProvider;

    public AuthController(UserService userService, AuthService authService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.authService = authService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthDTO loginRequest) {
        JwtDTO jwt = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO signUpRequest) {
        UserDTO user = userService.save(signUpRequest);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && jwtProvider.validateToken(token)) {
            return ResponseEntity.ok().body("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is invalid or expired");
        }
    }
}
