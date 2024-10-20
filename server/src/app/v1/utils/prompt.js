let shortSummary = `
Webpage content: [( )] 

Supplier company: [{}] 

You are an expert in analyzing content, finding relevance and determining if a company is risky or not in the following areas: Financial health, Stock Market, Security Incidents, Natural Disasters and Geopolitical situations. Your analysis will be crucial in helping a company assess risks associated with their suppliers ahead of time so they can be prepared for any supply chain issues that might arise and halt production.  `;

let queryPrompt = `Conduct your analysis in the following steps: 1. Analyze and conclude if the webpage content is relevant to the Supplier company. 2. If relevant, return your response in the following format: { “relevance”: true, “risk_assessment”: <A single string of 200-word text on why associating with this supplier company may be risky in the future and based on which area. Include past details of incidents from the webpage content (if available)>, “isRisky”:<Based on your assessment, if you find the supplier company is even slightly risky in either Natural Disasters, Financial health, Stock Market and Security Incidents, return true, otherwise false>} 3. If not relevant, return your response in the following format: {“relevance”: false} `;
let websiteSystemPrompt = `
Website content: [( )]

Can you analyze the above website content and extract the following fields about the company: Contact details, Industry tags, short summary of expertise and domain. Return your response as a JSON object ONLY in the following format: 
{
  "Company_Name": "<Full name of the company>",
  "Location": {
    "Headquarters": "<Details of location of Headquarters in City, State and Country format>",
    "Manufacturing_locations": "<Array of all the Manufacturing locations in City, State and Country formats>",
    "Additional_locations": "<Array of any additional company locations in City, State and Country format>"
  },
  "Expertise_Summary": "<Write a 200 word summary about the company's area of expertise>",
  "Accomplishments": "<Write a 200 word summary about the company's accomplishments or null if not found>",
  "Industry": "<Write about 6-7 tags that accurately describe the domain that this company is operating in, Example: 'Automotive', 'Electronics', etc>",
  "Contact_email": "<Construct an array of company email addresses listed on the website content>",
  "Contact_phone": "<Array of company phone numbers>",
  "Contact_addresses": "<Array of all the addresses in the content>"
}

Ensure the JSON string is correctly formatted without backticks or any special characters
`

 
 let websiteUserprompt = `

 I have a block of website content that contains information about a company. Could you please analyze it and extract the following fields:

Company Name: Full name of the company.
Location:
Headquarters: Details of the location of Headquarters in City, State, and Country format.
Manufacturing locations: An array of all the manufacturing locations in City, State, and Country formats.
Additional locations: An array of any additional company locations in City, State, and Country format.
Expertise Summary: A 200-word summary about the company's area of expertise.
Accomplishments: A 200-word summary about the company's accomplishments or null if not found.
Industry: About 6-7 tags that accurately describe the domain that this company is operating in (e.g., "Automotive", "Electronics", etc).
Contact Email: An array of company email addresses listed on the website content.
Contact Phone: An array of company phone numbers.
Contact Addresses: An array of all the addresses in the content.
Please return your response as a JSON object in the following format:


{
    "Company_Name": <Full name of the company>,
    "Location": {
      "Headquarters": <Details of location of Headquarters in City, State and Country format>,
      "Manufacturing_locations": <Array of all the Manufacturing locations in City, State and Country formats>,
      "Additional_locations": <Array of any additional company locations in City, State and Country format>
    },
    "Expertise_Summary": <Write a 200 word summary about the company's area of expertise>,
    "Accomplishments": <Write a 200 word summary about the company's accomplishments or null if not found>,
    "Industry": <Write about 6-7 tags that accurately describe the domain that this company is operating in, Example: "Automotive", "Electronics", etc>,
    "Contact_email": <Construct an array of company email addresses listed on the website content>,
    "Contact_phone": <Array of company phone numbers>,
    "Contact_addresses": <Array of all the addresses in the content>
  }
  Ensure the JSON string is correctly formatted without backticks or any special characters
 `

export { shortSummary, queryPrompt, websiteSystemPrompt,websiteUserprompt};
