package com.uvv.firstproject.service;

import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.entity.Plan;
import com.uvv.firstproject.entity.User;
import com.uvv.firstproject.repository.PlanRepository;
import com.uvv.firstproject.repository.UserRepository;
import com.uvv.firstproject.util.UserUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private PlanRepository planRepository;
    private final UserUtil userUtil;

    public UserService(UserRepository userRepository, UserUtil userUtil, PlanRepository planRepository) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.userUtil = userUtil;
    }

    public Page<UserDTO> findAllPaged(Pageable page){
        Page<User> users = userRepository.findAll(page);
        return users.map(UserDTO::new);
    }

    public UserDTO save(UserDTO userDTO){
        User user = new User();
        user.setName(userDTO.getName());
        user.setBirthdate(userDTO.getBirthdate());
        user.setZodiacSign(userDTO.getZodiacSign());

        Plan plan = planRepository.findById(userDTO.getPlan().getId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        user.setPlan(plan);

        user = userRepository.save(user);
        return new UserDTO(user);
    }
}
