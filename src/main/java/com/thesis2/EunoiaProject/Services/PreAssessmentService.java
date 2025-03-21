package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.DTO.PreAssessmentRequest;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class PreAssessmentService {
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    public PreAssessmentService(UserRepository userRepository, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }

//    public String handlePreAssessment(PreAssessmentRequest request, String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Prepare the data to send to Flask API
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("ghq12_responses", request.getGhq12_responses());
//        requestBody.put("age", request.getAge());
//        requestBody.put("gender", request.getGender());
//
//        // Call the Flask API
//        String flaskUrl = "http://localhost:5000/predict";
//        Map<String, String> response = restTemplate.postForObject(flaskUrl, requestBody, Map.class);
//
//        if (response != null && response.containsKey("recommended_professional")){
//            String recommendedProfessional = response.get("recommended_professional");
//
//            // Store the recommended professional in User
//            user.setRecommendedProfessional(recommendedProfessional);
//            userRepository.save(user);
//
//            return recommendedProfessional;
//        }
//        throw new RuntimeException("Failed to get recommendation from Flask API Model");
//
//    }
@Transactional
public String submitPreAssessment(PreAssessmentRequest request, String email) {
    // 🔎 Step 1: Get the logged-in user
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    try {
        // 🔎 Step 2: Send data to Flask API
        String flaskUrl = " https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/predict";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("ghq12_responses", request.getGhq12_responses());
        body.put("age", request.getAge());
        body.put("gender", request.getGender());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            String recommendedProfessional = (String) response.getBody().get("recommended_professional");

            // ✅ Step 3: Update recommendedProfessional in user entity
            user.setRecommendedProfessional(recommendedProfessional);

            // ✅ Step 4: Save updated user in the repository
            userRepository.save(user);

            return recommendedProfessional;
        } else {
            throw new RuntimeException("Failed to get recommendation from Flask API Model");
        }
    } catch (Exception e) {
        throw new RuntimeException("Failed to get recommendation from Flask API Model", e);
    }
}

}
