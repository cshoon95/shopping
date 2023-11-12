import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma'

const prisma = new PrismaClient();

async function getCategories() {
	try {
		const response = await prisma.categories.findMany({});
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
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
		const product = await getCategories();
		res.status(200).json({items: product, message: `Success`});
	} catch (error) {
		res.status(400).json({message: `Faild`});
	}
}