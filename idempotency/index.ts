import type { Request, Response, NextFunction } from "express";
import { Redis } from "ioredis";
import express from "express";

interface Event {
	id: string;
	name: string;
	date: string;
	createdAt: string;
}

interface IdempotentRequest extends Request {
	idempotencyKey?: string;
	cachedResponse?: string;
}

const CACHE_TTL = 60; // 1 minute in seconds

const redisClient = new Redis();

redisClient.on("error", (error) => {
	console.error("Redis connection error:", error);
});

const generateCacheKey = (key: string): string => `idempotent:${key}`;

const idempotencyMiddleware = async (
	req: IdempotentRequest,
	res: Response,
	next: NextFunction
) => {
	const idempotencyKey = req.headers["idempotency-key"] as string;

	if (!idempotencyKey) {
		return res.status(400).json({
			error: "Missing idempotency key",
			code: "MISSING_IDEMPOTENCY_KEY",
		});
	}

	const cacheKey = generateCacheKey(idempotencyKey);

	try {
		// Check for existing response
		const cachedResponse = await redisClient.get(cacheKey);
		if (cachedResponse) {
			return res.status(200).json(JSON.parse(cachedResponse));
		}

		req.idempotencyKey = idempotencyKey;
		next();
	} catch (error) {
		console.error("Idempotency middleware error:", error);
		res.status(500).json({
			error: "Internal server error",
			code: "INTERNAL_SERVER_ERROR",
		});
	}
};

// Express setup
const app = express();
app.use(express.json());

// Routes
app.post(
	"/events",
	idempotencyMiddleware as express.RequestHandler,
	//@ts-expect-error
	async (req: IdempotentRequest, res: Response) => {
		const { name, date } = req.body;
		const idempotencyKey = req.idempotencyKey!;
		const cacheKey = generateCacheKey(idempotencyKey);

		try {
			// Validate request
			if (!name || !date) {
				return res.status(400).json({
					error: "Missing required fields",
					code: "MISSING_FIELDS",
				});
			}

			// Create event
			const event: Event = {
				id: idempotencyKey,
				name,
				date,
				createdAt: new Date().toISOString(),
			};

			// Store response in cache
			await redisClient.set(cacheKey, JSON.stringify(event), "EX", CACHE_TTL);

			res.status(201).json(event);
		} catch (error) {
			console.error("Event creation error:", error);
			res.status(500).json({
				error: "Failed to create event",
				code: "EVENT_CREATION_FAILED",
			});
		}
	}
);

// Simple frontend
app.get("/", (_req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Event Creator</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        button { padding: 10px 20px; background: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;}
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1>Create Event</h1>
      <form id="eventForm">
        <div class="form-group">
          <label for="name">Event Name:</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="date">Event Date:</label>
          <input type="date" id="date" required>
        </div>
        <button type="submit">Create Event</button>
      </form>
      <pre id="response"></pre>

      <script>
        const form = document.getElementById('eventForm');
        const response = document.getElementById('response');

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const name = document.getElementById('name').value;
          const date = document.getElementById('date').value;
          const idempotencyKey = btoa(name + date);

          try {
            const res = await fetch('/events', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': idempotencyKey
              },
              body: JSON.stringify({ name, date })
            });

            const data = await res.json();
            response.textContent = JSON.stringify(data, null, 2);
          } catch (error) {
            response.textContent = 'Error: ' + error.message;
          }
        });
      </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
