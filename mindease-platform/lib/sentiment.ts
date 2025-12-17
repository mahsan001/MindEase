import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

const nlp = winkNLP(model);

export function analyzeSentiment(text: string): { sentiment: string; mood: string; score: number } {
    if (!text || text.trim().length === 0) {
        return { sentiment: 'Neutral', mood: '😐', score: 3 };
    }

    const doc = nlp.readDoc(text);
    const sentences = doc.sentences().out();
    
    if (sentences.length === 0) {
        return { sentiment: 'Neutral', mood: '😐', score: 3 };
    }

    // Get sentiment for each sentence
    const sentiments = doc.sentences().out(nlp.its.sentiment) as number[];
    
    // Calculate average sentiment
    const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    
    // Map sentiment score to mood emoji and category
    // avgSentiment typically ranges from -1 (very negative) to 1 (very positive)
    let sentiment: string;
    let mood: string;
    let score: number;

    if (avgSentiment <= -0.4) {
        sentiment = 'Negative';
        mood = '😢';
        score = 1;
    } else if (avgSentiment <= -0.1) {
        sentiment = 'Negative';
        mood = '😟';
        score = 2;
    } else if (avgSentiment <= 0.1) {
        sentiment = 'Neutral';
        mood = '😐';
        score = 3;
    } else if (avgSentiment <= 0.4) {
        sentiment = 'Positive';
        mood = '😊';
        score = 4;
    } else {
        sentiment = 'Positive';
        mood = '😄';
        score = 5;
    }

    return { sentiment, mood, score };
}
