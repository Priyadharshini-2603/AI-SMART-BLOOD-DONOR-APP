package com.smartblood.api.config;

import com.smartblood.api.model.Alert;
import com.smartblood.api.model.BloodUnit;
import com.smartblood.api.repository.AlertRepository;
import com.smartblood.api.repository.BloodUnitRepository;
import com.smartblood.api.model.User;
import com.smartblood.api.model.Donor;
import com.smartblood.api.repository.UserRepository;
import com.smartblood.api.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase(BloodUnitRepository inventoryRepo, AlertRepository alertRepo, UserRepository userRepo, DonorRepository donorRepo) {
        return args -> {
            // Create Default Admin
            if (userRepo.findByUsername("admin").isEmpty()) {
                userRepo.save(new User(null, "admin", passwordEncoder.encode("admin123"), "ADMIN"));
            }

            // Sample Inventory
            inventoryRepo.save(new BloodUnit(null, "A+", 450, "Optimal", "Central Bank"));
            inventoryRepo.save(new BloodUnit(null, "A-", 120, "Low", "East Storage"));
            inventoryRepo.save(new BloodUnit(null, "O-", 45, "Critical", "Emergency Hub"));
            inventoryRepo.save(new BloodUnit(null, "B+", 380, "Optimal", "Central Bank"));

            // Sample Alerts
            alertRepo.save(new Alert(null, "ACCIDENT RESPONSE", "Central Hospital", 
                "10 Units O- Required for Highway Incident", "HIGH", LocalDateTime.now().minusMinutes(10)));
            alertRepo.save(new Alert(null, "SURGICAL REQUIREMENT", "City Clinic", 
                "5 Units AB+ Required for Heart Surgery", "MEDIUM", LocalDateTime.now().minusMinutes(45)));

            // Sample Donors (Coordinates near a central city point)
            donorRepo.save(new Donor(null, "John Doe", "O+", 40.7128, -74.0060, "New York"));
            donorRepo.save(new Donor(null, "Jane Smith", "A-", 40.7306, -73.9352, "New York"));
            donorRepo.save(new Donor(null, "Robert Roe", "B+", 40.7589, -73.9851, "New York"));
        };
    }
}
