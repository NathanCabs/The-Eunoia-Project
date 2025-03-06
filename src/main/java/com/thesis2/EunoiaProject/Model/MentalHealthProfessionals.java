package com.thesis2.EunoiaProject.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "mental_health_professionals")
public class MentalHealthProfessionals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String focusArea;

    @Column(nullable = false)
    private int yearsOfExperience;

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String availability;

    @Column(nullable = false)
    private double rating;

}
