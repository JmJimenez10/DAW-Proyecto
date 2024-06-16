package es.jimenezyhormigo.tfg.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import es.jimenezyhormigo.tfg.service.impl.OurUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private OurUserDetailsService ourUserDetailsService;
    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request-> request
                		.requestMatchers("/api/users/auth/**", "/public/**").permitAll()
                        .requestMatchers("/api/users/admin/**").hasAnyAuthority("ADMIN")
                        .requestMatchers("/api/users/user/**").hasAnyAuthority("USER")
                        .requestMatchers("/api/users/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        .requestMatchers("/api/users/verify-email").permitAll()
                        
                        .requestMatchers("/api/companies/admin/**").hasAnyAuthority("ADMIN")
                        .requestMatchers("/api/companies/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        
                        .requestMatchers("/api/companyUser/admin/**").hasAnyAuthority("ADMIN")
                        .requestMatchers("/api/companyUser/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        
                        .requestMatchers("/api/images/admin/**").hasAnyAuthority("ADMIN")
                        .requestMatchers("/api/images/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        
                        .requestMatchers("/api/documentSections/admin/**").hasAnyAuthority("ADMIN")
                        .requestMatchers("/api/documentSections/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        
                        .requestMatchers("/api/documents/admin/**").hasAnyAuthority("ADMIN")
                        .requestMatchers("/api/documents/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        
                        .requestMatchers("/api/notifications/**").hasAnyAuthority("ADMIN", "USER")
                        
                        .requestMatchers("/api/templateSections/**").hasAnyAuthority("ADMIN", "USER")
                        .requestMatchers("/api/templates/**").hasAnyAuthority("ADMIN", "USER")
                        
                        .requestMatchers("/api/mail/send").hasAnyAuthority("ADMIN", "USER")
                        .requestMatchers("/api/mail/send-all").hasAnyAuthority("ADMIN")
                        .requestMatchers("/api/mail/reset-password").permitAll()
                        
                        .requestMatchers("/api/financial-data/**").hasAnyAuthority("ADMIN", "USER")
                        
//                        .requestMatchers("/api/**").permitAll()
                        
                        .anyRequest().authenticated())
                .sessionManagement(manager->manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthFilter, UsernamePasswordAuthenticationFilter.class
                );
        return httpSecurity.build();
    }
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(ourUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

}