# Chatbot Web Application

## Project Overview

A Spring Boot-based web chatbot application that integrates with OpenAI's API to provide conversational AI capabilities through a clean, modern web interface. The application maintains conversation context across multiple messages and features a responsive, user-friendly chat interface.

## Features

1. **Real-time Chat Interface**:
   - Modern, responsive web UI with dark theme
   - Clean message bubbles for user and bot messages
   - Auto-scrolling to latest messages
   - Visual status indicators (Ready/Typing)

2. **OpenAI Integration**:
   - Powered by OpenAI's O3-Mini model
   - Maintains conversation context using response IDs
   - Seamless message threading for natural conversations

3. **RESTful API**:
   - Clean REST endpoints for chat functionality
   - JSON-based request/response handling
   - Automatic API documentation via Swagger/OpenAPI

4. **User Experience**:
   - Instant visual feedback during message processing
   - Error handling with user-friendly messages
   - Accessible interface with ARIA labels
   - No page reloads - smooth single-page experience

## System Requirements

- **Java Development Kit (JDK) 21** or higher
- **Apache Maven** 3.9.11 or higher (included via Maven Wrapper)
- **OpenAI API Key** (required for chat functionality)
- Supported operating systems:
  - Windows
  - macOS
  - Linux

## Dependencies

### Core Dependencies
- **Spring Boot 3.5.6** - Application framework
- **Spring Boot Web Starter** - REST API and web server
- **OpenAI Java SDK 4.0.0** - OpenAI API integration
- **SpringDoc OpenAPI 2.8.13** - API documentation

### Development Dependencies
- **Spring Boot Test Starter** - Testing framework
- **JUnit** - Unit testing (included in Spring Boot Test)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd chatbot-web
   ```

2. **Set Up OpenAI API Key**:
   
   The application requires an OpenAI API key to function. Set it as an environment variable:
   
   **Windows (Command Prompt)**:
   ```cmd
   set OPENAI_API_KEY=your_api_key_here
   ```
   
   **Windows (PowerShell)**:
   ```powershell
   $env:OPENAI_API_KEY="your_api_key_here"
   ```
   
   **macOS/Linux**:
   ```bash
   export OPENAI_API_KEY=your_api_key_here
   ```
   
   For permanent setup, add the variable to your system environment variables or shell profile (`.bashrc`, `.zshrc`, etc.).

3. **Build the Project**:
   
   Using Maven Wrapper (recommended):
   ```bash
   ./mvnw clean package
   ```
   
   Or on Windows:
   ```cmd
   mvnw.cmd clean package
   ```

## Running the Application

### Using Maven Wrapper

**macOS/Linux**:
```bash
./mvnw spring-boot:run
```

**Windows**:
```cmd
mvnw.cmd spring-boot:run
```

### Using Compiled JAR

```bash
java -jar target/chatbot-web-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080` by default.

## Usage

1. **Access the Chat Interface**:
   - Open your web browser
   - Navigate to `http://localhost:8080`
   - You should see the chatbot interface with "Gotowy" (Ready) status

2. **Start Chatting**:
   - Type your message in the input field at the bottom
   - Press Enter or click "Wyślij" (Send)
   - Wait for the AI response (status will show "Piszę…" while processing)
   - Continue the conversation - context is maintained automatically

3. **View API Documentation**:
   - Swagger UI: `http://localhost:8080/swagger-ui.html`
   - OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## API Endpoints

### GET `/chat/hello`
Simple health check endpoint.

**Response**: `"Hello!"`

### POST `/chat`
Send a message to the chatbot.

**Request Body**:
```json
{
  "message": "Your message here",
  "previousResponseId": "optional-previous-response-id"
}
```

**Response**:
```json
{
  "response": "AI response text",
  "responseId": "new-response-id-for-context"
}
```

## Project Structure

```
chatbot-web/
├── src/
│   ├── main/
│   │   ├── java/pl/nifena/chatbotweb/
│   │   │   ├── ChatbotWebApplication.java    # Main application class
│   │   │   ├── ChatController.java           # REST controller
│   │   │   ├── OpenAIConfig.java             # OpenAI client configuration
│   │   │   ├── MessageRequest.java           # Request DTO
│   │   │   └── MessageResponse.java          # Response DTO
│   │   └── resources/
│   │       ├── application.properties        # Application configuration
│   │       └── static/
│   │           ├── index.html                # Main chat interface
│   │           ├── script.js                 # Frontend logic
│   │           └── styles.css                # UI styling
│   └── test/
│       └── java/pl/nifena/chatbotweb/
│           └── ChatbotWebApplicationTests.java
├── .mvn/                                     # Maven wrapper configuration
├── mvnw                                      # Maven wrapper script (Unix)
├── mvnw.cmd                                  # Maven wrapper script (Windows)
├── pom.xml                                   # Maven project configuration
└── README.md
```

## Configuration

### Application Properties

The application uses default Spring Boot configuration. You can customize it by modifying `src/main/resources/application.properties`:

```properties
# Change server port
server.port=8080

# Application name
spring.application.name=chatbot-web
```

### OpenAI Configuration

The OpenAI client is configured in `OpenAIConfig.java` to use:
- **Model**: O3-Mini (latest OpenAI model)
- **API Key**: Read from `OPENAI_API_KEY` environment variable

To use a different model, modify the `ChatController.java`:
```java
ResponseCreateParams params = ResponseCreateParams.builder()
    .model(ChatModel.YOUR_PREFERRED_MODEL)
    .input(messageRequest.message())
    .previousResponseId(messageRequest.previousResponseId())
    .build();
```

## Testing

Run all tests:
```bash
./mvnw test
```

## Troubleshooting

### "OPENAI_API_KEY not set" Error
- Ensure the environment variable is set correctly
- Restart your terminal/IDE after setting the variable
- Verify the key is valid and has sufficient credits

### Port 8080 Already in Use
Change the port in `application.properties`:
```properties
server.port=8081
```

### Connection Timeout
- Check your internet connection
- Verify OpenAI API status at [status.openai.com](https://status.openai.com)
- Ensure no firewall is blocking outbound connections

### Frontend Not Loading
- Clear browser cache
- Check browser console for JavaScript errors
- Ensure static resources are in `src/main/resources/static/`

## Security Considerations

- **Never commit your API key** to version control
- Use environment variables or secure vault solutions for production
- Consider implementing rate limiting for production deployments
- Add authentication if deploying publicly

## Future Enhancements

- User authentication and session management
- Message history persistence (database integration)
- Support for multiple AI models with model selection
- File upload capability for document analysis
- Export conversation history
- Dark/light theme toggle
- Multi-language support
- Rate limiting and usage quotas
- Streaming responses for real-time typing effect
- Message editing and regeneration
- Custom system prompts and AI personality configuration

## License

This project is for educational and experimental purposes only.
No license is specified — all rights reserved unless otherwise stated.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review OpenAI API documentation: [platform.openai.com/docs](https://platform.openai.com/docs)
- Review Spring Boot documentation: [spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)

## Acknowledgments

- Built with Spring Boot framework
- Powered by OpenAI API
- UI inspired by modern chat interfaces
