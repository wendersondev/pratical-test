package com.br.checkout.infrastructure.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Checkout API")
                        .version("1.0")
                        .description("API de Checkout")
                        .contact(new Contact().name("Seu Nome").email("seuemail@example.com")));
    }
}
