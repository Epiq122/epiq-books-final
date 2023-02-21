package com.gleasondev.epiqbooksbackend.config;


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.entity.Message;
import com.gleasondev.epiqbooksbackend.entity.Review;
import com.gleasondev.epiqbooksbackend.entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private final String theAllowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {

        // this is an http method array that wiull prevent the user from deleting or updating
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};


        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);
        // new
        config.exposeIdsFor(User.class);
   

        // disable the unsupported actions
        disableHttpMethods(Book.class, config, theUnsupportedActions);
        disableHttpMethods(Review.class, config, theUnsupportedActions);
        disableHttpMethods(Message.class, config, theUnsupportedActions);
        disableHttpMethods(User.class, config, theUnsupportedActions);
        /* Configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**")
            .allowedOrigins(theAllowedOrigins);
    }

    // this method will disable the http methods from the spring data resrt config
    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
              .forDomainType(theClass)
              .withItemExposure((metadata, httpMethods) ->
                      httpMethods.disable(theUnsupportedActions))
              .withCollectionExposure((metadata, httpMethods) ->
                      httpMethods.disable(theUnsupportedActions));
    }
}
