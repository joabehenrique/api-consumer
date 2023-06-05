package com.uvv.firstproject.repository;

import com.uvv.firstproject.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
}
