import { asyncMiddleware } from '../middlewares'
import { COA } from '../models/coa'

export const CONTROLLER_COA = {
  create: asyncMiddleware(async (req, res) => {
    try {
      const { userId, data } = req.body
      const existingCOA = await COA.findOne({ userId })
      if (existingCOA) {
        existingCOA.data = data;
        await existingCOA.save()
        res.status(201).json({message: 'Revenue created successfully', data: existingCOA.toObject()})
      }

      const coa = new COA({
        userId: userId,
        data: data
      })

      const savedCOA = await coa.save()
      res.status(201).json({ message: 'COA created successfully', data: savedCOA.toObject() })
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  }),

  getCOA: asyncMiddleware(async (req, res) => {
    try {
      const{userId} = req.body
      const coa = await COA.findOne({userId})
      if(!coa) {
        res.status(404).json({message: 'COA Not Founded!'})
      }

      res.status(201).json({message: 'COA Successfully Downloaded!', data:coa.toObject()})
    } catch (error) {
      res.status(500).json({message: 'Server error', error: error.message})
    }
  })
}
