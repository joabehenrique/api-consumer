package com.uvv.firstproject.repository;

import com.uvv.firstproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
