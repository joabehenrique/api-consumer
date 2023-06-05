package com.uvv.firstproject.dto;

import com.uvv.firstproject.entity.Plan;
import com.uvv.firstproject.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String name;
    private Date birthdate;
    private String zodiacSign;
    private Plan plan;

    public UserDTO(User user) {
        this.name = user.getName();
        this.birthdate = user.getBirthdate();
        this.zodiacSign = user.getZodiacSign();
        this.plan = user.getPlan();
    }
}
