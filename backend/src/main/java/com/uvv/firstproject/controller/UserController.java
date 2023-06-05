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
    public ResponseEntity<Page<UserDTO>> getUsers(Pageable pageRequest) {
        Page<UserDTO> list = userService.findAllPaged(pageRequest);

        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO user) {
        return userService.save(user);
    }

}

//
//    @PutMapping("/{id}")
//    public User updateUser(@PathVariable Long id, @RequestBody User user) {
//        User existingUser = userService.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
//        BeanUtils.copyProperties(user, existingUser, "id");
//        return userService.save(existingUser);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable Long id) {
//        if (!userRepository.existsById(id)) {
//            throw new ResourceNotFoundException("User not found with id " + id);
//        }
//        userService.deleteById(id);
//    }