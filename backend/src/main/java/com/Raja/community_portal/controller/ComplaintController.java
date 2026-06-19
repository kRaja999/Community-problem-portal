package com.Raja.community_portal.controller;

import com.Raja.community_portal.entity.Complaint;
import com.Raja.community_portal.repository.ComplaintRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        complaint.setStatus("PENDING");
        return complaintRepository.save(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Long id) {
        return complaintRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}/status")
    public Complaint updateStatus(@PathVariable Long id, @RequestParam String status) {
        Complaint complaint = complaintRepository.findById(id).orElse(null);

        if (complaint != null) {
            complaint.setStatus(status);
            return complaintRepository.save(complaint);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Long id) {
        if (complaintRepository.existsById(id)) {
            complaintRepository.deleteById(id);
            return "Complaint Deleted Successfully";
        }

        return "Complaint Not Found";
    }
}
