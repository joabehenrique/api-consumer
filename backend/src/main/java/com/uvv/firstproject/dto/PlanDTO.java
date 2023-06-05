package com.uvv.firstproject.dto;

import com.uvv.firstproject.entity.Plan;
import com.uvv.firstproject.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlanDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> features;

    public PlanDTO(Plan plan) {
        this.id = plan.getId();
        this.name = plan.getName();
        this.description = plan.getDescription();
        this.features = plan.getFeatures();
    }
}
