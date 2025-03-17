package com.thesis2.EunoiaProject.Controllers;


import com.thesis2.EunoiaProject.DTO.PreAssessmentRequest;
import com.thesis2.EunoiaProject.Services.PreAssessmentService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/pre-assessment")
public class PreAssessmentController {

    private final PreAssessmentService preAssessmentService;

    public PreAssessmentController(PreAssessmentService preAssessmentService){
        this.preAssessmentService = preAssessmentService;
    }

//    @PostMapping("/submit")
//    public ResponseEntity<String> submitPreAssessment(
//            @RequestBody PreAssessmentRequest request,
//            Authentication auth){
//
//        String email = auth.getName();
//        String recommendedProfessional = preAssessmentService.handlePreAssessment(request, email);
//        return ResponseEntity.ok("Recommended Professional: " + recommendedProfessional);
//    }

//@PostMapping("/submit")
//public ResponseEntity<?> submitPreAssessment(@RequestBody PreAssessmentRequest request, Authentication auth) {
//    String flaskUrl = "http://localhost:5000/predict";
//
//    RestTemplate restTemplate = new RestTemplate();
//    HttpHeaders headers = new HttpHeaders();
//    headers.setContentType(MediaType.APPLICATION_JSON);
//
//    HttpEntity<PreAssessmentRequest> entity = new HttpEntity<>(request, headers);
//
//    ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, entity, String.class);
//
//    System.out.println("Flask Response: " + response.getBody());
//
//    return ResponseEntity.ok(response.getBody());
//}

    @PostMapping("/submit")
    public ResponseEntity<String> submitPreAssessment(@RequestBody PreAssessmentRequest request, Authentication auth) {
        String email = auth.getName();

        String recommendedProfessional = preAssessmentService.submitPreAssessment(request, email);

        return ResponseEntity.ok("Recommended Professional: " + recommendedProfessional);
    }


}
