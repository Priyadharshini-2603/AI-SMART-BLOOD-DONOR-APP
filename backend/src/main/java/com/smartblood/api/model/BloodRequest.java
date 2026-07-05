package com.smartblood.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String hospitalName;
    private String bloodType;
    private Integer unitsRequested;
    private String urgency; // e.g., ROUTINE, URGENT, EMERGENCY
    private String status; // e.g., PENDING, APPROVED, DISPATCHED
    private LocalDateTime requestDate;
}
