package com.gleasondev.epiqbooksbackend.requestmodels;


import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {
    private Double rating;
    private Long bookId;

    
    // this optional because you can leave a star review without a description
    private Optional<String> reviewDescription;

}
