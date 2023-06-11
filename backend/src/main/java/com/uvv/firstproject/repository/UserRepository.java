package com.uvv.firstproject.repository;

import com.uvv.firstproject.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Page<User> findByUsername(String username, Pageable pageable);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
