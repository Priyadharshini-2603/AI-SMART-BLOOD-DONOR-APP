package com.smartblood.api.controller;

import com.smartblood.api.model.BloodRequest;
import com.smartblood.api.repository.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    @Autowired
    private BloodRequestRepository repository;

    @GetMapping
    public List<BloodRequest> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public BloodRequest create(@RequestBody BloodRequest request) {
        request.setRequestDate(LocalDateTime.now());
        request.setStatus("PENDING");
        return repository.save(request);
    }
}
