package com.example.farmstock.service;

import com.example.farmstock.entity.HarvestBatch;
import com.example.farmstock.repository.HarvestBatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HarvestBatchService {

    private final HarvestBatchRepository harvestBatchRepository;

    public HarvestBatchService(HarvestBatchRepository harvestBatchRepository) {
        this.harvestBatchRepository = harvestBatchRepository;
    }

    public HarvestBatch addHarvestBatch(HarvestBatch harvestBatch) {
        return harvestBatchRepository.save(harvestBatch);
    }

    public List<HarvestBatch> getAllHarvestBatches() {
        return harvestBatchRepository.findAll();
    }
}