package com.thesis2.EunoiaProject.DTO;

import java.util.*;

public class PreAssessmentRequest {
    private int[] ghq12_responses;
    private int age;
    private String gender;

    public int[] getGhq12_responses() {
        return ghq12_responses;
    }

    public void setGhq12_responses(int[] ghq12_responses) {
        this.ghq12_responses = ghq12_responses;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
