package com.uvv.firstproject.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class RateDTO {
    private String result;
    private String documentation;
    private String terms_of_use;
    private long time_last_update_unix;
    private String time_last_update_utc;
    private long time_next_update_unix;
    private String time_next_update_utc;
    private String base_code;
    private Map<String, Double> conversion_rates;
}
