import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/env';

const execAsync = promisify(exec);

export type DiagramFormat = 'PLANTUML' | 'MERMAID';

export class DiagramService {
  private plantumlServerUrl: string;
  private uploadsDir: string;

  constructor() {
    this.plantumlServerUrl = config.diagram.plantumlServerUrl;
    this.uploadsDir = config.diagram.uploadsDir;
    this.ensureUploadDir();
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.mkdir(this.uploadsDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create uploads directory:', error);
    }
  }

  async renderDiagram(
    dsl: string,
    format: DiagramFormat = 'PLANTUML'
  ): Promise<string> {
    if (format === 'PLANTUML') {
      return this.renderPlantUML(dsl);
    } else {
      return this.renderMermaid(dsl);
    }
  }

  private async renderPlantUML(dsl: string): Promise<string> {
    try {
      // Encode DSL for PlantUML server
      const encoded = this.encodePlantUML(dsl);
      const imageUrl = `${this.plantumlServerUrl}/svg/${encoded}`;

      // Fetch the SVG from PlantUML server
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      // Save to local file
      const filename = `${uuidv4()}.svg`;
      const filePath = path.join(this.uploadsDir, filename);
      await fs.writeFile(filePath, response.data);

      // Return relative URL path
      return `/uploads/diagrams/${filename}`;
    } catch (error) {
      console.error('PlantUML rendering error:', error);
      throw new Error('Failed to render PlantUML diagram');
    }
  }

  private async renderMermaid(dsl: string): Promise<string> {
    try {
      // Save Mermaid DSL to temp file
      const tempMmdFile = path.join(this.uploadsDir, `${uuidv4()}.mmd`);
      const outputSvgFile = path.join(this.uploadsDir, `${uuidv4()}.svg`);

      await fs.writeFile(tempMmdFile, dsl);

      // Execute Mermaid CLI
      await execAsync(`mmdc -i "${tempMmdFile}" -o "${outputSvgFile}" -t default`);

      // Clean up temp file
      await fs.unlink(tempMmdFile);

      // Return relative URL path
      const filename = path.basename(outputSvgFile);
      return `/uploads/diagrams/${filename}`;
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      throw new Error('Failed to render Mermaid diagram');
    }
  }

  private encodePlantUML(text: string): string {
    // Use proper PlantUML encoder
    const plantumlEncoder = require('plantuml-encoder');
    return plantumlEncoder.encode(text);
  }

  async getDiagramFile(filename: string): Promise<Buffer> {
    try {
      const filePath = path.join(this.uploadsDir, filename);
      return await fs.readFile(filePath);
    } catch (error) {
      throw new Error('Diagram file not found');
    }
  }

  async deleteDiagramFile(imageUrl: string): Promise<void> {
    try {
      const filename = path.basename(imageUrl);
      const filePath = path.join(this.uploadsDir, filename);
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Failed to delete diagram file:', error);
    }
  }
}

export default new DiagramService();
