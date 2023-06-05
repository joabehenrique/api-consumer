package com.uvv.firstproject.service;

import com.uvv.firstproject.dto.PlanDTO;
import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.entity.Plan;
import com.uvv.firstproject.entity.User;
import com.uvv.firstproject.repository.PlanRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PlanService {
    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public Page<PlanDTO> findAllPaged(Pageable page){
        Page<Plan> plan = planRepository.findAll(page);
        return plan.map(PlanDTO::new);
    }

    public PlanDTO save(PlanDTO planDTO) {
        Plan plan = new Plan();
        plan.setName(planDTO.getName());
        plan.setDescription(planDTO.getDescription());
        plan.setFeatures(planDTO.getFeatures());

        Plan savedPlan = planRepository.save(plan);

        PlanDTO savedPlanDTO = new PlanDTO();
        savedPlanDTO.setId(savedPlan.getId());
        savedPlanDTO.setName(savedPlan.getName());
        savedPlanDTO.setDescription(savedPlan.getDescription());
        savedPlanDTO.setFeatures(savedPlan.getFeatures());

        return savedPlanDTO;
    }
}
