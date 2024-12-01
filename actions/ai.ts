"use server";
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
import dbConnect from "@/utils/db";
import Query from "@/models/query";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

/**
 * This function is responsible for generating text using the Google Generative AI model.
 *
 * @param text - The input text that will be used as a prompt for the AI model.
 *
 * @returns A Promise that resolves to the generated text as a string.
 *
 * @example
 * ```typescript
 * const generatedText = await runAi("What is the meaning of life?");
 * console.log(generatedText);
 * ```
 */
export async function runAi(text: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(text);
  return result.response.text();
}

export async function saveQuery(
  template: object,
  email: string,
  query: string,
  content: string
) {
  try {
    await dbConnect();
    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });
    await newQuery.save();
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
}

/**
 * Retrieves paginated queries for a specific user.
 *
 * @param email - The email address of the user whose queries are to be retrieved.
 * @param page - The page number of the results to retrieve (1-indexed).
 * @param pageSize - The number of queries to return per page.
 * @returns A Promise that resolves to an object containing:
 *   - queries: An array of Query objects for the specified page.
 *   - totalPages: The total number of pages available.
 *   If an error occurs, it returns an object with `ok: false`.
 */
export async function getQueries(
  email: string,
  page: number,
  pageSize: number
) {
  try {
    await dbConnect();

    const skip = (page - 1) * pageSize;
    const totalQueries = await Query.countDocuments({ email });

    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return {
      queries,
      totalPages: Math.ceil(totalQueries / pageSize),
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
}

// this calculates usage count for each month
/**
 * Calculates the total word count of queries made by a user in the current month.
 *
 * This function aggregates the word count from all queries made by the specified user
 * within the current month and year. It uses MongoDB's aggregation pipeline to perform
 * the calculation efficiently.
 *
 * @param email - The email address of the user whose usage is being calculated.
 * @returns A Promise that resolves to the total word count for the current month.
 *          Returns 0 if no queries are found for the current month.
 */
export async function usageCount(email: string) {
  await dbConnect();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const result = await Query.aggregate([
    {
      $match: {
        email: email,
        $expr: {
          $and: [
            { $eq: [{ $year: "$createdAt" }, currentYear] },
            { $eq: [{ $month: "$createdAt" }, currentMonth] },
          ],
        },
      },
    },
    {
      $project: {
        wordCount: {
          $size: {
            $split: [{ $trim: { input: "$content" } }, " "],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalWords: { $sum: "$wordCount" },
      },
    },
  ]);
  return result.length > 0 ? result[0].totalWords : 0;
}
