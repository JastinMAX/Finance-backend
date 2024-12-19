import { asyncMiddleware } from '../middlewares'
import { Revenue } from '../models/revenue'

export const CONTROLLER_REVENUE = {
  create: asyncMiddleware(async (req, res) => {
    try {
      const { userId, date, data } = req.body
      const existingRevenue = await Revenue.findOne({ userId, date })
      if (existingRevenue) {
        existingRevenue.data = data;
        await existingRevenue.save()
        res.status(201).json({message: 'Revenue created successfully', data: existingRevenue.toObject()})
      }

      const revenue = new Revenue({
        userId: userId,
        date: date,
        data: data
      })

      const savedRevenue = await revenue.save()
      res.status(201).json({ message: 'Revenue created successfully', data: savedRevenue.toObject() })
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  }),

  getRevenue: asyncMiddleware(async (req, res) => {
    try {
      const{userId, date} = req.body
      const revenue = await Revenue.findOne({userId, date})
      if(!revenue) {
        res.status(404).json({message: 'Revenue Not Founded!'})
      }

      res.status(201).json({message: 'Revenue Successfully Downloaded!', data:revenue.toObject()})
    } catch (error) {
      res.status(500).json({message: 'Server error', error: error.message})
    }
  })
}
