package com.gleasondev.epiqbooksbackend.config;


import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    // returns a filter chain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CSRF protection (cross site request forgery)
        http.csrf().disable();
        // Protect endpoints at /api/<type>/secure
        http.authorizeRequests(authorizeRequests ->
                    authorizeRequests
                            .antMatchers("/api/books/secure/**",
                                    "/api/reviews/secure/**",
                                    "/api/messages/secure/**")

                            .authenticated())
            .oauth2ResourceServer().jwt();

        // Add Cors filters
        http.cors();

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401's to make the response more browser friendly
        Okta.configureResourceServer401ResponseBody(http);


        return http.build();
    }


}
