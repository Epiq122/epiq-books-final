//package com.gleasondev.epiqbooksbackend.config;////import org.springframework.beans.factory.annotation.Autowired;//import org.springframework.context.annotation.Bean;//import org.springframework.context.annotation.Configuration;//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;//import org.springframework.security.config.annotation.web.builders.HttpSecurity;//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;//import org.springframework.security.core.userdetails.UserDetailsService;//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;//import org.springframework.security.crypto.password.PasswordEncoder;////@Configuration//@EnableWebSecurity//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {////    private final UserDetailsService userDetailsService;//    private final PasswordEncoder passwordEncoder;////    @Autowired//    public WebSecurityConfig(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {//        this.userDetailsService = userDetailsService;//        this.passwordEncoder = passwordEncoder;//    }////    @Bean//    public PasswordEncoder passwordEncoder() {//        return new BCryptPasswordEncoder();//    }////    @Override//    protected void configure(HttpSecurity http) throws Exception {//        http//                .csrf().disable()//                .authorizeRequests()//                .antMatchers("/public/**").permitAll()//                .anyRequest().authenticated()//                .and()//                .formLogin()//                .loginPage("/login")//                .permitAll()//                .and()//                .logout()//                .permitAll();//    }////    @Autowired//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {//        auth//                .userDetailsService(userDetailsService)//                .passwordEncoder(passwordEncoder);//    }//}