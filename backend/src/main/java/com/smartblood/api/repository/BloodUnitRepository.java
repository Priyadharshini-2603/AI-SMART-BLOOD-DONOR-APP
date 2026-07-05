package com.smartblood.api.repository;

import com.smartblood.api.model.BloodUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodUnitRepository extends JpaRepository<BloodUnit, Long> {
}
