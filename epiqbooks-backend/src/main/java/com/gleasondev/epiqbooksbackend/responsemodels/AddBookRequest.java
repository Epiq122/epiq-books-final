package com.gleasondev.epiqbooksbackend.responsemodels;import lombok.Data;@Datapublic class AddBookRequest {    private String title;    private String author;    private String description;    private Integer copies;    private String category;    private String img;}