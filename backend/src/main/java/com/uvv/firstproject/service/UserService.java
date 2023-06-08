package com.uvv.firstproject.service;

import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.entity.Plan;
import com.uvv.firstproject.entity.User;
import com.uvv.firstproject.repository.PlanRepository;
import com.uvv.firstproject.repository.UserRepository;
import com.uvv.firstproject.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private PlanRepository planRepository;
    private final UserUtil userUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        if(userRepository.existsByUsername(userDTO.getUsername())) {
            throw new RuntimeException("Erro: Nome de usuário já está em uso.");
        }

        if(userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Erro: Email já está em uso.");
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setBirthdate(userDTO.getBirthdate());
        user.setZodiacSign(userDTO.getZodiacSign());

        Plan plan = planRepository.findById(userDTO.getPlan().getId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        user.setPlan(plan);

        user = userRepository.save(user);
        return new UserDTO(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com o nome de usuário: " + username);
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("USER")));
    }
}
