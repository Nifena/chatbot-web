package pl.nifena.chatbotweb;

import com.openai.client.OpenAIClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseOutputText;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final OpenAIClient client;


    public ChatController(OpenAIClient client) {
        this.client = client;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello!";
    }

    @PostMapping
    public ResponseEntity<MessageResponse> message(@RequestBody MessageRequest messageRequest) {
        ResponseCreateParams params = ResponseCreateParams.builder()
                .model(ChatModel.O3_MINI)
                .input(messageRequest.message())
                .previousResponseId(messageRequest.previousResponseId())
                .build();
        Response response = client.responses().create(params);


        String responseText = response.output()
                .stream()
                .flatMap(item -> item.message().stream())
                .flatMap(outputMessage -> outputMessage.content().stream())
                .flatMap(content -> content.outputText().stream())
                .map(ResponseOutputText::text)
                .toList()
                .getFirst();

        return ResponseEntity.ok(new MessageResponse(responseText, response.id()));

    }


}
