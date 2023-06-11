package com.uvv.firstproject.controller;

import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<UserDTO>> getUsers(@RequestParam(required = false) String username,Pageable pageRequest) {
        Page<UserDTO> list;
        if(username != null && !username.isEmpty()) {
            list = userService.findByUsername(username, pageRequest);
        } else {
            list = userService.findAllPaged(pageRequest);
        }
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO user) {
        return userService.save(user);
    }

}