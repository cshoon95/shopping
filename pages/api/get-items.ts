import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@notionhq/client';

const notion = new Client({
	auth: 'secret_10MWJqDFUfAmIsDPKlTKP8A4VfaDqXVl6KvELAarqNu'
})

const databaseId = 'ea8a7f51f9f34fd5aae9bdb6a6f6eaec';

async function getItems() {
	try {
		const response = await notion.databases.query({
			database_id: databaseId,
			sorts: [
				{
					property: 'price',
					direction: 'ascending'
				}
			]
			
		})
		console.log(response)

		return response.results;
	} catch (error) {
		console.error(JSON.stringify(error));
	}
}

type Data = {
	items?: any
	message: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

	try {
		const response = await getItems();
		res.status(200).json({items: response, message: `Success`});
	} catch (error) {
		res.status(400).json({message: `Faild`});
	}
}