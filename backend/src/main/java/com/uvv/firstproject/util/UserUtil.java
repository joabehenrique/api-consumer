package com.uvv.firstproject.util;

import com.uvv.firstproject.dto.UserDTO;
import com.uvv.firstproject.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {
    public void convertDTOtoEntity(UserDTO user, User entity){
        entity.setName(user.getName());
        entity.setBirthdate(user.getBirthdate());
        entity.setZodiacSign(user.getZodiacSign());
        entity.setPlan(user.getPlan());
    }
}
