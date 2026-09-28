package com.example.farmstock.repository;

import com.example.farmstock.entity.HarvestBatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HarvestBatchRepository extends JpaRepository<HarvestBatch, Long> {
}