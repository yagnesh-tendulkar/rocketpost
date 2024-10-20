import axios from "axios";
import config from "../../../../../config.js";
import cheerio from "cheerio";
import { shortSummary, queryPrompt } from "./prompt.js";
import { insertSearchResults } from "../models/sql.model.js";
const searchGoogle = async (
  supplier,
  area,
  seachEngineId,
  searchQuery,
  supplierId
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("searchQuery", searchQuery);
      let apiKey = config?.GOOGLE_API_KEY;
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            key: apiKey, // Your API key
            cx: seachEngineId,
            q: searchQuery, // The search query
          },
        }
      );
      console.log("response.data", response.data);
      let results = response.data.items;
      console.log("results", results);
      let searchLinks = [];
      let resultValues = "";
      if (results?.length > 0) {
        await Promise.allSettled(
          results.map(async (result) => {
            if (!result.fileFormat) {
              try {
                console.log(result.link, "link");
                let reabalbeData = await readSearchLinks(result.link);
                // console.log("reabalbeData", reabalbeData);
                let systemPrompt = shortSummary
                  .replace("[( )]", reabalbeData.substring(0, 16000))
                  .replace("[{}]", supplier);
                // console.log("systemPrompt", systemPrompt);
                let input = queryPrompt;
                let summary = await generateSummary(systemPrompt, input);
                console.log("summary", summary);
                const regex = /\{[^{}]*\}/;
                let summaryMatches = summary?.data.match(regex);
                summaryMatches = summaryMatches != null && summaryMatches[0];
                console.log(
                  "summaryMatches***%%%",
                  summaryMatches,
                  typeof summaryMatches
                );
                console.log("summaryMatches", JSON.parse(summaryMatches));
                summaryMatches =
                  typeof summaryMatches === "string"
                    ? JSON.parse(summaryMatches)
                    : summaryMatches;
                console.log(summaryMatches?.relevance, "relevance");
                if (summaryMatches && summaryMatches?.relevance) {
                  summaryMatches.risk_assessment =
                    summaryMatches.risk_assessment?.toString();
                  let booleanValue =
                    typeof summaryMatches?.isRisky === "string"
                      ? summaryMatches?.isRisky?.toLowerCase() === "true"
                      : summaryMatches?.isRisky;
                  let bit = summaryMatches?.isRisky ? 1 : 0;
                  console.log("bit", bit);
                  // summaryMatches.isRisky = booleanValue;
                  resultValues =
                    resultValues +
                    `('${supplierId}','${result.link}','${summaryMatches.risk_assessment}',${bit},'${area}'),`;
                  summaryMatches["url"] = result.link;
                  console.log("supplierId", supplierId);
                  let insertedResp = await insertSearchResults(
                    supplierId,
                    result.link,
                    summaryMatches.risk_assessment,
                    bit,
                    area
                  );
                  // console.log("insertedResp", insertedResp);
                  summaryMatches["searchResultId"] = insertedResp[0]?.Id;
                }
                // resultValues = resultValues.slice(0 - 1);
                console.log("resultValues", resultValues.slice(0, -1));

                if (summaryMatches) searchLinks.push(summaryMatches);
                console.log("summaryMatches*****", summaryMatches);
              } catch (error) {
                // console.log("error", error);
                // reject(error)
              }
            }
          })
        );
        // console.log("resultValues", resultValues);
        console.log("results", searchLinks);
        resolve(searchLinks);
      } else {
        console.log("inside else");
        resolve([]);
      }
    } catch (error) {
      console.error("An error occurred:", error?.response?.message);
      reject(error);
    }
  });
};

const readSearchLinks = async (link) => {
  return new Promise(async (resolve, reject) => {
    try {
      let $;
      let htmlData;
      htmlData = await axios.get(link);
      $ = cheerio.load(htmlData.data);
      const titleText = $("title").text();
      $("script, style").remove();
      const textContent = $("body")
        .clone()
        .find("script")
        .remove()
        .end()
        .text();
      let concatenatedText = textContent.replace(/\s+/g, " ").trim();
      concatenatedText = titleText + " " + concatenatedText;
      // console.log(`***concatenatedText*** ${concatenatedText}`);
      resolve(concatenatedText);
    } catch (error) {
      // console.log("error", error.response);
      reject(error);
    }
  });
};

const generateSummary = async (systemPrompt, inputPrompt) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = JSON.stringify({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: inputPrompt,
          },
        ],
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.MIRA_COREAPI_ENDPOINT}/core/api/v1/chat/completions`,
        headers: {
          "access-key": process.env.MIRA_CORE_API_ACCESS_KEY,
          model: process.env.MIRA_CORE_API_CHAT_COMPLETION_DEPLOYMENT_MODEL,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      // console.log("response.............", response.data);
      resolve({ status: true, data: response?.data?.message?.content });
    } catch (error) {
      // console.log("error", error);
      reject(error);
    }
  });
};
export { searchGoogle, readSearchLinks, generateSummary };
