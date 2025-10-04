package pl.nifena.chatbotweb;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAIConfig {

    private String apiKey = System.getenv("OPENAI_API_KEY");

    @Bean
    public OpenAIClient openAIClient(){
        return OpenAIOkHttpClient.builder()
                .apiKey(apiKey)
                .build();
    }




}
