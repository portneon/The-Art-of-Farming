const https = require('https');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * AI Botanical Chat
 * POST /api/chat/plant
 * Body: { plantName, message, conversationHistory? }
 */
async function plantChat(req, res) {
    try {
        const { plantName, message, conversationHistory = [] } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: 'message is required' });
        }

        // Fallback if no API key configured
        if (!GEMINI_API_KEY) {
            return res.status(200).json({
                success: true,
                reply: `[AI Offline] No GEMINI_API_KEY configured. Please add it to your .env file to enable botanical AI assistance for ${plantName || 'your plant'}.`
            });
        }

        const systemPrompt = `You are an expert botanical assistant and plant care specialist with deep knowledge of horticulture. 
You are currently helping a user who owns a plant called "${plantName || 'their plant'}".
Give precise, practical, and friendly advice about plant care including watering schedules, light requirements, fertilizing, pest control, soil composition, pruning, and health diagnosis.
Keep responses concise (2-4 sentences max) and actionable.
If this exact plant species requires specific care, mention it.`;

        // Build Gemini-format conversation
        const contents = [];

        // Add history
        for (const msg of conversationHistory) {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            });
        }

        // Add current message
        contents.push({ role: 'user', parts: [{ text: message }] });

        const requestBody = JSON.stringify({
            system_instruction: {
                parts: [{ text: systemPrompt }]
            },
            contents
        });

        const reply = await callGemini(requestBody);

        res.status(200).json({ success: true, reply });

    } catch (error) {
        console.error('Error in plant chat:', error);
        res.status(500).json({ success: false, message: 'Error processing chat request', error: error.message });
    }
}

function callGemini(requestBody) {
    return new Promise((resolve, reject) => {
        const url = new URL(GEMINI_URL);
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        const req = https.request(options, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error) {
                        reject(new Error(parsed.error.message));
                        return;
                    }
                    const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        resolve(text.trim());
                    } else {
                        reject(new Error('No response text from Gemini'));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(requestBody);
        req.end();
    });
}

module.exports = { plantChat };
