import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma'

const prisma = new PrismaClient();

async function getProductsCount(category: number, contains: string) {
	const containsCondition = contains && contains !== '' ? {
		name: { contains: contains }
	} : undefined

	const where = 
		category && category !== -1 ? {
			category_id: category,
			...containsCondition,
		} : containsCondition ? containsCondition : undefined
	try {
		const response = await prisma.products.count({where: where})
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
	const { cateory, contains } = req.query;

	try {
		const products = await getProductsCount(Number(cateory), String(contains));
		res.status(200).json({items: products, message: `Success`});
	} catch (error) {
		res.status(400).json({message: `Faild`});
	}
}