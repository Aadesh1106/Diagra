import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env';

export interface DiagramRequest {
  type: 'CLASS' | 'SEQUENCE' | 'ACTIVITY' | 'USE_CASE' | 'STATE' | 'COMPONENT';
  title: string;
  plantuml: string;
}

export interface LLMResponse {
  diagrams: DiagramRequest[];
}

export class LLMService {
  private provider: 'openai' | 'google';
  private openaiApiKey: string;
  private openaiModel: string;
  private googleApiKey: string;
  private googleModel: string;
  private googleAI?: GoogleGenerativeAI;

  constructor() {
    this.provider = config.llm.provider as 'openai' | 'google';
    this.openaiApiKey = config.llm.openai.apiKey;
    this.openaiModel = config.llm.openai.model;
    this.googleApiKey = config.llm.google.apiKey;
    this.googleModel = config.llm.google.model;

    if (this.provider === 'google' && this.googleApiKey) {
      this.googleAI = new GoogleGenerativeAI(this.googleApiKey);
    }
  }

  async generateDiagrams(
    prompt: string,
    diagramTypes: string[]
  ): Promise<LLMResponse> {
    if (this.provider === 'google') {
      return this.generateWithGoogle(prompt, diagramTypes);
    } else {
      return this.generateWithOpenAI(prompt, diagramTypes);
    }
  }

  private async generateWithOpenAI(
    prompt: string,
    diagramTypes: string[]
  ): Promise<LLMResponse> {
    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(prompt, diagramTypes);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.openaiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const parsed = JSON.parse(content) as LLMResponse;
      
      return parsed;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('OpenAI API Error:', error.response?.data);
        throw new Error(`OpenAI API Error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  private async generateWithGoogle(
    prompt: string,
    diagramTypes: string[]
  ): Promise<LLMResponse> {
    if (!this.googleAI) {
      throw new Error('Google AI not initialized. Please provide GOOGLE_API_KEY.');
    }

    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(prompt, diagramTypes);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    try {
      const model = this.googleAI.getGenerativeModel({ 
        model: this.googleModel,
        generationConfig: {
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        text = jsonMatch[1].trim();
      }
      
      const parsed = JSON.parse(text) as LLMResponse;
      return parsed;
    } catch (error) {
      console.error('Google Gemini API Error:', error);
      throw new Error(`Google Gemini API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async regenerateDiagram(
    originalPrompt: string,
    diagramType: string,
    previousDsl: string
  ): Promise<DiagramRequest> {
    if (this.provider === 'google') {
      return this.regenerateWithGoogle(originalPrompt, diagramType, previousDsl);
    } else {
      return this.regenerateWithOpenAI(originalPrompt, diagramType, previousDsl);
    }
  }

  private async regenerateWithOpenAI(
    originalPrompt: string,
    diagramType: string,
    previousDsl: string
  ): Promise<DiagramRequest> {
    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildRegeneratePrompt(originalPrompt, diagramType, previousDsl);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.openaiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const parsed = JSON.parse(content) as LLMResponse;
      
      return parsed.diagrams[0];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('OpenAI API Error:', error.response?.data);
        throw new Error(`OpenAI API Error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  private async regenerateWithGoogle(
    originalPrompt: string,
    diagramType: string,
    previousDsl: string
  ): Promise<DiagramRequest> {
    if (!this.googleAI) {
      throw new Error('Google AI not initialized. Please provide GOOGLE_API_KEY.');
    }

    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildRegeneratePrompt(originalPrompt, diagramType, previousDsl);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    try {
      const model = this.googleAI.getGenerativeModel({ 
        model: this.googleModel,
        generationConfig: {
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        text = jsonMatch[1].trim();
      }
      
      const parsed = JSON.parse(text) as LLMResponse;
      return parsed.diagrams[0];
    } catch (error) {
      console.error('Google Gemini API Error:', error);
      throw new Error(`Google Gemini API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildRegeneratePrompt(
    originalPrompt: string,
    diagramType: string,
    previousDsl: string
  ): string {
    return `
Original system description:
${originalPrompt}

Previous ${diagramType} diagram DSL:
${previousDsl}

Given the original system description and the previous diagram, regenerate an improved version of this ${diagramType} diagram.
Keep the semantics but improve structure, add missing details, and ensure correctness.

Return JSON with this structure:
{
  "diagrams": [
    {
      "type": "${diagramType}",
      "title": "string",
      "plantuml": "@startuml ... @enduml"
    }
  ]
}
`;
  }

  private buildSystemPrompt(): string {
    return `You are an expert software architect specializing in UML diagram generation. 
Given a text description of a system, you must output UML diagrams in PlantUML syntax.

CRITICAL RULES:
1. Generate ONLY valid PlantUML code
2. Each diagram must be wrapped in @startuml and @enduml tags
3. Use proper PlantUML syntax for each diagram type
4. Make diagrams comprehensive but not overly complex
5. Include meaningful relationships, attributes, and methods

Return ONLY valid JSON following this exact schema:
{
  "diagrams": [
    {
      "type": "CLASS | SEQUENCE | ACTIVITY | USE_CASE | STATE | COMPONENT",
      "title": "Descriptive title of the diagram",
      "plantuml": "Complete PlantUML code from @startuml to @enduml"
    }
  ]
}

PlantUML syntax examples:

CLASS DIAGRAM:
@startuml
class ClassName {
  +publicAttribute: type
  -privateAttribute: type
  +publicMethod(): returnType
}
ClassA "1" --> "many" ClassB
@enduml

SEQUENCE DIAGRAM:
@startuml
actor User
participant "System" as S
User -> S: action()
S --> User: response
@enduml

ACTIVITY DIAGRAM:
@startuml
start
:Activity;
if (condition?) then (yes)
  :Action A;
else (no)
  :Action B;
endif
stop
@enduml

USE CASE DIAGRAM:
@startuml
left to right direction
actor User
rectangle System {
  User -- (Use Case 1)
  User -- (Use Case 2)
}
@enduml`;
  }

  private buildUserPrompt(prompt: string, diagramTypes: string[]): string {
    return `System description:
${prompt}

Generate the following UML diagrams: ${diagramTypes.join(', ')}

Analyze the system description and create comprehensive UML diagrams that capture:
- All major entities and their relationships (for CLASS diagrams)
- Key user interactions and workflows (for SEQUENCE diagrams)
- Business processes and decision points (for ACTIVITY diagrams)
- Actors and their use cases (for USE_CASE diagrams)

Return the response as JSON with the diagrams array.`;
  }
}

export default new LLMService();
