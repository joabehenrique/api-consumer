package com.uvv.firstproject.controller;

import com.uvv.firstproject.dto.PlanDTO;
import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.service.PlanService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/plans")
public class PlanController {
    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<Page<PlanDTO>> getPlans(Pageable pageRequest) {
        Page<PlanDTO> list = planService.findAllPaged(pageRequest);

        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public PlanDTO createPlan(@RequestBody PlanDTO planDTO) {
        return planService.save(planDTO);
    }
}
