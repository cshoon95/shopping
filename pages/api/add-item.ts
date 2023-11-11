import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@notionhq/client';

const notion = new Client({
	auth: 'secret_10MWJqDFUfAmIsDPKlTKP8A4VfaDqXVl6KvELAarqNu'
})

const databaseId = 'ea8a7f51f9f34fd5aae9bdb6a6f6eaec';

async function addItem(name: string) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				title: [
					{
						text: {
							content: name
						}
					}
				]
			}
		})
		console.log(response)
	} catch (error) {
		console.error(JSON.stringify(error));
	}
}

type Data = {
	message: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { name } = req.query;

	if (name == null) {
		return res.status(400).json({message: 'No Message'});
	}

	try {
		await addItem(String(name));
		res.status(200).json({message: `Success ${name} added`});
	} catch (error) {
		res.status(400).json({message: `Faild ${name} added`});
	}
}