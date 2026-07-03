// Dummy YOLO v11 Engine Service
// This service simulates the behavior of an on-device YOLO v11 model for pineapple grading.

class YoloV11Engine {
  constructor() {
    this.isLoaded = false;
    this.modelName = 'YOLOv11-Pineapple-Grading';
  }

  async loadModel() {
    console.log(`[YOLO] Loading ${this.modelName}...`);
    return new Promise(resolve => {
      setTimeout(() => {
        this.isLoaded = true;
        console.log(`[YOLO] ${this.modelName} loaded successfully.`);
        resolve(true);
      }, 1000); 
    });
  }

  async runInference(frameData) {
    if (!this.isLoaded) {
      throw new Error("Model not loaded yet");
    }

    const inferenceTime = Math.floor(Math.random() * 50) + 50;
    
    return new Promise(resolve => {
      setTimeout(() => {
        
        // Kotak static di tengah
        const grades = ["Supermarket", "Pasar", "Reject"];
        const randomGrade = grades[Math.floor(Math.random() * grades.length)];
        const confidence = Math.floor(Math.random() * (99 - 85 + 1) + 85);
        
        resolve({
          detections: [
            {
              class: "Nanas",
              grade: randomGrade,
              confidence: confidence,
              bbox: {
                x: 0.3,
                y: 0.25,
                w: 0.4, 
                h: 0.5  
              },
              details: {
                diameter: parseFloat((Math.random() * (15 - 9) + 9).toFixed(1)),
                height: parseFloat((Math.random() * (22 - 12) + 12).toFixed(1)),
                weight: parseFloat((Math.random() * (2.5 - 0.8) + 0.8).toFixed(1)),
                notes: ["Warna kulit " + (Math.random() > 0.5 ? "merata" : "kurang merata")],
              }
            }
          ],
          inferenceTimeMs: inferenceTime
        });
      }, inferenceTime);
    });
  }
}

export default new YoloV11Engine();
