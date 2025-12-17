import { NextResponse } from 'next/server';
import { analyzeSentiment } from '@/lib/sentiment';

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        if (!content || typeof content !== 'string' || content.trim().length < 20) {
            return NextResponse.json(
                { error: 'Content must be at least 20 characters' },
                { status: 400 }
            );
        }

        // Get sentiment analysis
        const sentimentResult = analyzeSentiment(content);

        // Generate comprehensive analysis
        const wordCount = content.trim().split(/\s+/).length;
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const sentenceCount = sentences.length;
        const avgWordsPerSentence = Math.round(wordCount / Math.max(sentenceCount, 1));

        // Detect emotional keywords
        const positiveWords = ['happy', 'joy', 'excited', 'grateful', 'love', 'wonderful', 'great', 'amazing', 'blessed', 'proud', 'hope', 'peaceful', 'content', 'better', 'progress', 'accomplished'];
        const negativeWords = ['sad', 'angry', 'frustrated', 'worried', 'anxious', 'depressed', 'hopeless', 'tired', 'exhausted', 'overwhelmed', 'stressed', 'difficult', 'struggle', 'pain', 'hurt'];
        const reflectiveWords = ['think', 'feel', 'realize', 'understand', 'learn', 'reflect', 'consider', 'wonder', 'believe', 'question'];

        const contentLower = content.toLowerCase();
        const positiveCount = positiveWords.filter(word => contentLower.includes(word)).length;
        const negativeCount = negativeWords.filter(word => contentLower.includes(word)).length;
        const reflectiveCount = reflectiveWords.filter(word => contentLower.includes(word)).length;

        // Build analysis text
        let analysis = '';

        // Sentiment section
        if (sentimentResult.sentiment === 'Positive') {
            analysis += '✨ Your entry reflects a positive emotional state. ';
            if (positiveCount > 2) {
                analysis += `You used ${positiveCount} uplifting words, showing optimism and gratitude. `;
            }
            analysis += 'This suggests you\'re in a good mental space or processing experiences constructively.\n\n';
        } else if (sentimentResult.sentiment === 'Negative') {
            analysis += '💙 Your entry shows you\'re processing some difficult emotions. ';
            if (negativeCount > 2) {
                analysis += `The presence of ${negativeCount} challenging emotion words indicates you may be going through a tough time. `;
            }
            analysis += 'Remember, acknowledging these feelings is an important step in healing.\n\n';
        } else {
            analysis += '🌟 Your entry shows balanced emotional expression. ';
            analysis += 'You\'re exploring your feelings with a measured perspective.\n\n';
        }

        // Reflection depth
        if (reflectiveCount >= 3) {
            analysis += `🧠 Deep Reflection Detected: You used ${reflectiveCount} reflective words, showing strong self-awareness and introspection. This kind of thoughtful examination can lead to personal growth.\n\n`;
        }

        // Writing pattern insights
        if (wordCount > 200) {
            analysis += `📝 Detailed Expression: Your ${wordCount}-word entry shows you're taking time to process your thoughts thoroughly. Long-form journaling can be very therapeutic.\n\n`;
        } else if (wordCount < 50) {
            analysis += '📝 Brief but meaningful. Sometimes the most powerful insights come in few words.\n\n';
        }

        if (avgWordsPerSentence > 20) {
            analysis += '💭 Complex Thoughts: Your longer sentences suggest you\'re working through nuanced or interconnected ideas.\n\n';
        }

        // Recommendations
        analysis += '🎯 Suggestions:\n';
        
        if (sentimentResult.sentiment === 'Negative') {
            analysis += '• Consider what small action you could take today to improve your situation\n';
            analysis += '• Practice self-compassion - be kind to yourself as you would to a friend\n';
            analysis += '• If feelings persist, consider reaching out to a mental health professional\n';
        } else if (sentimentResult.sentiment === 'Positive') {
            analysis += '• Take a moment to savor these positive feelings\n';
            analysis += '• Consider what contributed to this positive state\n';
            analysis += '• Think about how you can maintain this momentum\n';
        } else {
            analysis += '• Continue exploring your thoughts through regular journaling\n';
            analysis += '• Notice patterns in your entries over time\n';
            analysis += '• Consider what small changes might shift your emotional balance\n';
        }

        return NextResponse.json({ 
            analysis: analysis.trim(),
            sentiment: sentimentResult.sentiment,
            mood: sentimentResult.mood,
            metrics: {
                wordCount,
                sentenceCount,
                avgWordsPerSentence,
                positiveCount,
                negativeCount,
                reflectiveCount
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Journal analysis error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
